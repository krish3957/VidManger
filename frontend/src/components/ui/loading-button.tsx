import { LoaderIcon } from "lucide-react"
import { Button, ButtonProps } from "./button"

type LoadingButtonProps = {
    loading: boolean,
    onclick: () => void
} & ButtonProps

const LoadingButton = ({
    children,
    loading,
    onclick,
    ...props
}: LoadingButtonProps) => {
    return (
        <Button disabled={props.disabled || loading} onClick={onclick}>
            {loading && <LoaderIcon className="animate-spin" />}
            {children}
        </Button>
    )
}

export default LoadingButton