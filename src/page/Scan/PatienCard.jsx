import React from "react";
import ButtonSecondary from "../../components/button/buttonSecondary";
import ButtonPrimary from "../../components/button/buttonPrimery";
import {Link, useNavigate} from "react-router-dom";
import {useLocalStorage} from "@uidotdev/usehooks";
import {useDispatch} from "react-redux";
import { setErrorThreshold, setPatientID, setSex} from "../../store/PatientInformationStore.js";

export const PatienCard = ({index, patient}) => {
    const {id, date, photo} = patient;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const download = () => {
        // const downloadLink = document.createElement("a");
        // downloadLink.href = pdf;
        // downloadLink.download = 'download.html';
        // downloadLink.click();
    }
    const clickHandler = () => {
        dispatch(setSex(patient.sex))
        dispatch(setPatientID(patient.id))
        dispatch(setErrorThreshold(patient.errorThreshold))
        navigate("/faceCamera")
    }
    return (
        <div className="flex gap-12 items-center justify-start shadow-lg border px-4 pt-2">
            <div className="flex items-start self-start gap-5 ">
                {index}
                <img className="mt-3 w-[90px]" src={photo} alt=""/>
            </div>
            <div className="w-full flex flex-col items-start  justify-center ">
                <div className="flex justify-between w-full gap-8 border-b py-3">
                    <h2 className="text-xl font-bold text-[#1A1919]">Patient ID: {id}</h2>

                    <div className="flex gap-4 items-center">
                        <div className="font-medium text-[#606060]">Last Scan: {date}</div>
                        {/*<Link to="facecamera">*/}
                        <div onClick={clickHandler} className="flex items-center gap-1  text-[#544BF0]">
                            <img src="fi_plus-blue.svg" alt=""/>
                            New Scan
                        </div>
                        {/*</Link>*/}
                    </div>
                </div>
                <div className="flex flex-col mt-5 gap-5 pb-3   w-full">
                    {patient.result.map((patientHistory) => {
                        return (
                            <div key={""} className="flex justify-between w-full ">
                                <h2 className="font-bold text-xl text-[#1a1919]">Scan Analysis</h2>
                                <div>
                                    Date : <span
                                    className=" ml-1 font-medium text-[#606060]">{patientHistory.date}</span>{" "}
                                </div>

                                <div className="flex gap-3 items-center">
                                    <ButtonSecondary>
                                        <img src="fi_share-2.svg" alt=""/>
                                        Share
                                    </ButtonSecondary>
                                    <ButtonPrimary onClickHandler={download}>
                                        <img src="fi_download.svg" alt=""/>
                                        Download PDF
                                    </ButtonPrimary>
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

