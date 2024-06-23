import { ChangeDialog } from "@/components/changesDialog";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/ui/loading-button";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { removeUser } from "@/slice/userSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export const ChannelDrafts = () => {
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const [channel, setChannel] = useState<{
        _id: string;
        name: string;
        owner: {
            fullName: string;
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
    const [drafts, setDrafts] = useState<{
        _id: string;
        title: string;
        description: string;
        category: string;
        keywords: string;
        privacy: string;
        content: string;
        owner: string;
        manager: string;
        status: string;
        createdAt: string;
        updatedAt: string;
    }[]>([]);

    useEffect(() => {
        const getDrafts = async () => {
            await axios.get(`http://localhost:5000/api/draft/owner/${user.id}`)
                .then((res) => {
                    setDrafts(res.data);
                }).catch((err) => {
                    console.log(err);
                });
        }
        const getYourChannel = async () => {
            await axios.get(`http://localhost:5000/api/channel/${user.id}`)
                .then((res) => {
                    setChannel(res.data);
                }).catch((err) => {
                    console.log(err);
                });
        }
        getDrafts();
        getYourChannel();
    }, [user.id, user.email])
    if (user.type !== "Owner") {
        return (
            <div className="flex w-[98vw] h-[90vh] items-center justify-center">
                <h1 className="font-bold text-3xl text-center">
                    Please login as Owner to view your drafts.
                </h1>
            </div>
        );
    }

    const handleUpload = async (index: number) => {
        setLoading(true);
        if (user.expiration && new Date(user.expiration) < new Date()) {
            alert("Your token has expired please Login again.")
            toast("Your session has expired. Please login again");
            dispatch(removeUser());
            return;
        }
        const draftToUpload = drafts[index];
        console.log(draftToUpload);
        await axios.post(`http://localhost:5000/api/draft/${draftToUpload._id}/approve`, {
            params: {
                id: draftToUpload._id
            }
        }).then((res) => {
            console.log(res);
            alert("Draft Accepted");
        }).catch((err) => {
            console.log(err);
        })
        setLoading(false);
    }
    return (
        <div className="p-2">
            <div className="border border-spacing-2 p-2">
                <h1 className="font-bold text-4xl">
                    Welcome back, {channel?.owner.fullName}
                </h1>
                <h3 className="font-semibold text-2xl">
                    Please View your drafts below carefully. Accepted drafts will be published to your channel.
                </h3>
            </div>

            {
                drafts.map((draft, index) => {
                    return (
                        <div className="border border-spacing-1 px-4 py-2 m-2" key={index}>
                            <div className="flex items-center">
                                <h1 className="font-bold text-2xl mr-2">Title:</h1>
                                <h2 className="font-semibold text-xl">{draft.title}</h2>
                            </div>
                            <div className="flex items-center">
                                <h1 className="font-bold text-2xl mr-2">Created at:</h1>
                                <h2 className="text-xl">{draft.createdAt}</h2>
                            </div>
                            <div>
                                <h1 className="font-bold text-2xl mr-2">Description:</h1>
                                <h2 className="text-xl">{draft.description}</h2>
                            </div>
                            <div className="flex items-center">
                                <h1 className="font-bold text-2xl mr-2">Categories:</h1>
                                <h2 className="text-xl">{draft.category}</h2>
                            </div>
                            <div className="flex items-center">
                                <h1 className="font-bold text-2xl mr-2">Keywords:</h1>
                                {draft.keywords.split(',').map((keyword, index) => {
                                    return (
                                        <div key={index} className="bg-[#f1eff5] p-1 rounded-lg m-1 px-2">
                                            <h2 className="text-xl">{keyword}</h2>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex items-center">
                                <h1 className="font-bold text-2xl mr-2">Draft status:</h1>
                                <h2 className="text-xl">{draft.status.toUpperCase()}</h2>
                            </div>
                            <div className="flex items-center">
                                <h1 className="font-bold text-2xl mr-2">Privacy:</h1>
                                <h2 className="text-xl">{draft.privacy.toUpperCase()}</h2>
                            </div>
                            <div className="flex">
                                <h1 className="font-bold text-2xl mr-2">Content:</h1>
                                <Link to={draft.content} className="underline hover:text-blue-700">
                                    <h2 className="text-xl">{draft.content}</h2>
                                </Link>
                            </div>
                            <div className="m-2 flex justify-end">
                                {draft.status === "published" ?
                                    <Button>
                                        Published
                                    </Button>
                                    :
                                    <div>
                                        <ChangeDialog id={draft._id} />
                                        <LoadingButton loading={loading} onclick={() => {
                                            handleUpload(index);
                                        }}>
                                            Accept
                                        </LoadingButton>
                                    </div>
                                }
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}