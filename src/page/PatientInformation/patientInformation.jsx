import {CardPatient} from "./component/card.jsx";
import {TabsCustume} from "../../components/tabs/tabs.jsx";
import {useState, useContext} from "react";
import {PatientContext} from "../../context/context.jsx";
import {useForm} from "react-hook-form";
import ButtonPrimary from "../../components/button/buttonPrimery.jsx";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";
import {updateLocalPatientIHistoty} from "../../utility/updateLocalPatientIHistoty.js";
import { Button } from "symphony-ui";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
export const PatientInformation = () => {

    const navigate = useNavigate();
    const [gender, setGender] = useState("masculine");
    const [threhold, setthrehold] = useState(10)

    //tabs to switch the gender
    const tabs = [
        {state: "masculine", label: "Masculine"},
        {state: "feminine", label: "Feminine"},
    ]
    const {
        setSex,
        setPatientID,
        setErrorThreshold,
    } = useContext(PatientContext);

    // is show tour false did not load the show tour and redirect to face mash
    const [isShowTour,] = useLocalStorage("tour")
    const [showMore,setShowMore] = useState(false)
    const {register, getValues, handleSubmit} = useForm()

    // submit the data to start the face mash
    const onSubmitData = (data, e) => {

        e.preventDefault()
        setSex(gender)
        setPatientID(data.id)
        setErrorThreshold(threhold)
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
        if (isShowTour) {
            navigate("/tour")
        } else {
            navigate("/faceCamera")
        }
    }
    const getRand = () => {
        return Math.floor(Math.random() * (100000 - 1000)) + 100
    }
    return (
        <>
        <img className="w-full fixed z-0 left-0 top-32" src="./Vector.svg" alt="" />
        <div className={"flex relative z-30 items-center justify-center flex-col gap-5 mt-10"}>
                <div className="px-12 mt-[-10px] w-full flex justify-start">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover"  className="text-primary-color" href="/">
                            Home
                        </Link>
                        <Typography className="text-primary-color" >Patient Information</Typography>
                    </Breadcrumbs>                

                </div>              
            <h1 className={"text-3xl font-medium"}>Patient Information</h1>
            <p className={"w-[450px] md:w-[720px] text-xl font-normal text-center"}>The patient ID is unique, and if a duplicate ID is entered, the scan will be added to the history of that record. All fields are mandatory to fill out.</p>
            <form className={"flex relative items-center justify-center flex-col gap-5"} onSubmit={handleSubmit(onSubmitData)}>
                <CardPatient className={"w-[450px] md:w-[600px] xl:w-[730px] bg-white z-20 h-[88px] border"}>
                    <div className="flex w-full justify-between items-center">
                        <h1 className={"w-[500px] text-xl font-medium"}>Patient ID</h1>
                        <input defaultValue={getRand()} {...register("id")} className={"border-b outline-none h-10 w-full "}
                            placeholder={"Enter Patient ID"}/>

                    </div>
                </CardPatient>
                <CardPatient className={`w-[450px] md:w-[600px] xl:w-[730px] bg-white  border ${showMore?'h-[138px]':'h-[118px]'}`}>
                    <div className="flex w-full justify-between items-center">
                        <div onClick={() => {setShowMore(!showMore)}} className="flex cursor-pointer justify-start items-center w-[500px]">
                            <h1 className={" text-xl  font-medium"}>Facial Esthetic Preference </h1>
                            <img src="./arrow-down.svg" className={`w-[24px] ml-2 ${showMore?'rotate-0':'rotate-180'} `} />
                        </div>
                        <TabsCustume className={"w-full  rounded-md"} setState={setGender} tabs={tabs} state={gender}/>

                    </div>
                    {showMore &&
                        <div className="text-[#444444]">Choose the sex of the subject in the image.</div>
                    }
                </CardPatient>
                {/* <CardPatient className={"w-[272px] h-[118px] border"}>
                    <h1 className={" text-xl font-medium"}>Error Threshold {threhold} (%)</h1>
                    <input value={threhold} onChange={(e) => {
                        setthrehold(e.target.value)
                    }} type={"range"} min={0} max={100}
                           className={"border-b w-full bg-[#544BF0]"}
                           placeholder={"number"}/>

                </CardPatient> */}
                <div className="mt-8">
                    <Button type="submit" theme="iris-large">
                        Save & Continue
                    </Button>

                </div>
                {/* <ButtonPrimary className={"h-[52px] w-[191px] mt-8 rounded-[12px]"} type={"submit"}>Save & Continue</ButtonPrimary> */}
            </form>
                    
        </div>
         
        </>
    )
}
