import { useState } from "react";
import { toast } from "react-toastify";
// import Analytics from "../api/analytics"

const UploadFaceMash = () => {
    const [resolvedFile,setResolvedFile] = useState('')
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
        fileData.append('error_threshold', 10);
        fileData.append('gender', 'masculine');
        fileData.append('frontal_current', resolvedFile.split(',')[1]);
        xhr.setRequestHeader('Authorization', 'Bearer ' +localStorage.getItem("token"))
        xhr.send(fileData);
    }
    return (
        <>
            <div>
                {/* <h3>single file</h3> */}

                <input onChange={(e) => {
                    var file = e.target.files[0];
                    var reader = new FileReader();
                    reader.onloadend = function() {
                        // console.log('RESULT', reader.result)
                        setResolvedFile(reader.result)
                    }
                    reader.readAsDataURL(file);
                }} id="upload-file" type="file"></input>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() =>sendToAnalyze()}>send</button>
                <div id="result"></div>
            </div>
        </>
    )
}

export default UploadFaceMash