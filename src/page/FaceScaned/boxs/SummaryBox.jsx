import { butiText } from "../../../help"
import Status from "./Status"

/* eslint-disable react/prop-types */
const SummaryBox =({data,indexNum}) => {
    console.log(data)
    const resolveStatus = () => {
        if(data.side) {
            if(data.side.left.problematic == false) {
                return 'No Action Needed'
            }
            return 'Action Needed'            
        }else {
            if(data.problematic == false) {
                return 'No Action Needed'
            }
            return 'Action Needed'

        }
    }
    const resolvePercent = () => {
        if(data.side) {
            if(data.side.left.percent){
                return data.side.left.percent
            }
        }
        return data.percent
    }
    return (
        <>
            <div className="flex flex-col my-3 gap-4 xl:my-0 xl:gap-0">
            <p><span className=" text-[#2E2E2E]">{indexNum+1} . </span>{butiText(data.key)}</p>
            <p className="text-[#7E7E7E] h-[34px] text-xs xl:text-[14px] mb-1 xl:mb-0 mt-2 decorated-dot">
                Description: {data.text}
            </p>
            <div className="flex flex-row items-center mt-1 justify-between w-full">
                <p className="decorated-dot text-xs xl:text-[14px] ">
                    {data.type == 'ratio' ?
                    <>
                        Ratio: 
                        {data.side ?
                        <>
                            {data.side.left.ratio}
                        </>
                        :
                        <>
                        {data.ratio}
                        </>
                        }
                    </>
                    :
                    <>
                        Measurement: {data.ideal_distance}
                    </>
                    }
                    {/* {data.unit} */}
                </p>
                <Status status={resolveStatus()} percent={resolvePercent()}></Status>
            </div>
            </div>        
        </>
    )
}

export default SummaryBox