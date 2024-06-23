import { Button } from "@/components/ui/button"
import { useAppSelector } from "@/hooks/useStore"
import { Link } from "react-router-dom";

const HeroSection = () => {
    const user = useAppSelector(state => state.user);
    return (
        <div className="w-full h-[89vh] flex items-center justify-center" style={{ backgroundImage: `url("https://cdn.sites.convertsocial.net/convertsocial.net/2022/08/ultimate-guide-to-becoming-a-youtube-content-creator.png")`, backgroundSize: "cover" }}>
            <div className="w-screen h-full flex flex-col items-center justify-center text-black" style={{ backgroundColor: 'rgba(245,205,208,0.7' }}>
                <h1 className="font-bold text-5xl px-8">
                    Streamline Your YouTube Workflow
                </h1>
                <h3 className="font-semibold tracking-wider text-2xl mt-6 px-8">
                    Effortlessly manage and approve video drafts with VidManager
                </h3>
                <div className="flex justify-between mt-14">
                    {user.type === "Owner" ?
                        <Link to="/managers">
                            <Button variant='secondary' className="px-10 mr-4">
                                Hire Managers
                            </Button>
                        </Link> : null}
                    {user.type === "MAnager" ?
                        <Link to="/channels">
                            <Button variant='secondary' className="px-10">
                                Manage Channels
                            </Button>
                        </Link> : null}

                    <a href="#knowmore">
                        <Button variant='default' className="px-8 ml-4">
                            Know More
                        </Button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default HeroSection