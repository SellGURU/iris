import {useForm} from "react-hook-form";
// import { redirect, useNavigate } from "react-router-dom";
// import { useLocalStorage } from "@uidotdev/usehooks";

const Login = () => {
    const {register, handleSubmit} = useForm();
//   const navigate = useNavigate();
//   let [isAccess, saveIsAccess] = useLocalStorage("access");
    //   console.log("isAccess l", isAccess);
    const onSubmit = () => {
        // alert("submit")
        // if (data.userName === "admin" && data.password === "1823648364") {
        //   saveIsAccess("true");
        //   navigate("/");
        // }
        let xhr = new XMLHttpRequest();
        xhr.open('POST', `https://auth.ainexushealthcare.com/login?response_type=code&client_id=1fba1srau9r2g033nu03kjv3c&redirect_uri=https://iris.ainexus.com/v1/token`, true);
        xhr.onerror = function () {
            alert(xhr.responseText);
        }
        xhr.onload = function (e) {
            alert(e)
        };
        let fileData = new FormData();
        fileData.append('_csrf', 'a95badce-2f31-458f-ab0a-82df889d8abb');
        fileData.append('username', 'kargar.codie');
        fileData.append('password', 'Aa@12345');
        fileData.append('cognitoAsfData', `eyJwYXlsb2FkIjoie1wiY29udGV4dERhdGFcIjp7XCJVc2VyQWdlbnRcIjpcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMjUuMC4wLjAgU2FmYXJpLzUzNy4zNlwiLFwiRGV2aWNlSWRcIjpcInZjcjZpYjc0YmVxMXNhczZvejlsOjE3MTc0MTg3NDE5ODNcIixcIkRldmljZUxhbmd1YWdlXCI6XCJlbi1VU1wiLFwiRGV2aWNlRmluZ2VycHJpbnRcIjpcIk1vemlsbGEvNS4wIChXaW5kb3dzIE5UIDEwLjA7IFdpbjY0OyB4NjQpIEFwcGxlV2ViS2l0LzUzNy4zNiAoS0hUTUwsIGxpa2UgR2Vja28pIENocm9tZS8xMjUuMC4wLjAgU2FmYXJpLzUzNy4zNlBERiBWaWV3ZXI6Q2hyb21lIFBERiBWaWV3ZXI6Q2hyb21pdW0gUERGIFZpZXdlcjpNaWNyb3NvZnQgRWRnZSBQREYgVmlld2VyOldlYktpdCBidWlsdC1pbiBQREY6ZW4tVVNcIixcIkRldmljZVBsYXRmb3JtXCI6XCJXaW4zMlwiLFwiQ2xpZW50VGltZXpvbmVcIjpcIi41OjMwXCJ9LFwidXNlcm5hbWVcIjpcImthcmdhci5jb2RpZVwiLFwidXNlclBvb2xJZFwiOlwiXCIsXCJ0aW1lc3RhbXBcIjpcIjE3MTgxMjAxMzU5MTFcIn0iLCJzaWduYXR1cmUiOiJBK1dQNEw4NXR1UmU2UU9qU2Uxakd3WWNENE5mbnd3eEx1RURZME8rZjlRPSIsInZlcnNpb24iOiJKUzIwMTcxMTE1In0%3D`);
        xhr.send(fileData);
    };
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <form
                action=""
                className="w-fit px-10 py-5 bg-slate-500 gap-5 rounded-xl border flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <input
                    className="w-64 pl-3 py-2 rounded-md border"
                    {...register("userName")}
                    type="text"
                />
                <input
                    className="w-64 pl-3 py-2 rounded-md border"
                    {...register("password")}
                    type="password"
                />
                <button
                    type="submit"
                    className="py-2 px-4 text-white  rounded-lg bg-green-500"
                >
                    login
                </button>
            </form>
        </div>
    )
}

export default Login