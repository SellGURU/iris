import { useState } from "react";
import { Button } from "symphony-ui";

const Other = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="w-full flex flex-row gap-2 items-stretch justify-center">
        <div className="flex flex-col items-center justify-center w-[14%] py-6 gap-3 rounded-xl bg-primary-color text-white font-medium text-xl min-h-[128px]">
          <img
            src="/image/icon_hair.png"
            alt="icon_other"
            className="w-10 h-10"
          />
          Other
        </div>
        <div className="flex flex-col items-start justify-start w-full p-8 gap-8 rounded-xl bg-[#F5F5F5] font-medium text-sm min-h-[128px]">
          <div className="flex flex-row w-full gap-[69px]">
            <div className="flex flex-col items-start justify-between w-[20%] h-[7vh]">
              <p>
                Forehead Countour
                <br />
                Feminine 12-14
                <br />
                Masculine no set value
              </p>
            </div>

            <div className="flex flex-col items-start justify-between w-[20%] h-[7vh]">
              <p>
                Steiner Line
                <br />
                Feminine pos + : up to 1mm in front Masculine neg - : up to 2mm
                in behind
              </p>
            </div>

            <div className="flex flex-col items-start justify-between w-[20%] h-[7vh]">
              <p>Medial Canthus to Medial Brow =0.618D</p>
            </div>
          </div>

          <div className="flex flex-row w-full gap-[69px]">
            <div className="flex flex-col items-start justify-start w-[20%]">
              <div className="flex flex-row w-full justify-between items-center">
                <p>Angle: 13 degrees</p>
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
              </div>
            </div>

            <div className="flex flex-col items-start justify-start w-[20%]">
              <div className="flex flex-row w-full justify-between items-center">
                <p>Offset: 0.667 mm</p>
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
              </div>
            </div>

            <div className="flex flex-col items-start justify-start w-[20%]">
              <div className="flex flex-row w-full justify-between items-center">
                <p>Dist: 0.653(106%)</p>
                <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
              </div>
            </div>

          </div>
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
        <div className="w-full flex flex-row items-start justify-start gap-4 mb-8">
          <div className="flex flex-col items-start justify-start gap-3 w-[23%]">
            <img
              src="/image/faceOverall-04.png"
              alt="face-image"
              className="max-h-[917px] w-full rounded-3xl border-2 border-primary-color"
            />
            <div className="text-left text-sm font-normal">
              Left Philtral Colum to Contralateral commissure/
              <br />
              Lips Width
            </div>
            <div className="text-[10px] font-light self-center">Normal</div>
            <div className="w-[96%] h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
              <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
              <div className="w-1/3 h-full bg-[#03DAC5]"></div>
              <div className="w-1/3 h-full bg-primary-color"></div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-3 w-[23%]">
            <img
              src="/image/faceOverall-04.png"
              alt="face-image"
              className="max-h-[917px] w-full rounded-3xl border-2 border-primary-color"
            />
            <div className="text-left text-sm font-normal">
              Right Philtral Colum to Contralateral commissure/
              <br />
              Lips Width
            </div>
            <div className="text-[10px] font-light self-center">Normal</div>
            <div className="w-[96%] h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
              <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
              <div className="w-1/3 h-full bg-[#03DAC5]"></div>
              <div className="w-1/3 h-full bg-primary-color"></div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-start gap-3 w-[23%]">
            <img
              src="/image/faceOverall-04.png"
              alt="face-image"
              className="max-h-[917px] w-full rounded-3xl border-2 border-primary-color"
            />
            <div className="text-left text-sm font-normal">
              Height of Upper Lip/
              <br />
              Height of Lower Lip
            </div>
            <div className="text-[10px] font-light self-center">Normal</div>
            <div className="w-[96%] h-3 rounded-[21px] flex flex-row items-center self-center overflow-hidden">
              <div className="w-1/3 h-full bg-[#FF3E5D]"></div>
              <div className="w-1/3 h-full bg-[#03DAC5]"></div>
              <div className="w-1/3 h-full bg-primary-color"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Other;
