import {IoMdMore} from "react-icons/io";

const resolveStatusColor =(status) => {
    if(status == 'Paid'){
        return 'bg-[#E1FFDC] text-[#07A104]'
    }
    if(status == 'Rejected'){
        return 'bg-[#FFE6EE] text-[#FF001F]'
    }
    if(status == 'Pending'){
        return 'bg-[#FFF5DC] text-[#F9A80C]'
    }    
}

export const columns = [
    {
        accessorKey: "InvoiceID",
        header: "Invoice ID",
    },
    {
        accessorKey: "Package",
        header: "Package",

        enableSorting: true,
        enableColumnFilter: true,
        // filterFn: (row, columnId, filterStatuses) => {
        //     if (filterStatuses.length === 0) return true;
        //     const status = row.getValue(columnId);
        //     return filterStatuses.includes(status?.id);
        // },
    },
    {
        accessorKey: "BillingDate",
        header: "Billing Date",
    },

    {
        accessorKey: "Amount",
        enableSorting: true,

        header: "Amount",
    },
    {
        accessorKey: "status",
        header: "Status",
        enableColumnFilter: true,
        // filterFn: "includesString",
        // enableSorting: false,
        cell: ({row}) => {
            console.log(row.original)
            return (
                <div className={" flex items-center  py-2 justify-center "}>
                    <div className={` shadow-none overflow-hidden w-[60%] h-10 flex items-center justify-center  rounded-[8px] ${resolveStatusColor(row.original.status)}`}>
                        {row.original.status}
                    </div>
                </div>
            )
        }
    },
    // {
    //     accessorKey: "more",
    //     header: (<div className={"w-full text-center"}>More</div>),
    //     enableColumnFilter: true,
    //     filterFn: "includesString",
    //     enableSorting: false,

    //     cell: ({row}) => {
    //         console.log(row.original)
    //         return (
    //             <div className={" flex items-center justify-center"}>
    //                 <img src="./more.svg" alt="" />
    //             </div>
    //         )
    //     }
    // },
];



