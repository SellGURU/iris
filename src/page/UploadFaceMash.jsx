// The UploadFaceMash component allows users to upload a facial image, send it for analysis, and download the resulting report.
// It uses useState to manage local states such as resolvedFile for the uploaded image, resp for the analysis response, and access for the token from local storage.
// useSelector is used to access the sex and errorThreshold values from the Redux store.
// The download function creates an anchor element to download the analysis report as an HTML file and resets the resolvedFile and resp states.
// The sendToAnalyze function sends the uploaded image and additional data to the server for analysis via an XMLHttpRequest, displays a loading toast during the request, and processes the server response to provide download links for the report.
// The component renders an upload section where users can select an image, an ANALYZE button to initiate the analysis, and a Download File button to download the analysis report once available.
// It uses a file input element to allow users to upload an image, and a FileReader to read the file as a data URL for display.
import {TabsCustume} from "../components/tabs/tabs.jsx";
import { useEffect, useState,useContext } from "react";
import {LoadingReports} from "./loadingReports.jsx";
import { toast } from "react-toastify";
// import Analytics from "../api/analytics"
import {updateLocalPatientIHistoty} from "../utility/updateLocalPatientIHistoty.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {useLocalStorage} from "@uidotdev/usehooks";
import { Button } from "symphony-ui";
import {PatientContext} from '../context/context.jsx'
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { selectSex,selectErrorThreshold } from "../store/PatientInformationStore";
const UploadFaceMash = () => {
    const tabs = [
        {state: "multi", label: "All poses"},
        {state: "one", label: "Single pose"}
    ];
    const appContext = useContext(PatientContext)
    const {
        patientID,
        setPdf,
        setFile,
        setPhoto,
        addPatient
    } = useContext(PatientContext);    
    const navigate = useNavigate();
    const [status, setStatus] = useState("one")    
    const [resolvedFile,setResolvedFile] = useState('')
    const sex = useSelector(selectSex);
    const errorThreshold = useSelector(selectErrorThreshold);    
    const [access] = useLocalStorage("token");
    const [resp,setResp] =useState('')
    const download = () => {
        const downloadLink = document.createElement("a");
        downloadLink.href = resp;
        downloadLink.download = 'download.html';
        downloadLink.click();
        setResolvedFile("")
        setResp("")
    }
    const sendToAnalyze = () => {
        // let frontal_image_input = document.getElementById('upload-file');
        // console.log(frontal_image_input.files[0])
        // Analytics.faceMash({
        //     body:{
        //         gender:'masculine',
        //         error_threshold:10,
        //         frontal_current:resolvedFile
        //         // frontal_current_file:frontal_image_input.target.files[0]
        //     }
        // })
        let xhr = new XMLHttpRequest();
        xhr.open('POST','https://iris.ainexus.com/api/v1/analyze', true);
        // toast.loading("pending ...")
        setIsLoadingResult(true)
        xhr.onload = function (e) {
            // console.log(e)
            
            let response = JSON.parse(e.target.responseText);
            let result = document.getElementById("result")
            let resultHtmldiv = document.createElement('div');
            let resultLink = document.createElement('a');
            resultHtmldiv.appendChild(resultLink);
            // resultLink.innerHTML = "View Detailed Report";
            resultLink.href = 'golden_ratios/' + response["request_id"];
            resultLink.target = "_blank";
            resultHtmldiv.innerHTML += "&emsp;";
            let resultHtml = document.createElement('a');
            resultHtmldiv.appendChild(resultHtml);
            resultHtml.innerHTML = "Download Report HTML File";
            resultHtml.href = 'data:text/html;base64,' + response['html_file'];
            setResp('data:text/html;base64,' + response['html_file'])
            setPdf('data:text/html;base64,' + response['html_file'])
            setPhoto(resolvedFile)
            setFile(response['request_id'])
            appContext.package.usePackage()
            const patient = {
                id: patientID,
                sex: sex,
                errorThreshold: errorThreshold,
                htmlId: response['request_id'],
                photo: resolvedFile
            }
            addPatient(patient)
            updateLocalPatientIHistoty(patient);
            navigate('/result')            
            resultHtml.download = 'golden_ratios.html';
            resultHtmldiv.innerHTML += "<br><br>";
            // result.append(resultHtmldiv);    
            toast.dismiss()       
        }
        let fileData = new FormData();
        fileData.append('error_threshold', errorThreshold);
        fileData.append('gender', sex);
        fileData.append('frontal_current', resolvedFile.split(',')[1]);
        xhr.setRequestHeader(
                "Authorization",
                `Bearer ${access}`
            );    
        // xhr.setRequestHeader('Authorization', 'Bearer ' +localStorage.getItem("token"))
        xhr.send(fileData);
    }
    const [showAnimate,setShowAniamte] = useState(false)
    // useEffect(() => {
    //     setTimeout(() => {
    //         if(resolvedFile == ''){
    //             setShowAniamte(true)
    //         }
    //     }, 3000);
    //     if(resolvedFile != ''){
    //         setShowAniamte(false)
    //     }        
    // })
    const [isLoadingResult, setIsLoadingResult] = useState(false);
    return (
        <>
            <div className={`${!isLoadingResult && "hidden"}`}><LoadingReports/></div>        
            <div className={`${isLoadingResult && "hidden"}`}>
                    <div
                        className={`flex flex-col gap-4 pb-5 pt-10 items-center justify-center `}>
                        <div className="px-12 w-full flex justify-start">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link underline="hover"  className="text-primary-color" href="/">
                                    Home
                                </Link>
                                <Typography className="text-primary-color" >Face Scanner</Typography>
                            </Breadcrumbs>                

                        </div>                         
                        <h1 className={"text-3xl font-medium"}>Face Scanner</h1>
                        <p className={"text-lg text-center w-full px-24 text-[#444444] font-normal"}>Ensure your image is less than 2MB in JPEG or PNG format. Use a plain, light background, and make sure the image is clear and recent (within 6 months). Your face must be fully visible with no glasses, hats, or headgear, and hair should not cover your face. Only single pose and front-facing images are accepted.</p>


                        <TabsCustume disable tabs={tabs} setState={setStatus} state={status}/>
                    </div>

                    <div className="flex justify-center w-full">
                        <div onClick={() => {
                            document.getElementById('fileUploader').click()
                        }} className="w-[660px]  relative overflow-hidden h-[554px] bg-[#D9D9D9] rounded-[8px] flex justify-center items-center">
                                <div className="grid grid-cols-1 ">
                                    <div className="flex self-center justify-center">
                                        <img className="w-[108px]  " src={"/image/cameraPluse.svg"} alt="camera"/>

                                    </div>
                                    <div className="text-[#7E7E7E]">Drag & drop image here or <span className="text-primary-color cursor-pointer">Choose</span> </div>
                                    <input onChange={(e) => {
                                    var file = e.target.files[0];
                                    var reader = new FileReader();
                                    reader.onloadend = function () {
                                        setResolvedFile(reader.result)
                                    }
                                    reader.readAsDataURL(file);
                            }} accept="image/png, image/jpeg" type="file" id="fileUploader" className="invisible w-full h-full absolute bottom-0" />                                
                                </div>
                        </div>

                        <div onClick={() => {
                            document.getElementById('fileUploader').click()
                            // setShowAniamte(false)
                        }} className={`w-[229px] overflow-hidden relative border-4 ${showAnimate? 'animate-bounce':''} border-none h-[174px] bg-[#D9D9D9] rounded-[8px] ml-4`}>
                            <div className="text-[#444444] absolute top-2 left-2">1.Front</div>

                            <img className="object-cover" src={resolvedFile} alt="" />
                        </div>
                    </div>
                    
                    <div className="flex justify-center w-full">
                        {
                            resolvedFile!= '' &&
                            <div className={"flex items-center  justify-center gap-5 w-[660px] mt-4"}>
                                    <Button onClick={() => {
                                        // analyzeFacemesh()
                                        sendToAnalyze()
                                        }} theme="iris-large">
                                        <img className="mr-2" src="./icons/print.svg"></img>
                                        Print or Save                         
                                    </Button>                  
                            </div>      
                        }
                        <div className="w-[229px]"></div>          
                    </div>
        

            </div>
        </>
    )
}

export default UploadFaceMash