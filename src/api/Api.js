import axios from "axios";
// let apiConfig = {};
// async function loadConfig() {
//     const response = await fetch('config.json');
//     apiConfig = await response.json(); // Parse JSON data
// }

// Call `loadConfig` at the beginning of your app
// await loadConfig(); // Make sure this is done before API calls
class Api {
    static base_url = 'https://vercel-middleware-iris.vercel.app/iris' ;
    static post(url, data) {
        const response = axios.post(this.base_url + url, data, {
            headers: {
                Authorization: "Bearer "+localStorage.getItem("token")?.replace(`"`,'').replace(`"`,''),
            },
            // timeout:15000
        })

        return response;
}
}

export default Api