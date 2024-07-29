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
import VerificationInput from "react-verification-input";

const Forget = () => {
    const passwordRef = useRef(null);
    const [step,setStep] = useState(0)
    // const {register, handleSubmit} = useForm();
    const initialValues = {
        email: '',
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('This E-mail Address is reguired').email('This E-mail Address is not Valid.'),
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
    const resolveStep =() => {
        return (
            <>
            {
                step ==0 && 
                <div
                    className="w-fit animate-comeFromLeft px-10 py-5 gap-5  flex flex-col"
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
                        // setStep(2)
                        toast.info("Link send successfully")
                    }} theme="iris-large" disabled={!form.isValid || !form.touched.email}>
                        <div className="flex justify-center w-full">
                            Send Link
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
            }
            {
                step == 1 &&
                <div className="w-fit px-10 py-5 gap-5  flex flex-col">
                    <h1 className={" font-medium text-2xl "}>Forgot Password</h1>
                    <div className="text-[#444444] flex items-center text-[14px] mb-[8px] w-[330px]">We sent a code to <span className="font-medium ml-1"> info@gmail.com</span> <span className="ml-4 flex items-center cursor-pointer"><img src="./icons/edit-2.svg" alt="" /> <span className="text-primary-color ml-2 ">Edit</span></span></div>
                    <div className="text-[#444444] flex items-center text-[14px] mb-[16px] w-[330px]">The code expires in <span className=" font-medium ml-1">05 : 00</span></div>
                    <div>
                        <h1 className={" font-medium text-2xl pb-2"}>Enter the Code:</h1>
                        <VerificationInput 
                        length={4}
                        classNames={{
                            container: "container",
                            character: "character max-w-[55px] ",
                            characterInactive: "character--inactive ",
                            characterSelected: "character--selected border-none outline-none",
                            characterFilled: "character--filled text-[25px] ",
                        }}
                        ></VerificationInput>
                        <div className="text-[#444444] mt-[16px]  flex items-center text-[14px] mb-[60px] w-[330px]">Don’t recieve an E-mail? <span className="text-primary-color ml-2"> Click here</span></div>
                        <Button onClick={() => {
                            setStep(2)
                        }} theme="iris-large">
                            <div className="w-[280px]">
                                Verify Code

                            </div>
                        </Button>

                        <p className="text-sm mt-4 font-normal">
                            Don’t have an account?
                            <Link to="/register" className="text-primary-color"> Sign up</Link>
                        </p>                        
                    </div>
                </div>                
            }
            {
                step == 2 &&
                <div className="w-fit px-10 py-5 gap-5  flex flex-col">
                    <h1 className={" font-medium text-2xl "}>Change Password</h1>
                    <div className="text-[#444444] whitespace-pre-line flex items-center text-[14px] mb-[60px] w-[330px]">
                        You can set a new password.
                        <br></br>
                        The password must be at least 8 character.</div>
                    <div>
                        <div className="grid relative w-[330px]">
                            <label className="flex mb-2 text-xl font-medium" htmlFor="NewPassword">New Password:</label>
                            <div className="relative">
                                {/* {
                                    form.values.password.length == 0?
                                        <img className="absolute cursor-pointer bottom-3 left-1" src='./lock.svg' alt="" />
                                    :undefined
                                } */}

                                <input
                                    onKeyDown={handleKeyPressSubmitData}
                                    ref={passwordRef}
                                    placeholder="Enter new password"
                                    id="NewPassword"
                                    className={`w-full outline-none pl-5 pr-7 py-2 border-b ${form.errors.NewPassword ? 'border-b border-red-500' : ''}`}
                                    {...form.getFieldProps('NewPassword')}
                                    type={!HidePass ? "password" : 'text'}
                                />
                                <img onClick={() => {
                                    setHidePass(!HidePass)
                                }} className="absolute cursor-pointer bottom-3 right-1"
                                    src={!HidePass ? "./eye.svg" : './eye-slash.svg'}/>

                            </div>
                            {
                                form.errors.NewPassword &&
                                <div className="text-sm mt-2 text-red-500">{form.errors.NewPassword}</div>
                            }
                        </div>
                        <div className="grid relative mt-[60px] mb-[60px] w-[330px]">
                            <label className="flex mb-2 text-xl font-medium" htmlFor="password">Change Password:</label>
                            <div className="relative">
                                {/* {
                                    form.values.password.length == 0?
                                        <img className="absolute cursor-pointer bottom-3 left-1" src='./lock.svg' alt="" />
                                    :undefined
                                } */}

                                <input
                                    onKeyDown={handleKeyPressSubmitData}
                                    ref={passwordRef}
                                    placeholder="Confirm password"
                                    id="Confirmpassword"
                                    className={`w-full outline-none pl-5 pr-7 py-2 border-b ${form.errors.Confirmpassword ? 'border-b border-red-500' : ''}`}
                                    {...form.getFieldProps('Confirmpassword')}
                                    type={!HidePass ? "password" : 'text'}
                                />
                                <img onClick={() => {
                                    setHidePass(!HidePass)
                                }} className="absolute cursor-pointer bottom-3 right-1"
                                    src={!HidePass ? "./eye.svg" : './eye-slash.svg'}/>

                            </div>
                            {
                                form.errors.Confirmpassword &&
                                <div className="text-sm mt-2 text-red-500">{form.errors.Confirmpassword}</div>
                            }
                        </div>                        
                        {/* <div className="text-[#444444] mt-[16px]  flex items-center text-[14px] mb-[60px] w-[330px]">Don’t recieve an E-mail? <span className="text-primary-color ml-2"> Click here</span></div> */}
                        <Button disabled theme="iris-large">
                            <div className="w-[280px]">
                                Change Password

                            </div>
                        </Button>

                        <p className="text-sm mt-4 font-normal">
                            Don’t have an account?
                            <Link to="/register" className="text-primary-color"> Sign up</Link>
                        </p>                        
                    </div>
                </div>                    
            }
            </>
        )
    }
    return (

        <div className={" "}>
            <div className={"h-[100px]  flex items-center justify-between px-10"}>
                <img className={" w-auto h-auto h-h"} src={"/image/login/IRIS.svg"} alt="iris"/>
                <ButtonPrimary className={'invisible'}>Account</ButtonPrimary>
            </div>
            <div className="w-full h-[75vh] flex items-center text-[#2E2E2E]   justify-center">
                <img className={"hidden md:block h-[500px] 2xl:h-[630px]"} src={"image/login-pic.png"}/>
                {resolveStep()}
            </div>

        </div>
    );
};

export default Forget;
