/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import { Button } from "symphony-ui";
import { useState } from "react";
import Explation from '../../components/explation/index.jsx';
import ContentViewBox from "../../components/overallAnalysisReport/ContentViewBox.jsx";
import { butiText } from "../../help.js";
import FaceMeshView from '../../components/faceMash/FaceMeshViwe.jsx'
import SummaryBox from "./boxs/SummaryBox";

const ViewAnalyseComponent = ({ScanData,date,patientID}) => {
    const [activeTab, setActiveTab] = useState("facial");
    const [activePart,setActivePart] = useState("")
    const resolveActivePartName =() => {
        if(activePart == ''){
        return ' Face Measurements Summary'
        }
        return butiText(activePart)  +' Measurements Summary'    
        // return ""
    }    
    const formatDate2 = (date) => {
        const dateObj = new Date(date); // Ensure date is a Date object
        const year = dateObj.getFullYear();
        const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
        ];
        const month = monthNames[dateObj.getMonth()]; // Get the month name
        const day = dateObj.getDate().toString(); // Get the day

        return ` ${day} ${month} ${year}`;
    };      
    const resolveFacialData = () => {
        if(activePart == ''){
        return resolveArrayMeasurments()
        }
        return resolveArrayMeasurments().filter((el => el.category ==activePart))
    }    
    const resolveChangePart = (name)=>{
        setActivePart(name)
    }    
    const resolveArrayMeasurments = () => {
        // console.log(ScanData.data)
        const allData = []
        Object.keys(ScanData.data.pose_analysis[0].current_image_analysis.measurements).map(key => {

        const resolved = Object.entries(ScanData.data.pose_analysis[0].current_image_analysis.measurements[key]).filter((el) =>el[0] !='measurements_list').map(([key, value]) => ({
            key, 
            ...value, 
        }));
        allData.push(...resolved)
        })
        return allData
    }    
    const resolveAllCategories = () => {
        return Array.from(new Set(resolveArrayMeasurments().map(item => item.category)));
    }    
    return (
        <>
        <div className="w-full justify-center print:hidden mb-1 flex items-center gap-8">
        <Button
            theme={
            activeTab === "facial"
                ? "iris-secondary"
                : "iris-secondary-Button-container"
            }
            onClick={() => setActiveTab("facial")}
        >
            Facial Analysis
        </Button>
        <Button
            theme={
            activeTab === "overall"
                ? "iris-secondary"
                : "iris-secondary-Button-container"
            }
            onClick={() => setActiveTab("overall")}
        >
            Overall Analysis
        </Button>
        </div>
        {activeTab === "overall" ? (
        <div id="mydiv" className="print:min-w-[1600px] print:scale-50 print:ml-[-400px] print:mt-[-300px]">
            {/* /////////////////////////////////Summary section/////////////////////// */}
            <div className="w-full justify-center flex flex-row gap-6 items-start">
            {/* <div className="flex flex-col w-1/2">
                <img
                src="/image/faceOverall-01.png"
                alt="face-image"
                className="max-h-[917px] rounded-3xl border-2 border-primary-color"
                />
            </div> */}

            <div className="flex flex-col w-full gap-4">

                <div className="flex  p-8 pb-2 rounded-3xl bg-[#f8f8f8]">
                <div className="w-[40%]">
                    <div className="flex w-full justify-between gap-2">
                    <div className="w-auto 2xl:w-[150px] overflow-hidden rounded-3xl border-2 border-primary-color">
                        <img
                        src={
                            ScanData.data.pose_analysis[0]
                            .current_image_analysis.images.input
                        }
                        alt="face-image"
                        className="w-full object-cover h-full"
                        />

                    </div>
                    <div className="w-auto 2xl:w-[150px] overflow-hidden rounded-3xl border-2 border-primary-color">
                        <img
                        src={
                            ScanData.data.pose_analysis[0]
                            .current_image_analysis.images.aligned_annotated
                        }
                        alt="face-image"
                        className="w-full h-full object-cover"
                        />

                    </div>
                    <div className="w-auto 2xl:w-[150px] overflow-hidden rounded-3xl border-2 border-primary-color">
                        <img
                        src={
                            ScanData.data.pose_analysis[0]
                            .current_image_analysis.images.aligned_symmetry
                        }
                        alt="face-image"
                        className="w-full h-full object-cover"
                        />

                    </div>
                    </div>
                    <div className="w-full mt-2 flex justify-between text-2xl font-medium items-center mb-4">
                    Measurements Summary
                    <div className="text-[#7E7E7E] font-normal text-sm">
                        {formatDate2(date)}
                    </div>
                    </div>
                    <div className="text-[##444444] font-normal text-sm mb-6">
                    Here, you can view a summary of an individual's health
                    status and make the necessary decisions for improving
                    or managing their health.
                    </div>
                </div>
                <div className="w-[1px] h-[300px] mx-4 bg-[#00000033]"></div>
                <div className="flex-grow ">

                    <div className="w-full flex text-[#444444] flex-wrap  text-2xl font-medium items-center justify-start gap-2 mb-2">
                        {ScanData.data.pose_analysis[0].gender.charAt(0).toUpperCase()+ScanData.data.pose_analysis[0].gender.slice(1)} Face Assessment
                        {/* <div className="text-[#7E7E7E] font-normal text-sm">
                        Intercanthal Distance D - 33 mm
                        </div> */}
                        <Explation></Explation>
                    </div>

                    <div className="grid  grid-cols-1 xl:grid-cols-2  gap-y-3 mt-6 gap-1 mb-6">
                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col w-[180px] ">
                            1. Eyebrows height
                        </div>
                        <div className="flex flex-col text-[14px] ">
                            {/* Right side is 1mm higher */}
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.eyebrows.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col w-[180px]  ">
                            2. Lash line
                        </div>
                        <div className="flex flex-col text-[14px]  ">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.lash_line.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col min-w-[174px] w-[180px] ">
                            3. Inter Limbal Opening
                        </div>
                        <div className="flex flex-col text-[14px] font-normal">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.inter_limbal_opening.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col w-[180px] ">
                            4. Apex of cheek
                        </div>
                        <div className="flex flex-col text-[14px]   font-normal">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.apex_of_cheek.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col w-[180px]  ">
                            5. Alar base of nose
                        </div>
                        <div className="flex flex-col text-[14px]  font-normal">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.eyebrows.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col w-[180px] ">
                            6. Upper lip vermillion
                        </div>
                        <div className="flex flex-col text-[14px]  font-normal">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.upper_lip_vermillion.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col w-[180px] ">
                            7. Transcommissure line
                        </div>
                        <div className="flex flex-col text-[14px] font-normal">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.transcommissure_line.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col text-[16px] w-[180px] ">
                            8. Lower lip vermilion
                        </div>
                        <div className="flex flex-col text-[14px] font-normal">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.lower_lip_vermillion.symmetry_text}
                        </div>
                        </div>

                        <div className="flex flex-row w-full text-base text-left gap-6">
                        <div className="flex flex-col w-[180px]  ">
                            9. Chin border
                        </div>
                        <div className="flex flex-col text-[14px]  font-normal">
                            {ScanData.data.pose_analysis[0].current_image_analysis.symmetry.chin_border.symmetry_text}
                        </div>
                        </div>
                    </div>

                    <div className="w-full flex flex-row text-[20px] mb-2 font-medium items-center justify-end">
                        {/* Color Guide */}
                        <div className="text-[#7E7E7E] font-normal text-sm flex flex-row gap-6">
                        <div className="flex gap-1 items-center">
                            <div className="w-4 h-4 bg-[#FF3E5D] rounded-full"></div>
                            Enhancement Opportunities
                        </div>
                        {/* <div className="flex gap-1 items-center">
                            <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
                            Normal
                        </div> */}
                        <div className="flex gap-1 items-center">
                            <div className="w-4 h-4 bg-[#03DAC5] rounded-full"></div>
                            Areas of Strength
                        </div>
                        </div>
                    </div>
                    </div>
                    
                </div>
            </div>
            </div>

            {/* /////////////////////////////////Categories section/////////////////////// */}
            <div className="w-full justify-center flex flex-col items-start mt-10">
            {/* {resolveAllCategories().map((value,index) => {
                return (
                    <div className="mt-2 w-full" key={index}>
                        <ContentBox images={['/image/faceOverall-04.png']} category={value} data={resolveArrayMeasurments().filter((el) =>el.category ==value)} icon={'/image/Nose.svg'} key={index}></ContentBox>
                    </div>
                )
            })}   */}
                {resolveAllCategories().map((value,index) => {
                    return (
                    <ContentViewBox key={index}  category={value} data={resolveArrayMeasurments().filter((el) =>el.category ==value)}></ContentViewBox>
                    )
                })}

            {/* {resolveArrayMeasurments().filter((el) =>el.category =='nose').length > 0 &&
                <Nose data={resolveArrayMeasurments().filter((el) =>el.category =='nose')} />
            }

            {resolveArrayMeasurments().filter((el) =>el.category =='chin').length > 0 &&
            <Chin data={resolveArrayMeasurments().filter((el) =>el.category =='chin')} />
            }
            {resolveArrayMeasurments().filter((el) =>el.category =='lips').length > 0 &&
                <Lip data={resolveArrayMeasurments().filter((el) =>el.category =='lips')} />
            }
            {resolveArrayMeasurments().filter((el) =>el.category =='cheeks').length > 0 &&
                <Cheek data={resolveArrayMeasurments().filter((el) =>el.category =='cheeks')}  />
            }
            {resolveArrayMeasurments().filter((el) =>el.category =='forehead').length > 0 &&
                <Forehead data={resolveArrayMeasurments().filter((el) =>el.category =='forehead')}  />
            }
                {resolveArrayMeasurments().filter((el) =>el.category =='eyebrows').length > 0 &&
                <Eyebrow data={resolveArrayMeasurments().filter((el) =>el.category =='eyebrows')} />
                } */}

            </div>
        </div>
        ) : (
        <>
            <div className="w-full justify-center flex gap-6 items-stretch">
            {/* <img
                src="/image/faceOverall-05.png"
                alt="face-image"
                className="flex flex-col w-1/2 rounded-3xl border-2 border-primary-color"
            /> */}

            <div className="flex  flex-col w-full gap-4 py-8 px-10 rounded-3xl bg-[#f8f8f8]">
                <div className="w-full text-[#444444] flex-wrap  flex flex-row text-2xl font-medium items-center justify-between mb-2">
                <div className="flex justify-start items-center gap-4">
                    {activePart !='' &&
                    <img className="cursor-pointer" onClick={() => {
                    setActivePart("")
                    }} src="./image/back2.svg" alt="" />
                    }
                    {resolveActivePartName()}
                    <Explation></Explation>
                </div>
                <div className="text-[#7E7E7E] font-normal text-sm">
                    <div className="flex justify-end items-center">
                    <div className="text-[#444444] text-sm font-normal mr-[80px]">
                        Client ID: {patientID}
                    </div>
                    <div className="text-[#7E7E7E] font-normal text-sm mr-8">
                        Date:{" "}
                    {formatDate2(date)}
                    </div>
                    <div className="text-[#7E7E7E] font-normal text-sm">
                        Time: {date.getHours()}:{date.getMinutes()}
                    </div>                           
                    </div>
                    {/* 2024/02/02 */}
                </div>
                </div>
                <div className="w-full flex">
                <div className="relative z-20">
                    <FaceMeshView width="296px" height="377px" dataValues={resolveArrayMeasurments()} imageSrc={ScanData.data.pose_analysis[0].current_image_analysis.images.input} onClick={(e) => {
                    console.log(e)
                    resolveChangePart(e)
                    }}></FaceMeshView>
                </div>
                {/* <img
                    src="/image/faceOverall-05.png"
                    alt="face-image"
                    className="flex flex-col w-[280px] h-[400px] rounded-3xl border-2 border-primary-color"
                /> */}
                <div className="grid grid-cols-1 xl:grid-cols-2  gap-1 w-full  gap-x-3 ml-6 font-normal text-base">
                    {resolveFacialData().filter((val) => val.key !='intercanthal_distance').slice(0,8).map((el,index) => {
                    return (
                        <>
                        <SummaryBox data={el} indexNum={index}></SummaryBox>
                        </>
                    )
                    })}

                </div>
                </div>
            </div>
            </div>
        </>
        )}        
        </>
    )
}

export default ViewAnalyseComponent