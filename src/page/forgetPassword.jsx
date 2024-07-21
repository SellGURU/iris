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
import { Button } from "symphony-ui";

const Forget = () => {
    const passwordRef = useRef(null);

    // const {register, handleSubmit} = useForm();
    const initialValues = {
        userName: '',
    }
    const validationSchema = Yup.object().shape({
        userName: Yup.string().required("userName is required"),
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

        setIsPanding(true)
        try {
            toast.loading('pending ...')
            Auth.login({
                username: form.values.userName,
                password: form.values.password
            }).then((res) => {
                console.log(res)
                if (res.data.access_token) {
                    setIsPanding(false)
                    saveIsAccess(res.data.access_token);
                    dispatch(setUserName("amin"))
                    toast.dismiss()
                    navigate("/");
                } else {
                    console.log("res")
                    // toast.error(res.data)
                }

            }).catch((err) => {
                toast.dismiss()
                // console.log(err.response.data)
                form.setFieldError("password",'The password is incorrect.')
                toast.error(err.response.data.detail)
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
    const handleKeyPressSubmitData = (event) => {
        if (event.key === 'Enter') {
            onSubmit()
        }
    }
    const [HidePass, setHidePass] = useState(false)
    return (

        <div className={" "}>
            <div className={"h-[100px]  flex items-center justify-between px-10"}>
                <img className={" w-auto h-auto h-h"} src={"/image/login/IRIS.svg"} alt="iris"/>
                <ButtonPrimary className={'invisible'}>Account</ButtonPrimary>
            </div>
            <div className="w-full h-[75vh] flex items-center text-[#2E2E2E]   justify-center">
                <img className={"hidden md:block h-[500px] 2xl:h-[630px]"} src={"image/login-pic.png"}/>
                <div
                    className="w-fit px-10 py-5 gap-5  flex flex-col"
                    // onSubmit={form.submitForm()}
                >
                    <h1 className={" font-medium text-2xl pb-2"}>Forgot Password</h1>
                    <div className="text-[#444444] text-[14px] mb-[60px] w-[330px]">Enter the E-mail address asociated with your account and we’ll send you a code to reset your password.</div>
                    <div className="grid mb-[60px] w-[330px]">
                        <label
                            className="flex mb-2 text-xl font-medium" htmlFor="email">E-mail Address:</label>
                        <div className="relative">
                            {/* {
                                form.values.userName.length == 0?
                                    <img className="absolute cursor-pointer bottom-3 left-1" src='./sms.svg' alt="" />
                                :undefined
                            } */}
                            <input

                                onKeyDown={handleUsernameKeyPress}
                                {...form.getFieldProps('email')}
                                id="email"
                                className={`w-full pl-5 fill-none outline-none py-2 border-b ${form.errors.userName ? 'border-b border-red-500' : ''}`}
                                type="text"
                                placeholder="Your E-mail Address"
                            />

                        </div>
                        {
                            form.errors.email &&
                            <div className="text-sm mt-2 text-red-500">{form.errors.email}</div>
                        }
                    </div> 
                    <Button onClick={() => {
                        // onSubmit()
                    }} theme="iris-large" disabled={!form.isValid}>
                        <div className="flex justify-center w-full">
                            Send a Code
                        </div>
                    </Button>
                    {/* <ButtonPrimary className="h-[52px] mt-[50px] rounded-[12px]" onClickHandler={() => {
                        onSubmit()
                    }} disabled={!form.isValid}>Log In</ButtonPrimary> */}
                    <p className="  text-sm font-normal">
                        Don’t have an account?
                        <Link to="/register" className="text-primary-color"> Sign up</Link>
                    </p>
                </div>
            </div>

        </div>
    );
};

export default Forget;
