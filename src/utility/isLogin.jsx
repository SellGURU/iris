import {useLocalStorage} from "@uidotdev/usehooks";
import {Navigate, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useState} from "react";

export const IsLogin = ({children}) => {
    const navigate = useNavigate();
    const validToken = checkValidToken()
    console.log(validToken)
    if (validToken) {
        return (
            <Navigate to={"/login"}/>
        )
    }
    return (
        <>{children}</>
    )
}
const checkValidToken = () => {
    const [access,] = useLocalStorage("token")
    const [isPanding, setIsPanding] = useState(true)
    const [status, setStatus] = useState(true)
    const xhr = new XMLHttpRequest();
    let response = true;
    xhr.open('POST', 'https://iris.ainexus.com/api/v1/analyze', true);

    xhr.onload = function (e) {
        if (xhr.status === 401) {
            setStatus(xhr.status)
            setIsPanding(false)
        } else {
            // console.error('okey', xhr.status);
            setIsPanding(false)

        }
    };

    xhr.onerror = function () {
        console.error('Request failed');
    };

    let fileData = new FormData();
    fileData.append('error_threshold', 10);
    fileData.append('gender', 'masculine');
    fileData.append('frontal_current', "");
    xhr.setRequestHeader('Authorization', 'Bearer ' + access);
    xhr.send(fileData);
    // TODO: fix the Condition
    if (!isPanding) {
        console.log(status)
        return (status === 401 || status === 403)
    }

}