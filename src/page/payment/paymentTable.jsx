import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";
import {useState} from "react";
import {fakeData} from "./fakeData.js";
import {columns} from "./paymentColumns.jsx";
import Pagination from "./Pagination.jsx";

export const PaymentTable = () => {

    const [data] = useState(fakeData);
    const [columnFilters] = useState([]);

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        initialState: {
            pagination: {
                pageSize: 5, //custom default page size
            }
        }
    });
    return (
        <div className={"!mt-10"}>
            {data.length == 0 ?
                <div 
                    className={"w-full h-[104px] flex text-center text-[#444444] justify-center items-center rounded-xl"}
                    style={{
                        boxShadow:'0px 0px 12px 0px #00000026'
                    }}>No records found.</div>
            :
            <>
                <table
                    className={"w-full rounded-xl"}
                    style={{
                        boxShadow:'0px 0px 12px 0px #00000026'
                    }}
                >
                    <thead className="">
                    {table.getHeaderGroups().map((headerGroup) => {
                        return (
                            <tr key={headerGroup.id} className={"text-nowrap"}>
                                {headerGroup.headers.map((header,index) => {
                                    return (
                                        <th key={index} className={"pt-8 "}
                                        >
                                            <div className={"flex w-full opacity-70  pl-4 items-center justify-start text-[#2E2E2E] font-medium text-base"}>

                                                <>{header.column.columnDef.header}</>
                                                {header.column.getCanSort() && (
                                                    <img className={`rotate-180 ml-1 w-4`} onClick={header.column.getToggleSortingHandler()} src="./arrow-down.svg" alt="" />
                                                    // <IoIosArrowDown className="ml-1" size={'12px'} onClick={header.column.getToggleSortingHandler()}/>
                                                )}
                                                {
                                                    // {
                                                    //     asc: " 🔼",
                                                    //     desc: " 🔼",
                                                    // }[header.column.getIsSorted()]
                                                }
                                            </div>
                                        </th>
                                    )
                                })}
                            </tr>
                        )
                    })}
                    </thead>
                    <tbody>
                    {table.getRowModel().rows.map((row,index) => {
                            return (
                                <tr key={index} className="space-y-10 mt-10 ">
                                    {row.getVisibleCells().map((cell,index) => {
                                            return (
                                                <td key={index} className={"text-left pl-5 !py-10 text-[#7E7E7E] font-normal text-base"}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </td>
                                            )
                                        }
                                    )}
                                </tr>
                            )
                        }
                    )}
                    </tbody>
                </table>
                <div className="w-full h-[1px] mt-[16px] bg-[#00000033]"></div>
            <Pagination table={table}/>
            </>
            }

        </div>
    )
}
