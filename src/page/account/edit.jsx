import { useFormik } from "formik"
import MenuBox from "../../components/menuBox"
import { Button, TextField } from "symphony-ui"
import { useContext, useEffect, useState } from "react"
import { PatientContext } from "../../context/context"
import { toast } from "react-toastify"
import { useSearchParams } from "react-router-dom"
import Select from "../../components/select"
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const Account = () => {
    const appcontext = useContext(PatientContext)
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
    const [searchParams] = useSearchParams();
    useEffect(() => {
        if(searchParams.get('step') == 'password'){
            document.getElementById("passwordSection").scrollIntoView({
                behavior:'smooth',
                block:'center',
                inline:'center'
            })
        }
    })
    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
        }, 3000);
    },[])
    return (
        <>
            <div className={"flex gap-5 items-center justify-center px-16  flex-col"}>
                <div className="px-0 w-full flex justify-start">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover"  className="text-primary-color" href="/">
                            Home
                        </Link>
                        <Link underline="hover"  className="text-primary-color" href="/#/account">
                            My Account
                        </Link>                        
                        <Typography className="text-primary-color" >Edit</Typography>
                    </Breadcrumbs>                

                </div>                    
                 <h1 className={"text-3xl font-medium"}>My Account</h1>
                 <div className="text-[#606060] text-[18px] max-w-[860px] text-center">Welcome to your account page! Here, you can access and edit your user information. Keep your details up-to-date to ensure the best experience with our services.</div>

                <div className="w-full flex gap-6 justify-between">
                    {/* <div className="max-w-[330px] w-[330px]">
                        <MenuBox></MenuBox>

                    </div> */}
                    <div className="w-full">
                        <div className="flex w-full justify-between items-start">
                            <div>
                                <img onClick={() => {
                                    document.getElementById("imageUploader").click()
                                }} className="w-[180px] ml-[88px] h-[180px] object-cover  rounded-full"  src={currentImage} alt="" />
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
                                toast.success("update information")
                            }} theme="iris">
                                <div className="flex justify-between items-center">
                                    <img className="mr-2" src="./icons/save.svg" alt="" />
                                    <div>Save</div>
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


                        <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div>

                        <div>
                            <div className="w-full flex mt-10 justify-between items-center">
                                <h1 className={"text-[24px] font-medium"}>Personal information:</h1>
                                <Button onClick={() => {
                                    appcontext.user.updateCustomInformation('personal',{
                                        FirstName:personalFormik.values.FirstName,
                                        LastName:personalFormik.values.LastName,
                                        Role:personalFormik.values.Role,
                                        Occupation:personalFormik.values.Occupation,
                                    })
                                    toast.success("update information")
                                }} theme="iris">
                                    <div className="flex justify-between items-center">
                                        <img className="mr-2" src="./icons/save.svg" alt="" />
                                        <div>Save</div>
                                    </div>
                                </Button>                                
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                <TextField {...personalFormik.getFieldProps('FirstName')} theme="iris" label="First Name:" placeholder="Your First name"  inValid={false} name="FirstName" type="text" />
                                <TextField {...personalFormik.getFieldProps('LastName')} theme="iris" label="Last Name:" placeholder="Your Last name"  inValid={false} name="LastName"  type="text" />     
                                <TextField {...personalFormik.getFieldProps('Role')} theme="iris" label="Role:" placeholder="Your Role" inValid={false} name="Role"  type="text" />  
                                <TextField {...personalFormik.getFieldProps('Occupation')} theme="iris" label="Occupation:" placeholder="Your Occupation"  inValid={false} name="Occupation" type="text" />  
                            </div>
                        </div>

                        <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div>     

                        <div>
                            <div className="w-full flex mt-10 justify-between items-center">
                                <h1 className={"text-[24px] font-medium"}>Login Information:</h1>
                                <Button onClick={() => {
                                    appcontext.user.updateCustomInformation('account',{
                                        PracticeName:AccountFormik.values.PracticeName,
                                        PhoneNumber:AccountFormik.values.PhoneNumber,
                                        EmailAddress:AccountFormik.values.Email
                                    })
                                    toast.success("update information")
                                }} theme="iris">
                                    <div className="flex justify-between items-center">
                                        <img className="mr-2" src="./icons/save.svg" alt="" />
                                        <div>Save</div>
                                    </div>
                                </Button>                                
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                {/* <TextField {...AccountFormik.getFieldProps('Username')} theme="iris" label="Username:" placeholder="Your Username"  inValid={false} name="Username" type="text" /> */}
                                <TextField {...AccountFormik.getFieldProps('Email')} theme="iris" label="E-mail Address:" placeholder="Your E-mail Address"  inValid={false} name="Email" type="text" />  
                                <TextField {...AccountFormik.getFieldProps('PhoneNumber')} theme="iris" label="Phone Number:" placeholder="Your Phone Number"  inValid={false} name="PhoneNumber" type="text" />     
                                <div className="grid w-[330px]">
                                    <Select onchange={(value) => {
                                        AccountFormik.setFieldValue("PracticeName",value)
                                    }} placeHolder={'Your Practice Name'} value={AccountFormik.values.PracticeName} label={'Practice Name'} options={['Enter New One','Sample Name 1','Sample Name 2']}></Select>
                                </div>                            
                            </div>
                        </div>

                        <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div>

                        <div id="passwordSection">
                            <div className="w-full flex mt-10 justify-between items-center">
                                <h1 className={"text-[24px] font-medium"}>Password:</h1>
                                <Button theme="iris">
                                    <div className="flex justify-between items-center">
                                        <img className="mr-2" src="./icons/save.svg" alt="" />
                                        <div>Save</div>
                                    </div>
                                </Button>                                
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                <TextField {...PasswordFormik.getFieldProps("CurrentPassword")} theme="iris" label="Current Password:" placeholder="Current Password"  inValid={false} name="CurrentPassword"  type="text" />
                                <div className="invisible"></div>
                                <TextField {...PasswordFormik.getFieldProps("NewPassword")} theme="iris" label="New Password:" placeholder="New Password"      inValid={false} name="NewPassword"  type="text" />     
                                <TextField {...PasswordFormik.getFieldProps("confirm")} theme="iris" label="Repeat New Password:" placeholder="Repeat New Password"  inValid={false} name="confirm"  type="text" />  
                            </div>
                        </div>

                        <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div> 

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
                                    toast.success("update information")
                                }} theme="iris">
                                    <div className="flex justify-between items-center">
                                        <img className="mr-2" src="./icons/save.svg" alt="" />
                                        <div>Save</div>
                                    </div>
                                </Button>                                
                            </div>
                            <div className="grid grid-cols-2 gap-10 mt-10">
                                <TextField {...AddressFormik.getFieldProps("Country")} theme="iris" label="Country:" placeholder="Your Country"  inValid={false} name="Country"  type="text" />
                                <TextField {...AddressFormik.getFieldProps("City")} theme="iris" label="City:" placeholder="Your City"  inValid={false} name="City"  type="text" />     
                                <TextField  {...AddressFormik.getFieldProps("Postalcode")}  theme="iris" label="Postal code:" placeholder="Your Postal code"  inValid={false} name="Postalcode" type="text" />
                                <TextField  {...AddressFormik.getFieldProps("TaxId")}  theme="iris" label="Tax Id:" placeholder="Your Tax Id" inValid={false} name="TaxId"  type="text" />  
                            </div>
                        </div>

                        <div className="w-full h-[1px] mt-10 bg-[#00000033]"></div> 
                    </div>
                </div>
           
            </div>
        </>
    )
}

export default Account