import { useState } from "react";
import { Button } from "symphony-ui";

const EyebrowCompare = () => {
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);
  const [isOpen4, setIsOpen4] = useState(false);

  return (
    <>
      <div className="w-full flex flex-row gap-2 items-stretch justify-center">
        <div className="flex flex-col items-center justify-center w-[10%] p-2 gap-2 rounded-xl bg-primary-color text-white font-medium text-xl min-h-14">
          <img
            src="/image/icon_eyebrow.png"
            alt="icon_eyebrow"
            className="w-10 h-10"
          />
          Eyebrow
        </div>
        <div className="flex flex-col gap-2 w-full items-stretch justify-start">
          <div className="flex flex-row gap-12 items-start justify-start w-full px-6 py-[6px] rounded-xl bg-[#F5F5F5] text-sm min-h-14 relative">
            <div className="w-1/4 font-medium h-full flex items-center">
              Eyebrow Length
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full gap-1">
              1.618D
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Left:</span>
                1.414(87%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Right:</span>
                1.506(93%)
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full gap-1">
              1.618D
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Left:</span>
                1.414(87%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Right:</span>
                1.506(93%)
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full gap-1">
              1.618D
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Left:</span>
                1.414(87%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Right:</span>
                1.506(93%)
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
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
              Medial Eyebrows Distance
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-start gap-2 w-1/4 font-normal h-full">
              1.0D
              <div className="flex items-center justify-start gap-2 w-full">
                Dist: 0.866(87%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-start gap-2 w-1/4 font-normal h-full">
              1.0D
              <div className="flex items-center justify-start gap-2 w-full">
                Dist: 0.866(87%)
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-start gap-2 w-1/4 font-normal h-full">
              1.0D
              <div className="flex items-center justify-start gap-2 w-full">
                Dist: 0.866(87%)
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

          <div className="flex flex-row gap-12 items-start justify-start w-full px-6 py-[6px] rounded-xl bg-[#F5F5F5] text-sm min-h-14 relative">
            <div className="w-1/4 font-medium h-full flex items-center">
              Eyebrow Tail Higher than Medical Brow
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full gap-1">
              (+ : higher)-( - : lower)
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Left:</span>
                -0.276 mm
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Right:</span>
                1.671 mm
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full gap-1">
              (+ : higher)-( - : lower)
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Left:</span>
                -0.276 mm
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Right:</span>
                1.671 mm
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full gap-1">
              (+ : higher)-( - : lower)
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Left:</span>
                -0.276 mm
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Right:</span>
                1.671 mm
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
              Eyebrow Slope
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full gap-1">
              (Feminine 10-20)-(Masculine 0-10)
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Left:</span>
                13 degrees
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Right:</span>
                15 degrees
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full gap-1">
              (Feminine 10-20)-(Masculine 0-10)
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Left:</span>
                13 degrees
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Right:</span>
                15 degrees
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
              </div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex flex-col items-start justify-between w-1/4 font-normal h-full gap-1">
              (Feminine 10-20)-(Masculine 0-10)
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Left:</span>
                13 degrees
                <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
              </div>
              <div className="flex items-center justify-start gap-2 w-full">
                <span className="font-medium">Right:</span>
                15 degrees
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
          )}
        </div>
      </div>
    </>
  );
};

export default EyebrowCompare;