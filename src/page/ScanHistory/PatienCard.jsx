/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import ButtonPrimary from "../../components/button/buttonPrimery";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "../../context/context.jsx";
import { RWebShare } from "react-web-share";
import { useForm } from "react-hook-form";
import { Button, Checkbox } from "symphony-ui";
import Application from "../../api/Application.js";
import { useLocalStorage } from "@uidotdev/usehooks";

export const PatienCard = ({
  index,
  patient,
  onaccepted,
  activeResult,
  result,
}) => {
  const { setPdf, setFile, setPhoto } = useContext(PatientContext);

  useEffect(() => {
    if (result != null) {
      patient.scans.map((e) => {
        if (result.includes(e.scan_id)) {
          setIsCompare(true);
        }
      });
    }
  });
  useEffect(() => {
    if(result.length == 2){
      setIsShowMore(true)
    }
  },[result])
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
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = monthNames[dateObj.getMonth()]; // Get the month name
    const day = dateObj.getDate().toString(); // Get the day

    return `${day} ${month} ${year}`;
  };
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
  const navigate = useNavigate();
  const [isShowMore, setIsShowMore] = useState(false);
  const updateComment = () => {
    // let patients= JSON.parse(localStorage.getItem("patients"))
    // let patientIndex = patients.findIndex(patient => patient.id === id);
    // setComment(patients[patientIndex].comment);
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
  const { setSex, setPatientID, setErrorThreshold } =
    useContext(PatientContext);
  const clickHandler = () => {
    setSex(patient.sex);
    setPatientID(patient.client_info.clientCode);
    setErrorThreshold(patient.errorThreshold);
    navigate("/faceCamera");
  };
  const [accepted, setAccepted] = useState([]);
  const [orgs] = useLocalStorage("orgData");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const formHandler = () => {
    if (textComment.length > 0) {
      Application.addComment({
        client_id: patient.client_info.clientCode,
        orgCode: JSON.parse(orgs).orgCode,
        orgSCode: JSON.parse(orgs).orgSCode,
        comment_text: textComment,
      }).then();
      const patients = JSON.parse(localStorage.getItem("patients"));
      const patientIndex = patients.findIndex(
        (mypatient) =>
          mypatient.client_info.clientCode === patient.client_info.clientCode
      );
      const newComment = {
        cCode: "0e966eff-8e4e-43b2-bf9e-6a7a8414d63b",
        cText: textComment,
        cTextDateTime: new Date().toISOString(),
      };

      if (patients[patientIndex].comments) {
        patient.comments.push(newComment);
        patients[patientIndex].comments.push(newComment);
      } else {
        patients[patientIndex].comments = [newComment];
        patient.comments = [newComment]; // Initialize the comment array if it does not exist
      }
      localStorage.setItem("patients", JSON.stringify(patients));
      setIsShowAddComment(false);
      updateComment();
      setTextComment("");
    } else {
      setIsShowAddComment(false);
    }
  };
  return (
    <div className="flex gap-12 rounded-[8px]  items-center justify-start shadow-lg border p-[12px]  md:p-[32px]">
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
        <div className="flex justify-between w-full pb-8 gap-8 border-b py-0">
          <h2 className="text-[16px] md:text-[18px] font-bold text-[#1A1919] flex gap-8">
            {" "}
            <div>
              {" "}
              {patient.client_info.firstName} {patient.client_info.lastName}
            </div>{" "}
            <span className="text-base font-normal text-[#7E7E7E]">
              Client ID: {patient.client_info.clientCode}{" "}
            </span>{" "}
          </h2>
          <div>{}</div>
          <div className=" text-lg font-medium text-[#1A1919]"></div>
          <div className="flex gap-2 items-center justify-between">
            <Button
              theme="iris-tertiary-small"
              onClick={() => setIsShowComment(!isShowComment)}
            >
              {isShowComment ? "Hide Comments" : "Show Comments"}(
              {comment.length})
              <span>
                <div
                  data-mode={isShowComment ? "true" : "false"}
                  className="arowDownIcon-purple ml-1"
                ></div>
              </span>
            </Button>
            {/* <button onClick={clickHandler}
                                className="flex justify-evenly font-medium items-center rounded-[8px] px-4 text-white bg-[#544BF0] h-[40px]">
                            <img className="mr-2" src="camera.svg" alt=""/>
                            New Scan
                        </button> */}
            {isCompare ? (
              <Button
                onClick={() => {
                  setAccepted([]);
                  onaccepted([]);
                  setIsCompare(false);
                }}
                theme="iris-secondary-small"
              >
                <img src="./icons/close.svg" className="mr-2" alt="" />
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
                <img src="./icons/shapes.svg" className="mr-2" alt="" />
                Compare
              </Button>
            )}
            <Button onClick={clickHandler} theme="iris-small">
              <img className="mr-2" src="camera.svg" alt="" />
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
                        <h2 className="font-normal text-[14px] text-[#2E2E2E]">
                          Scan Reports
                        </h2>
                      </label>
                    </div>
                    <div className="text-[#7E7E7E] text-[14px] font-[300]">
                      Date :{" "}
                      <span className=" ml-1 font-[300] text-[14px] text-[#7E7E7E]">
                        {new Date(patientHistory.timestamp).toLocaleString()}
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
                        onClick={() =>{
                          navigate(
                            `/showReport/?scanId=${patientHistory.scan_id}&clientId=${patient.client_info.clientCode}&mode=print`
                          );                          
                        }
                        }
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
                {isShowMore ? "See Less" : "See More"}
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
              <div className="text-[14px]">Comments:</div>
              {!isShowAddComment && (
                <div
                  className={` ${comment.length > 0 ? "flex-1" : " flex-1"} `}
                >
                  {comment.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className={
                          "flex  gap-3 items-start justify-start w-fit text-[#7E7E7E] pb-3"
                        }
                      >
                        <h1 className={"text-nowrap text-[14px] font-[300]"}>
                          {formatDate(new Date(item.cTextDateTime))}{" "}
                        </h1>
                        <p className={"w-[90%] font-[300] text-[14px]"}>
                          {item.cText}
                        </p>
                      </div>
                    );
                  })}
                  {comment.length <= 0 && !isShowAddComment && (
                    <div className={" text-center text-[14px] text-[#7E7E7E]"}>
                      No comment found
                    </div>
                  )}
                </div>
              )}
              {!isShowAddComment ? (
                <div className={" h-full  flex items-center justify-end"}>
                  <button
                    disabled={isShowAddComment}
                    onClick={() => setIsShowAddComment(!isShowAddComment)}
                    className={
                      "text-nowrap text-[14px] disabled:text-slate-400 font-normal underline text-[#544BF0] h-full"
                    }
                  >
                    Add Comment
                  </button>
                </div>
              ) : (
                <div className={"w-full flex items-center justify-center"}>
                  <div
                    className={
                      " px-5 w-full flex items-end gap-5 justify-end border-b pb-2"
                    }
                  >
                    <input
                      value={textComment}
                      onChange={(el) => {
                        setTextComment(el.target.value);
                      }}
                      placeholder={"Your comment ..."}
                      className={" w-full border-none-focus  p-2  "}
                    />
                    {/* <ButtonPrimary disabled={textComment.length == 0? true:false}  onClickHandler={() => {
                                                formHandler()                                       
                                            }} className={"!text-xs !px-4 !py-2.5"}>
                                                Add Comment
                                            </ButtonPrimary> */}
                    <div className="w-full flex justify-end">
                      <Button
                        disabled={textComment.length == 0}
                        onClick={() => {
                          formHandler();
                        }}
                        theme="iris-small"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
