import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use((response) => {
    if(response.data.token){
        return response
    }
    if(response?.data?.detail?.error == '403_Forbidden'){
        // console.log("invalid token")
        localStorage.clear()
    }
    return response;
}, (error) => {
    // console.log(error)
    // toast.error(error.response?.data.detail) 
    // if (error.response && error.response?.data) {
    //     return Promise.reject(error.response?.data);
    // }
    return error
});