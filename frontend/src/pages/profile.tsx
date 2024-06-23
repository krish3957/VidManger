import { useAppSelector } from "@/hooks/useStore"
import axios from "axios";
import { useEffect, useState } from "react";
import { ChannelDrafts } from "./ownerDrafts";
import { Channel } from "@/components/channel";

const OwnerProfile = () => {
    const user = useAppSelector(state => state.user);
    const [owner, setOwner] = useState(null);
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
    } | null>(null);
    useEffect(() => {
        if (!user.email) {
            return;
        }
        const getOwner = async () => {
            await axios.get(`http://localhost:5000/api/owner/${user.email}`)
                .then((res) => {
                    setOwner(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        const getChannel = async () => {
            await axios.get(`http://localhost:5000/api/channel/${user.id}`)
                .then((res) => {
                    setChannel(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        getOwner();
        getChannel();
    }, [user.email, user.id]);

    if (user.type !== "Owner") {
        return (
            <div className="w-screen p-4">
                <h1 className="text-2xl font-bold">You are not logged in as a Youtuber</h1>
            </div>
        )
    }

    return (
        <div className="w-screen p-4">
            <div className="flex">
                <div className="w-1/2">
                    <h1 className="text-2xl font-bold">Youtuber Profile</h1>
                    <div className="bg-white p-5 rounded-lg shadow-lg mt-5">
                        <p className="text-lg font-bold">Full Name: {owner?.fullName}</p>
                        <p className="text-lg font-bold">Email: {owner?.email}</p>
                    </div>

                    <h1 className="text-2xl font-bold">Channel Details</h1>
                    {channel && <div className="bg-white rounded-lg shadow-lg">
                        <div className="flex">
                            <Channel channel={channel} />
                        </div>
                    </div>}
                </div>
                <ChannelDrafts />
            </div>
        </div>
    )
}

export default OwnerProfile