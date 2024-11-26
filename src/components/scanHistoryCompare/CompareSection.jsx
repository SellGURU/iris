/* eslint-disable react/prop-types */
import { Button } from "symphony-ui";
import NoseCompare from "./NoseCompare";
import ChinCompare from "./ChinCompare";
import LipCompare from "./LipCompare";
import CheekCompare from "./CheekCompare";
import ForeheadCompare from "./ForeheadCompare";
import EyebrowCompare from "./EyebrowCompare";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import useModalAutoClose from "../../hooks/useModalAutoClose";
// import PhiltralColumnCompare from "./PhiltralColumnCompare";
// import OtherCompare from "./OtherCompare";
import { useEffect, useState,useRef } from "react";
import Application from "../../api/Application"
import { useLocalStorage } from "@uidotdev/usehooks";
import FilterModal from "./FilterModal";

const CompareSection = ({results,clientId}) => {
  console.log(results)
  const [orgs,] = useLocalStorage("orgData")
  const [isLoading,setIsLoading] = useState(true)
  const [data,setData] = useState([])
  const [activeCategories,setActiveCategpris] = useState([])
  const resolveArrayMeasurments = (ScanData) => {
      // console.log(ScanData.data)
      const allData = []
      Object.keys(ScanData?.data?.pose_analysis[0]?.current_image_analysis.measurements).map(key => {

      const resolved = Object.entries(ScanData?.data?.pose_analysis[0]?.current_image_analysis.measurements[key]).filter((el) =>el[0] !='measurements_list').map(([key, value]) => ({
          key, 
          ...value, 
      }));
      allData.push(...resolved)
      })
      return allData
  }  
  function calculateAverage(arr) {
      if (arr.length === 0) return 0; // Handle empty array
      const sum = arr.reduce((a, b) => a + b, 0);
      return sum / arr.length;
  }
  const resolvePercent = (category) => {
    const resalved = []
    const vals1 = resolveArrayMeasurments(data[0]).filter(el =>el.category == category)
    const vals2 = resolveArrayMeasurments(data[1]).filter(el =>el.category == category)
    vals1.forEach((el,index) => {
      if(el.side) {
        resalved.push(Math.abs(el.side.left.percent - vals2[index].side.left.percent)) 
        resalved.push(Math.abs(el.side.right.percent - vals2[index].side.right.percent))
      }else {
        resalved.push(Math.abs(el.percent - vals2[index].percent)) 

      }
    })
    return calculateAverage(resalved).toFixed(2)
  }
  const resolveAllCategories = () => {
    return Array.from(new Set(resolveArrayMeasurments(data[0]).map(item => item.category)));
  }   
  useEffect(() => {
    const values = []
    setIsLoading(true)
    results.forEach(el => {
      Application.getScanDetails({
          scanCode: el,
          orgCode: JSON.parse(orgs).orgCode,
          orgSCode: JSON.parse(orgs).orgSCode,
          client_id:clientId,
          rdataKey:'analysis'
      }).then((res) => {
        values.push(res.data)
        setData([...values])
      })
    })
  },[results])
  useEffect(() => {
    if(data.length == 2 && data[0]!=undefined && data[1]!= undefined){
      setIsLoading(false)
      
    }
  })
  useEffect(() => {
    if(!isLoading){
      setActiveCategpris(resolveAllCategories())
    }
  },[isLoading])
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayName = daysOfWeek[date.getDay()];
    const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date.getDate().toString().padStart(2, "0")}`;
    return `${dayName} ${formattedDate}`;
  };
  const filterModalRefrence = useRef(null)
 
  const [isShowFilter,setIsShowFilter] = useState(false)
    useModalAutoClose({
        refrence:filterModalRefrence,
        close:() =>{
            setIsShowFilter(false)
        }
    })  
  return (
    <>
      <div className={`${!isLoading && "hidden"}`}>
          <div className="w-full flex justify-center items-center min-h-[350px]">
              <div role="status">
                  <svg aria-hidden="true"
                          className="w-16 h-16 text-stone-200 animate-spin  fill-blue-600"
                          viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"/>
                      <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"/>
                  </svg>
                  <span className="sr-only">Loading...</span>
              </div>

          </div>
      </div>   
      {!isLoading &&
        <div className="flex flex-col w-full gap-2">
          {/* /////////////////////////////////Header Client 1 section/////////////////////// */}
          <div className="grid grid-cols-5 grid-rows-2 gap-x-2 gap-y-[10px] w-full">
            <div className="bg-[#F5F5F5] rounded-xl col-span-2 row-span-2 h-full flex flex-row items-center justify-center px-5 gap-4">
              <div className="max-h-[175px] object-center h-[175px] w-[230px] overflow-hidden  rounded-3xl border-2 border-primary-color">
                <img
                  src={data[0]?.data?.pose_analysis[0]?.current_image_analysis?.images?.input}
                  alt="face-image"
                  className=" w-full h-full object-cover object-center"
                />

              </div>
              <div className="flex flex-col h-full items-start justify-between w-full pt-[22px] pb-6">
                <div className="flex flex-col w-full">
                  <div className="flex relative flex-row items-center justify-between w-full text-xl font-medium">
                    Client ID:
                    <Button onClick={() => {
                      setIsShowFilter(true)
                    }} theme="iris-small">
                      <div className="filterIcon-white"></div>
                      Filter
                    </Button>
                    {isShowFilter &&
                      <FilterModal setActiveCategory={setActiveCategpris} activeCategories={activeCategories} refrence={filterModalRefrence} categories={resolveAllCategories()}></FilterModal>
                    }
                  </div>
                  <div className="text-lg font-normal">{clientId}</div>
                </div>
                <div className="text-base font-normal text-[#7E7E7E]">
                  Last Scan : {new Date(data[0].data.timestamp).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  <div>Time: {new Date(data[0].data.timestamp).toLocaleTimeString("en-GB", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}</div>
                </div>
              </div>
            </div>

            <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
              <div className="flex flex-col gap-1">
                Nose
                {/* <span className="text-[#7E7E7E] font-normal text-sm">
                  Progress : Initial Stage
                </span> */}
              </div>
              <div className="w-[50px] h-[50px]">
                <CircularProgressbar  value={resolvePercent('nose')} text={`${resolvePercent('nose')}%`} />
              </div>
              {/* <img className="w-[50px]" src="/image/circle-chart.png" alt="" /> */}
            </div>

            <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
              <div className="flex flex-col gap-1">
                Chin
                {/* <span className="text-[#7E7E7E] font-normal text-sm">
                  Progress : Intermediate
                </span> */}
              </div>
              <div className="w-[50px] h-[50px]">
                <CircularProgressbar  value={resolvePercent('chin')} text={`${resolvePercent('chin')}%`} />
              </div>
            </div>

            <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
              <div className="flex flex-col gap-1">
                Lip

              </div>
              <div className="w-[50px] h-[50px]">
                <CircularProgressbar  value={resolvePercent('lips')} text={`${resolvePercent('lips')}%`} />
              </div>
            </div>

            <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
              <div className="flex flex-col gap-1">
                Cheek
              </div>
              <div className="w-[50px] h-[50px]">
                <CircularProgressbar  value={resolvePercent('cheeks')} text={`${resolvePercent('cheeks')}%`} />
              </div>
            </div>

            <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
              <div className="flex flex-col gap-1">
                Forhead

              </div>
              <div className="w-[50px] h-[50px]">
                <CircularProgressbar  value={resolvePercent('forehead')} text={`${resolvePercent('forehead')}%`} />
              </div>
            </div>

            <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
              <div className="flex flex-col gap-1">
                Eyebrow

              </div>
              <div className="w-[50px] h-[50px]">
                <CircularProgressbar  value={resolvePercent('eyebrows')} text={`${resolvePercent('eyebrows')}%`} />
              </div>
            </div>

            {/* <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
              <div className="flex flex-col gap-1">
                Philtral Column
                <span className="text-[#7E7E7E] font-normal text-sm">
                  Progress : Intermediate
                </span>
              </div>
              <img className="w-[50px]" src="/image/circle-chart.png" alt="" />
            </div> */}

            {/* <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
              <div className="flex flex-col gap-1">
                Other
                <span className="text-[#7E7E7E] font-normal text-sm">
                  Progress : Final Stage
                </span>
              </div>
              <img className="w-[50px]" src="/image/circle-chart.png" alt="" />
            </div> */}
          </div>

          {/* /////////////////////////////////Category Client 1 section/////////////////////// */}
          <div className="w-full flex flex-row gap-2 items-stretch justify-center">
            <div className="flex flex-col items-center justify-center w-[10%] p-2 rounded-xl bg-primary-color text-white font-medium text-xl min-h-14">
              Category
            </div>
            <div className="flex flex-row gap-12 items-start justify-start w-full px-6 py-4 rounded-xl bg-[#F5F5F5] font-medium min-h-14">
              <div className="w-1/4 text-base">Factor</div>

              <div className="border-l-[#E1E1E1] border-l h-full"></div>

              <div className="flex items-center justify-between w-1/4 text-sm">
                {/* Sat 2024/02/02 */}
                {formatDate(data[0]?.data.timestamp)}
                <div className="arowDownIcon-purple"></div>
              </div>

              <div className="border-l-[#E1E1E1] border-l h-full"></div>

              <div className="flex items-center justify-between w-1/4 text-sm">
                {formatDate(data[1]?.data.timestamp)}
                <div className="arowDownIcon-purple"></div>
              </div>

              {/* <div className="border-l-[#E1E1E1] border-l h-full"></div>

              <div className="flex opacity-45 items-center justify-between w-1/4 text-sm">
                Sat 2024/02/02
                <div className="arowDownIcon-purple"></div>
              </div> */}
            </div>
          </div>

          {/* /////////////////////////////////Nose Client 1 section/////////////////////// */}
          {
            activeCategories.includes("nose") &&
              <NoseCompare images={[data[0]?.data?.pose_analysis[0]?.current_image_analysis?.images?.input,data[1]?.data?.pose_analysis[0]?.current_image_analysis?.images?.input]} date1={formatDate(data[0].data.timestamp)} date2={formatDate(data[1].data.timestamp)} scan1={resolveArrayMeasurments(data[0]).filter((el) =>el.category == 'nose')} scan2={resolveArrayMeasurments(data[1]).filter((el) =>el.category == 'nose')} />
          }
          {
            activeCategories.includes("chin") &&
          
            <ChinCompare images={[data[0]?.data?.pose_analysis[0]?.current_image_analysis?.images?.input,data[1]?.data?.pose_analysis[0]?.current_image_analysis?.images?.input]} date1={formatDate(data[0].data.timestamp)} date2={formatDate(data[1].data.timestamp)} scan1={resolveArrayMeasurments(data[0]).filter((el) =>el.category == 'chin')} scan2={resolveArrayMeasurments(data[1]).filter((el) =>el.category == 'chin')} />
          }
          {/* /////////////////////////////////Chin Client 1 section/////////////////////// */}
          {
            activeCategories.includes("lips") &&
              <LipCompare images={[data[0]?.data?.pose_analysis[0]?.current_image_analysis?.images?.input,data[1]?.data?.pose_analysis[0]?.current_image_analysis?.images?.input]} date1={formatDate(data[0].data.timestamp)} date2={formatDate(data[1].data.timestamp)} scan1={resolveArrayMeasurments(data[0]).filter((el) =>el.category == 'lips')} scan2={resolveArrayMeasurments(data[1]).filter((el) =>el.category == 'lips')} />
          }
          {/* /////////////////////////////////Lip Client 1 section/////////////////////// */}
          {
            activeCategories.includes("cheeks") &&
              <CheekCompare images={[data[0]?.data?.pose_analysis[0]?.current_image_analysis?.images?.input,data[1]?.data?.pose_analysis[0]?.current_image_analysis?.images?.input]} date1={formatDate(data[0].data.timestamp)} date2={formatDate(data[1].data.timestamp)} scan1={resolveArrayMeasurments(data[0]).filter((el) =>el.category == 'cheeks')} scan2={resolveArrayMeasurments(data[1]).filter((el) =>el.category == 'cheeks')} />
          
          }
          {/* /////////////////////////////////Cheek Client 1 section/////////////////////// */}
          {
            activeCategories.includes("forehead") &&
            <ForeheadCompare images={[data[0]?.data?.pose_analysis[0]?.current_image_analysis?.images?.input,data[1]?.data?.pose_analysis[0]?.current_image_analysis?.images?.input]} date1={formatDate(data[0].data.timestamp)} date2={formatDate(data[1].data.timestamp)} scan1={resolveArrayMeasurments(data[0]).filter((el) =>el.category == 'forehead')} scan2={resolveArrayMeasurments(data[1]).filter((el) =>el.category == 'forehead')} />
          }
          {/* /////////////////////////////////Forehead Client 1 section/////////////////////// */}
          {
            activeCategories.includes("eyebrows") &&
              <EyebrowCompare images={[data[0]?.data?.pose_analysis[0]?.current_image_analysis?.images?.input,data[1]?.data?.pose_analysis[0]?.current_image_analysis?.images?.input]} date1={formatDate(data[0].data.timestamp)} date2={formatDate(data[1].data.timestamp)} scan1={resolveArrayMeasurments(data[0]).filter((el) =>el.category == 'eyebrows')} scan2={resolveArrayMeasurments(data[1]).filter((el) =>el.category == 'eyebrows')} />
          }
          {/* /////////////////////////////////Eyebrow Client 1 section/////////////////////// */}

        </div>
       } 
    </>
  );
};

export default CompareSection;
