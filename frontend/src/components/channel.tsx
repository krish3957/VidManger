import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface ChannelProps {
    channel: {
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
    }
}

export const Channel = ({
    channel
}: ChannelProps) => {
    const navigate = useNavigate();
    return (
        <div key={channel._id} className="p-5 border border-gray-200 flex m-3 w-fit">
            <div className="bg-black mr-5">
                <img src={channel.thumbnail} alt="thumbnail" className="rounded-full w-48 h-48" />
            </div>
            <div className="mr-5">
                <div className="flex"><h1 className="font-bold mr-2 ">Channel Name:</h1>{channel.name}</div>
                <div className="flex"><h1 className="font-bold mr-2 ">Channel Owner:</h1>{channel.owner.email}</div>
                <div className="flex"><h1 className="font-bold mr-2 ">Channel Subscriber Count:</h1>{channel.subscriberCount}</div>
                <div className="flex"><h1 className="font-bold mr-2 ">Channel View Count:</h1>{channel.viewCount}</div>
                <div className="flex">
                    <Link className="underline" to={`https://www.youtube.com/channel/${channel.youtubeChannelId}`} target="_blank">
                        View Channel
                    </Link>
                </div>
                <Button onClick={() => {
                    localStorage.setItem('channel', JSON.stringify({
                        name: channel.name,
                        youtubeChannelId: channel.youtubeChannelId,
                        thumbnail: channel.thumbnail,
                        ownerId: channel.owner._id
                    }))
                    navigate(`/channel/drafts/${channel._id}`, {
                        replace: true, state: {
                            data: {
                                name: channel.name,
                                youtubeChannelId: channel.youtubeChannelId,
                                thumbnail: channel.thumbnail,
                                ownerId: channel.owner._id
                            }
                        }
                    });
                }}>
                    Manage
                </Button>
            </div>
        </div>
    )
}
