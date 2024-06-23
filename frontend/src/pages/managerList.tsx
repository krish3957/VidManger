import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/hooks/useStore"
import axios from "axios";
import { useEffect, useState } from "react";
import { redirect } from "react-router-dom";

const ManagerList = () => {
    const user = useAppSelector(state => state.user);
    const [managers, setManagers] = useState([]);
    useEffect(() => {
        const getManagers = async () => {
            const managers = await axios.get(`http://localhost:5000/api/manager/1`);
            setManagers(managers.data);
        }
        getManagers();
    }, [])


    if (user.type !== 'Owner') {
        return <div>Not Authorized</div>
    }

    const assignManager = async (email: string) => {
        await axios.put(`http://localhost:5000/api/manager/${email}`, {
            ownerId: user.id
        }).then(() => {
            redirect(`/manager/${email}`)
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className="p-3 bg-background">
            <h1 className="font-bold text-3xl ml-3">Manager List</h1>
            <div className="w-fit flex flex-wrap">
                {managers.map((manager: any) => (
                    <div key={manager._id} className="p-3 border border-gray-200 flex m-3">
                        <div className="mr-5">
                            <div className="flex"><h1 className="font-bold mr-2 w-[170px]">Manger Name:</h1>{manager.fullName}</div>
                            <div className="flex"><h1 className="font-bold mr-2 w-[170px]">Manger Email:</h1>{manager.email}</div>
                            <div className="flex"><h1 className="font-bold mr-2 w-[170px]">Total Drafts created:</h1>{manager.total}</div>
                            <div className="flex"><h1 className="font-bold mr-2 w-[170px]">Total drafts accepted:</h1>{manager.accepted}</div>
                            <div className="flex"><h1 className="font-bold mr-2 w-[170px]">Acceptance rate:</h1>{manager.total ? manager.accepted / manager.total * 100 : 0}</div>
                        </div>
                        <div>
                            <Button variant="destructive" className="px-5 disabled:cursor-not-allowed" onClick={() => assignManager(manager.email)} disabled={manager.owners.includes(user.id)}>
                                Hire
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ManagerList