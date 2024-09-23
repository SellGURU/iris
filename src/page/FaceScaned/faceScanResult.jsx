// The FaceScanResult component displays the results of a face scan and provides options to download or share the report.
// It uses the useNavigate hook from react-router-dom to programmatically navigate between routes.
// The component accesses the patient context to retrieve necessary data like patientID, sex, pdf link, fileId, errorThreshold, addPatient function, and photo.
// The download function creates an anchor element to download the PDF report.
// The addPagination function constructs a patient object with the current context values, adds the patient to the context, updates the local storage history, and navigates back to the home page.
// The component renders a header, a description, and buttons for sharing and downloading the report.
// It also displays the current date and time along with the patient ID.
// An iframe is used to embed and display the face scan report using the fileId.

import {useNavigate} from "react-router-dom"
import { useContext,useEffect,useState} from "react"
import {PatientContext} from "../../context/context.jsx";
import {updateLocalPatientIHistoty} from "../../utility/updateLocalPatientIHistoty.js";
import {RWebShare} from "react-web-share";
import { Button } from "symphony-ui";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Application from "../../api/Application.js";
import { useLocalStorage } from "@uidotdev/usehooks";

const FaceScanResult =() => {
    const navigate = useNavigate()
    const {
        patientID,
        sex,
        pdf,
        fileId,
        errorThreshold,
        addPatient,
        photo,
        setPdf
    } = useContext(PatientContext);
    const download = () => {
        // const downloadLink = document.createElement("a");
        // downloadLink.href = pdf;
        // downloadLink.download = 'download.html';
        // downloadLink.click();
        var mywindow = window.open('', 'PRINT', 'height=400,width=600');
        // // console.log(document.getElementById('reported'))
        mywindow.document.write('<html><head><title>' + document.title  + '</title>');
        mywindow.document.write('</head><body >');
        mywindow.document.write('<h1>' + document.title  + '</h1>');
        mywindow.document.write(document.getElementById('mydiv').innerHTML);
        mywindow.document.write('</body></html>');

        mywindow.document.close(); // necessary for IE >= 10
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();
        // window.frames["reported"].focus();
        // window.frames["reported"].print();
        // document.getElementById("mydiv").contentWindow.print();
    // document.getElementById('reported').contentWindow.print();
        // return false;        
        return true;
        // var decodedHTML = window.atob(pdf.replace("data:text/html;base64,",''));
        // console.log(pdf.replace("data:text/html;base64,",''))
        // document.getElementById("mydiv").innerHTML = decodedHTML;
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
    const resolvePdf =() => {
        var decodedHTML = window.atob(pdf.replace("data:text/html;base64,",''));
        document.getElementById("mydiv").innerHTML = decodedHTML;
    }
    useEffect(() => {
        if(pdf.length>100){
            resolvePdf()
        }
    })
    
    const [orgs,] = useLocalStorage("orgData")
    const updateComment=() => {
        let patients= JSON.parse(localStorage.getItem("patients"))
        let patientIndex = patients.findIndex(mypatient => mypatient.client_info.clientCode === patientID);
        setComment(patients[patientIndex].comments);
    }    
    const formHandler = () => {
        if(textComment.length>0){
            Application.addComment({
                client_id:patientID,
                orgCode: JSON.parse(orgs).orgCode,
                orgSCode: JSON.parse(orgs).orgSCode,
                comment_text: textComment                
            }).then(res => {
            })
            const patients= JSON.parse(localStorage.getItem("patients"))
            console.log(patients)
            const patientIndex = patients.findIndex(mypatient => mypatient.client_info.clientCode === patientID);
            console.log(patientIndex)
            const newComment = {
                cCode: "0e966eff-8e4e-43b2-bf9e-6a7a8414d63b",
                cText: textComment ,
                cTextDateTime: new Date().toISOString()
            };
            if(patients[patientIndex]){
                if (patients[patientIndex].comments) {
                    patients[patientIndex].comments.push(newComment);
                } else {
                    patients[patientIndex].comments = [newComment]; // Initialize the comment array if it does not exist
                }
            }
            localStorage.setItem("patients", JSON.stringify(patients));
            setIsShowAddComment(false)
            updateComment()
            setTextComment("")
        }else {
            setIsShowAddComment(false)
        }
    }    
    useEffect(() => {
        console.log(patientID)
        // Application.getScanDetails({
        //     scanCode: "c1e8404b-ee23-487f-b4f8-6c02409ab623",
        //     orgCode: "4ViHoPV6r+Yjl9YHqd36cA==",
        //     orgSCode: "Tl150F+gj04xE0AaJfJo1A==",
        //     client_id: "617219"
        // }).then((res) => {
        //     console.log(res)
        //     setPdf(res.data.html_file)
        //     resolvePdf()
        // })
    })
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
                    <div className="text-justify text-[18px] text-[#444444] w-[600px] md:max-w-[850px] mb-4">
                        Here is the preview of your report. Use the top-right buttons to download the PDF or share the document. To remove the report or return to the home page, use the buttons at the bottom.
                    </div>
                </div>
                <div className="w-full justify-between px-12 flex mt-[46px] items-center">
                   <div className="md:flex justify-start items-center">
                        <div className="text-[#444444] text-[18px] mr-[230px]">Client ID: {patientID}</div>
                        <div className="text-[#7E7E7E] text-[14px] mr-8 flex items-center justify-center"><p>Date:</p> <p className={"text-[14px] ml-1 mt-[2px]"}>{date.getDate()+"   "+date.toLocaleString('default', { month: 'long' })+"   "+date.getFullYear()}</p></div>
                        <div className="text-[#7E7E7E] text-[14px] flex items-center justify-center"><p>Time:</p> <p className={"text-[14px] ml-1 mt-[2px]"}>{date.getHours()}:{date.getMinutes()}</p></div>
                   </div>
                   <div className="flex-col md:flex-row flex justify-end gap-4 items-center">
                        <Button onClick={() => {
                            setIsShowAddComment(true)
                        }} theme="iris-tertiary">
                            <div  className="pelusicon tirtryIconHover bg-primary-color"/>
                            {/* <img className="mr-2" src={'./fi_plus-blue.svg'} /> */}
                            Add Comment
                        </Button>                    
                       {/* <RWebShare data={{
                           text: "iris",
                           url: 'https://iris.ainexus.com/v1/golden_ratios/' + fileId,
                           title: "iris",
                       }}>


                           <Button  onClick={() => {
                               navigator.share({
                                   url: 'https://iris.ainexus.com/v1/golden_ratios/' + fileId
                               })                            
                           }} theme='iris-secondary'>
                               <img className="mr-2" src="share2.svg" alt=""/>
                               Share                            
                           </Button>
                       </RWebShare> */}
                       <Button onClick={download} theme="iris">
                           <img className="mr-2" src="print.svg" alt=""/>
                           Finish 
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
                                        {textComment.length>0?
                                        'Save'
                                        :
                                        'Add Comment'
                                        }
                                    </Button>

                                </div>
                            </div>
                        </div>                    
                    </div>
                }
                <div className="w-full px-11 mt-8">
                    {/* <img src={pdf} /> */}
                    {pdf.length> 10 ?
                    <div id="mydiv"></div>
                    :
                    <iframe id="reported" name="reported" className="h-[3000px] w-full rounded-[12px] p-2" style={{boxShadow:'0px 0px 12px 0px #00000026'}} src={"https://iris.ainexus.com/v1/golden_ratios/"+fileId}></iframe>
                    }
                    <div id="mydiv"></div>
                    {/* <html>{pdf}</html> */}
                    <div className="w-full flex mt-[48px] justify-end">
                       {/* <button onClick={() => {
                        navigate('/')
                       }}
                               className="w-[161px] text-white bg-[#544BF0] text-[18px] h-[52px] rounded-[12px] ml-4 flex justify-center items-center">
                           Go to Home
                           <div className="ml-2 arrow-right-white" />
                       </button> */}
                       <Button theme="iris" onClick={() => {
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