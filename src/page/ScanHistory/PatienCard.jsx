import React, {useContext, useEffect, useState} from "react";
import ButtonPrimary from "../../components/button/buttonPrimery";
import { useNavigate} from "react-router-dom";
import {PatientContext} from "../../context/context.jsx";
import {RWebShare} from "react-web-share";
import {useForm} from "react-hook-form";

export const PatienCard = ({index, patient}) => {

    const {id, date, photo, result} = patient;

    const [isShowComment, setIsShowComment] = useState(false);
    const [isShowAddComment, setIsShowAddComment] = useState(false);
    const [comment, setComment] = useState([]);
    const navigate = useNavigate();
    const updateComment=() => {
        let patients= JSON.parse(localStorage.getItem("patients"))
        let patientIndex = patients.findIndex(patient => patient.id === id);
        setComment(patients[patientIndex].comment);
    }
    // const dispatch = useDispatch();
    const download = (id) => {
        window.open("https://iris.ainexus.com/v1/golden_ratios/" + id)
        // const downloadLink = document.createElement("a");
        // downloadLink.href = pdf;
        // downloadLink.download = 'download.html';
        // downloadLink.click();
    }
    const {
        setSex,
        setPatientID,
        setErrorThreshold,
    } = useContext(PatientContext);
    const clickHandler = () => {
        setSex(patient.sex)
        setPatientID(patient.id)
        setErrorThreshold(patient.errorThreshold)
        navigate("/faceCamera")
    }
    const {register, handleSubmit} = useForm()
    const formHandler = (data) => {
        if(data.addComment.length>0){
            const patients= JSON.parse(localStorage.getItem("patients"))
            const patientIndex = patients.findIndex(patient => patient.id === id);

            patients[patientIndex].comment.push(data.addComment)
            localStorage.setItem("patients", JSON.stringify(patients));
            updateComment()
            setIsShowAddComment(false)
        }else {
            setIsShowAddComment(false)
        }
    }
    return (
        <div className="flex gap-12 rounded-[8px]  items-center justify-start shadow-lg border  p-[32px]">
            <div className="flex items-start self-start gap-5 ">
                {index}
                <img className="mt-3 w-[73px] rounded-[8px] h-[56px]"
                     src={result[0].photo.length > 0 && result[0].photo} alt=""/>
            </div>
            <div className="w-full flex flex-col items-start  justify-center ">
                <div className="flex justify-between w-full pb-8 gap-8 border-b py-3">
                    <h2 className="text-xl font-bold text-[#1A1919]">Patient ID: {id}</h2>

                    <div className="flex gap-4 items-center justify-between">
                        <div onClick={() => setIsShowComment(!isShowComment)}
                             className={" cursor-pointer text-base font-normal underline text-[#544BF0] "}>Show comments
                            ({comment.length})
                        </div>
                        <button onClick={clickHandler}
                                className="flex justify-evenly font-medium items-center rounded-[8px] px-4 text-white bg-[#544BF0] h-[40px]">
                            <img className="mr-2" src="camera.svg" alt=""/>
                            New Scan
                        </button>
                    </div>
                </div>
                <div className="flex flex-col mt-5 gap-5 pb-3   w-full">
                    {result.map((patientHistory, index) => {
                        return (
                            <div key={index + id} className="flex justify-between items-center w-full ">
                                <h2 className="font-medium text-[16px] text-[#2E2E2E]">Scan reports</h2>
                                <div className="text-[#7E7E7E] font-medium">
                                    Date : <span
                                    className=" ml-1 font-medium tex-[16px] text-[#7E7E7E]">{patientHistory.date}</span>{" "}
                                </div>

                                <div className="flex gap-3 items-center">
                                    <RWebShare data={{
                                        text: "iris",
                                        url: 'https://iris.ainexus.com/v1/golden_ratios/' + patientHistory.htmlId,
                                        title: "iris",
                                    }}>
                                        <div
                                            onClick={() => {
                                                if (navigator.share) {
                                                    navigator.share({
                                                        url: 'https://iris.ainexus.com/v1/golden_ratios/' + patientHistory.htmlId
                                                    })
                                                        .then(() => console.log('Successful share'))
                                                        .catch((error) => console.log('Error sharing', error));
                                                } else {
                                                    console.log('Web Share API is not supported in this browser.');
                                                }
                                            }}
                                            className="bg-[#F9F9FB] cursor-pointer w-[36px] h-[32px] flex justify-center items-center rounded-[6px]"
                                        >
                                            <img src="./share.svg" alt="Share"/>
                                        </div>
                                    </RWebShare>
                                    <div onClick={() => download(patientHistory.htmlId)}
                                         className="bg-[#F9F9FB] cursor-pointer w-[36px] h-[32px] flex justify-center items-center rounded-[6px]">
                                        <img src="./download.svg" alt=""/>
                                    </div>
                                    <div onClick={() => download(patientHistory.htmlId)}
                                         className="bg-[#E8E7F7] cursor-pointer text-[14px] text-[#544BF0] w-[107px] h-[32px] flex justify-center items-center rounded-[6px]">
                                        View Reports
                                    </div>
                                    {/* <ButtonSecondary onClick={()=> {
                                        navigator.share({
                                            url:'https://iris.ainexus.com/v1/golden_ratios/'+patientHistory.htmlId
                                        })
                                    }}  ClassName="h-[45px]">
                                        <img src="fi_share-2.svg" alt=""/>
                                        Share
                                    </ButtonSecondary>
                                    <ButtonPrimary  ClassName="h-[45px]" onClickHandler={() => download(patientHistory.htmlId)}>
                                        <img src="fi_download.svg" alt=""/>
                                        Download PDF
                                    </ButtonPrimary> */}
                                </div>
                            </div>

                        )
                    })}
                </div>
                {isShowComment &&
                    <>

                        <div className={"w-full border-t pt-5 flex items-start gap-5 justify-between"}>
                            <div>Comments:</div>
                            <div className={"w-5/6"}>
                                {comment.map((comment, index) => {
                                    return (
                                        <div key={index}
                                            className={"flex  gap-3 items-center justify-start w-fit text-[#7E7E7E] pb-3"}>
                                            <h1 className={"text-nowrap"}>12 April 2024 </h1>
                                            <p className={"w-4/6"}>{comment}</p>
                                        </div>
                                    )
                                })}
                                {comment.length<=0&&!isShowAddComment &&(<div className={" text-center"}>No comment found.</div>)}
                            < /div>
                            <div className={" h-full w-1/6 flex items-center justify-end"}>
                                <button disabled={isShowAddComment}
                                        onClick={() => setIsShowAddComment(!isShowAddComment)}
                                        className={ "text-nowrap disabled:text-slate-400 text-base font-normal underline text-[#544BF0] h-full"}>
                                    Add Comment
                                </button>
                            </div>
                        </div>
                        {isShowAddComment && <form onSubmit={handleSubmit(formHandler)} className={"w-full "}>
                            <div className={"w-full flex items-center justify-center"}>
                                <div className={" p-5 w-4/6 flex items-start gap-5 justify-center"}>
                                    <input {...register("addComment")} placeholder={"Your comment ..."} className={"h-20 w-full  p-2"}/>
                                    <ButtonPrimary type={"submit"} className={"!text-xs !px-2"}>
                                        Add Comment
                                    </ButtonPrimary>
                                </div>
                            </div>
                        </form>}
                    </>

                }
            </div>

        </div>
    );
};

