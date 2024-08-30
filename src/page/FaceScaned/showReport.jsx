/* eslint-disable react/prop-types */
import { useConstructor } from "../../help"
import Application from "../../api/Application"
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { Button } from "symphony-ui";
import {RWebShare} from "react-web-share";
import { useLocalStorage } from "@uidotdev/usehooks";

const ShowReport = (props) => {
    const [searchParams] = useSearchParams();
    const [isLoading,setIsLoading] = useState(true)
    const [date,setDate] = useState(new Date())
    const [orgs,] = useLocalStorage("orgData")
    useConstructor(() => {
        Application.getScanDetails({
            scanCode: searchParams.get("scanId"),
            orgCode: JSON.parse(orgs).orgCode,
            orgSCode: JSON.parse(orgs).orgSCode,
            client_id: searchParams.get("clientId")
        }).then((res) => {
            console.log(res)
            setIsLoading(false)
            setDate(new Date(res.data.data.timestamp))
            var decodedHTML = window.atob(res.data.data.html_file);
            document.getElementById("mydiv").innerHTML = decodedHTML;
        })
    })
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
    return (
        <>
            <div>
                <div className={`${isLoading && "hidden"}`}>
                    {!props?.smallReport &&
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
                                    <div className="text-center text-[28px] text-[#2E2E2E] font-medium mb-4">Face Scan Completed</div>
                                    <div className="flex justify-center">
                                        <div className="text-center text-[18px] text-[#444444] w-[600px] md:max-w-[850px] mb-4">
                                            Here is the preview of your report. Use the top-right buttons to download the PDF or share the document. To remove the report or return to the home page, use the buttons at the bottom.
                                        </div>
                                    </div>

                                <div className="w-full justify-between mb-4 flex mt-[46px] items-center">
                                <div className="md:flex justify-start items-center">
                                        <div className="text-[#444444] text-[18px] mr-[230px]">Patient ID: {searchParams.get("clientId")}</div>
                                        <div className="text-[#7E7E7E] text-[16px] mr-8">Date: {date.getDate()+"   "+date.toLocaleString('default', { month: 'long' })+"   "+date.getFullYear()}</div>
                                        <div className="text-[#7E7E7E] text-[16px]">Time: {date.getHours()}:{date.getMinutes()}</div>
                                </div>
                                <div className="flex-col md:flex-row flex justify-end gap-4 items-center">
                                
                                    <RWebShare data={{
                                        text: "iris",
                                        url: 'https://iris.ainexus.com/v1/golden_ratios/' + '',
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
                                                url: 'https://iris.ainexus.com/v1/golden_ratios/' + ''
                                            })                            
                                        }} theme='iris-secondary'>
                                            <img className="mr-2" src="share2.svg" alt=""/>
                                            Share                            
                                        </Button>
                                    </RWebShare>
                                    <Button onClick={download} theme="iris">
                                        <img className="mr-2" src="print.svg" alt=""/>
                                        Finish 
                                    </Button>

                                </div>
                                </div>                    
                            </div>                
                    }
                </div>                
                <div className={`${!isLoading && "hidden"}`}>
                   <div className="w-full flex justify-center items-center min-h-[350px]">
                        <div role="status">
                            <svg aria-hidden="true"
                                    className="w-16 h-16 text-stone-200 animate-spin  fill-blue-600"
                                    viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"/>
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"/>
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>

                   </div>
                </div>
                <div id="mydiv" className="px-12"></div>

            </div>
        </>
    )
}

export default ShowReport