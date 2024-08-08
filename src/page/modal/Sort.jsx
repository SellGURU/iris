/* eslint-disable react/prop-types */
const SortModal = ({filterModalRefrence,sorts,setFilterType,setShowFilter,filterType}) => {
    return (
        <>
            <div ref={filterModalRefrence} className="absolute top-10 gap-2 flex flex-col p-4 right-0 rounded-[8px] z-30 w-[150px] bg-white" style={{
                boxShadow:'0px 0px 12px 0px #00000026'
            }}>
                {sorts.map((el) => {
                    return (
                        <>
                            <div onClick={() => {
                                setFilterType(el)
                                setShowFilter(false)
                            }} className={`text-[#2E2E2E] cursor-pointer px-2 h-8 rounded-[8px] ${filterType == el?'bg-[#544BF014] font-medium':''}  flex justify-start items-center text-[14px]`}>{el}</div>
                        </>
                    )
                })}
            </div>        
        </>
    )
}

export default SortModal