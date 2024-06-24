import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";
import Auth from "../api/Auth";
import {toast} from "react-toastify";
import ButtonPrimary from "../components/button/buttonPrimery.jsx";
import {useState} from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
    // const {register, handleSubmit} = useForm();
    const initialValues ={
        userName:'',
        password:''
    }
    const validationSchema =Yup.object().shape({
        userName:Yup.string().required("userName is required"),
        password:Yup.string().required()
    })
    const form = useFormik({
        initialValues:initialValues,
        validationSchema:validationSchema,
        onSubmit:() => {
        }
    })
    const navigate = useNavigate();
    const [isPanding, setIsPanding] = useState(false);
    let [, saveIsAccess] = useLocalStorage("token");
    //   console.log("isAccess l", isAccess);
    const onSubmit = () => {
        // if (data.userName === "admin" && data.password === "1823648364") {
        //   saveIsAccess("true");
        //   navigate("/");
        // }

    setIsPanding(true)
        try {
            toast.loading('pending ...')
            Auth.login({
                username: form.values.userName,
                password: form.values.password
            }).then((res) => {
                if (res.data.access_token) {
                    setIsPanding(false)
                    saveIsAccess(res.data.access_token);
                    navigate("/");
                    toast.dismiss()
                }else {
                    toast.error(res.data)
                }
            })
        } catch (error) {
            console.log("error")
        }

    };
    return (

        <div className={"h-screen "}>
            <div className={"h-[10vh] flex items-center justify-center"}>
                <img src={"/image/login/IRIS.svg"} alt="iris" />
            </div>
            <div className="w-full h-[90vh] flex items-center text-[#2E2E2E]   justify-center">
                <img src={"image/Rectangle 34625016.svg"}/>
                <div
                    className="w-fit px-10 py-5 gap-5  flex flex-col"
                    // onSubmit={form.submitForm()}
                >
                    <h1 className={" font-medium text-2xl pb-10"}>Welcome Back</h1>
                    <div className="grid">
                        <label className="flex mb-2 text-xl font-medium" htmlFor="userName">User Name:</label>
                        <input
                            {...form.getFieldProps('userName')}
                            id="userName"
                            className={`w-64 pl-3 py-2 border-b ${form.errors.userName ? 'border border-red-500' : ''}`}
                            type="text"
                        />
                        {
                            form.errors.userName &&
                            <div className="text-sm mt-2 text-red-500">{form.errors.userName}</div>
                        }
                    </div>
                    <div className="grid">
                        <label className="flex mb-2 text-xl font-medium" htmlFor="password">Password:</label>
                        <input
                            id="password"
                            className={`w-64 pl-3 py-2 border-b ${form.errors.password ? 'border border-red-500' : ''}`}
                            {...form.getFieldProps('password')}
                            type="password"
                        />
                        {
                            form.errors.password &&
                            <div className="text-sm mt-2 text-red-500">{form.errors.password}</div>
                        }
                    </div>
                    <ButtonPrimary onClickHandler={() => {
                        onSubmit()
                    }} disabled={!form.isValid}>LOG IN</ButtonPrimary>
                    <p className="  text-sm font-normal">
                        Don’t have an account?
                        <Link to="/signup"> Sign up</Link>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Login;
