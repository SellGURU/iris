const ButtonPrimary = ({ onClickHandler, children,className, ...props }) => {
  return (
    <button
      onClick={onClickHandler}
      
      className={"text-white  font-medium text-xl text-nowrap flex items-center justify-center gap-3 bg-[#544BF0] rounded-md px-5 py-3 disabled:bg-[#999999]  "+ className}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
