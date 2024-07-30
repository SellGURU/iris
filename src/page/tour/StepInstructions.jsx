import React from "react";
// import ButtonPrimary from '../../components/button/buttonPrimery'
import ButtonSecondary from "../../components/button/buttonSecondary";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useNavigate } from "react-router-dom";
import { Button } from "symphony-ui";

export const StepInstructions = ({
  step,
  text,
  image,
  note,
  onNext,
  onSkip,
}) => {
  const [isShowTour, setIsShowTour] = useLocalStorage("tour");

  const navigate = useNavigate();
  return (
    <div className="  shadow-xl flex flex-col items-center  border  gap-2 py-5 px-10 justify-start max-w-[672px]  rounded-lg ">
      <h1 className="text-[22px] text-center font-medium text-[#2E2E2E]">
        How Face Scanner Works
      </h1>
      <div className="flex flex-col w-full items-center justify-center gap-5 px-5">
        <div className="  self-start     ">
          <h3 className=" font-bold text-sm inline text-[#2E2E2E]"> { step == 4 ? 'Final Step : ' :  `Step ${step}:`}</h3>
          <p className="text-[#444444] inline leading-[16px] text-sm     font-normal  ">{text}</p>
        </div>
        <img className={`object-contain `} src={image} alt="" />
        <div className=" text-[#444444]  text-sm       ">{note}</div>
        <div className="flex  items-center justify-center gap-2">
        
          {/* <ButtonPrimary onClickHandler={onNext}
                               className={'w-[200px]'}>{step == 5 ? 'Get Started' : 'Next'}</ButtonPrimary> */}
          {step != 4 && (
            <ButtonSecondary
              onClickHandler={onSkip}
              ClassName="border-none text-sm"
            >
              Skip the tour{" "}
              
            </ButtonSecondary>
          )}
            <Button
            theme="iris"
            onClick={() => {
              onNext();
            }}
          >
            <div className="w-[172px]">
              {step == 4 ? "Get Started" : "Next"}
            </div>
          </Button>
        </div>
        <div className=" self-start invisible flex justify-start items-center gap-1  ">
          <input
            checked={!isShowTour}
            onChange={() => {
              setIsShowTour(!isShowTour);
            }}
            className=""
            type="checkbox"
            id="dont-show-again"
          />
          <label className="text-sm font-normal" htmlFor="dont-show-again">
            Don’t show again.
          </label>
        </div>
      </div>
    </div>
  );
};
