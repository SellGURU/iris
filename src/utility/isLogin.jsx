/* eslint-disable react-hooks/rules-of-hooks */
import {useLocalStorage} from "@uidotdev/usehooks";
import {Navigate} from "react-router-dom";
import {toast} from "react-toastify";
import { useSearchParams } from "react-router-dom";
import Package from "../api/package";
import {PatientContext} from '../context/context.jsx'
import { useContext } from "react";
import Package2 from "../model/Package.js";

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
    const Appcontext = useContext(PatientContext)
    const [access,] = useLocalStorage("token")
    console.log(access)
    if(access == undefined){
        return true
    }
    // let response = true;
    if(access!==undefined && access!==null) {
        Package.getPackages().then(res => {
            console.log(res)
            if(res.data.length>0) {
                let newPak = new Package2({
                    name:'No available package',
                    cycle:'Yearly',
                    cost:0,
                    useage:res.data[0].sdiscount,
                    bundle:res.data[0].allowed_scans,
                    discount:0,
                    options:[]                           
                })
                console.log(newPak)
                Appcontext.package.updatePackage(newPak)               
            }
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