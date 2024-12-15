/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button } from "symphony-ui";
import Status from "../../page/FaceScaned/boxs/Status";
import { butiText } from "../../help";
const ContentViewBox = ({data,category}) => {
  const [isOpen, setIsOpen] = useState(false);
  const resolveIcon =() => {
    switch(category){
        case 'forehead': return '/image/Forehead.svg'
        case 'chin': return '/image/Chin.svg'
        case 'cheeks': return '/image/Cheek.svg'
        case 'eyebrows': return '/image/Eyebrow.svg'
        case 'lips': return '/image/Lip.svg'
        case 'nose': return '/image/Nose.svg'
    }
  }
    const resolveStatus = (checked) => {
        if(checked == false){
        return 'No Action Required'
        }else {
        return 'Action Needed'
        }
    }     
  return (
    <>
      <div className="w-full flex flex-row gap-2 items-stretch justify-center">
        <div className="flex flex-col items-center justify-center w-[14%] min-w-[14%] py-6 gap-3 rounded-xl bg-primary-color text-white font-medium text-xl min-h-[128px]">
          <img
            src={resolveIcon()}
            alt="icon_forehead"
            className="w-10 h-10"
          />
          {/* Forehead */}
          {category}
        </div>
        <div className="flex flex-row flex-wrap items-start justify-start w-full p-8 gap-[69px] rounded-xl bg-[#F5F5F5] font-normal text-[#2E2E2E]  text-sm min-h-[128px]">
          {data.map((el) => {
            return (
              <>
              <div className="flex flex-col items-start justify-between w-[25%] h-[7vh]">
                <div className="flex flex-row w-full">
                  {butiText(el.key)} = {el.ideal_distance?el.ideal_distance+ 'D':'No Data'}
                </div>
                {el.side ?
                <>
                    <div className="flex flex-row w-full mt-2 justify-between items-center text-xs xl:text-sm font-medium">
                      <p>Left:</p>
                      <p>{el?.side?.left?.ratio}({el?.side?.left?.percent}%)</p>
                      <div className={`xl:w-4 xl:h-4 w-3 h-3 ${el.side?.left.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                    </div>
                    <div className=" mt-2 flex flex-row w-full justify-between items-center text-xs xl:text-sm font-medium">
                      <p>Right:</p>
                      <p>{el?.side?.right?.ratio}({el?.side?.right?.percent}%)</p>
                      <div className={`xl:w-4 xl:h-4 w-3 h-3  ${el.side?.right.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                    </div>
                </>
                :
                <>
                <div className="flex flex-row w-full justify-between items-center">
                  <p className="text-xs xl:text-sm font-medium">Dist: {el.ratio} ({el.percent} %)</p>
                  <div className={`xl:w-4 xl:h-4 w-3 h-3  ${el.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                </div>                
                </>
                }
              </div>           
              </>
            )
          })}          

        </div>
      </div>
      <div className="w-full flex items-start justify-end -mt-6 mb-2">
        <Button theme="iris-small" onClick={() => setIsOpen(!isOpen)}>
          <img
            className={`transition-transform ${!isOpen ? "rotate-180" : ""}`}
            src="/arrow-white2.svg"
            alt="arrow-icon"
          />
        </Button>
      </div>

      {isOpen && (
        <div className="w-full flex flex-row flex-wrap items-start justify-start gap-5 mb-8">
         {data.map(el => {
          return (
            <>
            {
              el.side ?
              <>
                  <div className="flex flex-col  items-start justify-start gap-3  ">
                    <div className="h-[320px] overflow-hidden w-[260px] rounded-3xl border-2 border-primary-color">
                        <img
                        src={el.side.left.thumbnail }
                        alt="face-image"
                        className="object-cover w-full h-full"
                        />

                    </div>
                    <div className="w-[260px] mt-4">
                      <Status isFull status={resolveStatus(el.side.left.problematic)}></Status>
                    </div>
                  </div>
                  <div className="flex  flex-col items-start justify-start gap-3 ">
                    <div className="h-[320px] overflow-hidden w-[260px] rounded-3xl border-2 border-primary-color">
                        <img
                        src={el.side.right.thumbnail}
                        alt="face-image"
                        className="object-cover w-full h-full"
                        />

                    </div>
                    <div className="w-[260px] mt-4">
                      <Status isFull status={resolveStatus(el.side.right.problematic)}></Status>
                    </div>
                  </div>
              </>
              :

            <div className="flex flex-col items-start justify-start gap-3 ">
              <div className="h-[320px] overflow-hidden w-[260px] rounded-3xl border-2 border-primary-color">
                  <img
                  src={el.side? el.side.left.thumbnail : el.thumbnail}
                  alt="face-image"
                  className="object-cover w-full h-full"
                  />

              </div>
              <div className="w-[260px] mt-4">
                {el.side ?
                <Status isFull status={resolveStatus(el.side.left.problematic)}></Status>
                :
                <Status isFull status={resolveStatus(el.problematic)}></Status>
                }

              </div>
            </div>
            } 
            
            </>
          )
         })}
        </div>
      )}
    </>
  );
};

export default ContentViewBox;