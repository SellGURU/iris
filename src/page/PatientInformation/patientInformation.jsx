import {CardPatient} from "./component/card.jsx";
import {TabsCustume} from "../../components/tabs/tabs.jsx";
import {useState, useContext} from "react";
import {PatientContext} from "../../context/context.jsx";
import {useForm} from "react-hook-form";
import {countries} from 'country-data';
import ButtonPrimary from "../../components/button/buttonPrimery.jsx";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";
import {updateLocalPatientIHistoty} from "../../utility/updateLocalPatientIHistoty.js";
import { Button } from "symphony-ui";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import GenerateId from '../../utility/generateId.js'
import { useFormik } from "formik";
import * as Yup from "yup";
import Application from "../../api/Application.js";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { BeatLoader } from "react-spinners";

export const PatientInformation = () => {
    const getRand = () => {
        return Math.floor(Math.random() * (100000 - 1000))
    }
    const navigate = useNavigate();
    const [gender, setGender] = useState("masculine");
    const [threhold, setthrehold] = useState(10)
    const [value, setValue] = useState("US")
    //tabs to switch the gender
    const tabs = [
        {state: "masculine", label: "Masculine"},
        {state: "feminine", label: "Feminine"},
    ]
    const {
        setSex,
        setPatientID,
        setErrorThreshold,
        idController,
    } = useContext(PatientContext);

    // is show tour false did not load the show tour and redirect to face mash
    const [isShowTour,] = useLocalStorage("tour")
    const [showMore,setShowMore] = useState(false)
    const [orgs,] = useLocalStorage("orgData")
    const [isLaoding,setIsLoading] = useState(false)
    const {register, getValues, handleSubmit} = useForm()
    const formik = useFormik({
        initialValues:{
            id:GenerateId.resolveid(),
            firstName:'',
            lastName:'',
            email:'',
            phone:'',
            gender:''
        },
        validationSchema:Yup.object().shape({
            firstName:Yup.string().max(30,'First name should be max of 30 characters.').matches(/^[a-zA-Z0-9 ]*$/, 'Use only a-z, A-Z, 0-9, and space').required('First name is required.'),
            lastName:Yup.string().required('Last name is required.').max(30,'Last name should be max of 30 characters.').matches(/^[a-zA-Z0-9 ]*$/, 'Use only a-z, A-Z, 0-9, and space'),
            phone:Yup.string().min(9,'Phone number must be between 7 and 12 characters.').max(14,'Phone number must be between 7 and 12 characters long.'),
            email:Yup.string().required('Please enter valid email').matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please enter valid email")
        })
    })

    // submit the data to start the face mash
    const onSubmitData = (data, e) => {

        e.preventDefault()
        // setSex(gender)
        // setPatientID(data.id)
        // setErrorThreshold(threhold)
        // addPatient(patient);
        // add it to local storage (in context)
        // const patient = {
        //     id: data.id,
        //     sex: gender,
        //     errorThreshold: threhold,
        //     htmlId: 0,
        //     photo: ""
        // }
        // addPatient(patient)
        // updateLocalPatientIHistoty(patient);
    }
    const submitForm = (patient) => {
        Application.addClient({
            orgCode: JSON.parse(orgs).orgCode,
            orgSCode: JSON.parse(orgs).orgSCode,
            first_name: patient.firstName,
            last_name: patient.lastName,
            email: patient.email,
            gender: patient.sex == 'masculine'? 'male':'female',
            client_id: patient.id,
            phone_code:patient.phone!= ''? countries[value].countryCallingCodes[0]:undefined,
            phone:patient.phone!= ''? formik.values.phone:undefined,                        
        }).then(res => {
            setIsLoading(false)
            if(res.data.status == 'success'){
                updateLocalPatientIHistoty(patient);
                if (isShowTour) {
                    navigate(`/tour?gender=${patient.sex == 'masculine'? 'male':'female'}&patientId=${patient.id}`)
                } else {
                    navigate(`/faceCamera?gender=${patient.sex == 'masculine'? 'male':'female'}&patientId=${patient.id}`)
                }                        

            }else{
                if(res.data.msg =='client_already_exist'){
                    submitForm({...patient,id:GenerateId.resolveid()})
                }else{
                    alert(res.data.msg)
                }
            }
        }).catch((err) => {
            if(err.status == 406){
                formik.setFieldError("email", err.data.detail);
            }
            setIsLoading(false)
        })        
    }
    return (
        <>
        <img className="h-full md:w-full fixed z-0 left-0 top-0 md:top-32" src="./Vector.svg" alt="" />
        <div className={"flex relative z-30 items-center justify-center flex-col gap-5 mt-10"}>
                <div className="px-12 mt-[-10px] w-full flex justify-start">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover"  className="text-primary-color" href="/">
                            Home
                        </Link>
                        <Typography className="text-primary-color" >Client Information</Typography>
                    </Breadcrumbs>                

                </div>              
            <h1 className={"text-2xl font-medium"}>Client Information</h1>
            {/* <p className={"w-[450px] sm:w-[600px] md:w-[720px] text-[18px] 2xl:text-xl font-[14px] text-center"}>The client ID is unique, and if a duplicate ID is entered, the scan will be added to the history of that record. All fields are mandatory to fill out.</p> */}
            <form  onSubmit={handleSubmit(onSubmitData)}>
                <div className={"flex lg:grid lg:grid-cols-2 relative items-center justify-center flex-col gap-5"}>
                    <CardPatient className={"w-[550px] relative order-1 md:w-[600px] lg:w-[480px] 2xl:w-[550px] bg-white z-20 h-[105px] md:h-[88px] border"}>
                        <div  className="flex w-full justify-between items-center">
                            <h1 className={"w-full md:w-[500px] lg:w-[300px] lg:[500px] text-[18px] font-medium"}>Client ID </h1>
                            <input disabled {...formik.getFieldProps("id")} className={"border-b text-[#7E7E7E] px-2 outline-none bg-white h-10 w-full "}
                                placeholder={"Enter Patient ID"}/>
                            {/* <img onClick={() => {
                                 formik.setFieldValue("id",GenerateId.resolveid())
                            }} className="absolute right-8 cursor-pointer" src="./refresh.svg" alt="" /> */}
                            {/* <div className="w-full text-[#7E7E7E] text-[18px]">{getRand()}</div> */}
                        </div>
                    </CardPatient>
                    <CardPatient className={"w-[550px] order-2 md:w-[600px] lg:w-[480px] 2xl:w-[550px] bg-white z-20 h-[105px] md:h-[88px] border"}>
                        <div className="flex w-full justify-between items-center">
                            <h1 className={"w-full md:w-[500px] lg:w-[300px] lg:[500px] text-[18px] font-medium"}>First Name <span className={"text-red-500 ml-1 mt-[-8px]"} >*</span></h1>
                            <div className="relative min-w-[226px]  w-full">
                                <input  {...formik.getFieldProps("firstName")} className={"border-b px-2 outline-none h-10 w-full "}
                                    placeholder={"Enter First Name"}/>
                                <div className="text-[10px] flex min-w-[240px] w-full justify-start absolute text-red-500 bottom-[-18px] right-[0px]" >
                                    {formik.errors.firstName}
                                </div>   
                            
                            </div>
                        </div>
                    </CardPatient>
                    <CardPatient className={"w-[550px] order-2 md:w-[600px] lg:w-[480px] 2xl:w-[550px] bg-white z-20 h-[105px] md:h-[88px] border"}>
                        <div className="flex w-full justify-between items-center">
                            <h1 className={"w-full md:w-[500px] text-[18px] font-medium"}>Last Name <span className={"text-red-500 ml-1 mt-[-8px]"} >*</span></h1>
                            <div className="relative min-w-[226px]  w-full">
                                <input {...formik.getFieldProps("lastName")} className={"border-b min-w-[226px]  px-2 outline-none h-10 w-full "}
                                    placeholder={"Enter Last Name"}/>
                                    <div className="text-[10px] flex min-w-[240px] w-full justify-start absolute text-red-500 bottom-[-18px] right-[0px]" >
                                        {formik.errors.lastName}
                                    </div>                                   
                            </div>

                        </div>
                    </CardPatient>
                    <CardPatient className={"w-[550px] order-2 md:w-[600px] lg:w-[480px] 2xl:w-[550px] bg-white z-20 h-[105px] md:h-[88px] border"}>
                        <div className="flex relative w-full justify-between items-center">
                            <h1 className={"w-full md:w-[500px] lg:w-[300px] lg:[500px]  text-[18px] font-medium"}>Email Address<span className={"text-red-500 ml-1 mt-[-8px]"} >*</span></h1>
                            <div className="relative min-w-[226px]  w-full">
                                <input type="email" {...formik.getFieldProps("email")} className={"border-b px-2 outline-none h-10 w-full "}
                                    placeholder={"Enter E-Mail"}/>
                                <div className="text-[10px] flex min-w-[240px] w-full justify-start absolute text-red-500 bottom-[-18px] right-[0px]" >
                                    {formik.errors.email}
                                </div>                        

                            </div>
                        </div>
                    </CardPatient>      
                    <CardPatient className={"w-[550px] relative order-2 md:w-[600px] lg:w-[480px] 2xl:w-[550px] bg-white z-20 h-[105px] md:h-[88px] border"}>
                        <div className="flex w-full justify-between items-center">
                            {/* <h1 className={"w-full md:w-[500px] text-[18px] font-medium"}>Phone<span className="text-[#444444] font-[400] opacity-50 ml-1">(Optional)</span></h1>
                            <input type="tel" {...formik.getFieldProps("phone")} className={"border-b outline-none h-10 w-full "}
                                placeholder={"Enter Phone"}/> */}
                            <h1 className={"w-full flex-grow md:w-[500px]  text-[18px] font-medium"}>Phone Number<span className="text-[#444444] font-[400] invisible opacity-50 ml-1">(Optional)</span></h1>
                           {/* <input {...formik.getFieldProps("lastName")} className={"border-b px-2 outline-none h-10 w-full "}
                                placeholder={"Enter Last Name"}/> */}
                           <div className="relative w-full min-w-[226px] ">
                                <PhoneInput
                                value={formik.values.phone}
                                defaultCountry="US"
                                className={"border-b w-full outline-none h-10  "}
                                onCountryChange={(e) => {
                                    setValue(e)
                                }}
                                onChange={(e) => {
                                    formik.setFieldValue("phone",e)
                                }}
                                placeholder="Enter Phone" />
                                <div className="text-[10px] flex min-w-[240px] w-full justify-end absolute text-red-500 bottom-[-18px] left-[-8px]" >
                                    {formik.errors.phone}
                                </div>
                           </div>
                        </div>
                    </CardPatient>                                                            
                    <CardPatient className={` w-[550px]  md:w-[600px] lg:w-[480px] 2xl:w-[550px]  order-6 lg:order-1 2xl:order-1 bg-white  border h-[88px] `}>
                        <div className="flex w-full justify-between items-center">
                            <div className="flex cursor-pointer justify-start items-center w-[500px]">
                                <h1 className={" text-[18px]  font-medium"}>Facial Aesthetic Preference<span className={"text-red-500 ml-1 mt-[-8px]"} >*</span> 
 </h1>
                                {/* <img src="./arrow-down.svg" className={`w-[24px] ml-2 ${showMore?'rotate-0':'rotate-180'} `} /> */}
                            </div>
                            <TabsCustume className={"w-full mt-[0px] min-w-[226px]  rounded-md"} setState={setGender} tabs={tabs} state={gender}/>

                        </div>
                        {/* {showMore &&
                            <div className="text-[#444444]">Choose the sex of the subject in the image.</div>
                        } */}
                    </CardPatient>

                </div>
                {/* <CardPatient className={"w-[272px] h-[118px] border"}>
                    <h1 className={" text-xl font-medium"}>Error Threshold {threhold} (%)</h1>
                    <input value={threhold} onChange={(e) => {
                        setthrehold(e.target.value)
                    }} type={"range"} min={0} max={100}
                           className={"border-b w-full bg-[#544BF0]"}
                           placeholder={"number"}/>

                </CardPatient> */}
                <div className="mt-2 lg:flex lg:justify-center lg:mt-8 xl:mt-2 xl:block 2xl:flex 2xl:justify-center 2xl:mt-8">
                    <Button onClick={() => {
                        setSex(gender)
                        console.log(countries[value].countryCallingCodes[0])
                        setPatientID(formik.values.id.toString())
                        setErrorThreshold(threhold)
                        setIsLoading(true)
                        const patient = {
                            id: formik.values.id.toString(),
                            sex: gender,
                            errorThreshold: threhold,
                            htmlId: '',
                            photo:'',
                            firstName:formik.values.firstName,
                            lastName:formik.values.lastName,
                            email:formik.values.email,
                            phone:formik.values.phone
                        }
                        submitForm(patient)
                    }} disabled={!formik.isValid || !formik.touched.firstName || isLaoding} type="submit" theme="iris-large">
                        {isLaoding ?
                        <BeatLoader color="white" size={10}></BeatLoader>
                        :
                        'Save & Continue'
                        }
                    </Button>

                </div>
                {/* <ButtonPrimary className={"h-[52px] w-[191px] mt-8 rounded-[12px]"} type={"submit"}>Save & Continue</ButtonPrimary> */}
            </form>
                    
        </div>
         
        </>
    )
}
