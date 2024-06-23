import {useLocalStorage} from "@uidotdev/usehooks";
import {Navigate, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useState} from "react";

export const IsLogin = ({children}) => {
    const navigate = useNavigate();
    const validToken =checkValidToken()
    if (!validToken) {
        return (
            <Navigate to={"/login"}/>
        )
    }
    return (
        <>{children}</>
    )
}
const checkValidToken=()=>{
    const [access,] = useLocalStorage("token")

    const xhr = new XMLHttpRequest();
        let response=true
        xhr.open('POST','https://iris.ainexus.com/api/v1/analyze', true);
        xhr.onload = function (e) {
            // console.log(e)
             response=JSON.parse(e.target.status)
        }
        let fileData = new FormData();
        fileData.append('error_threshold', 10);
        fileData.append('gender', 'masculine');
        fileData.append('frontal_current', "");
        xhr.setRequestHeader('Authorization', 'Bearer ' +access)
        xhr.send(fileData);
        return response

}