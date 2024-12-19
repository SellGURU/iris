/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import useModalAutoClose from "../../hooks/useModalAutoClose";

const Select = ({ label, options, placeHolder, onchange, value, disabled ,noteditAble}) => {
  const [showOptions, setShowOptions] = useState(false);
  // const [isCustomInput, setIsCustomInput] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState(options);

  const modalRef = useRef(null);
  const modalButtRef = useRef(null);
  useModalAutoClose({
    close: () => {
      setShowOptions(false);
    },
    buttonRefrence:modalButtRef,
    refrence: modalRef,
  });
  // const [value,setValue] = useState('')
  // useEffect(() => {
  //     onchange(value)
  // },[value])
  // onClick={() => {
  //     setShowOptions(!showOptions)
  const handleOptionClick = (option) => {
    setShowOptions(false);
    if (option === "Enter New One") {
      // setIsCustomInput(true);
      onchange("");
    } else {
      onchange(option);
      

    }
  };
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    onchange(inputValue);

    const filtered = options.filter(option =>
      option.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFilteredOptions(filtered);
    setShowOptions(filtered.length > 0);
  };
  const handleArrowClick = () => {
    // e.stopPropagation();
    if(!disabled){
      setShowOptions(!showOptions); 
    }
  };
  useEffect(()=> console.log(showOptions)  , [showOptions])
  return (
    <div className="relative">
      <label className="flex mb-2 text-[16px] font-medium" htmlFor={label}>
        {label}
      </label>
      <div   className="flex justify-between select-none  cursor-pointer mt-3 w-full" style={{cursor:disabled?'not-allowed':'pointer'}}>
        <input disabled={disabled} placeholder={placeHolder} value={value} onChange={(e) => {
          if(!noteditAble){
            onchange(e.target.value)
          }
        }}  type="text" className={`w-full text-[14px]  bg-white outline-none pl-5 pr-7 py-2 ${disabled?'text-[#7E7E7E]':'text-[#444444]'}  `}/>
        {/* <div
        onClick={() => setShowOptions(true)}
          className="w-full flex justify-between items-center"
        >
          <div className={`w-full pl-5 text-[16px] ${value ? "text-[#2E2E2E]" : "text-[#7E7E7E]"}`}>
            {value || placeHolder}
          </div>
          
        </div> */}
         <img
         ref={modalButtRef}
         onClick={handleArrowClick}
              className={`transition-transform ${!showOptions ? "rotate-180" : ""}`}
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
          <div>
            {/* <input type="text" onChange={(e) => {
              onchange(e.target.value)
            }} className="border-b w-full border-[#00000033] py-2 text-[#2E2E2E] cursor-pointer outline-none text-[16px]" placeholder="Enter New One" /> */}
          </div>
          {filteredOptions.map((op, index) => {
            return (
              <>
                <div
                //   onClick={() => {
                //     onchange(op);
                //     setShowOptions(false);
                //   }}
                onClick={() => handleOptionClick(op)}

                  className={` ${
                    index == filteredOptions.length - 1 ? "border-none" : "border-b"
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
