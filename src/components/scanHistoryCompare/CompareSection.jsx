import { Button } from "symphony-ui";
import NoseCompare from "./NoseCompare";
import ChinCompare from "./ChinCompare";
import LipCompare from "./LipCompare";
import CheekCompare from "./CheekCompare";
import ForeheadCompare from "./ForeheadCompare";
import EyebrowCompare from "./EyebrowCompare";
import PhiltralColumnCompare from "./PhiltralColumnCompare";
import OtherCompare from "./OtherCompare";

const CompareSection = () => {

  return (
    <>
      <div className="flex flex-col w-full gap-2">
        {/* /////////////////////////////////Header Client 1 section/////////////////////// */}
        <div className="grid grid-cols-6 grid-rows-2 gap-x-2 gap-y-[10px] w-full">
          <div className="bg-[#F5F5F5] rounded-xl col-span-2 row-span-2 h-full flex flex-row items-center justify-center px-5 gap-4">
            <img
              src="/image/faceOverall-01.png"
              alt="face-image"
              className="max-h-[175px] w-32 rounded-3xl border-2 border-primary-color"
            />
            <div className="flex flex-col h-full items-start justify-between w-full pt-[22px] pb-6">
              <div className="flex flex-col w-full">
                <div className="flex flex-row items-center justify-between w-full text-xl font-medium">
                  Client ID:
                  <Button theme="iris-small">
                    <div className="filterIcon-white"></div>
                    Filter
                  </Button>
                </div>
                <div className="text-lg font-normal">1122334455</div>
              </div>
              <div className="text-base font-normal text-[#7E7E7E]">
                Last Scan : 12 April 2024
                <div>Time: 14:40</div>
              </div>
            </div>
          </div>

          <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
            <div className="flex flex-col gap-1">
              Nose
              <span className="text-[#7E7E7E] font-normal text-sm">
                Progress : Initial Stage
              </span>
            </div>
            <img className="w-[50px]" src="/image/circle-chart.png" alt="" />
          </div>

          <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
            <div className="flex flex-col gap-1">
              Chin
              <span className="text-[#7E7E7E] font-normal text-sm">
                Progress : Intermediate
              </span>
            </div>
            <img className="w-[50px]" src="/image/circle-chart.png" alt="" />
          </div>

          <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
            <div className="flex flex-col gap-1">
              Lip
              <span className="text-[#7E7E7E] font-normal text-sm">
                Progress : Initial Stage
              </span>
            </div>
            <img className="w-[50px]" src="/image/circle-chart.png" alt="" />
          </div>

          <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
            <div className="flex flex-col gap-1">
              Cheek
              <span className="text-[#7E7E7E] font-normal text-sm">
                Progress : Final Stage
              </span>
            </div>
            <img className="w-[50px]" src="/image/circle-chart.png" alt="" />
          </div>

          <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
            <div className="flex flex-col gap-1">
              Forhead
              <span className="text-[#7E7E7E] font-normal text-sm">
                Progress : Initial Stage
              </span>
            </div>
            <img className="w-[50px]" src="/image/circle-chart.png" alt="" />
          </div>

          <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
            <div className="flex flex-col gap-1">
              Eyebrow
              <span className="text-[#7E7E7E] font-normal text-sm">
                Progress : Final Stage
              </span>
            </div>
            <img className="w-[50px]" src="/image/circle-chart.png" alt="" />
          </div>

          <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
            <div className="flex flex-col gap-1">
              Philtral Column
              <span className="text-[#7E7E7E] font-normal text-sm">
                Progress : Intermediate
              </span>
            </div>
            <img className="w-[50px]" src="/image/circle-chart.png" alt="" />
          </div>

          <div className="bg-[#F5F5F5] rounded-xl col-span-1 h-24 flex flex-row items-center justify-between px-3 text-base font-medium">
            <div className="flex flex-col gap-1">
              Other
              <span className="text-[#7E7E7E] font-normal text-sm">
                Progress : Final Stage
              </span>
            </div>
            <img className="w-[50px]" src="/image/circle-chart.png" alt="" />
          </div>
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
              Sat 2024/02/02
              <div className="arowDownIcon-purple"></div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex items-center justify-between w-1/4 text-sm">
              Sat 2024/02/02
              <div className="arowDownIcon-purple"></div>
            </div>

            <div className="border-l-[#E1E1E1] border-l h-full"></div>

            <div className="flex items-center justify-between w-1/4 text-sm">
              Sat 2024/02/02
              <div className="arowDownIcon-purple"></div>
            </div>
          </div>
        </div>

        {/* /////////////////////////////////Nose Client 1 section/////////////////////// */}
        <NoseCompare />

        {/* /////////////////////////////////Chin Client 1 section/////////////////////// */}
        <ChinCompare />

        {/* /////////////////////////////////Lip Client 1 section/////////////////////// */}
        <LipCompare />

        {/* /////////////////////////////////Cheek Client 1 section/////////////////////// */}
        <CheekCompare />

        {/* /////////////////////////////////Forehead Client 1 section/////////////////////// */}
        <ForeheadCompare />

        {/* /////////////////////////////////Eyebrow Client 1 section/////////////////////// */}
        <EyebrowCompare />

        {/* /////////////////////////////////Philtral Column Client 1 section/////////////////////// */}
        <PhiltralColumnCompare />

        {/* /////////////////////////////////Other Client 1 section/////////////////////// */}
        <OtherCompare />
      </div>
    </>
  );
};

export default CompareSection;
