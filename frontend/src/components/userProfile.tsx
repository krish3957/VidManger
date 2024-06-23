import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAppDispatch, useAppSelector } from "@/hooks/useStore"
import { removeUser } from "@/slice/userSlice";
import { User } from "lucide-react"
import { Link } from "react-router-dom";
const UserProfile = () => {
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="mx-2">
                <User className="bg-white text-black rounded-full" size={32} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>
                    {
                        user.type === "Owner" ? "YouTuber" : "Moderator"
                    }
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                    <Link to="/youtuber/profile">
                        Profile
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer" onClick={() => {
                    dispatch(removeUser());
                }}>
                    LogOut
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserProfile