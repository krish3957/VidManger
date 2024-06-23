import { useAppSelector } from "@/hooks/useStore";
import axios from "axios";
import { useEffect, useState } from "react";
import DraftList from "./draftsList";

const ManagerProfile = () => {
    const user = useAppSelector(state => state.user);
    const [manager, setManger] = useState({});
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
    }[]>([]);

    useEffect(() => {
        const getManager = async () => {
            await axios.get(`http://localhost:5000/api/manager/find/${user.email}`)
                .then((res) => {
                    setManger(res.data);
                }).catch((err) => {
                    console.log(err);
                })
        }
        getManager();
    }, [user.email]);

    return (
        <div className="w-screen p-4">
            <div className="flex">
                <div className="w-1/2">
                    <h1 className="text-2xl font-bold">Moderator Profile</h1>
                    <div className="bg-white p-5 rounded-lg shadow-lg mt-5">
                        <p className="text-lg font-bold">Full Name: {manager?.fullName}</p>
                        <p className="text-lg font-bold">Email: {manager?.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagerProfile