/* eslint-disable react/prop-types */
import { Button } from "symphony-ui";
import Status from "../../page/FaceScaned/boxs/Status";
import { useState } from "react";

const RowDetail = ({el,el2,images,date1,date2,isShowImages}) => {
    const [isOpen, setIsOpen] = useState(0);
    const resolveStatus = (checked) => {
        if(checked == false){
        return 'No Action Required'
        }else {
        return 'Action Needed'
        }
    }    
    return (
        <>
        {el!=undefined && el2!=undefined &&
            <>
                <div className="flex flex-row gap-12 items-start justify-start w-full px-6 py-[6px] rounded-xl bg-[#F5F5F5] text-sm min-h-14 relative">
                  <div className="w-1/4 font-medium h-full flex items-center">
                    {el.key}
                  </div>

                  <div className="border-l-[#E1E1E1] border-l h-full"></div>

                  <div className="flex flex-col text-[#2E2E2E] items-start justify-between w-1/4 font-normal h-full">
                    {el.ideal_distance}D
                  {
                      el.side
                      ?
                      <>
                      <div className="flex items-center justify-start gap-2 w-full">
                        <span className="">Left:</span>
                        {el.side.left.measured_distance } ({el.side.left.percent} %)
                        <div className={`w-4 h-4  ${el.side.left.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                      </div>
                      <div className="flex items-center justify-start gap-2 w-full">
                        <span className="">Right:</span>
                        {el.side.right.measured_distance } ({el.side.right.percent} %)
                        <div className={`w-4 h-4  ${el.side.right.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                      </div>                  
                      </>
                      :
                        <div className="flex items-center justify-start gap-2 w-full">
                          Dist: {el.measured_distance}D ({el.percent}%)
                          <div className={`w-4 h-4  ${el.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                        </div>

                    }
                  </div>

                  <div className="border-l-[#E1E1E1] border-l h-full"></div>

                  <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full">
                    {el2.ideal_distance}D
                    {
                      el2.side
                      ?
                      <>
                      <div className="flex items-center justify-start gap-2 w-full">
                        <span className="">Left:</span>
                        {el2.side.left.measured_distance } ({el2.side.left.percent} %)
                        <div className={`w-4 h-4  ${el2.side.left.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                      </div>
                      <div className="flex items-center justify-start gap-2 w-full">
                        <span className="">Right:</span>
                        {el2.side.right.measured_distance } ({el2.side.right.percent} %)
                        <div className={`w-4 h-4  ${el2.side.right.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                      </div>                  
                      </>
                      :
                        <div className="flex items-center justify-start gap-2 w-full">
                          Dist: {el2.measured_distance}D ({el2.percent}%)
                          <div className={`w-4 h-4  ${el2.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                        </div>

                    }
                  </div>

                  {/* <div className="border-l-[#E1E1E1] border-l h-full"></div> */}


                  <div className="flex items-start justify-end absolute -bottom-1 right-0">
                    <Button theme="iris-small" onClick={() => { 
                        if(!el.key == isOpen){
                          setIsOpen(el.key)
                        }else {
                          setIsOpen(0)
                        }
                    }}>
                      <img
                        className={`transition-transform ${
                          el.key != isOpen ? "rotate-180" : ""
                        }`}
                        src="/arrow-white2.svg"
                        alt="arrow-icon"
                      />
                    </Button>
                  </div>
                </div>

                {isOpen == el.key && (
                  <div className="w-full flex flex-row items-start justify-start gap-12 px-6 py-4">
                    <div className="flex flex-col items-start justify-start gap-3 w-1/4 pr-2">
                      <div className="flex flex-col items-start justify-start gap-1">
                        <div className="text-sm font-medium">{date1}</div>
                        <div className="text-base font-normal text-[#7E7E7E]">
                          {el.text}
                        </div>
                        {el.side ?
                        <>
                          <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                            Left:
                            <div className={`w-4 h-4  ${el.side.left.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                            {resolveStatus(el.side.left.problematic)}
                          </div>  
                          <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                            Right:
                            <div className={`w-4 h-4  ${el.side.right.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                            {resolveStatus(el.side.right.problematic)}
                          </div>                                             
                        </>
                        :
                        <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                          <div className={`w-4 h-4  ${el.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                          {resolveStatus(el.problematic)}
                        </div>
                        }
                      </div>

                      <div className="border-l-[#E1E1E1] border-t w-full"></div>

                      <div className="flex flex-col items-start justify-start gap-1">
                        <div className="text-sm font-medium">{date2}</div>
                        <div className="text-base font-normal text-[#7E7E7E]">
                          {el2.text}
                        </div>
                        {el2.side ?
                        <>
                          <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                            Left:
                            <div className={`w-4 h-4  ${el2.side.left.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                            {resolveStatus(el2.side.left.problematic)}
                          </div>  
                          <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                            Right:
                            <div className={`w-4 h-4  ${el2.side.right.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                            {resolveStatus(el2.side.right.problematic)}
                          </div>                                             
                        </>
                        :
                          <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                            <div className={`w-4 h-4  ${el2.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                            {resolveStatus(el2.problematic)}
                          </div>
                        
                        }

                      </div>

                    </div>


                    {isShowImages &&
                    <>
                    <div className="border-l-[#E1E1E1] border-l h-full"></div>
                      {
                        el.side ?
                        <div className="w-1/4">
                          <div className="flex flex-col items-start justify-start gap-3  w-full">
                            <div className="h-[320px] overflow-hidden w-[260px] rounded-3xl border-2 border-primary-color">
                                <img
                                src={el.side.left.thumbnail }
                                alt="face-image"
                                className="object-cover w-full h-full"
                                />

                            </div>
                            <div className="w-full mt-4">
                              <Status isFull status={resolveStatus(el.side.left.problematic)}></Status>
                            </div>
                          </div>
                          <div className="flex mt-6 flex-col items-start justify-start gap-3 w-full">
                            <div className="h-[320px] overflow-hidden w-[260px] rounded-3xl border-2 border-primary-color">
                                <img
                                src={el.side.right.thumbnail}
                                alt="face-image"
                                className="object-cover w-full h-full"
                                />

                            </div>
                            <div className="w-full mt-4">
                              <Status isFull status={resolveStatus(el.side.right.problematic)}></Status>
                            </div>
                          </div>
                        </div> 
                        :

                      <div className="flex flex-col items-start justify-start gap-3 w-1/4">
                        <div className="h-[320px] overflow-hidden w-[260px] rounded-3xl border-2 border-primary-color">
                            <img
                            src={el.side? el.side.left.thumbnail : el.thumbnail}
                            alt="face-image"
                            className="object-cover w-full h-full"
                            />

                        </div>
                        <div className="w-full mt-4">
                          {el.side ?
                          <Status isFull status={resolveStatus(el.side.left.problematic)}></Status>
                          :
                          <Status isFull status={resolveStatus(el.problematic)}></Status>
                          }

                        </div>
                      </div>
                      }                    
                        <div className="border-l-[#E1E1E1] border-l h-full"></div>
                          
                          {
                            el2.side ?
                            <div className="w-1/4">
                              <div className="flex flex-col items-start justify-start gap-3  w-full">
                                <div className="h-[320px] overflow-hidden w-[260px] rounded-3xl border-2 border-primary-color">
                                    <img
                                    src={el2.side.left.thumbnail }
                                    alt="face-image"
                                    className="object-cover w-full h-full"
                                    />

                                </div>
                                <div className="w-full mt-4">
                                  <Status isFull status={resolveStatus(el2.side.left.problematic)}></Status>
                                </div>
                              </div>
                              <div className="flex mt-6 flex-col items-start justify-start gap-3 w-full">
                                <div className="h-[320px] overflow-hidden w-[260px] rounded-3xl border-2 border-primary-color">
                                    <img
                                    src={el2.side.right.thumbnail}
                                    alt="face-image"
                                    className="object-cover w-full h-full"
                                    />

                                </div>
                                <div className="w-full mt-4">
                                  <Status isFull status={resolveStatus(el2.side.right.problematic)}></Status>
                                </div>
                              </div>
                            </div> 
                            :

                          <div className="flex flex-col items-start justify-start gap-3 w-1/4">
                            <div className="h-[320px] overflow-hidden w-[260px] rounded-3xl border-2 border-primary-color">
                                <img
                                src={el2.side? el2.side.left.thumbnail : el2.thumbnail}
                                alt="face-image"
                                className="object-cover w-full h-full"
                                />

                            </div>
                            <div className="w-full mt-4">
                              {el2.side ?
                              <Status isFull status={resolveStatus(el2.side.left.problematic)}></Status>
                              :
                              <Status isFull status={resolveStatus(el2.problematic)}></Status>
                              }

                            </div>
                          </div>
                          }
                    </>
                      }
                    </div>
                )}     
            </>
        }
        </>
    )
}

export default RowDetail