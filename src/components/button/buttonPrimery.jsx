const ButtonPrimary = ({ onClickHandler, children,className, ...props }) => {
  return (
    <button
      onClick={onClickHandler}
      
      className={"text-white  font-medium text-xl flex items-center justify-center gap-3 bg-[#544BF0] rounded-xl px-5 py-3 disabled:bg-[#999999]  "+ className}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
