const Pagination = ({table,}) => {
    const countPage = table.getPageCount()
    return (
        <div className="flex items-center justify-start w-full pt-10 ">
            <h1 className={"block"}>Show 5 rows per page.</h1>

            <ul className="flex items-center w-2/3 h-full pl-24  justify-center p-0 text-base  ">
                <li>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        data-diraction-arow={"right"}
                        className={` p-3 rounded-md mx-2`}>
                        <span className="sr-only">Previous</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width="2" d="M5 1 1 5l4 4"/>
                        </svg>
                    </button>
                </li>
                {Array.from({length: countPage}).map((_value, index) => {
                    return (
                        <NumberPagination onClick={() => table.setPageIndex(index)} number={index + 1}
                                          isCurrent={table.getState().pagination.pageIndex === index}/>
                    )
                })}
                <li>
                    <button
                        onClick={() => table.nextPage()}
                        data-diraction-arow={"left"}
                        disabled={!table.getCanNextPage()}
                        className={`p-3 rounded-md mx-2`}>
                        <span className="sr-only">Next</span>
                        <svg className="w-3 h-3 rtl:rotate-180" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                  stroke-width="2" d="m1 9 4-4-4-4"/>
                        </svg>
                    </button>
                </li>
            </ul>
        </div>


    );
};

export default Pagination

export const NumberPagination = ({number, isCurrent, ...props}) => {
    console.log(number)
    return (
        <li {...props}>
            <button aria-current="page"
                    className={`px-2 py-.5  rounded-md h-fit  ${isCurrent ? "bg-[#544BF0] text-white" : ""}`}>{number}</button>
        </li>
    );
};
