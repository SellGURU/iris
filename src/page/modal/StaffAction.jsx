/* eslint-disable react/no-unknown-property */
import { TextField ,Button } from "symphony-ui"
import Select from "../../components/select"
import { useState } from "react"
import { useFormik } from "formik"
import * as Yup from "yup";
/* eslint-disable react/prop-types */
const StaffActionModal = ({title,onClose,onSubmit,role,type,changeEmail}) => {
    const inviteForm = useFormik({
        initialValues:{
            email:'',
            role:'Admin'
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required("email is required").email(),
        }),
        onSubmit:() =>{}
    })
    const [successed,setSuccessed] = useState(false)
    const resolveHight =() => {
        if(type == 'invite' && !successed){
            return '472px'
        }
        return '427px'
    }
    const revertRole = () => {
        if(role == 'Admin') {
            return 'User'
        }else {
            return 'Admin'
        }
    }
    const resolveTextRole = () => {
        if(role == 'Admin') {
            return 'she will gain additional access to your application'
        }else {
            return 'her access to your application will be limited'
        }
    }
    return (
        <>
             <div className="max-w-[796px] overflow-hidden relative w-full rounded-[8px] bg-white " style={{height:resolveHight()}}>
                <img className="absolute bottom-0 " src="./image/Rectangle.svg" alt="" />
                <div className="flex justify-center mt-[70px]">
                    <img className="w-[120px]" src="./image/iris.png" alt="" />
                </div>     
                {type == 'invite' ?
                <>
                    {successed ?
                    <>
                        <div className="text-primary-color flex justify-center mt-8 text-[24px]">{'The invitation has been sent.'}</div>
                        <div className="w-full flex justify-center mt-8">
                            <div className="text-[14px] text-[#444444] w-[404px] text-center">
                                Your  invitation  for the role of admin has been sent to <span className="text-primary-color">{inviteForm.values.email}</span>   successfully.After she accepts your invitation, you can update some information on your profile page.
                            </div>
                        </div>   
                        <div className="w-full flex justify-center mt-8 relative z-40">
                            <Button onClick={onClose} theme="iris">
                                <div className="w-[240px]">Got it</div>    
                            </Button>                     

                        </div>
                    </>
                    :
                    <>
                        <div className="text-primary-color flex justify-center mt-6 text-[24px]">{title}</div>
                        <div className="w-full flex justify-center mt-6">
                            <div className="text-[14px] text-[#444444] w-[384px] text-center">
                                Enjoy exclusive benefits together!
                                <div>
                                    Invitation links will be sent via email, allowing them to join and contribute to our success.
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-center mt-4 relative z-30 ">
                            <div className="w-[474px] gap-4 items-center flex justify-between">
                                <TextField name="email" {...inviteForm.getFieldProps("email")} errorMessage={inviteForm.errors.email}  theme="iris" type="email" placeholder="Enter E-mail Address" />
                                <Select disabled={inviteForm.values.email == ''} noteditAble options={['Admin','User']} value={inviteForm.values.role} onchange={(e) => {
                                    inviteForm.setFieldValue("role",e)
                                }}></Select>
                            </div>

                        </div>

                        <div className="flex mt-6 relative z-20 gap-2 justify-center w-full">
                            <Button onClick={onClose} theme="iris-secondary">
                                <img className="w-5 mr-1" src="./arrow-left.svg" alt="" />
                                Back
                            </Button>
                            <Button disabled={!inviteForm.isValid}   onClick={() => {
                                setSuccessed(true)
                            }} theme="iris">
                                <div className="mr-1">
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.0007 10.0013C12.3018 10.0013 14.1673 8.13582 14.1673 5.83464C14.1673 3.53345 12.3018 1.66797 10.0007 1.66797C7.69946 1.66797 5.83398 3.53345 5.83398 5.83464C5.83398 8.13582 7.69946 10.0013 10.0007 10.0013Z" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M2.8418 18.3333C2.8418 15.1083 6.05013 12.5 10.0001 12.5C10.8001 12.5 11.5751 12.6083 12.3001 12.8083" stroke="#FFFFFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M18.3327 15.0013C18.3327 15.268 18.2994 15.5263 18.2327 15.7763C18.1577 16.1096 18.0244 16.4346 17.8494 16.718C17.2744 17.6846 16.216 18.3346 14.9993 18.3346C14.141 18.3346 13.366 18.0096 12.7827 17.4763C12.5327 17.2596 12.316 17.0013 12.1493 16.718C11.841 16.218 11.666 15.6263 11.666 15.0013C11.666 14.1013 12.0244 13.2763 12.6077 12.6763C13.216 12.0513 14.066 11.668 14.9993 11.668C15.9827 11.668 16.8744 12.093 17.4744 12.7763C18.0077 13.368 18.3327 14.1513 18.3327 15.0013Z" stroke="#FFFFFF" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M16.2411 14.9805H13.7578" stroke="#FFFFFF" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    <path d="M15 13.7656V16.2573" stroke="#FFFFFF" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>                            
                                </div>
                            Invite member
                            </Button>
                        </div>                  
                    </>
                    }
                </>
                :undefined}    

                {type == 'remove' &&
                    <>
                        {successed ?
                            <>
                                <div className="text-primary-color font-medium flex justify-center mt-8 text-[24px]">{'Successfully removed!'}</div>
                                <div className="w-full flex justify-center mt-8">
                                    <div className="text-[14px] text-[#444444] w-[404px] text-center">
                                        This member does not have access to your application anymore, but you can always re-invite her if needed.
                                    </div>
                                </div>   
                                <div className="w-full flex justify-center mt-8 relative z-40">
                                    <Button onClick={onClose} theme="iris">
                                        <div className="w-[240px]">Got it</div>    
                                    </Button>                     

                                </div>                            
                            </>
                        :
                            <>
                                <div className="text-primary-color font-medium flex justify-center mt-6 text-[24px]">{'Remove Member'}</div>
                                <div className="w-full flex justify-center mt-6">
                                    <div className="text-[14px] text-[#444444] w-[384px] text-center">
                                        If you remove this member, she will no longer have access to your application. However, you can always re-invite her after removal if needed.
                                    </div>
                                </div>      

                                <div className="relative z-30">
                                    <div className="text-[16px] text-center mt-6 text-[#444444] font-medium">Are you sure you want to remove this member?</div>
                                </div>  
                                <div className="flex mt-6 relative z-20 gap-2 justify-center w-full">
                                    <Button onClick={onClose} theme="iris-secondary">
                                        <img className="w-5 mr-1" src="./arrow-left.svg" alt="" />
                                        Back
                                    </Button>
                                    <Button disabled={!inviteForm.isValid}   onClick={() => {
                                        setSuccessed(true)
                                    }} theme="iris">
                                        <img src="./icons/tickWite.svg" className="mr-1" alt="" />
                                    Confirm
                                    </Button>
                                </div>                                                         
                            </>
                        }
                    </>
                }    

                {type == 'changeRole' &&
                    <>
                        {successed ?
                            <>
                                <div className="text-primary-color font-medium flex justify-center mt-8 text-[24px]">{'Role changed successfully!'}</div>
                                <div className="w-full flex justify-center mt-8">
                                    <div className="text-[14px] text-[#444444] w-[404px] text-center">
                                        {role == 'user' ?
                                        <div>
                                            This member's access to your application has been limited, but you can always revert this action if necessary.
                                        </div>
                                        :
                                        <div>
                                            This member's access to your application has been increased, but you can always reverse this action if necessary.
                                        </div>
                                        }
                                    </div>
                                </div>   
                                <div className="w-full flex justify-center mt-8 relative z-40">
                                    <Button onClick={onSubmit} theme="iris">
                                        <div className="w-[240px]">Got it</div>    
                                    </Button>                     

                                </div>                            
                            </>
                        :
                            <>
                                <div className="text-primary-color font-medium flex justify-center mt-6 text-[24px]">{'Changing the role'}</div>
                                <div className="w-full flex justify-center mt-6">
                                    <div className="text-[14px] text-[#444444] w-[384px] text-center">
                                        {changeEmail} is a {revertRole()} in your clinic. By changing her role to {role}, {resolveTextRole()}, but you can easily revert this change if necessary.
                                    </div>
                                </div>      

                                <div className="relative z-30">
                                    <div className="text-[16px] text-center mt-6 text-[#444444] font-medium">Are you sure you want to change the role?</div>
                                </div>  
                                <div className="flex mt-6 relative z-20 gap-2 justify-center w-full">
                                    <Button onClick={onClose} theme="iris-secondary">
                                        <img className="w-5 mr-1" src="./arrow-left.svg" alt="" />
                                        Back
                                    </Button>
                                    <Button disabled={!inviteForm.isValid}   onClick={() => {
                                        setSuccessed(true)
                                    }} theme="iris">
                                        <img src="./icons/tickWite.svg" className="mr-1" alt="" />
                                    Confirm
                                    </Button>
                                </div>                     
                                                                    
                            </>
                        }
                    </>
                }                 
             </div>
        </>
    )
}

export default StaffActionModal