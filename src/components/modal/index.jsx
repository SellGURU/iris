import React from "react";
import { Button } from "symphony-ui";
// import useModalAutoClose from "../../hooks/useModalAutoClose";

export const Modal = () => {
  return (
    <div className="w-full h-screen bg-black bg-opacity-50 z-50 flex items-center justify-center fixed inset-0">
      <div className="bg-white min-h-[205px] min-w-[448px] flex flex-col items-center  py-10 gap-5 rounded-lg">
        <img src="./image/tick-circle.svg" alt="" />
        <div className="text-[#444444] text-sm mt-2">
          Password reset link has been sent to email
        </div>
        <div className="mt-3">
          {" "}
          <Button theme="iris-small">
            {" "}
            <div className="w-[140px]">Got it</div>
          </Button>
        </div>
      </div>
    </div>
  );
};
