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
import Analytics from "../api/analytics.js";
import Link2 from '@mui/material/Link';
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
        setReport,
        addPatient
    } = useContext(PatientContext);    
    const navigate = useNavigate();
    const [status, setStatus] = useState("one")    
    const [resolvedFile,setResolvedFile] = useState('')
    const [orgs,] = useLocalStorage("orgData")
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
            appContext.package.usePackage()
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
    let [partyId] = useLocalStorage("partyid");
    const analyzeFacemesh2 = () => {
        // toast.loading("pending ...")
        Analytics.analyticsImage({
            client_id:patientID,
            error_threshold:errorThreshold,
            frontal_current:resolvedFile.split(',')[1],
            orgSCode: JSON.parse(orgs).orgSCode,
            orgCode:JSON.parse(orgs).orgCode,
            rdataKey:"analysis",
            scanType:"img_upload"
        }).then(res => {
            console.log(res)
            if(res.data.data){
                appContext.package.usePackage()
                setPdf('data:text/html;base64,' + res.data.data.html_file)
                setPhoto(resolvedFile.split(',')[1])
                setFile(res.data.data.request_id)
                setReport(res.data)
                const patient = {
                    id: patientID,
                    sex: sex,
                    errorThreshold: errorThreshold,
                    htmlId: res.data.data.request_id,
                    photo: resolvedFile,
                    imageMode:'Uploaded image'                    
                }
                addPatient(patient)
                updateLocalPatientIHistoty(patient);
                navigate('/result')             

            }
        })
        setIsLoadingResult(true)
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
                        <h1 className={"text-[28px] mt-[0px] md:mt-[-60px] font-medium"}>Face Scanner</h1>
                        <p className={" text-[15px]   xl:text-[18px] max-w-[830px] xl:max-w-full px-[24px] text-center font-normal"}>Please upload photos of your face from the left, right, and front to ensure a complete analysis.{"  "}
                            <Link2 href="/#/tour" underline="hover" className="text-primary-color block cursor-pointer">  How to scan a face?</Link2>
                            {/* <span onClick={() => {
                                navigate('/tour')
                            }} className="cursor-pointer hidden md:block ml-1"><img src={"./icons/info-circle.svg"}/></span> */}
                        </p>


                        {/* <TabsCustume disable tabs={tabs} setState={setStatus} state={status}/> */}
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="block md:flex justify-center w-[507px] md:w-full">
                            <div onClick={() => {
                                document.getElementById('fileUploader').click()
                            }} className="w-[507px]  h-[380px] xl:h-[430px]  relative overflow-hidden  bg-[#D9D9D9] rounded-[8px] flex justify-center items-center">
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
                            }} className={`w-[157px] overflow-hidden relative border-4 ${showAnimate? 'animate-bounce':''} border-none h-[133px] bg-[#D9D9D9] mt-4 md:mt-[0px] rounded-[8px] md:ml-4`}>
                                <div className="text-[#444444] absolute top-2 left-2">1.Front</div>

                                <img className="object-cover" src={resolvedFile} alt="" />
                            </div>
                        </div>

                    </div>
                    
                    <div className="flex justify-center w-full">
                        {
                            resolvedFile!= '' &&
                            <div className={"flex items-center  justify-center gap-5 w-full mt-4"}>
                                    <Button onClick={() => {
                                        // analyzeFacemesh()
                                        // sendToAnalyze()
                                        analyzeFacemesh2()
                                        }} theme="iris">
                                        <img className="mr-2" src="./icons/print.svg"></img>
                                        Finish                       
                                    </Button>                  
                            </div>      
                        }
                        {/* <div className="w-[0px] ml-4 md:w-[157px]"></div>           */}
                    </div>
        

            </div>
        </>
    )
}

export default UploadFaceMash