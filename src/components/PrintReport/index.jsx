/* eslint-disable react/prop-types */
import { useState } from "react";
import ContentBox from "../overallAnalysisReport/ContentBox";


const PrintReport = ({resolveArrayMeasurments,categories,ScanData}) => {
    const [date, ] = useState(new Date());
    return (
        <>
            <div className="w-full justify-center flex flex-col items-start mt-10">
            {/* {resolveArrayMeasurments().filter((el) =>el.category =='nose').length > 0 &&
                <Nose data={resolveArrayMeasurments().filter((el) =>el.category =='nose')} />
            } */}
            <div className="w-full mb-4 flex justify-between items-end">
                <img className="w-24" src="/image/login/IRIS.svg" alt="" />
                <div className="flex-grow border-b-2 border-b-blue-700 h-3"></div>
            </div>
            <div>
            <div className="flex flex-col w-full gap-4">

                <div className="  p-8 pb-0 rounded-3xl bg-[#f8f8f8]" style={{backgroundColor:'#f8f8f8'}}>
                <div className="w-[100%]" style={{width:'100%'}}>
                    <div className="flex justify-between gap-2">
                    <div className="overflow-hidden" style={{width:'30%'}}>
                        <img
                            src={ScanData.data.pose_analysis[0].current_image_analysis.images.input}
                            alt="face-image"
                            // style={{width:'100'}}
                            className="  rounded-3xl w-full h-full object-cover object-top border-2 border-blue-500"
                            />

                    </div>
                    <div className="overflow-hidden" style={{width:'30%'}}>
                        <img
                            src={ScanData.data.pose_analysis[0].current_image_analysis.images.aligned_annotated}
                            alt="face-image"
                            // style={{width:'100'}}
                            className="  rounded-3xl w-full h-full object-fill object-top border-2 border-blue-500"
                            />

                    </div>
                    <div className="overflow-hidden" style={{width:'30%'}}>
                        <img
                            src={ScanData.data.pose_analysis[0].current_image_analysis.images.aligned_symmetry}
                            alt="face-image"
                            // style={{width:'100'}}
                            className="  rounded-3xl w-full h-full object-fill object-top border-2 border-blue-500"
                            />

                    </div>                                        
                    {/* <img
                        src={ScanData.data.pose_analysis[0].current_image_analysis.images.aligned_annotated}
                        alt="face-image"
                        className=" w-[150px] rounded-3xl border-2 border-primary-color"
                    />         
                    <img
                        src={ScanData.data.pose_analysis[0].current_image_analysis.images.aligned_symmetry}
                        alt="face-image"
                        className=" w-[150px] rounded-3xl border-2 border-primary-color"
                    />                                                  */}
                    </div>
                    <div className="w-full mt-2 flex justify-between text-2xl font-medium items-center mb-4">
                    Measurements Summary
                    <div className="text-[#7E7E7E] font-normal text-sm">
                    { Number(date.getMonth()+1) +
                        " /" +
                        date.getDate()
                        +
                        " /" +
                        date.getFullYear()}
                    </div>
                    </div>
                    <div className="text-[##444444] font-normal text-sm mb-6">
                        {`Here, you can view a summary of an individual's health
                        status and make the necessary decisions for improving
                        or managing their health.`}
                    </div>

                </div>
                <div className="w-[1px] h-[300px] mx-4 bg-[#00000033]"></div>
                <div className="flex-grow ">

                    <div className="w-full flex  text-2xl font-medium items-center justify-between mb-2">
                        Feminine Face Assessment
                        <div className="text-[#7E7E7E] font-normal text-sm">
                        Intercanthal Distance D - 33 mm
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-y-3 mt-6 gap-1 mb-6">
                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col   font-medium" style={{width:'300px'}}>
                            1.Eyebrows height
                        </div>
                        <div className="flex flex-col text-sm  font-normal">
                            {/* Right side is 1mm higher */}
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.eyebrows.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col w-[180px]  font-medium" style={{width:'300px'}}>
                            2.Lash line
                        </div>
                        <div className="flex flex-col text-sm  font-normal">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.lash_line.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col  font-medium" style={{width:'300px'}}>
                            3.Inter Limbal Opening
                        </div>
                        <div className="flex flex-col text-sm font-normal">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.inter_limbal_opening.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col w-[180px]  font-medium" style={{width:'300px'}}>
                            4.Apex of cheek
                        </div>
                        <div className="flex flex-col text-sm  font-normal">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.apex_of_cheek.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col w-[180px]  font-medium" style={{width:'300px'}}>
                            5.Alar base of nose
                        </div>
                        <div className="flex flex-col text-sm  font-normal">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.eyebrows.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col w-[180px]  font-medium"style={{width:'300px'}}>
                            6.Upper lip vermillion
                        </div>
                        <div className="flex flex-col text-sm font-normal">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.upper_lip_vermillion.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col w-[180px] font-medium" style={{width:'300px'}}>
                            7.Transcommissure line
                        </div>
                        <div className="flex flex-col text-sm font-normal">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.transcommissure_line.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col text-[14px] w-[180px] font-medium" style={{width:'300px'}}> 
                            8.Lower lip vermilion
                        </div>
                        <div className="flex flex-col text-sm font-normal">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.lower_lip_vermillion.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col w-[180px]  font-medium" style={{width:'300px'}}>
                            9.Chin border
                        </div>
                        <div className="flex flex-col text-sm  font-normal">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.chin_border.symmetry_text}
                        </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row text-2xl font-medium items-center justify-between">
                        Color Guide
                        <div className="text-[#7E7E7E] font-normal text-sm flex flex-row gap-6">
                        <div className="flex gap-1 items-center">
                            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                            Action Needed
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                            Normal
                        </div>
                        <div className="flex gap-1 items-center">
                            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                            No Action Required
                        </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>                
            </div>
            {categories.map((value,index) => {
                return (
                    <div className="mt-2 w-full" key={index}>
                        <ContentBox  category={value} data={resolveArrayMeasurments().filter((el) =>el.category ==value)}  key={index}></ContentBox>
                    </div>
                )
            })}
            </div>
        </>
    )
}

export default PrintReport