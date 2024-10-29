import { useState } from "react";
import { Button } from "symphony-ui";

const CheekCompare = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  return (
    <>
      <div className="w-full flex flex-row gap-2 items-stretch justify-center">
        <div className="flex flex-col items-center justify-center w-[10%] p-2 gap-2 rounded-xl bg-primary-color text-white font-medium text-xl min-h-14">
          <img
            src="/image/icon_cheekbones.png"
            alt="icon_cheekbones"
            className="w-10 h-10"
          />
          Cheek
        </div>
        <div className="flex flex-col gap-2 w-full items-stretch justify-start">
          <div className="flex flex-row gap-12 items-start justify-start w-full px-6 py-[6px] rounded-xl bg-[#F5F5F5] text-sm min-h-14 relative">
            <div className="w-1/4 font-medium h-full flex items-center">
              Width of cheek from Medial Canthus
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full gap-1">
              1.618D
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Left:</span>
                1.397(86%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Right:</span>
                1.353(84%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full gap-1">
              1.618D
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Left:</span>
                1.397(86%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Right:</span>
                1.353(84%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full gap-1">
              1.618D
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Left:</span>
                1.397(86%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Right:</span>
                1.353(84%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
            </div>

            <div className="flex items-start justify-end absolute -bottom-1 right-0">
              <Button theme="iris-small" onClick={() => setIsOpen1(!isOpen1)}>
                <img
                  className={`transition-transform ${
                    !isOpen1 ? "rotate-180" : ""
                  }`}
                  src="/arrow-white2.svg"
                  alt="arrow-icon"
                />
              </Button>
            </div>
          </div>

          {isOpen1 && (
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
              Apex of cheek
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full gap-1">
              1.618D
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Left:</span>
                1.151(72%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Right:</span>
                1.193(74%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full gap-1">
              1.618D
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Left:</span>
                1.151(72%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Right:</span>
                1.193(74%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full gap-1">
              1.618D
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Left:</span>
                1.151(72%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Right:</span>
                1.193(74%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
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
        </div>
      </div>
    </>
  );
};

export default CheekCompare;
