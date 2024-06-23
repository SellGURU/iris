import ButtonPrimary from "../components/button/buttonPrimery.jsx";
import {useNavigate} from "react-router-dom";

export const MainPage = () => {
    const navigate = useNavigate();
    return (
        <div className={"p-10"}>
            <ButtonPrimary onClickHandler={()=>navigate("/facecamera")}>Start FaceMash</ButtonPrimary>
        </div>
    )
}
