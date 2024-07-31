import axios from "axios";

class Api {
    static base_url = "https://vercel-middleware-iris.vercel.app/iris";
    static post(url, data) {
        const response = axios.post(this.base_url + url, data, {
            headers: {
                Authorization: "Bearer "+localStorage.getItem("token"),
            },
            // timeout:15000
        })

        return response;
}
}

export default Api