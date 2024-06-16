import {useLocalStorage} from "@uidotdev/usehooks";
import {Navigate, useNavigate} from "react-router-dom";

export const IsLogin = ({children}) => {
    const navigate = useNavigate();

    const [access,] = useLocalStorage("token")
    console.log(!access)
    if (!access) {
        return (
            <Navigate to={"/login"}/>
        )
    }
    return (
        <>{children}</>
    )
}
