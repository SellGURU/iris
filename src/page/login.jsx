import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";
import Auth from "../api/Auth";
import {toast} from "react-toastify";
import ButtonPrimary from "../components/button/buttonPrimery.jsx";
import {useRef, useState} from "react";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {setUserName} from "../store/PatientInformationStore.js";
import * as res from "autoprefixer";

const Login = () => {
    const passwordRef = useRef(null);

    // const {register, handleSubmit} = useForm();
    const initialValues = {
        userName: '',
        password: ''
    }
    const validationSchema = Yup.object().shape({
        userName: Yup.string().required("userName is required"),
        password: Yup.string().required()
    })
    const form = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: () => {
        }
    })
    const dispatch = useDispatch();

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
                    dispatch(setUserName("amin"))
                    navigate("/");
                } else {
                    toast.error(res.data)
                }
                console.log("test dissime")
                toast.dismiss()

            }).catch((err) => {
                console.log("test catch 1")
                // toast.error(err.message)
                toast.dismiss()
            })
        } catch (error) {
            console.log("error1")
        }

    };
    const handleUsernameKeyPress = (event) => {
        if (event.key === 'Enter') {
            passwordRef.current.focus();
        }
    };
    const handleKeyPressSubmitData=(event)=>{
        if (event.key === 'Enter') {
            onSubmit()
        }
    }
    const [HidePass,setHidePass] = useState(false)
    return (

        <div className={"h-screen "}>
            <div className={"h-[10vh] flex items-center justify-between px-10"}>
                <img src={"/image/login/IRIS.svg"} alt="iris"/>
                <ButtonPrimary>Account</ButtonPrimary>
            </div>
            <div className="w-full h-[90vh] flex items-center text-[#2E2E2E]   justify-center">
                <img src={"image/login-pic.png"}/>
                <div
                    className="w-fit px-10 py-5 gap-5  flex flex-col"
                    // onSubmit={form.submitForm()}
                >
                    <h1 className={" font-medium text-2xl pb-10"}>Welcome Back</h1>
                    <div className="grid w-[330px]">
                        <label
                               className="flex mb-2 text-xl font-medium" htmlFor="userName">E-mail Address:</label>
                        <div className="relative">
                            {/* {
                                form.values.userName.length == 0?
                                    <img className="absolute cursor-pointer bottom-3 left-1" src='./sms.svg' alt="" />
                                :undefined
                            } */}
                            <input

                                onKeyDown={handleUsernameKeyPress}
                                {...form.getFieldProps('userName')}
                                id="userName"
                                className={`w-full pl-5 fill-none outline-none py-2 border-b ${form.errors.userName ? 'border-b border-red-500' : ''}`}
                                type="text"
                                placeholder="Your E-mail Address"
                            />

                        </div>
                        {
                            form.errors.userName &&
                            <div className="text-sm mt-2 text-red-500">{form.errors.userName}</div>
                        }
                    </div>
                    <div className="grid relative w-[330px]">
                        <label className="flex mb-2 text-xl font-medium" htmlFor="password">Password:</label>
                        <div className="relative">
                            {/* {
                                form.values.password.length == 0?
                                    <img className="absolute cursor-pointer bottom-3 left-1" src='./lock.svg' alt="" />
                                :undefined
                            } */}

                            <input
                                onKeyDown={handleKeyPressSubmitData}
                                ref={passwordRef}
                                placeholder="Your Password"
                                id="password"
                                className={`w-full outline-none pl-5 pr-7 py-2 border-b ${form.errors.password ? 'border-b border-red-500' : ''}`}
                                {...form.getFieldProps('password')}
                                type={!HidePass?"password":'text'}
                            />
                            <img onClick={() => {
                                setHidePass(!HidePass)
                            }} className="absolute cursor-pointer bottom-3 right-1" src={!HidePass?"./eye.svg":'./eye-slash.svg'} />

                        </div>
                        {
                            form.errors.password &&
                            <div className="text-sm mt-2 text-red-500">{form.errors.password}</div>
                        }
                    </div>
                    <div className="w-full justify-between">
                        <div className="flex justify-start items-center">
                            <input id="rememberMeBox" type="checkbox" />
                            <label htmlFor="rememberMeBox" className="ml-2 cursor-pointer text-sm text-[#444444]">Remember me</label>
                        </div>
                    </div>
                    <ButtonPrimary className="h-[52px] mt-[50px] rounded-[12px]" onClickHandler={() => {
                        onSubmit()
                    }} disabled={!form.isValid}>Log In</ButtonPrimary>
                    <p className="  text-sm font-normal">
                        Don’t have an account?
                        <Link to="/login"> Sign up</Link>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Login;
