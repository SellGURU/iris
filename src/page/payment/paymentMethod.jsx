import { useState } from "react";
import {ButtonDefault} from "../../components/button/buttonDefault.jsx";
import { MdOutlineMailOutline } from "react-icons/md";
import { Button } from "symphony-ui";
// import { IoIosArrowDown } from "react-icons/io";

const PaymentMethod = () => {
    const [isHaveCard,setisHaveCard]  = useState(false)
    return (
        <>
            <div className={"flex items-center justify-between py-4 px-3 h-[134px] border border-[#E1E1E1] rounded-md mx-7 my-5"}>
               {isHaveCard?
               <>
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
                    <div className={" h-full invisible"}>
                        <ButtonDefault>Change</ButtonDefault>
                    </div>
               </>
               :
               <>
               <div className="w-full flex justify-between items-start">
                    <div>
                        <div>
                            <div className="text-[#2E2E2E] text-[20px] font-medium">Choose Payment method:</div>
                            <div className="flex cursor-pointer justify-between items-center w-[330px] mt-3 pl-3 text-[#7E7E7E]">
                                <div className="text-[14px]">Credit Card</div>
                                <img className="rotate-180" src="./arrow-down.svg" alt="" />
                            </div>
                            <div className=" w-full bg-[#E1E1E1] h-[1px] mt-1"></div>
                        </div>
                    </div>
                    <div>
                        <Button theme="iris-small" disabled>Save</Button>
                    </div>
               </div>
               </>
               }
            </div>        
        </>
    )
}

export default PaymentMethod                