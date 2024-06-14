import {useLocalStorage} from "@uidotdev/usehooks";
import {useNavigate} from "react-router-dom";

export const IsLogin = ({children}) => {
    const navigate = useNavigate();

    const [access,] = useLocalStorage("token")
    if (!access) navigate("/login")
    return (
        <>{children}</>
    )
}
