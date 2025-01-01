import axios from "axios";
// import { toast } from "react-toastify";
import { publish } from "../utility/event";

const removeToken =() => {
    localStorage.removeItem("token")
    localStorage.removeItem("partyid")
    localStorage.removeItem("email")
    localStorage.removeItem("password")
    localStorage.removeItem("orgData")
    localStorage.removeItem("patients")
    localStorage.removeItem("package")
    localStorage.removeItem("tour")
    window.location.reload(); 
}

axios.interceptors.response.use((response) => {
    if(response.data.token){
        return response
    }
    if(response.data.error == 'No user found with the provided token.'){
        removeToken()
    }
    if(response.data.status == '403'){
        removeToken()
    }    
    if(response.status == '403') {
        removeToken()
    }
    if(response?.data?.detail?.error == '403_Forbidden'){
        // console.log("invalid token")
        removeToken()
    }
    return response;
}, (error) => {
    if(error.response.status ==403 ){
        removeToken()
    }    
    // console.log(error)
    if(error.response.data.detail && error.response.status !=406 ){
        if (error.response.data.detail && error.response.data.detail.toLowerCase().includes("successfully")) {
            // toast.success(error.response.data.detail)
        }else {
            publish("isNotif",{data:{
                message:error.response.data.detail,
                type:'error'
            }})
            // toast.error(error.response.data.detail) 
        }
    }    
    if (error.response.status && error.response.data) {
        return Promise.reject(error.response);
    }
    return Promise.reject(error.response);
});