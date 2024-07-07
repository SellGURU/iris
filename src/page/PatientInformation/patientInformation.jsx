import {CardPatient} from "./component/card.jsx";
import {TabsCustume} from "../../components/tabs/tabs.jsx";
import {useState, useContext} from "react";
import {PatientContext} from "../../context/context.jsx";
import {useForm} from "react-hook-form";
import ButtonPrimary from "../../components/button/buttonPrimery.jsx";
import {useNavigate} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";
import {updateLocalPatientIHistoty} from "../../utility/updateLocalPatientIHistoty.js";


export const PatientInformation = () => {
    const {addPatient} = useContext(PatientContext);

    const navigate = useNavigate();
    const [gender, setGender] = useState("masculine");
    const [threhold, setthrehold] = useState(10)
    // const { addPatient } = useContext(PatientContext);
    const tabs = [
        {state: "masculine", label: "Masculine"},
        {state: "feminine", label: "Feminine"},
    ]
    const {
        setSex,
        setPatientID,
        setErrorThreshold,
    } = useContext(PatientContext);
    // const dispatch = useDispatch();
    // const sex = useSelector(selectSex);
    // const patientID = useSelector(selectPatientID);
    // const errorThreshold = useSelector(selectErrorThreshold);

    const [isShowTour,] = useLocalStorage("tour")

    const {register, getValues, handleSubmit} = useForm()
    const onSubmitData = (data, e) => {


        e.preventDefault()
        setSex(gender)
        setPatientID(data.id)
        setErrorThreshold(threhold)
        // addPatient(patient);
        // add it to local storage (in context)
        const patient = {
            id: data.id,
            sex: gender,
            errorThreshold: threhold,
            htmlId: 0,
            photo: ""
        }
        addPatient(patient)
        updateLocalPatientIHistoty(patient);
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
            <img className="w-full  fixed z-10 left-0 top-32" src="./Vector.svg" alt=""/>
            <div className={" absolute w-full  z-50"}>
                <div className={"flex w-full h-1/2 items-center mt-10 justify-center flex-col gap-5"}>
                    <h1 className={"text-3xl font-medium"}>Patient Information</h1>
                    <p className={"w-[660px] text-xl font-normal text-center"}>Lorem Ipsum is simply dummy text of the
                        printing
                        and
                        typesetting industry. Lorem Ipsum has been t</p>
                    <form className={"flex relative z-50 items-center justify-center flex-col gap-5"}
                          onSubmit={handleSubmit(onSubmitData)}>
                        <CardPatient className={"w-[600px] bg-white  z-20 h-[88px] border"}>
                            <div className="flex w-full justify-between items-center">
                                <h1 className={"w-[200px] text-xl font-medium"}>Patient ID</h1>
                                <input defaultValue={getRand()} {...register("id")}
                                       className={"border-b outline-none h-10 w-full "}
                                       placeholder={"Enter Patient ID"}/>

                            </div>
                        </CardPatient>
                        <CardPatient className={"w-[600px] bg-white h-[118px] border"}>
                            <div className="flex w-full justify-between items-center">
                                <h1 className={" text-xl w-[200px] font-medium"}>Sex Selector</h1>
                                <TabsCustume className={"w-full  rounded-md"} setState={setGender} tabs={tabs}
                                             state={gender}/>
                            </div>
                        </CardPatient>
                        {/* <CardPatient className={"w-[272px] h-[118px] border"}>
                    <h1 className={" text-xl font-medium"}>Error Threshold {threhold} (%)</h1>
                    <input value={threhold} onChange={(e) => {
                        setthrehold(e.target.value)
                    }} type={"range"} min={0} max={100}
                           className={"border-b w-full bg-[#544BF0]"}
                           placeholder={"number"}/>

                </CardPatient> */}
                        <ButtonPrimary className={"h-[52px] rounded-[12px]"} type={"submit"}>Save &
                            Continue</ButtonPrimary>
                    </form>

                </div>
            </div>

        </>
    )
}
