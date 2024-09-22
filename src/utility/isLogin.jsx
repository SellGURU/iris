/* eslint-disable react-hooks/rules-of-hooks */
import {useLocalStorage} from "@uidotdev/usehooks";
import {Navigate} from "react-router-dom";
import {toast} from "react-toastify";
import {useState} from "react";
import { useSearchParams } from "react-router-dom";
import Package from "../api/package";

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
    // let response = true;
    if(access!==undefined && access!==null) {
        Package.getPackages().then(res => {
            console.log(res)
            if(res.data.status == '403'){
                return false
            }else {
                return true
            }
        })
    }
    else {
        return false
    }

}