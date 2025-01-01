import { useNavigate } from "react-router-dom"
// import MenuBox from "../../components/menuBox"
import { Button ,TextField} from "symphony-ui"
import { PatientContext } from "../../context/context"
import { useContext,useEffect, useState } from "react"
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
// import { toast } from "react-toastify"
import { useFormik } from "formik";
import Select from "../../components/select";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
} from "react-country-state-city";

import "react-country-state-city/dist/react-country-state-city.css";
import Staffs from "../../components/Staffs";
import StaffActionModal from "../modal/StaffAction";
import { publish } from "../../utility/event.js";

const AccountInfo = () => {
    const appcontext = useContext(PatientContext)
    const user = appcontext.user
    const [showInviteMember,setShowInviteMember] = useState(false)
    const [showRemoveModal,setShowRemoveModal] = useState(false)
    const [showChangeRole,setShowChangeRole] = useState(false)
    const navigate = useNavigate()
    const personalFormik = useFormik({
        initialValues:{
            FirstName:appcontext.user.information.Personal.FirstName,
            LastName:appcontext.user.information.Personal.LastName,
            Role:appcontext.user.information.Personal.Role,
            Occupation:appcontext.user.information.Personal.Occupation
        },
        onSubmit:() =>{}
    })
    const AccountFormik = useFormik({
        initialValues:{
            PracticeName:appcontext.user.information.Account.PracticeName,
            PhoneNumber:appcontext.user.information.Account.PhoneNumber,
            Email:appcontext.user.information.Account.EmailAddress
        },
        onSubmit:() =>{}
    })    
    const PasswordFormik = useFormik({
        initialValues:{
            CurrentPassword:'',
            NewPassword:'',
            confirm:''
        },
        validationSchema:{

        },
        onSubmit:() =>{}
    })  
   
    const [countryid, setCountryid] = useState(0);
    const AddressFormik = useFormik({
        initialValues:{
            Country:appcontext.user.information.Address.Country,
            City:appcontext.user.information.Address.City,
            Postalcode:appcontext.user.information.Address.Postalcode,
            TaxId:appcontext.user.information.Address.TaxId
        },
        validationSchema:{

        },
        onSubmit:() =>{}
    })        
    const [currentImage,setCurrentImage] = useState(appcontext.user.information.Personal.photo)  
    const [editPanel,setEditPanel] = useState('')
    const resolveComboText = () => {
        if(editPanel == 'photo') {
            return 'Edit Profile Picture'
        }
        if(editPanel == 'personal') {
            return 'Edit Personal Information'
        }     
        if(editPanel == 'login') {
            return 'Edit Login Information'
        }     
        if(editPanel == 'address') {
            return 'Edit Address'
        }                     
    }
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        }, 500);
    },[])
    return (
        <>
            <div className={"flex gap-2.5 xl:gap-5 items-center justify-center px-16  flex-col"}>
                <div className="px-0 w-full flex justify-start">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover"  className="text-primary-color" href="/">
                            Home
                        </Link>
                        {editPanel != '' &&
                            <Link underline="hover"  className="text-primary-color" href="/#/account">
                                My Profile
                            </Link>                        
                        }
                        <Typography className="text-primary-color" >{editPanel== ''?'My Account':resolveComboText()}</Typography>
                    </Breadcrumbs>                

                </div>                  
                 <h1 className={" text-[28px] xl:text-3xl font-medium"}>My Profile</h1>
                 <div className="text-[#606060] text-base xl:text-[18px] max-w-[830px] text-center">Welcome to your account page! Here, you can access and edit your user information. Keep your details up-to-date to ensure the best experience with our services.</div>

                <div className="w-full flex gap-6 justify-between">
                    {/* <div className="max-w-[330px] w-[330px]">
                        <MenuBox></MenuBox>

                    </div> */}
                    <div className="w-full">
                        {editPanel!= 'photo' ? null
                            // <div className="flex w-full justify-start items-center gap-4">
                            //     <div className="relative">
                            //         <img className="w-[180px] ml-[0px] h-[180px] object-cover rounded-full"  src={user.information.Personal.photo} alt="" />
                            //         <div onClick={() => {
                            //             setEditPanel('photo')
                            //         }} className="absolute cursor-pointer right-4 flex justify-center items-center bottom-[-4px] w-[68px] h-[32px] bg-white rounded-[6px]">
                            //             <img className="mr-2" src="./icons/Icon-left.svg" alt="" />
                            //             <div className="text-primary-color cursor-pointer text-[14px] font-medium">Edit</div>
                            //         </div>
                            //     </div>
                            //     <div>
                            //         <div className="text-[24px] font-bold mb-4">{user.information.Personal.FirstName} {user.information.Personal.LastName}</div>
                            //         <div className="text-[#444444]">{user.information.Personal.Occupation}</div>
                            //         <div className="text-[#444444]">{user.information.Address.Country}, {user.information.Address.City}</div>
                            //     </div>
                            //     {/* <Button theme="iris">
                            //         <div className="flex justify-between items-center">
                            //             <img className="mr-2" src="./icons/save.svg" alt="" />
                            //             <div>Save</div>
                            //         </div>
                            //     </Button> */}
                            // </div>                        
                        :
                            <>
                                <div className="flex w-full justify-between items-start">
                                    <div >
                                        <div className="relative ml-[0px]">
                                            <img onClick={() => {
                                                document.getElementById("imageUploader").click()
                                            }} className="w-[180px]  h-[180px]  object-cover  rounded-full"  src={currentImage} alt="" />
                                            <div onClick={() => {
                                                document.getElementById("imageUploader").click()
                                            }} className="flex justify-center absolute w-full h-full top-0 z-20 items-center">
                                                <img className="" src="./image/camera.svg" alt="" />
                                            </div>
                                            <div className="absolute w-full h-full bg-black top-0 rounded-full opacity-30"></div>

                                        </div>
                                        <input accept=".png, .jpg, .jpeg" onChange={(res) => {
                                            const reader = new FileReader();
                                            reader.readAsDataURL(res.target.files[0]);
                                                reader.onload =() => {
                                                    // console.log(reader.result)
                                                    setCurrentImage(reader.result)
                                                }
                                        }} id="imageUploader" className="absolute invisible" type="file" />
                                    </div>
                                    <Button onClick={() => {
                                        appcontext.user.updateCustomInformation("photo",currentImage)
                                        // toast.success("update information")
                                        setEditPanel("")
                                    }} theme="iris">
                                        <div className="flex justify-between items-center">
                                            <img className="mr-2 cursor-pointer" src="./image/save.svg" alt="" />
                                            <div className="cursor-pointer">Save</div>
                                        </div>
                                    </Button>
                                </div>
                                <div className="w-full mt-6 flex justify-between">
                                    {/* <div className=" flex gap-2 justify-start">
                                        <Button theme="iris-secondary-small">Upload Image</Button>
                                        <Button theme="iris-tertiary-small">Upload Image</Button>
                                    </div> */}
                                    <div className="w-auto">At least 800*800 px recommended. JPG or PNG is allowed.</div>
                                </div>                            
                            </>                     
                        }


                        {/* <div className="w-full mt-6 flex justify-between">
                            <div className=" flex gap-2 justify-start">
                                <Button theme="iris-secondary-small">Upload Image</Button>
                                <Button theme="iris-tertiary-small">Upload Image</Button>
                            </div>
                            <div className="w-auto">At least 800*800 px recommended. JPG or PNG is allowed.</div>
                        </div> */}


                        {/* <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div> */}
                        {
                            editPanel != 'personal'?
                            <>
                                <div>
                                    <div className="w-full flex mt-4 XL:mt-10 justify-between items-center">
                                        <h1 className={" text-[22px] xl::text-[24px] font-medium"}>Personal Information:</h1>
                                        {/*<Button onClick={() => setEditPanel("personal")} theme="iris-tertiary-small">*/}
                                        {/*    <div className="flex cursor-pointer justify-between items-center">*/}
                                        {/*        <img className="mr-2" src="./icons/Icon-left.svg" alt="" />*/}
                                        {/*        <div className="cursor-pointer">Edit</div>*/}
                                        {/*    </div>*/}
                                        {/*</Button>                                */}
                                    </div>
                                    <div className="grid grid-cols-2 gap-10 mt-4 xl:mt-10">
                                        <div>
                                            <div className=" text-lg xl:text-[20px] font-medium text-[#2E2E2E]">First Name:</div>
                                            <div className=" text-lg xl:text-[20px]  mt-1 text-[#2E2E2E]">{user.information.Personal.FirstName}</div>
                                        </div>

                                        <div>
                                            <div className=" text-lg xl:text-[20px] font-medium text-[#2E2E2E]">Last Name:</div>
                                            <div className=" text-lg xl:text-[20px]  mt-1 text-[#2E2E2E]">{user.information.Personal.LastName}</div>
                                        </div>

                                        {/* <div>
                                            <div className="text-[20px] font-medium text-[#2E2E2E]">Role:</div>
                                            <div className="text-[20px]  mt-1 text-[#2E2E2E]">{user.information.Personal.Role}</div>
                                        </div>

                                        <div>
                                            <div className="text-[20px] font-medium text-[#2E2E2E]">Occupation:</div>
                                            <div className="text-[20px]  mt-1 text-[#2E2E2E]">{user.information.Personal.Occupation}</div>
                                        </div>                                 */}
                                    </div>
                                </div>
                                <div className="w-full mt-4 xl:mt-10  border-b border-[#00000033]"></div>
                                {/* <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div>                               */}
                            </>
                            :
                            <>
                                <div>
                                    <div className="w-full flex mt-4 xl:mt-10 justify-between items-center">
                                        <h1 className={" text-[22px] xl:text-[24px] font-medium"}>Personal information:</h1>
                                        <Button onClick={() => {
                                            appcontext.user.updateCustomInformation('personal',{
                                                FirstName:personalFormik.values.FirstName,
                                                LastName:personalFormik.values.LastName,
                                                Role:personalFormik.values.Role,
                                                Occupation:personalFormik.values.Occupation,
                                            })
                                            // toast.success("update information")
                                            setEditPanel("")
                                        }} theme="iris">
                                            <div className="flex justify-between cursor-pointer items-center">
                                                <img className="mr-2" src="./image/save.svg" alt="" />
                                                <div className="cursor-pointer">Save</div>
                                            </div>
                                        </Button>                                
                                    </div>
                                    <div className="grid grid-cols-2 gap-10 mt-4 xl:mt-10">
                                        <TextField {...personalFormik.getFieldProps('FirstName')} theme="iris" label="First Name:" placeholder="Your First name"  inValid={false} name="FirstName" type="text" />
                                        <TextField {...personalFormik.getFieldProps('LastName')} theme="iris" label="Last Name:" placeholder="Your Last name"  inValid={false} name="LastName"  type="text" />     
                                        <TextField {...personalFormik.getFieldProps('Role')} theme="iris" label="Role:" placeholder="Your Role" inValid={false} name="Role"  type="text" />  
                                        <TextField {...personalFormik.getFieldProps('Occupation')} theme="iris" label="Occupation:" placeholder="Your Occupation"  inValid={false} name="Occupation" type="text" />  
                                    </div>
                                </div>
                                <div className="w-full mt-4 xl:mt-10  border-b border-[#00000033]"></div>
                                {/* <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div>                             */}
                            </>
                        }

                        {
                            editPanel != 'login'?
                            <>
                                <div>
                                    <div className="w-full flex mt-4 xl:mt-10 justify-between items-center">
                                        <h1 className={" text-[22px] xl:text-[24px] font-medium"}>Login Information:</h1>
                                        {/*<Button onClick={() => setEditPanel("login")} theme="iris-tertiary-small">*/}
                                        {/*    <div className="flex cursor-pointer  justify-between items-center">*/}
                                        {/*        <img className="mr-2" src="./icons/Icon-left.svg" alt="" />*/}
                                        {/*        <div className="cursor-pointer">Edit</div>*/}
                                        {/*    </div>*/}
                                        {/*</Button>                               */}
                                    </div>
                                    <div className="grid grid-cols-2 gap-10 mt-4 xl:mt-10">
                                        <div>
                                            <div className=" text-lg xl:text-[20px] font-medium text-[#2E2E2E]">E-mail Address:</div>
                                            <div className=" text-lg xl:text-[20px]  mt-1 text-[#2E2E2E]">{user.information.Account.EmailAddress}</div>
                                        </div>

                                        {/* <div>
                                            <div className="text-[20px] font-medium text-[#2E2E2E]">Phone:</div>
                                            <div className="text-[20px]  mt-1 text-[#2E2E2E]">{user.information.Account.PhoneNumber}</div>
                                        </div> */}

                                        <div>
                                            <div className=" text-lg xl:text-[20px] font-medium text-[#2E2E2E]">Practice Name:</div>
                                            <div className=" text-lg xl:text-[20px]  mt-1 text-[#2E2E2E]">{user.information.Account.PracticeName}</div>
                                        </div>

                                    </div>
                                </div>
                                {/* <div className="w-full mt-10  border-b border-[#00000033]"></div> */}
                                {/* <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div>                             */}
                            </>
                            :
                            <>
                                <div>
                                    <div className="w-full flex mt-4 xl:mt-10 justify-between items-center">
                                        <h1 className={" text-[22px] xl:text-[24px] font-medium"}>Login Information:</h1>
                                        <Button onClick={() => {
                                            appcontext.user.updateCustomInformation('account',{
                                                PracticeName:AccountFormik.values.PracticeName,
                                                PhoneNumber:AccountFormik.values.PhoneNumber,
                                                EmailAddress:AccountFormik.values.Email
                                            })
                                            // toast.success("update information")
                                            setEditPanel("")
                                        }} theme="iris">
                                            <div className="flex cursor-pointer justify-between items-center">
                                                <img className="mr-2" src="./image/save.svg" alt="" />
                                                <div className="cursor-pointer">Save</div>
                                            </div>
                                        </Button>                                
                                    </div>
                                    <div className="grid grid-cols-2 gap-10 mt-4 xl:mt-10">
                                        {/* <TextField {...AccountFormik.getFieldProps('Username')} theme="iris" label="Username:" placeholder="Your Username"  inValid={false} name="Username" type="text" /> */}
                                        <TextField {...AccountFormik.getFieldProps('Email')} theme="iris" label="E-mail Address:" placeholder="Your E-mail Address"  inValid={false} name="Email" type="text" />  
                                        {/* <TextField {...AccountFormik.getFieldProps('PhoneNumber')} theme="iris" label="Phone Number:" placeholder="Your Phone Number"  inValid={false} name="PhoneNumber" type="text" />      */}
                                        <div className="grid w-[330px]">
                                            <Select onchange={(value) => {
                                                AccountFormik.setFieldValue("PracticeName",value)
                                            }} placeHolder={'Your Practice Name'} value={AccountFormik.values.PracticeName} label={'Practice Name'} options={['Sample Name 1','Sample Name 2']}></Select>
                                        </div>                            
                                    </div>
                                </div>
                                {/* <div className="w-full mt-10  border-b border-[#00000033]"></div> */}
                                {/* <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div>                             */}
                            </>
                        }



                        {/* <div>
                            <div className="w-full flex mt-10 justify-between items-center">
                                <h1 className={"text-[24px] font-medium"}>Password:</h1>
                                <Button onClick={() => navigate('/edit')} theme="iris-tertiary-small">
                                    <div className="flex cursor-pointer justify-between items-center">
                                        <img className="mr-2" src="./icons/Icon-left.svg" alt="" />
                                        <div>Edit</div>
                                    </div>
                                </Button>                              
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                <div>
                                    <div className="text-[20px] font-medium text-[#2E2E2E]">Password:</div>
                                    <div className="text-[20px]  mt-1 text-[#2E2E2E]">********</div>
                                </div>
                            </div>
                        </div>


                        <div className="w-full mt-10  border-b border-[#00000033]"></div> */}

                        {/* {editPanel != 'address' ?
                            <div>
                                <div className="w-full flex mt-10 justify-between items-center">
                                    <h1 className={"text-[24px] font-medium"}>Address:</h1>
                                    <Button onClick={() => setEditPanel("address")} theme="iris-tertiary-small">
                                        <div className="flex  cursor-pointer justify-between items-center">
                                            {/* <img className="mr-2" src="./icons/Icon-left.svg" alt="" /> */}
                                            {/* <div className="editIcon tirtryIconHover bg-primary-color"></div>
                                            <div className="cursor-pointer">Edit</div>
                                        </div>
                                    </Button>                            
                                </div>
                                <div className="grid grid-cols-2 gap-10 mt-10">
                                    <div>
                                        <div className="text-[20px] font-medium text-[#2E2E2E]">Country:</div>
                                        <div className="text-[20px]  mt-1 text-[#2E2E2E]">{user.information.Address.Country}</div>
                                    </div>
                                    <div>
                                        <div className="text-[20px] font-medium text-[#2E2E2E]">City:</div>
                                        <div className="text-[20px]  mt-1 text-[#2E2E2E]">{user.information.Address.City}</div>
                                    </div>
                                    <div>
                                        <div className="text-[20px] font-medium text-[#2E2E2E]">Postal Code:</div>
                                        <div className="text-[20px]  mt-1 text-[#2E2E2E]">{user.information.Address.Postalcode}</div>
                                    </div>
                                    <div>
                                        <div className="text-[20px] font-medium text-[#2E2E2E]">Tax ID:</div>
                                        <div className="text-[20px]  mt-1 text-[#2E2E2E]">{user.information.Address.TaxId}</div>
                                    </div>                                                                                                
                                </div>
                            </div> */}
                        {/* :
                        <div>
                            <div  className="w-full flex mt-10 justify-between items-center">
                                <h1 className={"text-[24px] font-medium"}>Address:</h1>
                                <Button onClick={() => {
                                    appcontext.user.updateCustomInformation('Address',{
                                        Country:AddressFormik.values.Country,
                                        City:AddressFormik.values.City,
                                        Postalcode:AddressFormik.values.Postalcode,
                                        TaxId:AddressFormik.values.TaxId
                                    })
                                    // toast.success("update information")
                                    setEditPanel("")
                                }} theme="iris">
                                    <div className="flex cursor-pointer justify-between items-center">
                                        <img className="mr-2" src="./icons/save.svg" alt="" />
                                        <div className="cursor-pointer">Save</div>
                                    </div>
                                </Button>                                
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                <div className="max-w-[330px]">
                                    <label htmlFor="" className={`iris-TextField-label`}>Country:</label>
                                    <CountrySelect
                                        onChange={(e) =>{
                                            setCountryid(e.id)
                                            AddressFormik.setFieldValue("Country",e.name)
                                        }}
                                        showFlag={false}
                                        placeHolder="Select Country"
                                    />

                                </div>
                                <div>
                                    <label htmlFor="" className={`iris-TextField-label`}>City:</label>
                                    <StateSelect
                                        countryid={Number(countryid)}
                                        onChange={(e) => {
                                        AddressFormik.setFieldValue("City",e.name)
                                        }}
                                        placeHolder="Select State"
                                    />              
                                </div> */}
                                {/* <TextField {...AddressFormik.getFieldProps("Country")} theme="iris" label="Country:" placeholder="Your Country"  inValid={false} name="Country"  type="text" /> */}
                                {/* <TextField {...AddressFormik.getFieldProps("City")} theme="iris" label="City:" placeholder="Your City"  inValid={false} name="City"  type="text" />      */}
                                {/* <TextField  {...AddressFormik.getFieldProps("Postalcode")}  theme="iris" label="Postal code:" placeholder="Your Postal code"  inValid={false} name="Postalcode" type="text" />
                                <TextField  {...AddressFormik.getFieldProps("TaxId")}  theme="iris" label="Tax Id:" placeholder="Your Tax Id" inValid={false} name="TaxId"  type="text" />  
                            </div>
                        </div>                        
                        } */}

                        <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div> 
                    </div>
                </div>


                <div className="w-full hidden mt-6 mb-10">
                  <div className="flex w-full justify-between items-center">
                    <div className="text-[24px] opacity-40 text-[#2E2E2E] font-bold">
                        Members:
                    </div>
                    <div className="flex justify-end">
                        <Button disabled onClick={() => {
                            setShowInviteMember(true)
                            publish("openModal");
                        }} theme="iris-tertiary-small">
                            <img src="./image/user-add.svg" className="mr-1" alt="" />
                            Invite member</Button>
                    </div>
                  </div>
                  <Staffs onRemove={() => {
                    setShowRemoveModal(true)
                    publish("openModal");
                  }} onChangeRole={() => {
                    setShowChangeRole(true)
                    publish("openModal");
                  }}></Staffs>
                  {
                    showInviteMember ?
                     <div className="w-full top-0 fixed z-[60] left-0 flex justify-center items-center h-full">
                         <StaffActionModal type={"invite"} onClose={() => {
                            setShowInviteMember(false)
                            publish("closeModal")
                         }} title={'Invite member'}></StaffActionModal>
                     </div>
                    :undefined
                  }        
                  {showRemoveModal ?
                     <div className="w-full top-0 fixed z-[60] left-0 flex justify-center items-center h-full">
                         <StaffActionModal type={"remove"} onClose={() => {
                            setShowRemoveModal(false)
                            publish("closeModal")
                         }} title={'Invite member'}></StaffActionModal>
                     </div>                  
                  :undefined}       

                  {/* {showChangeRole ?
                     <div className="w-full top-0 fixed z-[60] left-0 flex justify-center items-center h-full">
                         <StaffActionModal type={"changeRole"} onClose={() => {
                            setShowChangeRole(false)
                            publish("closeModal")
                         }} title={'Invite member'}></StaffActionModal>
                     </div>                  
                  :undefined}    */}
                </div>                    
            </div>
        </>
    )
}

export default AccountInfo