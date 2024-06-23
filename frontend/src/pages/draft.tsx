import { ChangeDialog } from "@/components/changesDialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";
import { removeUser } from "@/slice/userSlice";
import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import EditDraft from "@/components/editDraftDialog";
import LoadingButton from "@/components/ui/loading-button";

const Draft = () => {
    const [draftId, setDraftId] = useState(window.location.pathname.split('/')[2]);
    const [loading, setLoading] = useState(false);
    const user = useAppSelector(state => state.user);
    const [data, setData] = useState<{
        youtubeChannelId: string;
        name: string;
    } | null>(null);

    const dispatch = useAppDispatch();
    const [draft, setDraft] = useState<{
        _id: string;
        title: string,
        description: string,
        category: string,
        status: string,
        keywords: string,
        privacy: string,
        content: string,
        owner: string,
        thumbnail: string;
        manager: string,
        createdAt: string,
        updatedAt: string,
    } | null>(null)
    useEffect(() => {
        setDraftId(window.location.pathname.split('/')[2]);

    }, [])

    const handleUpload = async () => {
        setLoading(true);
        if (user.expiration && new Date(user.expiration) < new Date()) {
            alert("Your token has expired please Login again.");
            toast("Your session has expired. Please login again");
            dispatch(removeUser());
            return;
        }
        if (!draft) {
            return;
        }
        try {
            const res = await axios.post(`http://localhost:5000/api/draft/${draft._id}/approve`, {
                params: {
                    id: draft._id
                }
            });
            console.log(res);
            alert("Draft Accepted");
        } catch (err) {
            console.log(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        const getDraft = async () => {
            await axios.get(`http://localhost:5000/api/draft/find/${draftId}`)
                .then((res) => {
                    setDraft(res.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        getDraft();
    }, [draftId])
    useEffect(() => {
        const getChannel = async () => {
            if (!draft?.owner)
                return;
            await axios.get(`http://localhost:5000/api/channel/${draft.owner}`)
                .then((res) => {
                    console.log('Channel', res.data);
                    setData(res.data);
                })
        }
        getChannel();
    }, [draft?.owner])

    if (draft?.manager !== user.id && draft?.owner !== user.id) {
        return (
            <div className="flex items-center justify-center w-[98vw] h-[90vh]">
                <h1>
                    You are not authorized to view this page
                </h1>
            </div>
        )
    }
    return (
        <div className="border border-spacing-1 px-4 py-2 m-2">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-2xl mr-2">Title:</h1>
                    <h2 className="font-semibold text-xl">{draft.title}</h2>
                </div>
                {draft.status === "draft" && data && (
                    <EditDraft draft={draft} data={data} />
                )
                }
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

            {draft.thumbnail && (<div>
                <h1 className="font-bold text-2xl mr-2">Thumbnail:</h1>
                <img src={draft.thumbnail} className="w-[60vw] h-[60vh]" />
            </div>)}

            {user.id === draft.owner &&
                <div className="m-2 flex justify-end">
                    <div>
                        <ChangeDialog id={draft._id} />
                        <LoadingButton loading={loading} onClick={handleUpload}>
                            Accept
                        </LoadingButton>
                    </div>
                </div>
            }
        </div>
    )
}

export default Draft