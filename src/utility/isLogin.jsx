/* eslint-disable react-hooks/rules-of-hooks */
import {useLocalStorage} from "@uidotdev/usehooks";
import {Navigate} from "react-router-dom";
import {toast} from "react-toastify";
import { useSearchParams } from "react-router-dom";
import Package from "../api/package";
import {PatientContext} from '../context/context.jsx'
import { useContext, useEffect } from "react";
import Package2 from "../model/Package.js";
import {encryptTextResolver} from '../help.js'
import { publish } from "./event.js";

export const IsLogin = ({children}) => {
    // const navigate = useNavigate();
    
    const validToken = checkValidToken()
    let [getEmail,] = useLocalStorage("email")
    const [searchParams,setSearchParams] = useSearchParams();
    const Appcontext = useContext(PatientContext)    
    const checkOrg =() => {
        Package.getIrisSub({
            email:encryptTextResolver(getEmail +""),
        }
        ).then(res => {
            // console.log(res)
            if(res.data.data.subs_data.length> 0){
                let newPak = new Package2({
                    name:'No available package',
                    cycle:'Yearly',
                    cost:0,
                    useage:res.data.data.subs_data[0].iscan_used,
                    bundle:res.data.data.subs_data[0].iscan_brought,
                    discount:0,
                    options:[]                           
                })
                    // console.log(newPak)
                Appcontext.package.updatePackage(newPak)
                publish("updatePackage")
            }            
        })    
    }
    useEffect(() => {
        const interval = setInterval(() => {
        checkOrg();
        }, 10000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []);
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
    if(access == undefined){
        return true
    }
    else {
        return false
    }
    // let response = true;

}