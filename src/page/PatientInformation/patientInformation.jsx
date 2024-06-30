import {CardPatient} from "./component/card.jsx";
import {TabsCustume} from "../../components/tabs/tabs.jsx";
import {useState, useContext} from "react";
import {PatientContext} from "../../context/context.jsx";
import {useForm} from "react-hook-form";
import ButtonPrimary from "../../components/button/buttonPrimery.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
    selectErrorThreshold, selectPatientID,
    selectSex, setErrorThreshold, setPatientID, setSex,
} from "../../store/PatientInformationStore.js";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";


export const PatientInformation = () => {
    const {addPatient} = useContext(PatientContext);

    const navigate = useNavigate();
    const [gender, setGender] = useState("masculine");
    const [threhold, setthrehold] = useState(10)
    // const { addPatient } = useContext(PatientContext);
    const tabs = [
        {state: "masculine", label: "Male"},
        {state: "feminine", label: "Female"},
    ]
    const dispatch = useDispatch();
    // const sex = useSelector(selectSex);
    // const patientID = useSelector(selectPatientID);
    // const errorThreshold = useSelector(selectErrorThreshold);

    const [isShowTour,] = useLocalStorage("tour")
    console.log(typeof isShowTour)

    const {register, getValues, handleSubmit} = useForm()
    const onSubmitData = (data, e) => {

        const patient = {
            id: data.id,
            date: new Date().toISOString().split('T')[0],
            sex: gender,
            errorThreshold: threhold,
        };
        e.preventDefault()
        dispatch(setSex(gender))
        dispatch(setPatientID(data.id))
        dispatch(setErrorThreshold(threhold))
        // addPatient(patient);
        // console.log(sex)
        // add it to local storage (in context)
        addPatient({
            id: data.id,
            date: new Date().toISOString().split('T')[0],
            sex: gender,
            errorThreshold: threhold,
            photo: "",
        })

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
        <div className={"flex items-center justify-center flex-col gap-5 mt-10"}>
            <h1 className={"text-3xl font-medium"}>Patient Information</h1>
            <p className={"w-[660px] text-xl font-normal text-center"}>Lorem Ipsum is simply dummy text of the printing
                and
                typesetting industry. Lorem Ipsum has been t</p>
            <form className={"flex items-center justify-center flex-col gap-5"} onSubmit={handleSubmit(onSubmitData)}>
                <CardPatient className={"w-[272px] h-[118px] border"}>
                    <h1 className={" text-xl font-medium"}>Patient ID</h1>
                    <input defaultValue={getRand()} {...register("id")} className={"border-b w-full "}
                           placeholder={"number"}/>
                </CardPatient>
                <CardPatient className={"w-[272px] h-[118px] border"}>
                    <h1 className={" text-xl font-medium"}>Sex Selector</h1>
                    <TabsCustume className={"w-full  rounded-md"} setState={setGender} tabs={tabs} state={gender}/>
                </CardPatient>
                <CardPatient className={"w-[272px] h-[118px] border"}>
                    <h1 className={" text-xl font-medium"}>Error Threshold {threhold} (%)</h1>
                    <input value={threhold} onChange={(e) => {
                        setthrehold(e.target.value)
                    }} type={"range"} min={0} max={100}
                           className={"border-b w-full bg-[#544BF0]"}
                           placeholder={"number"}/>

                </CardPatient>
                <ButtonPrimary type={"submit"}>Save & Continue</ButtonPrimary>
            </form>
        </div>
    )
}
