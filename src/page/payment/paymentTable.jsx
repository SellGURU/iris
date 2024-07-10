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
                pageSize: 6, //custom default page size
            }
        }
    });
    return (
        <div>
            <table
                className={"w-5/6 drop-shadow-2xl shadow-10xl rounded-xl"}
            >
                <thead className="">
                {table.getHeaderGroups().map((headerGroup) => {
                    return (
                        <tr key={headerGroup.id} className={"text-nowrap"}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <th className={"pt-5  w-fit border"}
                                    >
                                        <div className={"flex items-center justify-center text-[#2E2E2E] font-medium text-base"}>

                                            <>{header.column.columnDef.header}</>
                                            {header.column.getCanSort() && (
                                                <h1>hi</h1>
                                            )}
                                            {
                                                // {
                                                //     asc: " 🔼",
                                                //     desc: " 🔽 ",
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
                                            <td className={"text-center !py-10 text-[#7E7E7E] font-normal text-base"}>
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
        </div>
    )
}
