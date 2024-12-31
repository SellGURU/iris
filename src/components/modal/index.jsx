import React from "react";
import { Button } from "symphony-ui";
// import useModalAutoClose from "../../hooks/useModalAutoClose";


export const Modal = ({text,onClose}) => {
  return (
    <div className="">
      <div className="bg-white min-h-[205px] min-w-[448px] flex flex-col items-center  py-10 gap-5 rounded-lg">
        <img src="./image/tick-circle.svg" alt="" />
        <div className="text-[#444444] text-sm mt-2">
          {text}
        </div>
        <div className="mt-3">
          {" "}
          <Button onClick={() => {
            onClose()
          }} theme="iris-small">
            {" "}
            <div className="w-[140px]">Got it</div>
          </Button>
        </div>
      </div>
    </div>
  );
};
