export const ButtonDefault = ({onClickHandler,ClassName,children,props}) => {
    return (
        <button
            onClick={onClickHandler}
            className = {" font-medium text-[14px] text-[#544BF0] flex items-center justify-center gap-3 bg-[#F5F5F5] rounded-md px-2.5 py-1 disabled:bg-[#999999] " + ClassName}
            {...props}
        >
            {children}
        </button>
    )
}
