/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "symphony-ui";
// import Status from "../../page/FaceScaned/boxs/Status";
const Nose = ({data}) => {
  // const resolveStatus = (value) => {
  //     if(value.problematic == false) {
  //         return 'No Action Requred'
  //     }
  //     return 'Action Needed'
  // }  
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="w-full flex flex-row gap-2 items-stretch justify-center">
        <div className="flex flex-col items-center justify-center w-[14%] py-6 gap-3 rounded-xl bg-primary-color text-white font-medium text-xl min-h-[128px]">
          <img
            src="/image/Nose.svg"
            alt="icon_nose"
            className="w-10 h-10"
          />
          Nose
        </div>
        <div className="flex flex-row items-start flex-wrap justify-start w-full p-8 gap-[69px] rounded-xl bg-[#F5F5F5] font-medium text-sm min-h-[128px]">
          {data.map((el) => {
            return (
              <>
              <div className="flex flex-col items-start justify-between w-[20%] h-[7vh]">
                <div className="flex flex-row w-full">
                  {el.key} ={el.measured_distance}D
                </div>
                <div className="flex flex-row w-full justify-between items-center">
                  <p>Dist: {el.ratio} ({el.percent} %)</p>
                  <div className={`w-4 h-4  ${el.problematic ?'bg-red-500':'bg-primary-color'} rounded-full`}></div>
                </div>
              </div>             
              </>
            )
          })}
          {/* <div className="flex flex-col items-start justify-between w-[20%] h-[7vh]">
            <div className="flex flex-row w-full">
              Intercanthal Line of Nasal Tip ={data.data.pose_analysis[0].current_image_analysis.measurements.vertical.intercanthal_to_nasal_tip.ideal_distance}D
            </div>
            <div className="flex flex-row w-full justify-between items-center">
              <p>Dist: {data.data.pose_analysis[0].current_image_analysis.measurements.vertical.intercanthal_to_nasal_tip.ratio} ({data.data.pose_analysis[0].current_image_analysis.measurements.vertical.intercanthal_to_nasal_tip.percent}%)</p>
              <div className="w-4 h-4 bg-primary-color rounded-full"></div>
            </div>
          </div> */}

          {/* <div className="flex flex-col items-start justify-between w-[20%] h-[7vh]">
            <p>Alar Base of Nose ={data.data.pose_analysis[0].current_image_analysis.measurements.horizontal.alar_base_of_nose.ideal_distance}D</p>
            <div className="flex flex-row w-full justify-between items-center">
              <p>Width: {data.data.pose_analysis[0].current_image_analysis.measurements.horizontal.alar_base_of_nose.ratio} ({data.data.pose_analysis[0].current_image_analysis.measurements.horizontal.alar_base_of_nose.percent}%)</p>
              <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
            </div>
          </div> */}

          {/* <div className="flex flex-col items-start justify-between w-[20%] h-[7vh]">
            <p>Nasal Tip Height from Columella Base ={data.data.pose_analysis[0].current_image_analysis.measurements.measurements_in_profile.nasal_tip_from_base_of_columella.ideal_distance}D</p>
            <div className="flex flex-row w-full justify-between items-center">
              <p>Dist: {data.data.pose_analysis[0].current_image_analysis.measurements.measurements_in_profile.nasal_tip_from_base_of_columella.ratio} ( {data.data.pose_analysis[0].current_image_analysis.measurements.measurements_in_profile.nasal_tip_from_base_of_columella.percent}%)</p>
              <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
            </div>
          </div> */}

          {/* <div className="flex flex-col items-start justify-between w-[20%] h-[7vh]">
            <p>Length of Nose from Eylas ={data.data.pose_analysis[0].current_image_analysis.measurements.vertical.length_of_nose_from_eyelash_line.ideal_distance}D</p>
            <div className="flex flex-row w-full justify-between items-center">
              <p>Length: {data.data.pose_analysis[0].current_image_analysis.measurements.vertical.length_of_nose_from_eyelash_line.ratio} ({data.data.pose_analysis[0].current_image_analysis.measurements.vertical.length_of_nose_from_eyelash_line.percent}%)</p>
              <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
            </div>
          </div> */}
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
          {/* {images.map((el,index) => {
            return (
              <div key={index} className="flex flex-col items-start justify-start gap-3 w-[23%]">
                <img
                  src={el}
                  alt="face-image"
                  className="max-h-[917px] w-full rounded-3xl border-2 border-primary-color"
                />
                <div className="mt-6 w-full">
                  <Status isFull status={resolveStatus()}></Status>

                </div>
              </div>
            )
          })} */}
{/* 
          <div className="flex flex-col items-start justify-start gap-3 w-[23%]">
            <img
              src="/image/faceOverall-04.png"
              alt="face-image"
              className="max-h-[917px] w-full rounded-3xl border-2 border-primary-color"
            />
            <div className="text-left text-sm font-normal">
              Right Philtral Colum to Contralateral commissure/
              <br/>
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
          </div> */}
        </div>
      )}
    </>
  );
};

export default Nose;
