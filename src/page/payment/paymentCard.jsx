/* eslint-disable react/prop-types */
import { Button } from "symphony-ui";
import ButtonPrimary from "../../components/button/buttonPrimery.jsx";
import { useState } from "react";

export const PaymentCard = ({pak,onselect}) => {
    // console.log(pak)
    const [isHoverd,setIsHoverd] = useState(false)
    return (
        <>
            <div
                onMouseEnter={() => {
                    setIsHoverd(true)
                }}
                onMouseLeave={() => {
                    setIsHoverd(false)
                }}
                className={"rounded-2xl cursor-pointer min-h-[474px] relative overflow-hidden  py-2 gap-3 shadow-10xl flex items-center justify-center flex-col border-2  w-fit min-w-[303px]"}>
                {
                    pak.information.discount!='0'?
                        <div className={`absolute top-0 left-0 w-[142px] flex justify-center items-center  rounded-br-[16px]  z-10 text-[18px] ${isHoverd?' bg-white text-primary-color ':' bg-[#544BF0] text-white'}  h-[40px]`}>{pak.information.discount}% Discount</div>
                    :undefined
                }
                {
                    isHoverd?
                        <img className="absolute top-0" src="./icons/Oval6.svg" />
                    :undefined
                }
                <h2 className={`text-[20px] ${isHoverd?' text-white':'text-[#2E2E2E]'} relative z-10  font-medium mt-12 `}>{pak.information.name}</h2>
                <h1 className={"text-[28px] my-10 font-medium text-[#544BF0]"}>{pak.information.discount!= '0'?
                    <>
                     <span className="text-[#CBC9C9] font-thin text-[28px] line-through">${pak.information.oldCost }</span>
                        <span className="text-[#CBC9C9] "> / </span>
                    </>
                    :undefined}  ${pak.information.cost}</h1>
                <div className={"flex items-center justify-center gap-4 flex-col"}>
                    {/* <h1 className={"border-b pb-1 font-medium text-xl w-full text-center mt-8"}>{pak.information.bundle == -1?'Individual Scans':pak.information.bundle+' Scan Bundle'}</h1> */}
                    {
                        pak.information.options.map((el,index) => {
                            return(
                                <p key={index} className={`text-[16px] w-full text-left font-normal flex justify-start gap-2 items-center ${el ==''?'invisible':''} text-[#444444]`}> <span><img src="./icons/tick.svg" alt="" /></span>{el} </p>
                            )
                        })
                    }
                    {/* <p className={"text-[16px] w-full text-left font-normal flex justify-start gap-2 items-center text-[#444444]"}> <span><img src="./icons/tick.svg" alt="" /></span>use within 12 months</p> */}
                    {/* <p className={"text-xl font-normal text-[#444444]"}>Feature information </p> */}
                </div>
                <div
                    className={"rounded-b-md  w-full -mx-3 -mb-2 text-wrap bg-[#F5F5F5] py-6 gap-3 flex items-center justify-center flex-col text-center"}>
                    <p className={"text-wrap text-[18px] text-[#444444] w-full"}>Promotional Pricing</p>
                    {/* <ButtonPrimary oncl>Get It Now</ButtonPrimary> */}
                    <Button onClick={() =>{onselect()}} theme="iris">
                        <div className="cursor-pointer w-[130px]">
                            Get it now

                        </div>
                        </Button>
                </div>
            </div>
        </>
    )
}
