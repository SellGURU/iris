const ButtonSecondary = ({  ClassName , onClickHandler ,children , ...props }) => {
  return (
    <button
    onClick={onClickHandler}
      className={
        "   text-[#706E6E] font-medium text-xl relative border border-[#706E6E] flex items-center justify-center gap-3 bg-inherit rounded-md px-5 py-2   " +
        ClassName
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonSecondary;
