import {IoMdMore} from "react-icons/io";

export const columns = [
    {
        accessorKey: "InvoiceID",
        header: "InvoiceID",
    },
    {
        accessorKey: "Package",
        header: "Package",

        enableSorting: false,
        enableColumnFilter: true,
        // filterFn: (row, columnId, filterStatuses) => {
        //     if (filterStatuses.length === 0) return true;
        //     const status = row.getValue(columnId);
        //     return filterStatuses.includes(status?.id);
        // },
    },
    {
        accessorKey: "BillingDate",
        header: "BillingDate",
    },

    {
        accessorKey: "Amount",
        enableSorting: false,

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
                <div className={" flex items-center w-2/6 py-2 justify-start "}>
                    <div className={"bg-[#E1FFDC]  w-full h-10 flex items-center justify-center  rounded-2xl text-[#07A104]"}>
                        {row.original.status}
                    </div>
                </div>
            )
        }
    },
    {
        accessorKey: "more",
        header: (<div className={"w-full text-center"}>salam</div>),
        enableColumnFilter: true,
        filterFn: "includesString",
        enableSorting: false,

        cell: ({row}) => {
            console.log(row.original)
            return (
                <div className={" flex items-center justify-center"}>
                    <IoMdMore className={"w-5 h-5"}/>
                </div>
            )
        }
    },
];



