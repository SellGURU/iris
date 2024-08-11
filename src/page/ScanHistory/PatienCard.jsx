/* eslint-disable react/prop-types */
import React, {useContext, useEffect, useState} from "react";
import ButtonPrimary from "../../components/button/buttonPrimery";
import { useNavigate} from "react-router-dom";
import {PatientContext} from "../../context/context.jsx";
import {RWebShare} from "react-web-share";
import {useForm} from "react-hook-form";
import { Button, Checkbox } from "symphony-ui";

export const PatienCard = ({index, patient,onaccepted}) => {
    const {
        setPdf,
        setFile,
        setPhoto,
    } = useContext(PatientContext);
    const [isCompare,setIsCompare] = useState(false)
    const {id, date, photo, result,comment:initComment} = patient;
    const [textComment,setTextComment] = useState('')
    const [isShowComment, setIsShowComment] = useState(false);
    const [isShowAddComment, setIsShowAddComment] = useState(false);
    const [comment, setComment] = useState(initComment);
    const navigate = useNavigate();
    const [isShowMore,setIsShowMore] = useState(false)
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
    const [accepted,setAccepted] = useState([])
    const {register, handleSubmit,formState: { errors }} = useForm()
    const formHandler = () => {
        if(textComment.length>0){
            const patients= JSON.parse(localStorage.getItem("patients"))
            const patientIndex = patients.findIndex(patient => patient.id === id);

            patients[patientIndex].comment.push(textComment)
            localStorage.setItem("patients", JSON.stringify(patients));
            setIsShowAddComment(false)
            updateComment()
            setTextComment("")
        }else {
            setIsShowAddComment(false)
        }
    }
    return (
        <div className="flex gap-12 rounded-[8px]  items-center justify-start shadow-lg border p-[12px]  md:p-[32px]">
            <div className="flex items-start self-start gap-5 ">
                {index}
                {result.length>0?
                    <img className="rounded-[8px] h-[45px] md:h-[56px]"
                        src={result[0].photo.length > 0 && result[0].photo} alt=""/>
                    :
                    <img className="rounded-[8px] h-[45px] md:h-[56px]"
                        src={'https://ui-avatars.com/api/?background=random'} alt=""/>                    
                    }
            </div>
            <div className="w-full flex flex-col items-start  justify-center ">
                <div className="flex justify-between w-full pb-8 gap-8 border-b py-0">
                    <h2 className="text-[16px] md:text-[18px] font-bold text-[#1A1919]">Patient ID: {id}</h2>

                    <div className="flex gap-2 items-center justify-between">
                        {/* <div onClick={() => setIsShowComment(!isShowComment)}
                             className={" cursor-pointer text-base select-none flex justify-center items-center font-normal  text-[#544BF0] "}>Show comments
                            ({comment.length})
                            <span><div data-mode={isShowComment?'true':'false'} className="arowDownIcon-purple ml-1"></div></span>
                        </div> */}
                        <Button theme="iris-tertiary-small" onClick={() => setIsShowComment(!isShowComment)}>
                            Show comments
                            ({comment.length})
                            <span><div data-mode={isShowComment?'true':'false'} className="arowDownIcon-purple ml-1"></div></span>
                        </Button>
                        {/* <button onClick={clickHandler}
                                className="flex justify-evenly font-medium items-center rounded-[8px] px-4 text-white bg-[#544BF0] h-[40px]">
                            <img className="mr-2" src="camera.svg" alt=""/>
                            New Scan
                        </button> */}
                        {isCompare?
                        <Button onClick={() => {
                            setAccepted([])
                            onaccepted([])
                            setIsCompare(false)
                        }} theme="iris-secondary-small">
                            <img src="./icons/close.svg" className="mr-2" alt="" />
                            Cancel
                        </Button>                        
                        :
                        <Button onClick={() => {
                            // navigate('/compare/'+id)
                            setIsCompare(true)
                        }} theme="iris-secondary-small">
                            <img src="./icons/shapes.svg" className="mr-2" alt="" />
                            Compare
                        </Button>
                        }
                        <Button  onClick={clickHandler} theme="iris-small">
                            <img className="mr-2" src="camera.svg" alt=""/>
                            New Scan                            
                        </Button>
                    </div>
                </div>
                <div className="flex flex-col mt-5 gap-5 pb-3   w-full">
                    {result.map((patientHistory, index) => {
                        const myDate = new Date(patientHistory.date);
                        return (
                            <>
                                {index < 2 || isShowMore?
                                <div key={index + id} className="flex justify-between items-center w-full ">
                                    <div className="flex justify-start gap-1 items-center">
                                        {isCompare &&
                                            <Checkbox id={id}  checked={accepted.includes(patientHistory.htmlId)} onChange={() => {
                                                if(!accepted.includes(patientHistory.htmlId)){
                                                    const array = accepted
                                                    if(accepted.length >= 3){
                                                        array.shift()
                                                    }
                                                    setAccepted([...array,patientHistory.htmlId])
                                                    onaccepted([...array,patientHistory.htmlId])
                                                }else{
                                                    const array = accepted
                                                    const index = accepted.indexOf(patientHistory.htmlId);
                                                    array.splice(index, 1)
                                                    setAccepted(array)
                                                    onaccepted(array)
                                                }
                                            }}></Checkbox>
                                        }
                                        <label onClick={() => {
                                                 if(!accepted.includes(patientHistory.htmlId)){
                                                    const array = accepted
                                                    if(accepted.length >= 3){
                                                        array.shift()
                                                    }
                                                    setAccepted([...array,patientHistory.htmlId])
                                                    onaccepted([...array,patientHistory.htmlId])
                                                }else{
                                                    const array = accepted
                                                    const index = accepted.indexOf(patientHistory.htmlId);
                                                    array.splice(index, 1)
                                                    setAccepted(array)
                                                    onaccepted(array)
                                                }                                       
                                        }} htmlFor={id}>
                                            <h2 className="font-normal text-[14px] text-[#2E2E2E]">Scan reports</h2>
                                        </label>
                                    </div>
                                    <div className="text-[#7E7E7E] font-[300]">
                                        Date : <span
                                        className=" ml-1 font-[300] tex-[14px] text-[#7E7E7E]">{myDate.getDate()+"   "+myDate.toLocaleString('default', { month: 'long' })+"   "+myDate.getFullYear()}</span>{" "}
                                    </div>

                                    <div className="flex gap-3 items-center">
                                        <RWebShare data={{
                                            text: "iris",
                                            url: 'https://iris.ainexus.com/v1/golden_ratios/' + patientHistory.htmlId,
                                            title: "iris",
                                        }}>
                                            {/* <div
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
                                                className="bg-[#F9F9FB] cursor-pointer  border border-[#544BF0] w-[36px] h-[32px] flex justify-center items-center rounded-[6px]"
                                            >
                                                <div className="shareIcon-purple"></div>
                                            </div> */}
                                            <Button 
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
                                                }} theme="iris-secondary-small">
                                                <div className="shareIcon-purple"></div>
                                            </Button>
                                        </RWebShare>
                                        {/* <div onClick={() => download(patientHistory.htmlId)}
                                            className="bg-[#F9F9FB] cursor-pointer border border-[#544BF0] w-[36px] h-[32px] flex justify-center items-center rounded-[6px]">
                                            <div className="downloadIcon-purple"></div>
                                        </div> */}
                                        <Button onClick={() => download(patientHistory.htmlId)} theme="iris-secondary-small">
                                            <div className="downloadIcon-purple"></div>
                                        </Button>
                                        <Button onClick={() => {
                                            // setPdf('data:text/html;base64,' + patientHistory.htmlId)
                                            setPhoto(result[0].photo)
                                            setFile(patientHistory.htmlId)                             
                                            navigate('/result')

                                            }} theme="iris-secondary-small">
                                            View Reports
                                        </Button>
                                        {/* <div onClick={() => download(patientHistory.htmlId)}
                                            className="bg-[#F9F9FB] border border-[#544BF0]   cursor-pointer text-[14px] text-[#544BF0] w-[107px] h-[32px] flex justify-center items-center rounded-[6px]">
                                            View Reports
                                        </div> */}

                                    </div>
                                </div>
                                :
                                undefined
                                }
                            </>

                        )
                    })}
                    {
                        result.length> 2 &&
                        <div className="flex justify-between items-center">
                            <div className="w-[90px]"></div>
                            <div onClick={() => {
                                setIsShowMore(!isShowMore)
                            }} className="text-[#544BF0] flex justify-center items-center cursor-pointer font-medium text-center mt-4">{isShowMore?'See Less':'See More'}<span><div data-mode={isShowMore?'true':'false'} className="arowDownIcon-purple ml-1"></div></span></div>
                            <div className="w-[180px]"></div>
                        </div>

                    }
                </div>
                {isShowComment &&
                    <>

                        <div className={"w-full border-t pt-5 flex items-start gap-5 justify-between"}>
                            <div className="text-[14px]">Comments:</div>
                            <div className={` ${comment.length > 0? '':''} `}>
                                {comment.map((comment, index) => {
                                    return (
                                        <div key={index}
                                            className={"flex  gap-3 items-start justify-start w-fit text-[#7E7E7E] pb-3"}>
                                            <h1 className={"text-nowrap text-[14px] font-[300]"}>12 April 2024 </h1>
                                            <p className={"w-4/6 font-[300] text-[14px]"}>{comment}</p>
                                        </div>
                                    )
                                })}
                                {comment.length<=0&&!isShowAddComment &&(<div className={" text-center text-[14px] text-[#7E7E7E]"}>No comment found</div>)}
                            </div>
                            <div className={" h-full  flex items-center justify-end"}>
                                <button disabled={isShowAddComment}
                                        onClick={() => setIsShowAddComment(!isShowAddComment)}
                                        className={ "text-nowrap text-[14px] disabled:text-slate-400 font-normal underline text-[#544BF0] h-full"}>
                                    Add Comment
                                </button>
                            </div>
                        </div>
                        {isShowAddComment && <form  className={"w-full "}>
                            <div className={"w-full flex items-center justify-center"}>
                                <div className={" px-5 pt-5 w-4/6 flex items-end gap-5 justify-end border-b pb-2"}>
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
                                            Save
                                        </Button>

                                    </div>
                                </div>
                            </div>
                        </form>}
                    </>

                }
            </div>

        </div>
    );
};

