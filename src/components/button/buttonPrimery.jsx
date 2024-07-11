const ButtonPrimary = ({ onClickHandler, children,className, ...props }) => {
  return (
    <button
      onClick={onClickHandler}
      
      className={"text-white  font-medium text-nowrap flex items-center justify-center gap-3 bg-[#544BF0] rounded-md px-2.5 py-1 disabled:bg-[#999999]  "+ className}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
