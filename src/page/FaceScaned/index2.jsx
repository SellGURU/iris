import {useNavigate} from "react-router-dom"
import ButtonPrimary from "../../components/button/buttonPrimery"
import ButtonSecondary from "../../components/button/buttonSecondary"

import { useContext} from "react"
import {PatientContext} from "../../context/context.jsx";
import {updateLocalPatientIHistoty} from "../../utility/updateLocalPatientIHistoty.js";
const Result2 =() => {
    const navigate = useNavigate()
    const {
        patientID,
        sex,
        pdf,
        fileId,
        errorThreshold,
        addPatient,
        photo
    } = useContext(PatientContext);
    const download = () => {
        const downloadLink = document.createElement("a");
        downloadLink.href = pdf;
        downloadLink.download = 'download.html';
        downloadLink.click();

    }
    const addPaintion = () => {
        const patient = {
            id: patientID,
            sex: sex,
            errorThreshold: errorThreshold,
            htmlId: fileId,
            photo: photo
        }
        addPatient(patient)       
        updateLocalPatientIHistoty(patient); 
        // const patient = {
        //     id: patientID,
        //     date: new Date().toISOString().split('T')[0],
        //     sex: sex,
        //     errorThreshold: errorThreshold,
        //     photo: photo,
        //     htmlId: 0
        // };
        // updateLocalPatientIHistoty(patient)
        navigate('/')
    }

    return (
        <>
            <div className="w-full">
                <div className="text-center text-[28px] text-[#2E2E2E] font-medium mb-4">Face Scan Completed: View Reports</div>
                <div className="flex justify-center">
                    <div className="text-center text-[18px] text-[#444444] max-w-[850px] mb-4">
                        Here is the preview of your report. Use the top-right buttons to download the PDF or share the document. To remove the report or return to the home page, use the buttons at the bottom.
                    </div>
                </div>
                <div className="w-full justify-between px-12 flex mt-[46px] items-center">
                   <div className="flex justify-start items-center">
                        <div className="text-[#444444] text-[18px] mr-[230px]">Patient ID: {patientID}</div>
                        <div className="text-[#7E7E7E] text-[16px] mr-8">Date: 12 April 2024</div>
                        <div className="text-[#7E7E7E] text-[16px]">Time: 14:40</div>
                   </div>
                   <div className="flex justify-end items-center">
                        <button onClick={() => {
                            navigator.share({
                                url:'https://iris.ainexus.com/v1/golden_ratios/'+fileId
                            })                            
                        }} className="w-[122px] text-[#544BF0] text-[18px] h-[52px] rounded-[12px] bg-[#E8E7F7] flex justify-center items-center">
                            <img className="mr-2" src="share2.svg" alt="" />
                            Share
                        </button>
                        <button onClick={download} className="w-[161px] text-white bg-[#544BF0] text-[18px] h-[52px] rounded-[12px] ml-4 flex justify-center items-center">
                            <img className="mr-2" src="download2.svg" alt="" />
                            Download
                        </button>    

                   </div>
                </div>
                <div className="w-full" >

                    <iframe className="h-[9000px]" src={"https://iris.ainexus.com/v1/golden_ratios/"+fileId}></iframe>
                    </div>                    
            </div>
        </>            
    )
}

export default Result2