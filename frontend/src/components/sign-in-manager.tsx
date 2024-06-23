import { auth, managerProvider } from "@/lib/firebase";
import { Button } from "./ui/button"
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { setUser } from "@/slice/userSlice";
import { useAppDispatch } from "@/hooks/useStore";


export const ManagerSignIn = ({
    className,
    variant,
    children
}: {
    className?: string,
    variant?: "secondary" | "default" | "destructive" | "outline" | "ghost" | "link" | null | undefined,
    children: string
}) => {
    const dispatch = useAppDispatch();
    const signInGoogle = () => {

        signInWithPopup(auth, managerProvider)
            .then(async (result) => {

                let user = await axios.get(`http://localhost:5000/api/manager/find/${result.user.email}`);
                if (!user.data) {
                    user = await axios.post(`http://localhost:5000/api/manager`, {
                        email: result.user.email,
                        fullName: result.user.displayName
                    });
                    console.log(user);
                    dispatch(setUser({
                        type: "MAnager",
                        email: result.user.email,
                        fullName: result.user.displayName,
                        expiration: 0,
                        id: user.data?._id
                    }))
                }
                console.log("Dispatching");
                dispatch(setUser({
                    type: "MAnager",
                    email: result.user.email,
                    fullName: result.user.displayName,
                    expiration: 0,
                    id: user.data?._id
                }))
            }).catch((error) => {
                console.log(error);
            });
    }
    return (
        <Button onClick={signInGoogle} className={className} variant={variant}>
            {children}
        </Button>
    )
}
