/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
// import { useConstructor } from "../../help";
import Application from "../../api/Application";
import Explation from '../../components/explation/index.jsx';
import ViewAnalyseComponent from './ViewAnalyseComponent.jsx';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import { Button } from "symphony-ui";
import { RWebShare } from "react-web-share";
import { useLocalStorage } from "@uidotdev/usehooks";
// import Nose from "../../components/overallAnalysisReport/Nose";
// import Chin from "../../components/overallAnalysisReport/Chin";
// import Lip from "../../components/overallAnalysisReport/Lip";
// import Cheek from "../../components/overallAnalysisReport/Cheek";
// import Forehead from "../../components/overallAnalysisReport/Forehead";
// import Eyebrow from "../../components/overallAnalysisReport/Eyebrow";
// import PhiltralColumn from "../../components/overallAnalysisReport/PhiltralColumn";
// import Other from "../../components/overallAnalysisReport/Other";
import SummaryBox from "./boxs/SummaryBox";
import FaceMeshView from '../../components/faceMash/FaceMeshViwe.jsx'
// import ScanData from '../../api/Data/scan.json';
import {PatientContext} from '../../context/context.jsx'
import PrintReport from "../../components/PrintReport/index.jsx";
import ContentViewBox from "../../components/overallAnalysisReport/ContentViewBox.jsx";
import { butiText } from "../../help.js";
// import ContentBox from "../../components/overallAnalysisReport/ContentBox.jsx";
const OverallAnalysisReport = (props) => {
  const [activeTab, setActiveTab] = useState("facial");
  const [searchParams] = useSearchParams();
  const [isLoading, ] = useState(false);
  const [date, ] = useState(new Date());
  const [orgs] = useLocalStorage("orgData");
  const {report,patientID} = useContext(PatientContext)
  const [textComment,setTextComment] = useState('') 
  const [activePart,setActivePart] = useState("")
  const updateComment=() => {
      // let patients= JSON.parse(localStorage.getItem("patients"))
      // let patientIndex = patients.findIndex(mypatient => mypatient.client_info.clientCode === patientID);
      // setComment(patients[patientIndex].comments);
  }    
  const formatDate2 = (date) => {
    const dateObj = new Date(date); // Ensure date is a Date object
    const year = dateObj.getFullYear();
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const month = monthNames[dateObj.getMonth()]; // Get the month name
    const day = dateObj.getDate().toString(); // Get the day

    return ` ${day} ${month} ${year}`;
  };    
  const [isShowAddComment, setIsShowAddComment] = useState(false); 
  // console.log(report)
  const navigate = useNavigate()
  const ScanData = report
  const resolveArrayMeasurments = () => {
    // console.log(ScanData.data)
    const allData = []
    Object.keys(ScanData.data.pose_analysis[0].current_image_analysis.measurements).map(key => {

      const resolved = Object.entries(ScanData.data.pose_analysis[0].current_image_analysis.measurements[key]).filter((el) =>el[0] !='measurements_list').map(([key, value]) => ({
        key, 
        ...value, 
      }));
      allData.push(...resolved)
    })
    return allData
  }
  const resolveFacialData = () => {
    if(activePart == ''){
      return resolveArrayMeasurments()
    }
    return resolveArrayMeasurments().filter((el => el.category ==activePart))
  }
  const resolveAllCategories = () => {
    return Array.from(new Set(resolveArrayMeasurments().map(item => item.category)));
  }
  useEffect(() => {
    resolveArrayMeasurments()
    // console.log(
    //   resolveAllCategories()
    // )
  },[])
  if(ScanData.data == undefined){
    navigate('/')
    return ''
  }

  const resolveActivePartName =() => {
    if(activePart == ''){
      return ' Face Measurements Summary'
    }
    return butiText(activePart)  +' Measurements Summary'    
    // return ""
  }
  const resolveChangePart = (name)=>{
    setActivePart(name)
  }


  // useConstructor(() => {
  //   Application.getScanDetails({
  //     scanCode: searchParams.get("scanId"),
  //     orgCode: JSON.parse(orgs).orgCode,
  //     orgSCode: JSON.parse(orgs).orgSCode,
  //     client_id: searchParams.get("clientId"),
  //   }).then((res) => {
  //     console.log(res);
  //     setIsLoading(false);
  //     setDate(new Date(res.data.data.timestamp));
  //     var decodedHTML = window.atob(res.data.data.html_file);
  //     document.getElementById("mydiv").innerHTML = decodedHTML;
  //   });
  // });
  const download = () => {
    // const downloadLink = document.createElement("a");
    // downloadLink.href = pdf;
    // downloadLink.download = 'download.html';
    // downloadLink.click();
    var mywindow = window.open("", "PRINT", "height=1500,width=1500");
    // // console.log(document.getElementById('reported'))
    //  const tailwindCDN = '<link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">';
    // mywindow.document.write(
    //   "<html><head><title>" + document.title + "</title>"
    // );
    mywindow.document.write(`
        <html>
            <head>
            <title>${document.title}</title>
            <!-- Link to Tailwind CSS -->
            <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
            <style>
                @media print {
                body {
                    background-color: white !important;
                }
                .bg-gray-100 {
                    background-color: #f3f4f6 !important; /* Tailwind Gray 100 */
                }
                .bg-blue-500 {
                    background-color: #3b82f6 !important; /* Tailwind Blue 500 */
                }
                .no-split {
                page-break-inside: avoid; /* Prevents splitting the element */
                break-inside: avoid;     /* For modern browsers */
                }                    
                * {
                    -webkit-print-color-adjust: exact !important;
                    print-color-adjust: exact !important;
                }                    
                }
            </style>            
            </head>
            <body>
            ${document.getElementById("printDiv")?.innerHTML}
            </body>
        </html>
        `);

    mywindow.document.close(); // necessary for IE >= 10
    mywindow.onload = () => {
        mywindow.focus(); // necessary for IE >= 10*/

        mywindow.print();
        mywindow.close();

    }
    // window.print()
    // window.frames["reported"].focus();
    // window.frames["reported"].print();
    // document.getElementById("mydiv").contentWindow.print();
    // document.getElementById('reported').contentWindow.print();
    // return false;
    return true;
    // var decodedHTML = window.atob(pdf.replace("data:text/html;base64,",''));
    // console.log(pdf.replace("data:text/html;base64,",''))
    // document.getElementById("mydiv").innerHTML = decodedHTML;
  };
  const formHandler = () => {
      if(textComment.trim().length>0){
          Application.addComment({
              client_id:patientID,
              orgCode: JSON.parse(orgs).orgCode,
              orgSCode: JSON.parse(orgs).orgSCode,
              comment_text: textComment                
          }).then(() => {
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

  return (
    <>
      <div>
        <div className={`${isLoading && "hidden"}`}>
          {!props?.smallReport && (
            <div className="px-12">
              <div className="print:hidden">
                <Breadcrumbs aria-label="breadcrumb">
                  <Link underline="hover" className="text-primary-color" href="/">
                    Home
                  </Link>
                  <Typography className="text-primary-color">
                    View Report
                  </Typography>
                </Breadcrumbs>

              </div>
              {/* /////////////////////////////////Header section/////////////////////// */}
              <div className="text-center hidden text-[28px] text-[#2E2E2E] font-medium mb-2 mt-0">
                Face Scan Completed
              </div>
              <div className=" justify-center hidden">
                <div
                  className="text-justify text-lg text-[#444444] w-[600px] md:w-[850px] md:max-w-[850px] mb-2"
                  style={{
                    textAlignLast: "center",
                  }}
                >
                  Here is the preview of your report. Use the top-right buttons
                  to download the PDF or share the document. To remove the
                  report or return to the home page, use the buttons at the
                  bottom.
                </div>
              </div>
              <div className="w-full print:hidden justify-end lg:justify-between  flex mt-[-16px] items-center">
                <div className="hidden lg:invisible lg:block  justify-start items-center">
                  <div className="text-[#444444] text-lg font-normal mr-[230px]">
                    Client ID: {searchParams.get("clientId")}
                  </div>
                  <div className="text-[#7E7E7E] font-normal text-sm mr-8">
                    Date:{" "}
                    {formatDate2(date)}
                  </div>
                  <div className="text-[#7E7E7E] font-normal text-sm">
                    Time: {date.getHours()}:{date.getMinutes()}
                  </div>
                </div>
                <div className=" flex my-4 justify-end gap-4 items-center">
                  <Button onClick={() => {
                    setIsShowAddComment(true)
                  }} theme="iris-tertiary">
                    <div className="pelusicon tirtryIconHover bg-primary-color" />
                    Add Comment
                  </Button>
                  <RWebShare
                    data={{
                      text: "iris",
                      url: "https://iris.ainexus.com/v1/golden_ratios/" + "",
                      title: "iris",
                    }}
                  >
                    <Button
                      onClick={() => {
                        navigator.share({
                          url:
                            "https://iris.ainexus.com/v1/golden_ratios/" + "",
                        });
                      }}
                      theme="iris-secondary"
                    >
                      <img className="mr-2" src="share2.svg" alt="" />
                      Share
                    </Button>
                  </RWebShare>
                  <Button onClick={download} theme="iris">
                    <img className="mr-2" src="print.svg" alt="" />
                    Print Report
                  </Button>
                </div>
              </div>
                {isShowAddComment &&
                    <div className="mb-2">
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
                                    <Button disabled={textComment.trim().length == 0} onClick={() => {
                                        formHandler()
                                    }} theme="iris-small">
                                        {textComment.trim().length>0?
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
              <ViewAnalyseComponent ScanData={ScanData} date={date} patientID={patientID}  ></ViewAnalyseComponent>
              <div id="printDiv" className="w-full hidden print:visible">
                <PrintReport ScanData={ScanData}  categories={resolveAllCategories()} resolveArrayMeasurments={resolveArrayMeasurments}></PrintReport>

              </div>
            </div>
          )}
        </div>
        <div className={`${!isLoading && "hidden"}`}>
          <div className="w-full flex justify-center items-center min-h-[350px]">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-16 h-16 text-stone-200 animate-spin  fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
   
        <div id="mydiv" className="px-12"></div>
        <div className="w-full flex mt-[48px] pr-12 justify-end">

            <Button theme="iris" onClick={() => {
            navigate('/')
            }}>
                Go to Home
                <div className="ml-2 arrow-right-white" />
            </Button>
        </div>        
      </div>
    </>
  );
};

export default OverallAnalysisReport;
