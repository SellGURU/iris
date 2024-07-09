// The FaceScanResult component displays the results of a face scan and provides options to download or share the report.
// It uses the useNavigate hook from react-router-dom to programmatically navigate between routes.
// The component accesses the patient context to retrieve necessary data like patientID, sex, pdf link, fileId, errorThreshold, addPatient function, and photo.
// The download function creates an anchor element to download the PDF report.
// The addPagination function constructs a patient object with the current context values, adds the patient to the context, updates the local storage history, and navigates back to the home page.
// The component renders a header, a description, and buttons for sharing and downloading the report.
// It also displays the current date and time along with the patient ID.
// An iframe is used to embed and display the face scan report using the fileId.

import {useNavigate} from "react-router-dom"
import { useContext} from "react"
import {PatientContext} from "../../context/context.jsx";
import {updateLocalPatientIHistoty} from "../../utility/updateLocalPatientIHistoty.js";
import {RWebShare} from "react-web-share";

const FaceScanResult =() => {
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
        console.log("result")
        updateLocalPatientIHistoty(patient);
        navigate('/')
    }
    const date = new Date();
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
                        <div className="text-[#7E7E7E] text-[16px] mr-8">Date: {date.getDate()+"   "+date.toLocaleString('default', { month: 'long' })+"   "+date.getFullYear()}</div>
                        <div className="text-[#7E7E7E] text-[16px]">Time: {date.getHours()}:{date.getMinutes()}</div>
                   </div>
                   <div className="flex justify-end items-center">
                       <RWebShare data={{
                           text: "iris",
                           url: 'https://iris.ainexus.com/v1/golden_ratios/' + fileId,
                           title: "iris",
                       }}>
                           <button onClick={() => {
                               navigator.share({
                                   url: 'https://iris.ainexus.com/v1/golden_ratios/' + fileId
                               })
                           }}
                                   className="w-[122px] text-[#544BF0] text-[18px] h-[52px] rounded-[12px] bg-[#E8E7F7] flex justify-center items-center">
                               <img className="mr-2" src="share2.svg" alt=""/>
                               Share
                           </button>
                       </RWebShare>
                       <button onClick={download}
                               className="w-[161px] text-white bg-[#544BF0] text-[18px] h-[52px] rounded-[12px] ml-4 flex justify-center items-center">
                           <img className="mr-2" src="download2.svg" alt=""/>
                           Download
                       </button>

                   </div>
                </div>
                <div className="w-full px-11 mt-8">

                    <iframe className="h-[9000px]" src={"https://iris.ainexus.com/v1/golden_ratios/"+fileId}></iframe>
                    </div>                    
            </div>
        </>            
    )
}

export default FaceScanResult