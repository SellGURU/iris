import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";
import Auth from "../api/Auth";
import {toast} from "react-toastify";
import ButtonPrimary from "../components/button/buttonPrimery.jsx";
import {useState} from "react";

const Login = () => {
    const {register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const [isPanding, setIsPanding] = useState(false);
    let [, saveIsAccess] = useLocalStorage("token");
    //   console.log("isAccess l", isAccess);
    const onSubmit = (data) => {
        // if (data.userName === "admin" && data.password === "1823648364") {
        //   saveIsAccess("true");
        //   navigate("/");
        // }

    setIsPanding(true)
        try {
            Auth.login({
                username: data.userName,
                password: data.password
            }).then((res) => {
                if (res.data.access_token) {
                    setIsPanding(false)
                    saveIsAccess(res.data.access_token);
                    navigate("/facecamera");

                }
            })
        } catch (error) {
            console.log("error")
        }

    };
    return (
        <div className="w-full h-screen flex items-center text-[#2E2E2E] justify-center">
            <img src={"image/Rectangle 34625016.svg"}/>
            <form
                action=""
                className="w-fit px-10 py-5 gap-5  flex flex-col"
                onSubmit={handleSubmit(onSubmit)}
            >
                <h1 className={" font-medium text-2xl pb-10"}>Welcome Back</h1>
                <div className="grid">
                    <label className="flex mb-2 text-xl font-medium" htmlFor="userName">User Name:</label>
                    <input
                        id="userName"
                        className="w-64 pl-3 py-2 border-b"
                        {...register("userName")}
                        type="text"
                    />
                </div>
                <div className="grid">
                    <label className="flex mb-2 text-xl font-medium" htmlFor="password">Password:</label>
                    <input
                        id="password"
                        className="w-64 pl-3 py-2  border-b"
                        {...register("password")}
                        type="password"
                    />
                </div>
                <ButtonPrimary disabled={isPanding}>LOG IN</ButtonPrimary>
                <p className="  text-sm font-normal">
                    Don’t have an account?
                    <Link to="/signup"> Sign up</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
