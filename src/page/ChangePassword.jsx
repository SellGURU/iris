import { Button } from "symphony-ui";
import * as Yup from 'yup';
import {useFormik} from 'formik';
import {Link, useNavigate} from "react-router-dom";
import { useState } from "react";
import Auth from "../api/Auth";
import { useLocalStorage } from "@uidotdev/usehooks";

const ChangePassword = () => {
    const initialValues = {
        CurrentPassword: '',
        NewPassword:'',
        confirmPassword:''
    }
    const validationSchema = Yup.object().shape({
        CurrentPassword: Yup.string().required('This Current Password is reguired.').min(6,'Current password must be at least 6 characters.').max(15),
        NewPassword: Yup.string().required('New password is required.').min(6,'New password must be at least 6 characters.').max(15),
        confirmPassword: Yup
        .string()
        .oneOf([Yup.ref('NewPassword')], 'Passwords must match'),
    })
    const form = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: () => {
        }
    })    
    const navigate = useNavigate()
    const [orgs,] = useLocalStorage("orgData")    
    const submit = () => {
        Auth.changePassword({
            orgscode: JSON.parse(orgs).orgSCode,
            email:JSON.parse(orgs).orgEmail,
            current_password: form.values.CurrentPassword,
            new_password: form.values.NewPassword,
            new_cpassword: form.values.confirmPassword           
        }).then(res => {
            if(res.data.status == 'fail'){
                alert(res.data.msg)
            }else{
                navigate('/login')

            }
        })
    }
    const [HidePass, setHidePass] = useState(false)
    const [HidePass2, setHidePass2] = useState(false)
    const [HidePass3, setHidePass3] = useState(false)
    return (
        <>
        <div className={" "}>
            <div className={"h-[100px]  flex items-center justify-between px-10"}>
                <img className={" w-auto h-auto h-h"} src={"/image/login/IRIS.svg"} alt="iris"/>
                {/* <ButtonPrimary className={'invisible'}>Account</ButtonPrimary> */}
            </div>
            <div className="w-full h-[75vh] flex items-center text-[#2E2E2E]   justify-center">
                <img className={"hidden md:block h-[500px] 2xl:h-[630px]"} src={"image/login-pic.png"}/>
                    <div className="w-fit px-10 py-5 gap-5  flex flex-col">
                        <h1 className={" font-medium text-2xl "}>Change Password</h1>
                        <div className="text-[#444444] whitespace-pre-line flex items-center text-[14px] mb-[40px] w-[330px]">
                            You can set a new password.
                            <br></br>
                            The password must be at least 8 character.</div>
                        <div>
                            <div className="grid relative w-[330px]">
                                <label className="flex mb-2 text-xl font-medium" htmlFor="CurrentPassword">Current Password:</label>
                                <div className="relative">
                                    {/* {
                                        form.values.password.length == 0?
                                            <img className="absolute cursor-pointer bottom-3 left-1" src='./lock.svg' alt="" />
                                        :undefined
                                    } */}

                                    <input
                                        placeholder="Enter current password"
                                        id="CurrentPassword"
                                        className={`w-full outline-none pl-5 pr-7 py-2 border-b ${form.errors.CurrentPassword ? 'border-b border-red-500' : ''}`}
                                        {...form.getFieldProps('CurrentPassword')}
                                        type={!HidePass ? "password" : 'text'}
                                    />
                                    <img onClick={() => {
                                        setHidePass(!HidePass)
                                    }} className="absolute cursor-pointer bottom-3 right-1"
                                        src={!HidePass ? "./eye.svg" : './eye-slash.svg'}/>

                                </div>
                                {
                                    form.errors.CurrentPassword &&
                                    <div className="text-sm mt-2 text-red-500">{form.errors.CurrentPassword}</div>
                                }
                            </div>                    
                            <div className="grid relative mt-[40px] w-[330px]">
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
                                        className={`w-full outline-none pl-5 pr-7 py-2 border-b ${form.errors.NewPassword ? 'border-b border-red-500' : ''}`}
                                        {...form.getFieldProps('NewPassword')}
                                        type={!HidePass2 ? "password" : 'text'}
                                    />
                                    <img onClick={() => {
                                        setHidePass2(!HidePass2)
                                    }} className="absolute cursor-pointer bottom-3 right-1"
                                        src={!HidePass2 ? "./eye.svg" : './eye-slash.svg'}/>

                                </div>
                                {
                                    form.errors.NewPassword &&
                                    <div className="text-sm mt-2 text-red-500">{form.errors.NewPassword}</div>
                                }
                            </div>
                            <div className="grid relative mt-[40px] mb-[60px] w-[330px]">
                                <label className="flex mb-2 text-xl font-medium" htmlFor="confirmPassword">Confirm New Password:</label>
                                <div className="relative">
                                    {/* {
                                        form.values.password.length == 0?
                                            <img className="absolute cursor-pointer bottom-3 left-1" src='./lock.svg' alt="" />
                                        :undefined
                                    } */}

                                    <input
                                        placeholder="Confirm password"
                                        id="confirmPassword"
                                        className={`w-full outline-none pl-5 pr-7 py-2 border-b ${form.errors.Confirmpassword ? 'border-b border-red-500' : ''}`}
                                        {...form.getFieldProps('confirmPassword')}
                                        type={!HidePass3 ? "password" : 'text'}
                                    />
                                    <img onClick={() => {
                                        setHidePass3(!HidePass3)
                                    }} className="absolute cursor-pointer bottom-3 right-1"
                                        src={!HidePass3 ? "./eye.svg" : './eye-slash.svg'}/>

                                </div>
                                {
                                    form.errors.confirmPassword &&
                                    <div className="text-sm mt-2 text-red-500">{form.errors.confirmPassword}</div>
                                }
                            </div>                        
                            {/* <div className="text-[#444444] mt-[16px]  flex items-center text-[14px] mb-[60px] w-[330px]">Don’t recieve an E-mail? <span className="text-primary-color ml-2"> Click here</span></div> */}
                            <div className="flex items-center gap-2 justify-between">
                                <Button onClick={() => {
                                    navigate('/')
                                }} theme="iris-tertiary-large">
                                    <img className="w-[24px] mr-2" src="./arrow-left.svg" alt="" />
                                    Back
                                </Button>
                                <Button onClick={() =>{submit()}} disabled={!form.isValid || form.values.NewPassword == '' || form.values.CurrentPassword == '' || form.values.confirmPassword == ''} theme="iris-large">
                                    <div className="w-full">
                                        Change Password

                                    </div>
                                </Button>
                            </div>

                            {/* <p className="text-sm mt-4 font-normal">
                                Don’t have an account?
                                <Link to="/register" className="text-primary-color"> Sign up</Link>
                            </p>                         */}
                        </div>
                    </div>    
            </div>

        </div>        
        
        </>
    )
}

export default ChangePassword