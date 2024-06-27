import { useState } from "react";
import { toast } from "react-toastify";
// import Analytics from "../api/analytics"
import { useSelector } from "react-redux";
import {useLocalStorage} from "@uidotdev/usehooks";
import { selectSex,selectErrorThreshold } from "../store/PatientInformationStore";
const UploadFaceMash = () => {
    const [resolvedFile,setResolvedFile] = useState('')
    const sex = useSelector(selectSex);
    const errorThreshold = useSelector(selectErrorThreshold);    
    const [access] = useLocalStorage("token");
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
        toast.loading("pending ...")
        
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
            resultHtml.download = 'golden_ratios.html';
            resultHtmldiv.innerHTML += "<br><br>";
            result.append(resultHtmldiv);    
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
    return (
        <>
            <div className="flex justify-center w-full">
                {/* <h3>single file</h3> */}
                <div
                    className="upload upload-start0 demo-card-square mdl-color--white mdl-shadow--2dp mdl-cell mdl-cell--4-col block mdl-grid">
                    <div className="mdl-card__title mdl-card--expand">
                        <h6>Current Image</h6>
                    </div>
                    <div className="mdl-card__title" id="currImage0">
                        <img className="upload-placeholder" src={resolvedFile== ''?"/image/upload-placeholder.png":resolvedFile} id="image-picked0" width="512"
                            height="512" />
                    </div>
                    <div className="mdl-card__supporting-text" id="curr-upload-text0">
                        Upload an image of your face here (frontal view)
                    </div>
                    <div className="mdl-card__actions mdl-card--border">
                        <form role="form"  method="POST" id="upload-form0">
                            <div className="form-group">
                                <input id="upload-file0" onChange={(e) => {
                                    var file = e.target.files[0];
                                    var reader = new FileReader();
                                    reader.onloadend = function() {
                                        // console.log('RESULT', reader.result)
                                        setResolvedFile(reader.result)
                                    }
                                    reader.readAsDataURL(file);
                            }} type="file" accept="image/*"  />
                            </div>
                            <div id="file-list-display0"></div>
                        </form>
                    </div>
                </div>
            </div>
            <div className="w-full flex mt-5 justify-center">
                <button onClick={sendToAnalyze} disabled={resolvedFile ==''?true:false} className="w-[150px] h-10 bg-blue-600 text-white">ANALYZE</button>
            </div>
            {/* <input onChange={(e) => {
                var file = e.target.files[0];
                var reader = new FileReader();
                reader.onloadend = function() {
                    // console.log('RESULT', reader.result)
                    setResolvedFile(reader.result)
                }
                reader.readAsDataURL(file);
            }} id="upload-file" type="file"></input>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() =>sendToAnalyze()}>send</button>
            <div id="result"></div> */}
            <div id="result"></div>
        </>
    )
}

export default UploadFaceMash