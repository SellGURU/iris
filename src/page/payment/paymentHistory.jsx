import ButtonPrimary from "../../components/button/buttonPrimery.jsx";
import {PaymentTable} from "./paymentTable.jsx";
import {PaymentCard} from "./paymentCard.jsx";
import {ButtonDefault} from "../../components/button/buttonDefault.jsx";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";


export const PaymentHistory = () => {
    return (
        <div className={"flex gap-5 items-center justify-center px-16 md:px-2 flex-col"}>
            <h1 className={"text-3xl font-medium"}>Payment History</h1>
            <p className={"text-lg font-normal"}>Effortlessly handle your billing and invoices right here.</p>
            <div className={"w-full"}>
                <div>
                    <div className={"flex w-full flex-col md:flex-row  gap-10 items-center justify-between"}>
                        <div className={" w-full h-[302px] border  rounded-md "}>
                            <div
                                className={"bg-[#F5F5F5] px-3 py-4 rounded-md flex items-center justify-between"}>
                                <h1 className={"text-2xl font-medium "}>Current Package Summary</h1>
                                <ButtonPrimary className={"text-[14px]"}>Upgrade</ButtonPrimary>
                            </div>
                            <div className={"space-y-10 flex-col px-6 py-4"}>
                                <div className={"flex items-center justify-between  "}>
                                    <div>
                                        <h1 className={"font-normal text-base text-[#7E7E7E]"}>Package Name</h1>
                                        <p className={"text-xl font-medium"}>No available package</p>
                                    </div>
                                    <div>
                                        <h1 className={"font-normal text-base text-[#7E7E7E]"}>Package Cycle</h1>
                                        <p className={"text-xl font-medium"}>Yearly</p>
                                    </div>
                                    <div>
                                        <h1 className={"font-normal text-base text-[#7E7E7E]"}>Package Cost</h1>
                                        <p className={"text-xl font-medium"}>No Records</p>
                                    </div>
                                </div>
                                <div className={"space-y-5"}>
                                    <h1 className={"font-normal text-base text-[#7E7E7E]"}>Usage</h1>
                                    <p className={"text-lg font-normal text-[#444444]"}>0 Bundle</p>
                                </div>
                                <div className={"h-[20px] bg-[#E1E1E1]"}></div>
                            </div>
                        </div>
                        <div className={" w-full h-[302px] border rounded-md "}>
                            <div
                                className={"bg-[#F5F5F5] px-3 py-4 rounded-md flex items-center justify-between"}>
                                <h1 className={" text-2xl font-medium"}>Payment Method</h1>
                            </div>
                            <div className={"flex items-center justify-between py-4 px-3 h-[134px] border border-[#E1E1E1] rounded-md mx-7 my-5"}>
                                <div className={"h-full flex items-center justify-center"}>
                                    <img src={"/image10.svg"}/>
                                </div>
                                <div className={"h-full text-left w-2/3 space-y-2 pl-3"}>
                                    <h1 className={"text-xl font-medium"}>Master Card **** **** **** 4002</h1>
                                    <p className={"text-[#7E7E7E] font-normal text-base"}>Expiry on 20/2024</p>
                                    <div className={"text-[#7E7E7E] font-normal text-base flex items-center justify-start gap-1"}>
                                        <MdOutlineMailOutline className={"w-5 h-5"}/>
                                        <p>billing@example.mmm</p>
                                    </div>
                                </div>
                                <div className={" h-full"}>
                                    <ButtonDefault>Change</ButtonDefault>
                                </div>
                            </div>
                            <div className={ "px-9 py-4"}>
                                <div className={"font-medium text-xl flex items-center gap-2 justify-start"}>Turn on autopay
                                <span><IoIosArrowDown className={"w-5 h-5"}/></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"w-full mt-16 space-y-5"}>
                        <h1 className={"text-2xl font-medium text-[#2E2E2E]"}>Invoice</h1>
                        <p className={"text-[#7E7E7E] font-normal text-base mb-10"}>Effortlessly handle your billing and
                            invoices right here.</p>
                        <PaymentTable/>
                    </div>
                    <div className={"mt-32"}>
                        <h1 className={"text-2xl font-medium "}>Update Your Subscription Today (Instant Access)</h1>
                        <div className={"flex flex-col md:flex-row items-center pt-10 justify-between gap-4"}>
                            <PaymentCard packageId={"1"} bundle={"Individual Scans"} price={"10"}/>
                            <PaymentCard packageId={"2"} bundle={"50 Scan Bundle"} price={"8"}/>
                            <PaymentCard packageId={"3"} bundle={"100 Scan Bundle"} price={"6"}/>
                            <PaymentCard packageId={"4"} bundle={"1000 Scan Bundle"} price={"5"}/>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
