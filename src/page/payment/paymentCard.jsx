/* eslint-disable react/prop-types */
import { Button } from "symphony-ui";
import ButtonPrimary from "../../components/button/buttonPrimery.jsx";

export const PaymentCard = ({pak,onselect}) => {
    console.log(pak)
    return (
        <>
            <div
                className={"rounded-2xl px-3 py-2 gap-3 shadow-10xl flex items-center justify-center flex-col border-2  w-fit min-w-[303px]"}>
                <h2 className={"text-lg text-[#444444] font-medium mt-16"}>{pak.information.name}</h2>
                <h1 className={"text-3xl font-medium text-[#544BF0]"}>${pak.information.cost} per scan</h1>
                <div className={"flex items-center justify-center gap-4 flex-col"}>
                    <h1 className={"border-b pb-1 font-medium text-xl w-full text-center mt-8"}>{pak.information.bundle == -1?'Individual Scans':pak.information.bundle+' Scan Bundle'}</h1>
                    <p className={"text-xl font-normal text-[#444444]"}>Feature information </p>
                    <p className={"text-xl font-normal text-[#444444]"}>Feature information </p>
                    <p className={"text-xl font-normal text-[#444444]"}>Feature information </p>
                    {/* <p className={"text-xl font-normal text-[#444444]"}>Feature information </p> */}
                </div>
                <div
                    className={"rounded-b-md px-4 -mx-3 -mb-2 text-wrap bg-[#F5F5F5] py-6 gap-3 flex items-center justify-center flex-col text-center"}>
                    <p className={"text-wrap w-5/6"}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
                    {/* <ButtonPrimary oncl>Get It Now</ButtonPrimary> */}
                    <Button onClick={() =>{onselect()}} theme="iris-small">Get It Now</Button>
                </div>
            </div>
        </>
    )
}
