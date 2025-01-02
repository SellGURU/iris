import { useState } from "react"

const Explation = () => {
    const [isvisible,setIsvisible] = useState(false)
    return (
        <>
            <div onTouchEnd={() => {
                setIsvisible(!isvisible)
            }}  onClick={() => {
                // setTimeout(() => {
                //     setIsvisible(!isvisible)
                // }, 300);
            }} onMouseEnter={() => {
                setIsvisible(true)
            }}  onMouseLeave={() => {
                setIsvisible(false)
            }} className="flex justify-start relative items-center gap-1">
                <div className="text-[#444444] text-[14px]">Results Explanation</div>
                <img src="./info-circle-gray.svg " className="w-4 cursor-pointer" alt="" />
                {isvisible &&
                    <div className="w-[309px] text-[#444444]  absolute left-[-20px] xl:left-32 p-4 top-8 z-30 bg-white rounded-[8px] min-h-[167px]" style={{boxShadow:'0px 0px 6px 0px #00000026'}}>
                       <div className="text-[14px] font-[600]"> Results Interpretation:</div>
                        <div className="text-[14px] ml-3 font-[600]">
                           . Distances (mm):  <span className="font-[400] w-full text-justify">Forehead Curve, Steiner's Line, Tail of Eyebrow Height, Slope of Eyebrow </span>
                        </div>
                        <div className="text-[14px] ml-3 font-[600]">
                           . Ratios (no units): <span className="font-[400] text-justify"> All other results. </span>                       

                        </div>
                    </div>
                }
            </div>

        </>
    )
}

export default Explation