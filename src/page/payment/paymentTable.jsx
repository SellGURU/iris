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
import { IoIosArrowDown } from "react-icons/io";

export const PaymentTable = () => {

    const [data, setData] = useState(fakeData);
    const [columnFilters, setColumnFilters] = useState([]);

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
            <table
                className={"w-full drop-shadow-2xl shadow-10xl rounded-xl"}
            >
                <thead className="">
                {table.getHeaderGroups().map((headerGroup) => {
                    return (
                        <tr key={headerGroup.id} className={"text-nowrap"}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th className={"pt-16 "}
                                    >
                                        <div className={"flex w-full  pl-4 items-center justify-start text-[#2E2E2E] font-medium text-base"}>

                                            <>{header.column.columnDef.header}</>
                                            {header.column.getCanSort() && (
                                                <IoIosArrowDown onClick={header.column.getToggleSortingHandler()}/>
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
                {table.getRowModel().rows.map((row) => {
                        return (
                            <tr className="space-y-10 mt-10 ">
                                {row.getVisibleCells().map((cell) => {
                                        return (
                                            <td className={"text-left pl-5 !py-10 text-[#7E7E7E] font-normal text-base"}>
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
            <Pagination table={table}/>

        </div>
    )
}