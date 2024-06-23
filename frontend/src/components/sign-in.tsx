import { auth, provider } from "@/lib/firebase";
import { Button } from "./ui/button"
import { signInWithPopup } from "firebase/auth";
import axios from "axios";
import { setUser } from "@/slice/userSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/useStore";


export const OwnerSignIn = ({
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
        signInWithPopup(auth, provider)
            .then(async (result) => {
                let owner = await axios.get(`http://localhost:5000/api/owner/${result.user.email}`);
                if (owner.data) {
                    owner = await axios.put("http://localhost:5000/api/owner", {
                        email: result.user.email,
                        fullName: result.user.displayName,
                        accessToken: result?._tokenResponse?.oauthAccessToken,
                        refreshToken: result?._tokenResponse?.refreshToken,
                        expiration: result.user?.stsTokenManager.expirationTime
                    });
                    console.log(owner);
                    dispatch(setUser({
                        type: "Owner",
                        email: result.user.email,
                        fullName: result.user.displayName,
                        expiration: result.user?.stsTokenManager.expirationTime,
                        id: owner.data?.toString()
                    }));
                }
                else {
                    owner = await axios.post("http://localhost:5000/api/owner", {
                        email: result.user.email,
                        fullName: result.user.displayName,
                        accessToken: result?._tokenResponse?.oauthAccessToken,
                        refreshToken: result?._tokenResponse?.refreshToken,
                        expiration: result.user?.stsTokenManager.expirationTime
                    })
                    console.log(owner);
                    dispatch(setUser({
                        type: "Owner",
                        email: result.user.email,
                        fullName: result.user.displayName,
                        expiration: result.user?.stsTokenManager.expirationTime,
                        id: owner.data?.toString()
                    }));
                }
                console.log(owner);
                const foundOwner = await axios.get(`http://localhost:5000/api/owner/${result.user.email}`);
                await axios.post("http://localhost:5000/api/channel", {
                    owner: foundOwner.data
                }).catch((error) => {
                    console.log(error);
                });
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
