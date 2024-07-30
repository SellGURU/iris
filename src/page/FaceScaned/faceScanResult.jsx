// The FaceScanResult component displays the results of a face scan and provides options to download or share the report.
// It uses the useNavigate hook from react-router-dom to programmatically navigate between routes.
// The component accesses the patient context to retrieve necessary data like patientID, sex, pdf link, fileId, errorThreshold, addPatient function, and photo.
// The download function creates an anchor element to download the PDF report.
// The addPagination function constructs a patient object with the current context values, adds the patient to the context, updates the local storage history, and navigates back to the home page.
// The component renders a header, a description, and buttons for sharing and downloading the report.
// It also displays the current date and time along with the patient ID.
// An iframe is used to embed and display the face scan report using the fileId.

import {useNavigate} from "react-router-dom"
import { useContext,useState} from "react"
import {PatientContext} from "../../context/context.jsx";
import {updateLocalPatientIHistoty} from "../../utility/updateLocalPatientIHistoty.js";
import {RWebShare} from "react-web-share";
import { Button } from "symphony-ui";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

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
        // const downloadLink = document.createElement("a");
        // downloadLink.href = pdf;
        // downloadLink.download = 'download.html';
        // downloadLink.click();
        var mywindow = window.open('', 'PRINT', 'height=400,width=600');
        // console.log(document.getElementById('reported'))
        mywindow.document.write('<html><head><title>' + document.title  + '</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write('<h1>' + document.title  + '</h1>');
        mywindow.document.write(document.getElementById('reported').innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

        return true;
    }
     const [comment, setComment] = useState();
    const [textComment,setTextComment] = useState('')    
    const [isShowAddComment, setIsShowAddComment] = useState(false);    
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
    const updateComment=() => {
        let patients= JSON.parse(localStorage.getItem("patients"))
        let patientIndex = patients.findIndex(patient => patient.id === patientID);
        setComment(patients[patientIndex].comment);
    }    
    const formHandler = () => {
        if(textComment.length>0){
            const patients= JSON.parse(localStorage.getItem("patients"))
            const patientIndex = patients.findIndex(patient => patient.id === patientID);

            patients[patientIndex].comment.push(textComment)
            localStorage.setItem("patients", JSON.stringify(patients));
            setIsShowAddComment(false)
            updateComment()
            setTextComment("")
        }else {
            setIsShowAddComment(false)
        }
    }    
    const date = new Date();
    return (
        <>
            <div className="w-full">
                {/* <div onClick={() => {
                    navigate('/')
                }} className="text-primary-color text-[14px] cursor-pointer px-12 my-10">{`Home > Face Scanner > View Report`}</div> */}
               <div className="px-12">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover"  className="text-primary-color" href="/">
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            href="/#/facecamera"
                            
                            className="text-primary-color" 
                        >
                            Face Scanner
                        </Link>
                        <Typography className="text-primary-color" >View Report</Typography>
                    </Breadcrumbs>                

               </div>
                <div className="text-center text-[28px] text-[#2E2E2E] font-medium mb-4">Face Scan Completed</div>
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
                   <div className="flex justify-end gap-4 items-center">
                        <Button onClick={() => {
                            setIsShowAddComment(true)
                        }} theme="iris-tertiary-large">
                            <img className="mr-2" src={'./fi_plus-blue.svg'} />
                            Add Comment
                        </Button>                    
                       <RWebShare data={{
                           text: "iris",
                           url: 'https://iris.ainexus.com/v1/golden_ratios/' + fileId,
                           title: "iris",
                       }}>
                           {/* <button onClick={() => {
                               navigator.share({
                                   url: 'https://iris.ainexus.com/v1/golden_ratios/' + fileId
                               })
                           }}
                                   className="w-[122px] border border-[#544BF0]  text-[#544BF0] text-[18px] h-[52px] rounded-[12px] bg-[#544BF00A] flex justify-center items-center">
                               <img className="mr-2" src="share2.svg" alt=""/>
                               Share
                           </button> */}

                           <Button  onClick={() => {
                               navigator.share({
                                   url: 'https://iris.ainexus.com/v1/golden_ratios/' + fileId
                               })                            
                           }} theme='iris-secondary-large'>
                               <img className="mr-2" src="share2.svg" alt=""/>
                               Share                            
                           </Button>
                       </RWebShare>
                       <Button onClick={download} theme="iris-large">
                           <img className="mr-2" src="print.svg" alt=""/>
                           Print Report
                       </Button>
                       {/* <button onClick={download}
                               className="w-[161px] text-white bg-[#544BF0] text-[18px] h-[52px] rounded-[12px] ml-4 flex justify-center items-center">
                           <img className="mr-2" src="print.svg" alt=""/>
                           Print Report
                       </button> */}

                   </div>
                </div>
                {isShowAddComment &&
                    <div>
                        <div className={"w-full px-12 flex items-center justify-center"}>
                            <div className={" px-5 pt-5 w-full flex items-end gap-5 justify-end border-b pb-2"}>
                                <input value={textComment} onChange={(el) => {
                                    setTextComment(el.target.value)
                                }} placeholder={"Your comment ..."} className={" w-full border-none-focus  p-2  "}/>
                                {/* <ButtonPrimary disabled={textComment.length == 0? true:false}  onClickHandler={() => {
                                    formHandler()                                       
                                }} className={"!text-xs !px-4 !py-2.5"}>
                                    Add Comment
                                </ButtonPrimary> */}
                                <div className="w-full flex justify-end">
                                    <Button disabled={textComment.length == 0} onClick={() => {
                                        formHandler()
                                    }} theme="iris-small">
                                        Add Comment
                                    </Button>

                                </div>
                            </div>
                        </div>                    
                    </div>
                }
                <div className="w-full px-11 mt-8">

                    <iframe id="reported" className="h-[3000px] w-full rounded-[12px] p-2" style={{boxShadow:'0px 0px 12px 0px #00000026'}} src={"https://iris.ainexus.com/v1/golden_ratios/"+fileId}></iframe>
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

export default FaceScanResult