/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button } from "symphony-ui";
import Status from "../../page/FaceScaned/boxs/Status";
const ContentBox = ({data,category,images}) => {
  const resolveStatus = (value) => {
      if(value.problematic == false) {
          return 'No Action Requred'
      }
      return 'Action Needed'
  }  
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
  const [isOpen, setIsOpen] = useState(true);
  return (
    <>
      <div className="w-full no-split flex flex-row gap-2 items-stretch justify-center">
        <div className="flex flex-col items-center justify-center w-[14%] py-6 gap-3 rounded-xl  text-white font-medium text-xl min-h-[128px]" style={{width:'14%',minWidth:'14%',minHeight:'128px',backgroundColor:'#544BF0'}}>
          <img
            // src="/image/Nose.svg"
            src={resolveIcon()}
            alt="icon_nose"
            className="w-10 h-10"
          />
          {/* Nose */}
          <div className="text-xs mb-2">
            {category}

          </div>
        </div>
        <div className="flex flex-row items-start flex-grow flex-wrap justify-start  p-8  rounded-xl bg-[#F5F5F5] font-medium text-sm min-h-[128px]" style={{gap:'69px',minHeight:'128px',backgroundColor:'#F5F5F5'}}>
          {data.map((el) => {
            return (
              <>
              <div className="flex flex-col items-start justify-between w-[40%] h-[7vh]" style={{width:'100%',height:'7vh'}}>
                <div className="flex flex-row  " >
                    <div className="" >
                        {el.key}
                    </div>
                   ={el.measured_distance}D
                </div>
                {
                    el.side ?
                    <>
                        <div className="flex flex-row w-full mt-2 justify-between items-center">
                        <p>Left:</p>
                        <p>{el?.side?.left?.ratio}({el?.side?.left?.percent}%)</p>
                        <div className={`w-4 h-4 ${el.side?.left.problematic ?'bg-red-500':'bg-blue-500'} rounded-full`}></div>
                        </div>
                        <div className="flex flex-row w-full justify-between items-center">
                        <p>Right:</p>
                        <p>{el?.side?.right?.ratio}({el?.side?.right?.percent}%)</p>
                        <div className={`w-4 h-4 ${el.side?.right.problematic ?'bg-red-500':'bg-blue-500'} rounded-full`}></div>
                        </div>                    
                    </>
                    :
                    <div className="flex flex-row w-full justify-between items-center">
                    <p>Dist: {el.ratio} ({el.percent} %)</p>
                    <div className={`w-4 h-4  ${el.problematic ?'bg-red-500':'bg-blue-500'} rounded-full`}></div>
                    </div>

                }
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
          {images.map((el,index) => {
            return (
              <div key={index} className="flex flex-col items-start justify-start gap-3 w-[23%]">
                <img
                  src={el}
                  alt="face-image"
                  style={{
                    maxHeight:'312px'
                  }}
                  className="max-h-[917px] w-full rounded-3xl border-2 border-primary-color"
                />
                <div className="mt-6 w-full">
                  <Status isFull status={resolveStatus(true)}></Status>

                </div>
              </div>
            )
          })}
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

export default ContentBox;
