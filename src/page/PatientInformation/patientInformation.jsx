import {CardPatient} from "./component/card.jsx";
import {TabsCustume} from "../../components/tabs/tabs.jsx";
import {useState} from "react";
import {useForm} from "react-hook-form";
import ButtonPrimary from "../../components/button/buttonPrimery.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    selectErrorThreshold, selectPatientID,
    selectSex, setErrorThreshold, setPatientID, setSex,
} from "../../store/PatientInformationStore.js";


export const PatientInformation = () => {
    const [gender, setGender] = useState("male");
    const tabs = [
        {state: "male", label: "Male"},
        {state: "female", label: "Female"},
    ]
    const dispatch = useDispatch();
    // const sex = useSelector(selectSex);
    // const patientID = useSelector(selectPatientID);
    // const errorThreshold = useSelector(selectErrorThreshold);

    const {register, handleSubmit} = useForm()
    const onSubmitData = (data) => {
        dispatch(setSex(gender))
        dispatch(setPatientID(data.id))
        dispatch(setErrorThreshold(data.numberError))
        // console.log(sex)
    }
    return (
        <div className={"flex items-center justify-center flex-col gap-5 mt-10"}>
            <h1 className={"text-3xl font-medium"}>Patient Information</h1>
            <p className={"w-[660px] text-xl font-normal text-center"}>Lorem Ipsum is simply dummy text of the printing
                and
                typesetting industry. Lorem Ipsum has been t</p>
            <form className={"flex items-center justify-center flex-col gap-5"} onSubmit={handleSubmit(onSubmitData)}>
                <CardPatient className={"w-[272px] h-[118px] border"}>
                    <h1 className={" text-xl font-medium"}>Patient ID</h1>
                    <input {...register("id")} className={"border-b w-full "} placeholder={"number"}/>
                </CardPatient>
                <CardPatient className={"w-[272px] h-[118px] border"}>
                    <h1 className={" text-xl font-medium"}>Sex Selector</h1>
                    <TabsCustume className={"w-full  rounded-md"} setState={setGender} tabs={tabs} state={gender}/>
                </CardPatient>
                <CardPatient className={"w-[272px] h-[118px] border"}>
                    <h1 className={" text-xl font-medium"}>Error Threshold (%)</h1>
                    <input {...register("numberError")} type={"range"} min={0} max={10}
                           className={"border-b w-full bg-[#544BF0]"}
                           placeholder={"number"}/>
                </CardPatient>
                <ButtonPrimary type={"submit"}>save & continue</ButtonPrimary>
            </form>
        </div>
    )
}
