export const columns = [
    {
        accessorKey: "InvoiceID",
        header: "InvoiceID",
        size: 225,
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
        header: "Amount",
        size: 225,
    },
    {
        accessorKey: "status",
        header: "Status",
        size: 100,
        enableColumnFilter: true,
        filterFn: "includesString",
        cell: ({row}) => {
            console.log(row.original)
            return (
                <div className={" flex items-center justify-center "}>
                    <h1 className={"bg-[#E1FFDC] w-fit px-8 py-2 rounded-2xl text-[#07A104]"}>
                        {row.original.status}
                    </h1>
                </div>
            )
        }
    },
];



