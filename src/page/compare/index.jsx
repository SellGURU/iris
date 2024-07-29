// The FaceScanResult component displays the results of a face scan and provides options to download or share the report.
// It uses the useNavigate hook from react-router-dom to programmatically navigate between routes.
// The component accesses the patient context to retrieve necessary data like patientID, sex, pdf link, fileId, errorThreshold, addPatient function, and photo.
// The download function creates an anchor element to download the PDF report.
// The addPagination function constructs a patient object with the current context values, adds the patient to the context, updates the local storage history, and navigates back to the home page.
// The component renders a header, a description, and buttons for sharing and downloading the report.
// It also displays the current date and time along with the patient ID.
// An iframe is used to embed and display the face scan report using the fileId.

import {useNavigate, useParams} from "react-router-dom"
import { useContext,useState} from "react"
import {PatientContext} from "../../context/context.jsx";
import {updateLocalPatientIHistoty} from "../../utility/updateLocalPatientIHistoty.js";
import {RWebShare} from "react-web-share";
import { Button } from "symphony-ui";
import { PatienCard } from "../ScanHistory/PatienCard.jsx";

const Compare =() => {
    const navigate = useNavigate()
    const {id} = useParams()
    console.log(id)
    const {
        patientID,
        sex,
        pdf,
        fileId,
        errorThreshold,
        addPatient,
        photo
    } = useContext(PatientContext);

     const [comment, setComment] = useState();
    const [textComment,setTextComment] = useState('')    
    const [isShowAddComment, setIsShowAddComment] = useState(false);    
    let patients= JSON.parse(localStorage.getItem("patients"))
    const updateComment=() => {
        let patients= JSON.parse(localStorage.getItem("patients"))
        let patientIndex = patients.findIndex(patient => patient.id === patientID);
        setComment(patients[patientIndex].comment);
    }    

    const getPatients = () => {
        console.log(patients.filter(el =>el.id == id)[0])
       return patients.filter(el =>el.id == id)[0]
    }
    return (
        <>
            <div className="w-full">
                <div className="text-center text-[28px] text-[#2E2E2E] font-medium mb-4">Compare Patient Reports</div>
                <div className="flex justify-center">
                    <div className="text-center text-[18px] text-[#444444] max-w-[850px] mb-4">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been t
                    </div>
                </div>
                <div className="w-full px-11 mt-8">
                    <PatienCard isCompare index={1} patient={getPatients()}></PatienCard>
                </div>
                <div className="w-full px-11 mt-8">
                    {getPatients().result.map(res => {
                        return (
                            <>
                                <iframe className="h-[350px] w-full rounded-[12px] p-2" style={{boxShadow:'0px 0px 12px 0px #00000026'}} src={"https://iris.ainexus.com/v1/golden_ratios/"+res.htmlId}></iframe>
                            
                            </>
                        )
                    })}
                    <div className="w-full flex mt-[48px] justify-end">
                       {/* <button onClick={() => {
                        navigate('/')
                       }}
                               className="w-[161px] text-white bg-[#544BF0] text-[18px] h-[52px] rounded-[12px] ml-4 flex justify-center items-center">
                           Go to Home
                           <div className="ml-2 arrow-right-white" />
                       </button> */}
                       <Button theme="iris-large" onClick={() => {
                        navigate('/')
                       }}>
                           Go to Home
                           <div className="ml-2 arrow-right-white" />
                       </Button>
                    </div>
                </div>                    
            </div>
        </>            
    )
}

export default Compare