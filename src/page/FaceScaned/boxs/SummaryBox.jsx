import { butiText } from "../../../help"
import Status from "./Status"

/* eslint-disable react/prop-types */
const SummaryBox =({data,indexNum}) => {
    console.log(data)
    const resolveStatus = () => {
        if(data.side) {
            if(data.side.left.problematic == false) {
                return 'No Action Required'
            }
            return 'Action Needed'            
        }else {
            if(data.problematic == false) {
                return 'No Action Required'
            }
            return 'Action Needed'

        }
    }
    return (
        <>
            <div className="flex flex-col">
            <p><span className=" text-[#2E2E2E]">{indexNum+1} . </span>{butiText(data.key)}</p>
            <p className="text-[#7E7E7E] h-[34px] text-[14px] mt-2 decorated-dot">
                Description: {data.text}
            </p>
            <div className="flex flex-row items-center mt-1 justify-between w-full">
                <p className="decorated-dot ">
                    {data.measured_distance ?
                    <>
                        Measurement: {data.measured_distance}
                    </>
                    :
                    <>
                        Measurement: {data.ideal_distance}
                    </>
                    }
                </p>
                <Status status={resolveStatus()}></Status>
            </div>
            </div>        
        </>
    )
}

export default SummaryBox