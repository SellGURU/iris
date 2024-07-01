import { useNavigate } from "react-router-dom"
import ButtonPrimary from "../../components/button/buttonPrimery"
import ButtonSecondary from "../../components/button/buttonSecondary"
import { useSelector } from "react-redux"
import { selectErrorThreshold, selectPatientID, selectPdf, selectSex, selectphoto } from "../../store/PatientInformationStore"
import { useEffect,useContext } from "react"
import { PatientContext } from "../../context/context.jsx";
import useConstructor from "../../utility/useConstructor.jsx"
import {updateLocalPatientIHistoty} from "../../utility/updateLocalPatientIHistoty.js";

const FaceScaned = () => {
    const navigate =useNavigate()
    const { addPatient } = useContext(PatientContext);
    const pdf = useSelector(selectPdf);
    const photo = useSelector(selectphoto)
    const id = useSelector(selectPatientID)
    const gender = useSelector(selectSex)
    const threhold = useSelector(selectErrorThreshold)
    const download = () => {
        const downloadLink = document.createElement("a");
        downloadLink.href = pdf;
        downloadLink.download = 'download.html';
        downloadLink.click();

    }
    const addPaintion = () => {
        const patient = {
            id: id,
            date: new Date().toISOString().split('T')[0],
            sex: gender,
            errorThreshold: threhold,
            photo:photo,
            htmlId:0
        };
        updateLocalPatientIHistoty(patient)
        addPatient(patient)
        navigate('/')
    }

    return (
        <>
            <div className="w-full overflow-x-hidden overflow-y-hidden">
                <div className="w-full relative z-20 mt-20 h-screen flex justify-center">
                    <div className="w-[546px] h-[681px] px-24 bg-white rounded-[8px] pt-[56px] shadow-2xl">
                        <div className="text-[28px] text-[#2E2E2E] text-center">Face Scanned Successfully</div>
                        <div className="flex justify-center mt-8">
                            <img className="h-[174px]" src={photo} alt="" />
                        </div>
                        <div className="mt-8 text-left">
                            <div className="text-[18px] text-[#444444]">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</div>
                        </div>
                        <div className="text-[#444444] text-[18px] mt-8">Patient ID:  1122334455</div>
                        <div className={"flex items-center justify-between mt-6 gap-5 "}>
                            <ButtonSecondary >
                                {/* <LuUploadCloud/> */}
                                <img src="./fi_share-2.svg" alt="" />
                                SHARE
                            </ButtonSecondary>                            
                            <ButtonPrimary onClick={() => {
                                download()
                            }} >
                                {/* <IoCameraOutline/> */}
                                <img src="./fi_download.svg" alt="" />
                                DOWNLOAD PDF
                            </ButtonPrimary>

                        </div>  
                        <div className="w-full mt-8 flex justify-end">
                            <div onClick={() => {
                                addPaintion()
                            }} className="flex cursor-pointer justify-end text-blue-500 items-center">Go to Home
                               <div className="arrowIcon-1"></div>
                                {/* <img style={{}} className="ml-3" src="./arrow-right.svg" alt="" /> */}
                            </div>

                        </div>                
                        {/* <div id="result"></div> */}
                    </div>
                </div>
                <img className="w-full fixed left-0 top-32" src="./Vector.svg" alt="" />
            </div>
        </>
    )
}

export default FaceScaned