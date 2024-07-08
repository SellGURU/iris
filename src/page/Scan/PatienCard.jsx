import React, {useContext} from "react";
import ButtonSecondary from "../../components/button/buttonSecondary";
import ButtonPrimary from "../../components/button/buttonPrimery";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {PatientContext} from "../../context/context.jsx";
import {RWebShare} from "react-web-share";

export const PatienCard = ({index, patient}) => {
    const {id, date, photo, result} = patient;
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    console.log(result[0])
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

                    <div className="flex gap-4 items-center">
                        {/* <div className="font-medium text-[#606060]">Last Scan: {date}</div> */}
                        {/*<Link to="facecamera">*/}
                        {/* <div onClick={clickHandler} className="flex items-center gap-1  text-[#544BF0]">
                            <img src="fi_plus-blue.svg" alt=""/>
                            New Scan
                        </div> */}
                        <button onClick={clickHandler}
                                className="flex justify-evenly font-medium items-center rounded-[8px] px-4 text-white bg-[#544BF0] h-[40px]">
                            <img className="mr-2" src="camera.svg" alt=""/>
                            New Scan
                        </button>
                        {/*</Link>*/}
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

                    {/* <div className="flex justify-between w-full ">
            <h2 className="font-bold text-xl text-[#1a1919]">Scan Analysis</h2>
            <span className="font-medium text-[#606060]">
              Date: 12 April 2024{" "}
            </span>
            <div className="flex gap-3 items-center">
              <ButtonSecondary>
                <img src="/public/fi_share-2.svg" alt="" />
                Share
              </ButtonSecondary>
              <ButtonPrimary>
                <img src="/public/fi_download.svg" alt="" />
                Download PDF
              </ButtonPrimary>
            </div>
          </div> */}
                </div>
                {/* <div className={` mt-5 w-full border-t py-3 flex justify-between items-center ${!comment ? 'hidden' : '' }`}>
        <h3 className="text-xl font-medium text-[#1a1919]">Comments:</h3>
        <p> 12 April 2024  Lorem Ipsum is simply dummy text of the printing and typesetting industry... <span className="text-[#544BF0] underline">Add Comment</span></p>
        <div className="flex items-center gap-1 text-[#544BF0]">
            <img src='/public/arrow-up.svg' alt="" />
            See More
        </div>
      </div> */}
            </div>
        </div>
    );
};

