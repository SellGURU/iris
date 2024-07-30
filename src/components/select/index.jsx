/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import useModalAutoClose from "../../hooks/useModalAutoClose";

const Select = ({ label, options, placeHolder, onchange, value }) => {
  const [showOptions, setShowOptions] = useState(false);
  const modalRef = useRef(null);
  useModalAutoClose({
    close: () => {
      setShowOptions(false);
    },
    refrence: modalRef,
  });
  // const [value,setValue] = useState('')
  // useEffect(() => {
  //     onchange(value)
  // },[value])
  // onClick={() => {
  //     setShowOptions(!showOptions)


  return (
    <div className="relative">
      <label className="flex mb-2 text-xl font-medium" htmlFor={label}>
        {label}
      </label>
      <div className="flex justify-between select-none  cursor-pointer mt-3 w-full">
        <input
          type="text"
          value={value}
          onChange={(e) => onchange(e.target.value)}
          onClick={() => setShowOptions(true)}
          className="w-full pl-3 text-[16px] text-[#2E2E2E] outline-none border-none"
          placeholder={placeHolder}
        />
        {/* {value!= ''?
                    <div className="text-[16px] select-none text-[#2E2E2E] pl-3">{value}</div>
                :
                    <div className="text-[16px] select-none text-[#7E7E7E] pl-3">{placeHolder}</div>
                } */}

        <img
        
          className={` transition-transform ${showOptions ? "" :  "rotate-180"}`}
          src="./arrow-down.svg"
          alt=""
        />
      </div>
      <div className="w-full h-[1px] border-b border-[#E1E1E1] mt-1"></div>
      {showOptions && (
        <div
          ref={modalRef}
          className="bg-white z-10 py-6 px-8 rounded-[8px] mt-4 w-full  absolute"
          style={{ boxShadow: "0px 0px 12px 0px #00000026" }}
        >
          {options.map((op, index) => {
            return (
              <>
                <div
                  onClick={() => {
                    onchange(op);
                    setShowOptions(false);
                  }}
                  className={` ${
                    index == options.length - 1 ? "border-none" : "border-b"
                  }  border-[#00000033] py-2 text-[#2E2E2E] cursor-pointer`}
                >
                  {op}
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Select;
