import ButtonPrimary from "../../components/button/buttonPrimery.jsx";
import {PaymentTable} from "./paymentTable.jsx";

export const PaymentHistory = () => {
    return (
        <div className={"flex gap-5 items-center justify-center gap-2 flex-col"}>
            <h1 className={"text-3xl font-medium"}>Payment History</h1>
            <p className={"text-lg font-normal"}>Effortlessly handle your billing and invoices right here.</p>
            <div>
                <div>
                    <div className={"flex  gap-10 items-center justify-center"}>
                        <div className={"w-[660px] h-[302px] border rounded-md "}>
                            <div
                                className={"bg-[#F5F5F5] text-2xl font-medium px-3 py-2 rounded-md flex items-center justify-between"}>
                                <h1>Current Package Summary</h1>
                                <ButtonPrimary>Upgrade</ButtonPrimary>
                            </div>
                        </div>
                        <div className={"w-[660px] h-[302px] border rounded-md "}>
                            <div
                                className={"bg-[#F5F5F5] text-2xl font-medium px-3 py-4 rounded-md flex items-center justify-between"}>
                                <h1>Payment Method</h1>
                            </div>
                        </div>
                    </div>
                    <div className={"w-full mt-16"}>
                        <h1 className={"text-2xl font-medium text-[#2E2E2E]"}>Invoice</h1>
                        <p className={"text-[#7E7E7E] font-normal text-base"}>Effortlessly handle your billing and
                            invoices right here.</p>
                        <PaymentTable/>
                    </div>
                </div>
            </div>
        </div>
    )
}
