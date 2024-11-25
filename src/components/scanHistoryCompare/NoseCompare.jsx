/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "symphony-ui";
import Status from "../../page/FaceScaned/boxs/Status";

const NoseCompare = ({scan1,scan2,date1,date2,images}) => {
  const [isOpen, setIsOpen] = useState(0);
  const resolveStatus = (checked) => {
    if(checked == false){
      return 'No Action Requred'
    }else {
      return 'Action Needed'
    }
  }
  return (
    <>
      <div className="w-full flex flex-row gap-2 items-stretch justify-center">
        <div className="flex flex-col items-center justify-center w-[10%] p-2 gap-2 rounded-xl bg-primary-color text-white font-medium text-xl min-h-14">
          <img
            src="/image/icon_nose.png"
            alt="icon_nose"
            className="w-10 h-10"
          />
          Nose
        </div>
        <div className="flex flex-col gap-2 w-full items-stretch justify-start">
          {scan1.map((el) => {
            return (
              <>
              <div className="flex flex-row gap-12 items-start justify-start w-full px-6 py-[6px] rounded-xl bg-[#F5F5F5] text-sm min-h-14 relative">
                <div className="w-1/4 font-medium h-full flex items-center">
                  {el.key}
                </div>

                <div className="border-l-[#E1E1E1] border-l h-full"></div>

                <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full">
                  {el.ideal_distance}D
                  <div className="flex items-center justify-start gap-2 w-full">
                    Dist:{el.measured_distance} ({el.percent}%)
                    <div className={`w-4 h-4  ${el.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                  </div>
                </div>

                <div className="border-l-[#E1E1E1] border-l h-full"></div>

                <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full">
                  {scan2.filter(val =>val.key == el.key)[0].ideal_distance}D
                  <div className="flex items-center justify-start gap-2 w-full">
                    Dist: {scan2.filter(val =>val.key == el.key)[0].measured_distance}D ({scan2.filter(val =>val.key == el.key)[0].percent}%)
                    <div className={`w-4 h-4  ${scan2.filter(val =>val.key == el.key)[0].problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                  </div>
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
                        el.key == isOpen ? "rotate-180" : ""
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
                      <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                         <div className={`w-4 h-4  ${el.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                        {resolveStatus(el.problematic)}
                      </div>
                    </div>

                    <div className="border-l-[#E1E1E1] border-t w-full"></div>

                    <div className="flex flex-col items-start justify-start gap-1">
                      <div className="text-sm font-medium">{date2}</div>
                      <div className="text-base font-normal text-[#7E7E7E]">
                        {scan2.filter(val =>val.key == el.key)[0].text}
                      </div>
                      <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                         <div className={`w-4 h-4  ${scan2.filter(val =>val.key == el.key)[0].problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                        {resolveStatus(scan2.filter(val =>val.key == el.key)[0].problematic)}
                      </div>
                    </div>

                  </div>

                  <div className="border-l-[#E1E1E1] border-l h-full"></div>

                  <div className="flex flex-col items-start justify-start gap-3 w-1/4">
                    <img
                      src={images[0]}
                      alt="face-image"
                      className="max-h-[340px] w-full rounded-3xl border-2 border-primary-color"
                    />
                    <div className="w-full mt-4">
                      <Status isFull status={resolveStatus(el.problematic)}></Status>

                    </div>
                  </div>

                  <div className="border-l-[#E1E1E1] border-l h-full"></div>

                  <div className="flex flex-col items-start justify-start gap-3 w-1/4">
                    <img
                      src={images[1]}
                      alt="face-image"
                      className="max-h-[340px] w-full rounded-3xl border-2 border-primary-color"
                    />
                    <div className="w-full mt-4">
                      <Status isFull status={resolveStatus(scan2.filter(val =>val.key == el.key)[0].problematic)}></Status>

                    </div>
                  </div>
                </div>
              )}
              </>
            )
          })}

          {/* <div className="flex flex-row gap-12 items-start justify-start w-full px-6 py-[6px] rounded-xl bg-[#F5F5F5] text-sm min-h-14 relative">
            <div className="w-1/4 font-medium h-full flex items-center">
              Alar Base of Nose
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full">
              1.0D
              <div className="flex items-center justify-start gap-2 w-full">
                Dist: 1.125 (113%)
                <div className="w-4 h-4 bg-primary-color rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full">
              1.0D
              <div className="flex items-center justify-start gap-2 w-full">
                Dist: 1.125 (113%)
                <div className="w-4 h-4 bg-primary-color rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full">
              1.0D
              <div className="flex items-center justify-start gap-2 w-full">
                Dist: 1.125 (113%)
                <div className="w-4 h-4 bg-primary-color rounded-full"></div>
              </div>
            </div>

            <div className="flex items-start justify-end absolute -bottom-1 right-0">
              <Button theme="iris-small" onClick={() => setIsOpen2(!isOpen2)}>
                <img
                  className={`transition-transform ${
                    !isOpen2 ? "rotate-180" : ""
                  }`}
                  src="/arrow-white2.svg"
                  alt="arrow-icon"
                />
              </Button>
            </div>
          </div>

          {isOpen2 && (
            <div className="w-full flex flex-row items-start justify-start gap-12 px-6 py-4">
              <div className="flex flex-col items-start justify-start gap-3 w-1/4 pr-2">
                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="text-sm font-medium">Sat 2024/02/02</div>
                  <div className="text-base font-normal text-[#7E7E7E]">
                    Right and Left side aligned
                  </div>
                  <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                    <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
                    Normal
                  </div>
                </div>

                <div className="border-l-[#E1E1E1] border-t w-full"></div>

                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="text-sm font-medium">Sat 2024/02/02</div>
                  <div className="text-base font-normal text-[#7E7E7E]">
                    Right and Left side aligned
                  </div>
                  <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                    <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
                    Normal
                  </div>
                </div>

                <div className="border-l-[#E1E1E1] border-t w-full"></div>

                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="text-sm font-medium">Sat 2024/02/02</div>
                  <div className="text-base font-normal text-[#7E7E7E]">
                    Right side is 1mm lower
                  </div>
                  <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                    <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
                    Normal
                  </div>
                </div>
              </div>

              <div className="border-l-[#E1E1E1] border-l h-full"></div>

              <div className="flex flex-col items-start justify-start gap-3 w-1/4">
                <img
                  src="/image/faceOverall-04.png"
                  alt="face-image"
                  className="max-h-[917px] w-full rounded-3xl border-2 border-primary-color"
                />
                <div className="text-[10px] font-light self-center">Normal</div>
                <div className="w-[96%] h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                  <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                  <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                  <div className="w-1/3 h-full bg-primary-color"></div>
                </div>
              </div>

              <div className="border-l-[#E1E1E1] border-l h-full"></div>

              <div className="flex flex-col items-start justify-start gap-3 w-1/4">
                <img
                  src="/image/faceOverall-04.png"
                  alt="face-image"
                  className="max-h-[917px] w-full rounded-3xl border-2 border-primary-color"
                />
                <div className="text-[10px] font-light self-center">Normal</div>
                <div className="w-[96%] h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                  <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                  <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                  <div className="w-1/3 h-full bg-primary-color"></div>
                </div>
              </div>

              <div className="border-l-[#E1E1E1] border-l h-full"></div>

              <div className="flex flex-col items-start justify-start gap-3 w-1/4">
                <img
                  src="/image/faceOverall-04.png"
                  alt="face-image"
                  className="max-h-[917px] w-full rounded-3xl border-2 border-primary-color"
                />
                <div className="text-[10px] font-light self-center">Normal</div>
                <div className="w-[96%] h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                  <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                  <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                  <div className="w-1/3 h-full bg-primary-color"></div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-row gap-12 items-start justify-start w-full px-6 py-[6px] rounded-xl bg-[#F5F5F5] text-sm min-h-14 relative">
            <div className="w-1/4 font-medium h-full flex items-center">
              Nasal Tip Height from Columella Base
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full">
              0.618D
              <div className="flex items-center justify-start gap-2  w-full">
                Dist: 0.609 (99%)
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full">
              0.618D
              <div className="flex items-center justify-start gap-2  w-full">
                Dist: 0.609 (99%)
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full">
              0.618D
              <div className="flex items-center justify-start gap-2  w-full">
                Dist: 0.609 (99%)
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
              </div>
            </div>

            <div className="flex items-start justify-end absolute -bottom-1 right-0">
              <Button theme="iris-small" onClick={() => setIsOpen3(!isOpen3)}>
                <img
                  className={`transition-transform ${
                    !isOpen3 ? "rotate-180" : ""
                  }`}
                  src="/arrow-white2.svg"
                  alt="arrow-icon"
                />
              </Button>
            </div>
          </div>

          {isOpen3 && (
            <div className="w-full flex flex-row items-start justify-start gap-12 px-6 py-4">
              <div className="flex flex-col items-start justify-start gap-3 w-1/4 pr-2">
                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="text-sm font-medium">Sat 2024/02/02</div>
                  <div className="text-base font-normal text-[#7E7E7E]">
                    Right and Left side aligned
                  </div>
                  <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                    <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
                    Normal
                  </div>
                </div>

                <div className="border-l-[#E1E1E1] border-t w-full"></div>

                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="text-sm font-medium">Sat 2024/02/02</div>
                  <div className="text-base font-normal text-[#7E7E7E]">
                    Right and Left side aligned
                  </div>
                  <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                    <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
                    Normal
                  </div>
                </div>

                <div className="border-l-[#E1E1E1] border-t w-full"></div>

                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="text-sm font-medium">Sat 2024/02/02</div>
                  <div className="text-base font-normal text-[#7E7E7E]">
                    Right side is 1mm lower
                  </div>
                  <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                    <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
                    Normal
                  </div>
                </div>
              </div>

              <div className="border-l-[#E1E1E1] border-l h-full"></div>

              <div className="flex flex-col items-start justify-start gap-3 w-1/4">
                <img
                  src="/image/faceOverall-04.png"
                  alt="face-image"
                  className="max-h-[917px] w-full rounded-3xl border-2 border-primary-color"
                />
                <div className="text-[10px] font-light self-center">Normal</div>
                <div className="w-[96%] h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                  <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                  <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                  <div className="w-1/3 h-full bg-primary-color"></div>
                </div>
              </div>

              <div className="border-l-[#E1E1E1] border-l h-full"></div>

              <div className="flex flex-col items-start justify-start gap-3 w-1/4">
                <img
                  src="/image/faceOverall-04.png"
                  alt="face-image"
                  className="max-h-[917px] w-full rounded-3xl border-2 border-primary-color"
                />
                <div className="text-[10px] font-light self-center">Normal</div>
                <div className="w-[96%] h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                  <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                  <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                  <div className="w-1/3 h-full bg-primary-color"></div>
                </div>
              </div>

              <div className="border-l-[#E1E1E1] border-l h-full"></div>

              <div className="flex flex-col items-start justify-start gap-3 w-1/4">
                <img
                  src="/image/faceOverall-04.png"
                  alt="face-image"
                  className="max-h-[917px] w-full rounded-3xl border-2 border-primary-color"
                />
                <div className="text-[10px] font-light self-center">Normal</div>
                <div className="w-[96%] h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                  <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                  <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                  <div className="w-1/3 h-full bg-primary-color"></div>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-row gap-12 items-start justify-start w-full px-6 py-[6px] rounded-xl bg-[#F5F5F5] text-sm min-h-14 relative">
            <div className="w-1/4 font-medium h-full flex items-center">
              Length of Nose from Eylas
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full">
              0.618D
              <div className="flex items-center justify-start gap-2  w-full">
                Length: 1.519 (94%)
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full">
              0.618D
              <div className="flex items-center justify-start gap-2  w-full">
                Length: 1.519 (94%)
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full">
              0.618D
              <div className="flex items-center justify-start gap-2  w-full">
                Length: 1.519 (94%)
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
              </div>
            </div>

            <div className="flex items-start justify-end absolute -bottom-1 right-0">
              <Button theme="iris-small" onClick={() => setIsOpen4(!isOpen4)}>
                <img
                  className={`transition-transform ${
                    !isOpen4 ? "rotate-180" : ""
                  }`}
                  src="/arrow-white2.svg"
                  alt="arrow-icon"
                />
              </Button>
            </div>
          </div>

          {isOpen4 && (
            <div className="w-full flex flex-row items-start justify-start gap-12 px-6 py-4">
              <div className="flex flex-col items-start justify-start gap-3 w-1/4 pr-2">
                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="text-sm font-medium">Sat 2024/02/02</div>
                  <div className="text-base font-normal text-[#7E7E7E]">
                    Right and Left side aligned
                  </div>
                  <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                    <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
                    Normal
                  </div>
                </div>

                <div className="border-l-[#E1E1E1] border-t w-full"></div>

                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="text-sm font-medium">Sat 2024/02/02</div>
                  <div className="text-base font-normal text-[#7E7E7E]">
                    Right and Left side aligned
                  </div>
                  <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                    <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
                    Normal
                  </div>
                </div>

                <div className="border-l-[#E1E1E1] border-t w-full"></div>

                <div className="flex flex-col items-start justify-start gap-1">
                  <div className="text-sm font-medium">Sat 2024/02/02</div>
                  <div className="text-base font-normal text-[#7E7E7E]">
                    Right side is 1mm lower
                  </div>
                  <div className="flex items-center justify-start gap-1 w-full text-sm font-normal text-[#444444]">
                    <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
                    Normal
                  </div>
                </div>
              </div>

              <div className="border-l-[#E1E1E1] border-l h-full"></div>

              <div className="flex flex-col items-start justify-start gap-3 w-1/4">
                <img
                  src="/image/faceOverall-04.png"
                  alt="face-image"
                  className="max-h-[917px] w-full rounded-3xl border-2 border-primary-color"
                />
                <div className="text-[10px] font-light self-center">Normal</div>
                <div className="w-[96%] h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                  <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                  <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                  <div className="w-1/3 h-full bg-primary-color"></div>
                </div>
              </div>

              <div className="border-l-[#E1E1E1] border-l h-full"></div>

              <div className="flex flex-col items-start justify-start gap-3 w-1/4">
                <img
                  src="/image/faceOverall-04.png"
                  alt="face-image"
                  className="max-h-[917px] w-full rounded-3xl border-2 border-primary-color"
                />
                <div className="text-[10px] font-light self-center">Normal</div>
                <div className="w-[96%] h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                  <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                  <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                  <div className="w-1/3 h-full bg-primary-color"></div>
                </div>
              </div>

              <div className="border-l-[#E1E1E1] border-l h-full"></div>

              <div className="flex flex-col items-start justify-start gap-3 w-1/4">
                <img
                  src="/image/faceOverall-04.png"
                  alt="face-image"
                  className="max-h-[917px] w-full rounded-3xl border-2 border-primary-color"
                />
                <div className="text-[10px] font-light self-center">Normal</div>
                <div className="w-[96%] h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
                  <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
                  <div className="w-1/3 h-full bg-[#03DAC5]"></div>
                  <div className="w-1/3 h-full bg-primary-color"></div>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </>
  );
};

export default NoseCompare;
