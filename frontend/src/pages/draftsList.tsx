import AddDraft from "@/components/addDraftDialog";
import EditDraft from "@/components/editDraftDialog";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useStore";
import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom";


const DraftList = () => {
    const user = useAppSelector(state => state.user);
    const location = useLocation();
    const { data } = location.state;
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
        thumbnail: string;
        createdAt: string;
        updatedAt: string;
    }[]>([]);

    useEffect(() => {
        const getDrafts = async () => {
            await axios.get(`http://localhost:5000/api/draft/`, {
                params: {
                    owner: data.ownerId,
                    manager: user.id?.toString()
                }
            })
                .then((res) => {
                    setDrafts(res.data);
                }).catch((err) => {
                    console.log(err);
                });
        }
        getDrafts();
    }, [data.ownerId, user.id]);

    if (!drafts.length) {
        return (
            <div className="w-full h-[90vh] flex items-center justify-center flex-col">
                <div className="flex items-center">
                    <img src={data.thumbnail} alt="thumbnail" className="rounded-full w-48 h-48 mr-5" />
                    <h1 className="text-2xl font-mono mb-3">
                        No Drafts Found for
                        <Link className="ml-1 underline text-blue-600" to={`/channels/${data.youtubeChannelId}`}>
                            {data.name}
                        </Link>
                    </h1>
                </div>
                <AddDraft managerId={user.id} ownerId={data.ownerId} data={data} />
            </div>
        )
    }

    return (
        <div>
            <div className="flex justify-between font-bold p-3">
                <h1 className="text-3xl">Drafts</h1>
                <AddDraft managerId={user.id} ownerId={data.ownerId} data={data} />
            </div>
            {drafts.map((draft, index) => {
                return (
                    <div className="border border-spacing-1 px-4 py-2 m-2" key={index}>
                        <div className="flex items-center justify-between">
                            <div className="flex">
                                <h1 className="font-bold text-2xl mr-2">Title:</h1>
                                <h2 className="font-semibold text-xl">{draft.title}</h2>
                            </div>
                            {
                                draft.status === "draft" && (
                                    <EditDraft draft={draft} data={data} />
                                )
                            }
                        </div>
                        <div className="flex items-center">
                            <h1 className="font-bold text-2xl mr-2">Created at:</h1>
                            <h2 className="text-xl">{draft.createdAt}</h2>
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
                        <Link to={`/draft/${draft._id}`} className="flex justify-end">
                            <Button>
                                View Details
                            </Button>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default DraftList