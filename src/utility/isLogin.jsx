/* eslint-disable react-hooks/rules-of-hooks */
import {useLocalStorage} from "@uidotdev/usehooks";
import {Navigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useState} from "react";
import { useSearchParams } from "react-router-dom";

export const IsLogin = ({children}) => {
    // const navigate = useNavigate();
    const validToken = checkValidToken()
    const [searchParams,setSearchParams] = useSearchParams();
    // console.log(validToken)
    if(searchParams.get("fcode") =='resetstaffpass'){
        return <Navigate to={"/forgetpass?token="+searchParams.get("token")}/>
    }
    if (validToken ) {
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
    console.log(access)
    if(access == undefined){
        return true
    }
    const [isPanding, setIsPanding] = useState(true)
    const [status, setStatus] = useState(true)
    const xhr = new XMLHttpRequest();
    let response = true;
    if(access!==undefined && access!==null) {
        try {
            xhr.open('POST', 'https://iris.ainexus.com/api/v1/analyze', true);

            xhr.onload = function (e) {
                if (xhr.status === 401 || xhr.status === 403) {
                    setStatus(xhr.status)
                    setIsPanding(false)
                } else {
                    // console.error('okey', xhr.status);
                    setIsPanding(false)

                }
            };

            xhr.onerror = function () {
                console.log('Request failed');
            };


            let fileData = new FormData();
            fileData.append('error_threshold', 10);
            fileData.append('gender', 'masculine');
            fileData.append('frontal_current', "");
            xhr.setRequestHeader('Authorization', 'Bearer ' + access);
            xhr.send(fileData);
            // TODO: fix the Condition
            if (!isPanding) {
                // console.log(status)
                return (status == 401 || status == 403);
            }
        } catch (e) {
            console.log("error")
        }
    }
    else {
        return false
    }

}