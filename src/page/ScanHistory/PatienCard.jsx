/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState, useRef } from "react";
import ButtonPrimary from "../../components/button/buttonPrimery";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "../../context/context.jsx";
import { RWebShare } from "react-web-share";
import { useForm } from "react-hook-form";
import { Button, Checkbox } from "symphony-ui";
import Application from "../../api/Application.js";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Tooltip } from "react-tooltip";
import {BeatLoader} from 'react-spinners'
import useModalAutoClose from '../../hooks/useModalAutoClose.js';

export const PatienCard = ({
  index,
  patient,
  onaccepted,
  activeResult,
  result,
  loadPationts,
}) => {
  const { setPdf, setFile, setPhoto } = useContext(PatientContext);
  const textRef = useRef(null);
  const [isEllipsized, setIsEllipsized] = useState(false);
  useEffect(() => {
    if (textRef.current) {
      const { offsetWidth, scrollWidth } = textRef.current;
      setIsEllipsized(scrollWidth > offsetWidth); // Check if text is truncated
    }
  }, []);
  useEffect(() => {
    if (result != null) {
      patient.scans.map((e) => {
        if (result.includes(e.scan_id)) {
          setIsCompare(true);
        }
      });
    }
  });
  // useEffect(() => {
  //   if (result.length == 2) {
  //     setIsShowMore(true);
  //   }
  // }, [result]);
  // useEffect(() => {
  //   const timerId = setInterval(() => {
  //     setCurrentDateTime(new Date());  // Update the current date and time every minute
  //   }, 1000 * 60);  // Set interval to 60 seconds

  //   return () => {
  //     clearInterval(timerId);  // Clear the interval on component unmount
  //   };
  // }, []);
  const formatDate = (date) => {
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
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return ` ${day} ${month} ${year} ${hours}:${minutes} `;
  };
  const [showModal,setShowModal] = useState(false)
  const [isCompare, setIsCompare] = useState(false);
  // const {id , result,comment:initComment} = patient;
  const [textComment, setTextComment] = useState("");
  useEffect(() => {
    if (activeResult != patient.id) {
      setIsCompare(false);
    }
  }, [activeResult]);
  const [isShowComment, setIsShowComment] = useState(false);
  const [isShowAddComment, setIsShowAddComment] = useState(false);
  const [comment, setComment] = useState(patient.comments);
  const [isLoading,setIsLoading] = useState(false)
  const navigate = useNavigate();
  const [isShowMore, setIsShowMore] = useState(false);
  const updateComment = () => {
    let patients = JSON.parse(localStorage.getItem("patients"));
    let patientIndex = patients.findIndex(
      (patient) => patient.id === patient.client_info.clientCode
    );
    setComment(patients[patientIndex].comment);
  };
  // const dispatch = useDispatch();
  const download = (id) => {
    Application.getScanDetails({
      scanCode: id,
      orgCode: JSON.parse(orgs).orgCode,
      orgSCode: JSON.parse(orgs).orgSCode,
      client_id: patient.client_info.clientCode,
    }).then((res) => {
      // setIsLoading(false)
      // setDate(new Date(res.data.data.timestamp))
      var element = document.createElement("a");
      // element.innerHTML = decodedHTML
      element.setAttribute("download", "report");
      element.setAttribute(
        "href",
        "data:text/html;base64," + res.data.data.html_file
      );
      element.style.display = "none";
      document.body.appendChild(element);

      element.click();
      // document.body.removeChild(element);
      // document.getElementById("mydiv").innerHTML = decodedHTML;
    });
    // window.open("https://iris.ainexus.com/v1/golden_ratios/" + id)
    // const downloadLink = document.createElement("a");
    // downloadLink.href = pdf;
    // downloadLink.download = 'download.html';
    // downloadLink.click();
  };
  const { setSex, setPatientID, setErrorThreshold , userName } =
    useContext(PatientContext);
  const clickHandler = () => {
    setSex(patient.sex);
    setPatientID(patient.client_info.clientCode);
    setErrorThreshold(patient.errorThreshold);
    navigate("/faceCamera");
  };
  
  const [accepted, setAccepted] = useState([]);
  const [orgs] = useLocalStorage("orgData");
  const buttnRef = useRef(null)
  useModalAutoClose({
    refrence:buttnRef,
    close:() => {
      setShowModal(false)
    }
  })
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formHandler = () => {
    if (textComment.length > 0) {
      setIsLoading(true)
      // console.log(comment)
      Application.addComment({
        client_id: patient.client_info.clientCode,
        orgCode: JSON.parse(orgs).orgCode,
        orgSCode: JSON.parse(orgs).orgSCode,
        comment_text: textComment,
      }).then(() => {
        Application.getComments({
          client_id: patient.client_info.clientCode,
          orgCode: JSON.parse(orgs).orgCode,
          orgSCode: JSON.parse(orgs).orgSCode,        
        }).then((res) => {
          setIsLoading(false)
           setTextComment("");
          if(res.data.msg == 'success'){
            setComment(res.data.data)
            loadPationts( patient.client_info.clientCode,res.data.data);
          }
        }).finally(() => {
          setIsShowAddComment(false);
        })
      }).catch(() => {
        setIsShowAddComment(false);
      });

      
      // updateComment();
      // loadPationts();

     
    } else {
      setIsShowAddComment(false);
    }
  };
  const user = localStorage.getItem('user');


    // Parse the JSON string into a JavaScript object
    const userObject = JSON.parse(user);
  
    // Access the first name and last name
    const userFirstName = userObject.Personal.FirstName;
    const userLastName = userObject.Personal.LastName;
  
    // console.log('First Name:', userFirstName);
    // console.log('Last Name:', userLastName);

  return (
    <div className=" w-full flex gap-12 rounded-[8px]  items-center justify-start shadow-lg border p-2 xl:p-[12px] 2xl:px-[24px]  md:p-[32px]">
      <div className="flex items-start self-start gap-5 ">
        {index}
        <img
          className="rounded-[8px] h-[45px] md:h-[56px]"
          src={`https://ui-avatars.com/api/?name=${
            patient.client_info.firstName + " " + patient.client_info.lastName
          }`}
          alt=""
        />
      </div>
      <div className="w-full flex flex-col items-start  justify-center ">
        <div className="flex justify-between w-full pb-8 gap-0 xl:gap-8 border-b py-0">
          <div className=" flex justify-start gap-2 flex-wrap items-center">
            <h2
              data-tooltip-id={isEllipsized ? "userName" : ""}
              data-tooltip-content={
                patient.client_info.firstName +
                "  " +
                patient.client_info.lastName
              }
              className="text-[14px] flex-wrap md:text-base items-center  xl:text-[18px] font-bold text-[#1A1919] overflow-hidden flex gap-2 xl:gap-8"
            >
              {" "}
              <div
                ref={textRef}
                className="max-w-[80px] w-[80px] xl:w-[230px] xl:max-w-[230px]"
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {" "}
                {patient.client_info.firstName} {patient.client_info.lastName}
              </div>{" "}
            </h2>
            <span
              className=" text-sm xl:text-base font-normal text-[#7E7E7E]"
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
              }}
            >
              Client ID: {patient.client_info.clientCode}{" "}
            </span>{" "}
          </div>
          <Tooltip
            place="top-start"
            className="max-w-[240px] h-auto bg-white"
            style={{ overflowWrap: "break-word" }}
            id="userName"
          />
          {/* <div>{}</div>
          <div className=" text-lg font-medium text-[#1A1919]"></div> */}
          <div className="flex gap-1  xl:gap-2 min-w-[300px]  xl:min-w-[411px] items-center justify-end xl:justify-between">
            <div className="hidden  xl:flex gap-2 items-center justify-end ">
              <Button
                theme="iris-tertiary-small"
                onClick={() => setIsShowComment(!isShowComment)}
              >
                <div
                  style={{
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {isShowComment ? "Hide Comments" : "Show Comments"}(
                  {comment.length})
                </div>
                <span>
                  <div
                    data-mode={isShowComment ? "true" : "false"}
                    className="arowDownIcon-purple tirtryIconHover  xl:ml-1"
                  ></div>
                </span>
              </Button>
              <Button
                onClick={() => {
                  setIsShowComment(false)
                  setIsShowAddComment(true);
                }}
                theme="iris-secondary-small"
              >
                <img src="./Icon-left.svg" alt="" />
                Add Comment
              </Button>

              {isCompare ? (
                <Button
                  onClick={() => {
                    setAccepted([]);
                    onaccepted([]);
                    setIsCompare(false);
                  }}
                  theme="iris-secondary-small"
                >
                  <img src="./image/close.svg" className="mr-2" alt="" />
                  Cancel
                </Button>
              ) : (
                <Button
                  disabled={patient.scans.length <= 1}
                  onClick={() => {
                    // navigate('/compare/'+id)
                    setIsCompare(true);
                  }}
                  theme="iris-secondary-small"
                >
                  <img
                    src="./image/shapes.svg"
                    className=" mr-[2px] xl:mr-2"
                    alt=""
                  />
                  Compare
                </Button>
              )}

            </div>
            <div ref={buttnRef} className="block mr-1 cursor-pointer relative xl:hidden">
              <Button onClick={() => {
                setShowModal(!showModal)
              }} theme="iris-secondary-small">
                <img className="" src="./Icon-left3.svg" alt="" />
              </Button>
              {
                showModal &&
                <div className="absolute w-[180px] py-3 cursor-pointer bg-white shadow-lg rounded-[8px] z-30 right-0">
                  <div onClick={() => {
                    if(patient.scans.length > 1){
                        if(isCompare) {
                          setAccepted([]);
                          onaccepted([]);
                          setIsCompare(false);                      
                        }else {
                          setIsCompare(true);
                        }
                        setShowModal(false)      
                    }
                  }} className={`flex ${patient.scans.length > 1?'cursor-pointer opacity-100':'opacity-50 cursor-not-allowed'} justify-start p-2 gap-2 items-center`}>
                   {isCompare ?
                    <>
                    <img className="" src="./image/shapes2.svg" alt="" />
                    <div className="text-[14px] text-[#2E2E2E]">
                      Cancel

                    </div>                    
                    </>                   
                   :
                   <>
                    <img className="" src="./image/shapes2.svg" alt="" />
                    <div className="text-[14px] cursor-pointer text-[#2E2E2E]">
                      Compare

                    </div>
                   </>
                   }
                  </div>
                  <div onClick={() => {
                  setIsShowComment(false)
                  setIsShowAddComment(true);       
                  setShowModal(false)                   
                  }} className="flex cursor-pointer justify-start p-2 gap-2 items-center">
                    <img className="" src="./Icon-left2.svg" alt="" />
                    <div className="text-[14px] cursor-pointer text-[#2E2E2E]">
                      Add Comment

                    </div>
                  </div>
                  <div onClick={() => {
                    setIsShowComment(!isShowComment)      
                    setShowModal(false)              
                  }} className="flex cursor-pointer justify-start p-2 gap-2 items-center">
                    <img className="" src="./image/eye.svg" alt="" />
                    <div className="text-[14px] cursor-pointer text-[#2E2E2E]">
                      {isShowComment ?
                        'Hide Comments'
                      :
                        'Show Comments'
                      }

                    </div>
                  </div>                                
                </div>

              }
            </div>
            <Button onClick={clickHandler} theme="iris-small">
              <img className=" mr-[2px] xl:mr-2" src="camera.svg" alt="" />
              New Scan
            </Button>
          </div>
        </div>
        <div className="flex flex-col mt-5 gap-5 pb-3   w-full">
          {patient.scans.map((patientHistory, index) => {
            // const myDate = new Date(patientHistory.date);
            return (
              <>
                {index < 2 || isShowMore ? (
                  <div
                    key={index + patient.client_info.clientCode}
                    className="flex justify-between items-center w-full "
                  >
                    <div className="flex justify-start gap-1 items-center">
                      {isCompare && (
                        <Checkbox
                          id={patientHistory.scan_id}
                          checked={accepted.includes(patientHistory.scan_id)}
                          onChange={() => {
                            if (!accepted.includes(patientHistory.scan_id)) {
                              const array = accepted;
                              if (accepted.length >= 2) {
                                array.shift();
                              }
                              setAccepted([...array, patientHistory.scan_id]);
                              onaccepted([...array, patientHistory.scan_id]);
                            } else {
                              const array = accepted;
                              const index = accepted.indexOf(
                                patientHistory.scan_id
                              );
                              array.splice(index, 1);
                              setAccepted(array);
                              onaccepted(array);
                            }
                          }}
                        ></Checkbox>
                      )}
                      <label
                        onClick={() => {
                          if (!accepted.includes(patientHistory.scan_id)) {
                            const array = accepted;
                            if (accepted.length >= 2) {
                              array.shift();
                            }
                            setAccepted([...array, patientHistory.scan_id]);
                            onaccepted([...array, patientHistory.scan_id]);
                          } else {
                            const array = accepted;
                            const index = accepted.indexOf(
                              patientHistory.scan_id
                            );
                            array.splice(index, 1);
                            setAccepted(array);
                            onaccepted(array);
                          }
                        }}
                        htmlFor={patientHistory.scan_id}
                      >
                        <h2 className="text-[#444444] font-medium text-[14px]">
                          Scan Reports
                        </h2>
                      </label>
                    </div>
                    <div className="text-[#7E7E7E] text-[14px] font-[400]">
                      {userFirstName} {userLastName},
                      <span className=" ml-1 font-[400] text-[14px] text-[#7E7E7E]">
                        {formatDate(patientHistory.timestamp)}
                        {/* {new Date(patientHistory.timestamp).toLocaleString()} */}
                      </span>{" "}
                    </div>

                    <div className="flex gap-3 items-center">
                      {/* <RWebShare data={{
                                            text: "iris",
                                            url: 'https://iris.ainexus.com/v1/golden_ratios/' + patientHistory.scan_id,
                                            title: "iris",
                                        }}>
                                            <Button 
                                                onClick={() => {
                                                    if (navigator.share) {
                                                        navigator.share({
                                                            url: 'https://iris.ainexus.com/v1/golden_ratios/' + patientHistory.scan_id
                                                        })
                                                            .then(() => console.log('Successful share'))
                                                            .catch((error) => console.log('Error sharing', error));
                                                    } else {
                                                        console.log('Web Share API is not supported in this browser.');
                                                    }
                                                }} theme="iris-secondary-small">
                                                <div className="shareIcon-purple"></div>
                                            </Button>
                                        </RWebShare> */}

                      <Button
                        onClick={() => {
                          navigate(
                            `/showReport/?scanId=${patientHistory.scan_id}&clientId=${patient.client_info.clientCode}&mode=print`
                          );
                        }}
                        theme="iris-secondary-small"
                      >
                        <div className="downloadIcon-purple"></div>
                      </Button>
                      <Button
                        onClick={() => {
                          // setPdf('data:text/html;base64,' + patientHistory.htmlId)
                          // setPhoto(result[0].photo)
                          // setFile(patientHistory.scan_id)
                          // setPatientID(patient.client_info.clientCode)
                          navigate(
                            `/showReport/?scanId=${patientHistory.scan_id}&clientId=${patient.client_info.clientCode}`
                          );
                        }}
                        theme="iris-secondary-small"
                      >
                        View Reports
                      </Button>
                      {/* <div onClick={() => download(patientHistory.htmlId)}
                                            className="bg-[#F9F9FB] border border-[#544BF0]   cursor-pointer text-[14px] text-[#544BF0] w-[107px] h-[32px] flex justify-center items-center rounded-[6px]">
                                            View Reports
                                        </div> */}
                    </div>
                  </div>
                ) : undefined}
              </>
            );
          })}
          {patient.scans.length > 2 && (
            <div className="flex justify-between items-center">
              <div className="w-[90px]"></div>
              <div
                onClick={() => {
                  setIsShowMore(!isShowMore);
                }}
                className="text-[#544BF0] flex justify-center items-center cursor-pointer font-medium text-center mt-4"
              >
                {isShowMore ? "Show Less" : "Show More"}
                <span>
                  <div
                    data-mode={isShowMore ? "true" : "false"}
                    className="arowDownIcon-purple ml-1"
                  ></div>
                </span>
              </div>
              <div className="w-[180px]"></div>
            </div>
          )}
        </div>
        {isShowComment && (
          <>
            <div
              className={
                "w-full border-t pt-5 flex items-start gap-5 justify-between"
              }
            >
              {/* <div className="text-[14px]">Comments:</div> */}
              <div
                className={` ${comment.length > 0 ? "flex-1" : " flex-1"} `}
              >
                <div className="w-full flex gap-6 justify-start items-start">
                  <div className="text-[#444444] flex justify-between items-center font-medium text-[14px]" style={{width:(comment.length <= 0 && !isShowAddComment)?'100%':'auto'}}>Comments:
                      {comment.length <= 0 && !isShowAddComment && (
                      <div className={" text-center text-[14px] text-[#7E7E7E]"}>
                        No comment found
                      </div>
                    )}
                     {comment.length <= 0 && !isShowAddComment && 
                      <div className={" text-center invisible text-[14px] text-[#7E7E7E]"}>
                        No comment found
                      </div>
                     }
                  </div>
                  <div className="mt-[2px]">
                    {comment.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={
                            "  gap-3 items-start justify-start w-fit  pb-3"
                          }
                        >
                          {/* <h1 className={"text-nowrap text-[14px] font-[300]"}>
                            {formatDate(new Date(item.cTextDateTime))}{" "}
                          </h1> */}
                          <p className={"w-[90%] font-[300] text-[#444444] text-[13px]"}>
                            {item.cText}
                          </p>
                          <p className="text-[#7E7E7E] text-[12px] tracking-wide flex ">
                            <div className="mr-1"> {userFirstName} {userLastName}</div>
                            ,
                            
                            <span className="ml-1"> {formatDate(new Date(item.cTextDateTime))}{" "}</span>
                              
                          </p>
                        </div>
                      );
                    })}

                  </div>

                </div>

              </div>
              
            </div>
          </>
        )}
        {!isShowAddComment ? (
          <div className={" h-full  flex items-center justify-end"}>
            <button
              disabled={isShowAddComment}
              onClick={() => setIsShowAddComment(!isShowAddComment)}
              className={
                "text-nowrap text-[14px] disabled:text-slate-400 font-normal underline text-[#544BF0] h-full hidden"
              }
            >
              Add Comment
            </button>
          </div>
        ) : (
          <div className={"w-full flex items-center justify-center"}>
            <div
              className={
                " px-0 w-full flex items-center gap-5 justify-end  pb-2"
              }
            >
              <input
                value={textComment}
                onChange={(el) => {
                  setTextComment(el.target.value);
                }}
                placeholder={"Write your comment here...."}
                className={" w-full border-none-focus placeholder:text-[#7E7E7E] text-[14px]  p-2  px-0 "}
              />
              {/* <ButtonPrimary disabled={textComment.length == 0? true:false}  onClickHandler={() => {
                                          formHandler()                                       
                                      }} className={"!text-xs !px-4 !py-2.5"}>
                                          Add Comment
                                      </ButtonPrimary> */}
              <div className="w-full flex justify-end">
                 <div onClick={() => {
                    if(!isLoading){
                      formHandler();
                    }                  
                 }} className={`text-[14px] ${textComment.length > 0?' cursor-pointer text-primary-color':'text-gray-400'}  underline `}>
                  {isLoading ?
                  <BeatLoader size={8} color="#544BF0"></BeatLoader>
                  :
                  'Save'
                  }                  
                 </div>
                {/* <Button
                  disabled={textComment.length == 0}
                  onClick={() => {
                    if(!isLoading){
                      formHandler();
                    }
                  }}
                  theme="iris-tertiary-small"
                >
                  {isLoading ?
                  <BeatLoader size={8} color="#544BF0"></BeatLoader>
                  :
                  'Save'
                  }
                </Button> */}
              </div>
            </div>
          </div>
        )}        
      </div>
    </div>
  );
};
