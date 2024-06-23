import { Channel } from "@/components/channel";
import { useAppSelector } from "@/hooks/useStore"
import axios from "axios";
import { useEffect, useState } from "react";

const OwnerList = () => {
    const user = useAppSelector(state => state.user);
    const [self, setSelf] = useState<{
        _id: string;
        email: string;
        fullName: string;
        owners: string[];
        total: number;
        accepted: number;
    } | null
    >(null);

    const [channel, setChannel] = useState<{
        _id: string;
        name: string;
        owner: {
            name: string;
            email: string;
            _id: string;
        };
        youtubeChannelId: string;
        thumbnail: string;
        subscriberCount: number;
        viewCount: number;
        videoCount: number;
        customUrl: string;
    }[]>([]);

    useEffect(() => {
        const getSelf = async () => {
            const self = await axios.get(`http://localhost:5000/api/manager/find/${user.email}`);
            setSelf(self.data);
        }
        getSelf();
    }, [user.email])

    useEffect(() => {
        if (!self || !self?.owners) {
            return;
        }
        setChannel([]);
        for (let i = 0; i < self.owners.length; i++) {
            const getChannel = async () => {
                const channel = await axios.get(`http://localhost:5000/api/channel/${self.owners[i]}`);
                setChannel((prev) => [...prev, channel.data]);
            }
            getChannel();
        }
    }, [self]);

    if (user.type !== 'MAnager') {
        return <div>Not Authorized</div>
    }



    return (
        <div className="p-3 bg-background">
            <h1 className="font-bold text-3xl">
                Channel List
            </h1>
            {channel.length === 0 && <h1 className="font-bold text-2xl">No Channels Found</h1>}
            <div className="flex flex-wrap">
                {channel.map((channel) => (
                    <Channel key={channel._id} channel={channel} />
                ))}
            </div>
        </div>
    )
}

export default OwnerList