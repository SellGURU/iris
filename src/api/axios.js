import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use((response) => {
    if(response.status === 200) {
         toast.dismiss()
    } 
    if(response.data.detail){
       toast.error(response.data.detail) 
    }
    return response;
}, (error) => {
    // console.log(error)
    toast.error(error.response.data.detail) 
    if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
    }
    return Promise.reject(error.message);
});