import { OwnerSignIn } from "./sign-in"
import { useAppSelector } from "@/hooks/useStore"
import { ManagerSignIn } from "./sign-in-manager";
import { Link } from "react-router-dom";
import UserProfile from "./userProfile";

export const Navbar = () => {
    const user = useAppSelector((state) => state.user);
    console.log(user);
    return (
        <div className="p-5 flex justify-between bg-accent-foreground text-secondary items-center">
            <Link to="/">
                <div className="flex">
                    <img src="/video.png" alt="logo" className="w-10 h-10" />
                    <h1 className="font-bold text-3xl ml-2">
                        VidManager
                    </h1>
                </div>
            </Link>
            {user.email != "" ?
                <div className="flex items-center justify-between">
                    <div>
                        <p className="mr-2">Hello, {user.fullName} ({user.type})</p>
                    </div>
                    <UserProfile />
                </div>
                : <div>
                    <OwnerSignIn className="mr-5" variant="secondary">
                        YouTuber Sign-in
                    </OwnerSignIn>
                    <ManagerSignIn variant="secondary">
                        Moderator Sign-in
                    </ManagerSignIn>
                </div>}
        </div>
    )
}
