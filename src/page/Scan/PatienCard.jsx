import React from "react";
import ButtonSecondary from "../../components/button/buttonSecondary";
import ButtonPrimary from "../../components/button/buttonPrimery";

export const PatienCard = () => {
  return (
    <div className="flex gap-12 items-center justify-start shadow-lg border px-4 pt-2">
      <div className="flex items-start self-start gap-5 ">
        1
        <img className="mt-3" src="/public/Rectangle 18044.svg" alt="" />
      </div>
      <div className="w-full flex flex-col items-start  justify-center ">
        <div className="flex justify-between w-full gap-8 border-b py-3">
          <h2 className="text-xl font-bold text-[#1A1919]">
            Patient Id: 11223344
          </h2>
          <div className="flex items-center gap-1 text-[#544BF0] font-medium text-base mr-24 ">
            Show Comments(0)
            <img src="/public/arrow-up.svg" alt="" />
          </div>
          <div className="flex gap-4 items-center">
            <div className="font-medium text-[#606060]">
              Last Scan: 12 April 2024{" "}
            </div>
            <div className="flex items-center gap-1  text-[#544BF0]">
              <img src="/public/fi_plus-blue.svg" alt="" />
              New Scan
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5 gap-5   w-full">
          <div className="flex justify-between w-full ">
            <h2 className="font-bold text-xl text-[#1a1919]">Scan Analysis</h2>
            <span className="font-medium text-[#606060]">
              Date: 12 April 2024{" "}
            </span>
            <div className="flex gap-3 items-center">
              <ButtonSecondary>
                <img src="/public/fi_share-2.svg" alt="" />
                Share
              </ButtonSecondary>
              <ButtonPrimary>
                <img src="/public/fi_download.svg" alt="" />
                Download PDF
              </ButtonPrimary>
            </div>
          </div>
          <div className="flex justify-between w-full ">
            <h2 className="font-bold text-xl text-[#1a1919]">Scan Analysis</h2>
            <span className="font-medium text-[#606060]">
              Date: 12 April 2024{" "}
            </span>
            <div className="flex gap-3 items-center">
              <ButtonSecondary>
                <img src="/public/fi_share-2.svg" alt="" />
                Share
              </ButtonSecondary>
              <ButtonPrimary>
                <img src="/public/fi_download.svg" alt="" />
                Download PDF
              </ButtonPrimary>
            </div>
          </div>
        </div>
         <div className=" mt-5 w-full border-t py-3 flex justify-between items-center">
        <h3 className="text-xl font-medium text-[#1a1919]">Comments:</h3>
        <p> 12 April 2024  Lorem Ipsum is simply dummy text of the printing and typesetting industry... <span className="text-[#544BF0] underline">Add Comment</span></p>
        <div className="flex items-center gap-1 text-[#544BF0]">
            <img src='/public/arrow-up.svg' alt="" />
            See More
        </div>
      </div>
      </div>
     
    </div>
  );
};