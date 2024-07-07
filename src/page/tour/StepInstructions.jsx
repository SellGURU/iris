import React from 'react'
import ButtonPrimary from '../../components/button/buttonPrimery'
import ButtonSecondary from '../../components/button/buttonSecondary'
import {useLocalStorage} from "@uidotdev/usehooks";
import {useNavigate} from "react-router-dom";

export const StepInstructions = ({step, text, image, note, onNext, onSkip}) => {
    const [isShowTour, setIsShowTour] = useLocalStorage("tour")

    const navigate = useNavigate()
    return (
        <div
            className=" t shadow-xl flex flex-col border  gap-4 p-14 justify-start max-w-[672px] max-h-[1036px] rounded-lg ">
            <h1 className="text-3xl text-center font-medium text-[#2E2E2E]">
                How Face Scan Analysis Works
            </h1>
            <div className='max-w-[560px]'>
                <h3 className="text-xl font-medium inline text-[#2E2E2E]">Step {step}: </h3>
                <p className="text-[#444444] inline  font-normal  text-lg">
                    {text}
                </p>
            </div>
            <img className="object-contain" src={image} alt=""/>
            <p className="text-lg text-[#444444] max-w-[560px]  ">
                {note}
            </p>
            <div className="flex flex-col items-center justify-center gap-5">
                <ButtonPrimary onClickHandler={onNext}
                               className={'w-[200px]'}>{step == 5 ? 'Get Started' : 'Next'}</ButtonPrimary>
                {step !== 5 && (
                    <ButtonSecondary onClickHandler={onSkip} ClassName="border-none text-sm">
                        Skip the tour <img width={24} src={"/public/arrow-right.svg"} alt=""/>
                    </ButtonSecondary>
                )}
            </div>
            {/* <div className=" self-start flex justify-start items-center gap-1">
  <input
  checked={!isShowTour}
      onChange={()=>{
        setIsShowTour(!isShowTour)
  }} className="" type="checkbox" id="dont-show-again" />
  <label className="text-sm font-normal" htmlFor="dont-show-again">
    Don’t show again.
  </label>
</div> */}
        </div>
    )
}

