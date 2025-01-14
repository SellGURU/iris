import {Link, useNavigate} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";
import Auth from "../api/Auth";
// import {toast} from "react-toastify";
import {BeatLoader} from 'react-spinners'
import ButtonPrimary from "../components/button/buttonPrimery.jsx";
import {useEffect, useRef, useState} from "react";
import {useFormik} from 'formik';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {setUserName} from "../store/PatientInformationStore.js";
import { Button } from "symphony-ui";
import VerificationInput from "react-verification-input";
import { useSearchParams } from "react-router-dom";
import {encryptTextResolver} from '../help.js';
import { publish } from "../utility/event";
const Forget = () => {
    const passwordRef = useRef(null);
    const [step,setStep] = useState(0)
    // const {register, handleSubmit} = useForm();
    const initialValues = {
        email: '',
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('E-mail address is required.').email('E-mail address is not valid.'),
    })
    let [searchParams] = useSearchParams();
    const form = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: () => {
        }
    })
    const form2 = useFormik({
        initialValues: {
            Confirmpassword:"",
            NewPassword:""
        },
        validationSchema: Yup.object().shape({
            NewPassword:   Yup.string().required('New password is required.').min(6,'New password must be at least 6 characters.').max(15),
            Confirmpassword:Yup
        .string()
        .oneOf([Yup.ref('NewPassword')], 'Passwords must match'),
        }),
        onSubmit: () => {
        }
    })  
    const [resolvedHight,setResolvedHight] = useState('80vh')
    const resolveHightImage = () => {
        if(document.getElementById("contentBox")){
        setResolvedHight(document.getElementById("contentBox").offsetHeight * 1.2)
        }else {
        setResolvedHight("80vh")
        }
    }  
    useEffect(() => {
        resolveHightImage()
    })
    addEventListener("resize", (event) => {
    resolveHightImage()
    });
    useEffect(() => {
        if(searchParams.get("token")){
            setStep(2)
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
            // toast.loading('pending ...')
            Auth.login({
                username: encryptTextResolver(form.values.userName),
                password: encryptTextResolver(form.values.password)
            }).then((res) => {
                // console.log(res)
                if (res.data.access_token) {
                    setIsPanding(false)
                    saveIsAccess(res.data.access_token);
                    dispatch(setUserName("amin"))
                    // toast.dismiss()
                    navigate("/");
                } else {
                    console.log("res")
                    // toast.error(res.data)
                }

            }).catch((err) => {
                // toast.dismiss()
                // console.log(err.response.data)
                form.setFieldError("password",'The password is incorrect.')
                // toast.error(err.response.data.detail)
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
    const [HidePass2, setHidePass2] = useState(false)
    const resolveStep =() => {
        return (
            <>
            {
                step ==0 && 
                <div
                    id="contentBox"
                    className="w-fit animate-comeFromLeft px-10 py-5 gap-5  flex flex-col"
                    // onSubmit={form.submitForm()}
                >
                    <h1 className={" font-medium text-2xl pb-2"}>Forgot Password</h1>
                    <div className="text-[#444444] text-[14px] mb-[60px] w-[330px]">Please enter your registered email address. We will send you a link to reset your password.</div>
                    <div className="grid mb-[60px] w-[330px]">
                        <label
                            className="flex mb-2 text-[16px] font-medium" htmlFor="email">E-mail Address:</label>
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
                                className={`w-full pl-5 text-[14px] fill-none outline-none py-2 border-b ${form.errors.userName ? 'border-b border-red-500' : ''}`}
                                type="text"
                                placeholder="Your E-mail Address"
                            />

                        </div>
                        {
                            form.errors.email &&
                            <div className="text-[12px] mt-2 text-red-500">{form.errors.email}</div>
                        }
                    </div> 
                    <Button onClick={() => {
                        // onSubmit()
                        // setStep(2)
                        setIsPanding(true)
                        Auth.forgetpass({
                            email:encryptTextResolver(form.values.email)
                        }).then(() => {
                            // toast.info(res.data.msg)
                            publish("isNotif",{data:{
                                message:'Password reset link has been sent to mail',
                                type:'success'
                            }})
                            // publish("haveError",{data:'Password reset link has been sent to mail'})
                        }).catch(() => {
                            setIsPanding(false)
                        })
                    }} theme="iris-large" disabled={!form.isValid}>
                        <div className="flex justify-center w-full">
                        {isPanding ?
                            <BeatLoader size={10} color="white"></BeatLoader>
                        :
                            'Send Link'
                        }
                        </div>
                    </Button>
                    {/* <ButtonPrimary className="h-[52px] mt-[50px] rounded-[12px]" onClickHandler={() => {
                        onSubmit()
                    }} disabled={!form.isValid}>Log In</ButtonPrimary> */}
                    <p className="  text-[12px] font-normal">
                        Don’t have an account?
                        <Link to="/register" className="text-primary-color"> Sign up</Link>
                    </p>
                </div>                 
            }
            {
                step == 1 &&
                <div className="w-fit px-10 py-5 gap-5  flex flex-col">
                    <h1 className={" font-medium text-2xl "}>Forgot Password</h1>
                    <div className="text-[#444444] flex items-center text-[14px] mb-[8px] w-[330px]">We sent a code to <span className="font-medium ml-1"> info@gmail.com</span> <span className="ml-4 flex items-center cursor-pointer"><img src="./image/edit-2.svg" alt="" /> <span className="text-primary-color ml-2 ">Edit</span></span></div>
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
                                    placeholder="Enter new password"
                                    id="NewPassword"
                                    className={`w-full outline-none pl-5 pr-7 py-2 border-b ${form2.errors.NewPassword ? 'border-b border-red-500' : ''}`}
                                    {...form2.getFieldProps('NewPassword')}
                                    type={!HidePass ? "password" : 'text'}
                                />
                                <img onClick={() => {
                                    setHidePass(!HidePass)
                                }} className="absolute cursor-pointer bottom-3 right-1"
                                    src={!HidePass ? "./eye.svg" : './eye-slash.svg'}/>

                            </div>
                            {
                                form2.errors.NewPassword &&
                                <div className="text-sm mt-2 text-red-500">{form2.errors.NewPassword}</div>
                            }
                        </div>
                        <div className="grid relative mt-[60px] mb-[60px] w-[330px]">
                            <label className="flex mb-2 text-xl font-medium" htmlFor="Confirmpassword">Confirm New Password:</label>
                            <div className="relative">
                                {/* {
                                    form.values.password.length == 0?
                                        <img className="absolute cursor-pointer bottom-3 left-1" src='./lock.svg' alt="" />
                                    :undefined
                                } */}

                                <input
                                    placeholder="Confirm password"
                                    id="Confirmpassword"
                                    className={`w-full outline-none pl-5 pr-7 py-2 border-b ${form2.errors.Confirmpassword ? 'border-b border-red-500' : ''}`}
                                    {...form2.getFieldProps('Confirmpassword')}
                                    type={!HidePass2 ? "password" : 'text'}
                                />
                                <img onClick={() => {
                                    setHidePass2(!HidePass2)
                                }} className="absolute cursor-pointer bottom-3 right-1"
                                    src={!HidePass2 ? "./eye.svg" : './eye-slash.svg'}/>

                            </div>
                            {
                                form2.errors.Confirmpassword &&
                                <div className="text-sm mt-2 text-red-500">{form2.errors.Confirmpassword}</div>
                            }
                        </div>                        
                        {/* <div className="text-[#444444] mt-[16px]  flex items-center text-[14px] mb-[60px] w-[330px]">Don’t recieve an E-mail? <span className="text-primary-color ml-2"> Click here</span></div> */}
                        <Button onClick={() => {
                            Auth.updatePassword({
                                resetPassToken:searchParams.get("token"),
                                new_password:encryptTextResolver(form2.values.NewPassword),
                                new_cpassword:encryptTextResolver(form2.values.Confirmpassword)
                            }).finally(() => {
                                navigate('/')
                            })
                        }}  disabled={!form2.isValid || !form2.touched.NewPassword} theme="iris-large">
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

        <div className={"h-[100svh] w-full fixed overflow-hidden  "}>
            <div className={"h-[100px]  flex items-center justify-between px-10"}>
                <img className={" w-auto h-auto h-h"} src={"/image/login/IRIS.svg"} alt="iris"/>
                <ButtonPrimary className={'invisible'}>Account</ButtonPrimary>
            </div>
            <div className="w-full h-[75vh] flex items-center text-[#2E2E2E]   justify-center">
                {/* <img
                className={"h-[50vh] hidden xl:block xl:h-[60vh] 2xl:h-[80vh]"}
                src={"image/login-pic.png"}
                /> */}
                <img className=" hidden md:block  " src={"./image/login-pic.png"} style={{height:resolvedHight}} />                 
                {resolveStep()}
            </div>

        </div>
    );
};

export default Forget;
