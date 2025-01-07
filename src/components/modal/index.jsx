/* eslint-disable react/prop-types */
// import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "symphony-ui";
// import useModalAutoClose from "../../hooks/useModalAutoClose";


export const Modal = ({text,onClose,type}) => {
  const navigate = useNavigate()
  return (
    <div className="">
      <div className="bg-white min-h-[205px] min-w-[448px] flex flex-col items-center  py-10 gap-5 rounded-lg">
        <img src={type == 'error'?"./image/danger.svg":"./image/tick-circle.svg"} alt="" />
        <div className="text-[#444444] text-sm mt-2">
          {text}
        </div>
        <div className="mt-3">
          {" "}
          <Button onClick={() => {
            onClose()
            if(type == 'success'){
              navigate('/login')
            }
            if(window.location.href.includes("showReport")){
              navigate(-1)
            }
            if(window.location.href.includes("faceMashFile")){
              navigate("/")
            }
          }} theme="iris-small">
            {" "}
            <div className="w-[140px]">Got it</div>
          </Button>
        </div>
      </div>
    </div>
  );
};
