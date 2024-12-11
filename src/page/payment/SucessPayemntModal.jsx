import React , {useRef} from "react";
import useModalAutoClose from "../../hooks/useModalAutoClose";
export const SucessPayemntModal = ({onClose}) => {
  const showModalRefrence = useRef(null);
  useModalAutoClose({
    refrence: showModalRefrence,
   
    close: () => {
     onClose()
    },
  });
  return (
    <div className=" fixed inset-0  w-full flex justify-center items-center bg-black bg-opacity-35 z-[99] ">
      <div ref={showModalRefrence} className="bg-white w-[796px] min-h-[493px] rounded-lg relative flex items-start justify-center pt-[100px]">
        <div className="flex flex-col items-center gap-6 z-10">
          <img className="w-[120px] h-[40px]" src="./image/login/IRIS.svg" alt="" />
          <h2 className="text-2xl font-medium text-[#544BF0] ">
            Payment Successful!
          </h2>
          <p className="text-sm font-normal text-[#444444] text-center max-w-[383px] ">Thank you for your payment! Your transaction has been securely processed, and your payment history is saved in the app for easy reference.</p>
          <p className="text-sm font-normal text-center max-w-[383px] text-[#444444]">If you have any questions or need further information, feel free to reach out to us at <span className="text-[#544BF0]">support@irisaesthetics.com</span></p>
        </div>

        <img
          className="absolute bottom-0 "
          src="./image/payment-modal.svg"
          alt=""
        />
      </div>
    </div>
  );
};
