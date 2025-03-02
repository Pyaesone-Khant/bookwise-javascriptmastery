"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    PaginationState,
    useReactTable
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


import { BorrowStatus, TableDataType, UserStatus } from "@/constants/enum"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { SearchFilter } from "./table-components/SearchFilter"
import { SelectFitler } from "./table-components/SelectFilter"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
    dataType?: TableDataType
}

export function DataTable<TData, TValue>({
    columns,
    data,
    dataType = TableDataType.BOOKS
}: DataTableProps<TData, TValue>) {

    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 8
    })
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnFiltersChange: setColumnFilters,
        state: {
            pagination,
            columnFilters
        },
    });

    return (
        <>
            <div className="mb-4 flex justify-end gap-4">
                {
                    (dataType === TableDataType.BORROWED_RECORDS ||
                        dataType === TableDataType.USERS) && (
                        <SelectFitler
                            table={table}
                            columnId={'status'}
                            filterValue={dataType === TableDataType.BORROWED_RECORDS ? BorrowStatus : UserStatus}
                        />
                    )
                }

                {/* still not woking in borrow records  */}
                <SearchFilter
                    table={table}
                    columnId={dataType === TableDataType.BORROWED_RECORDS ? 'book.title' :
                        dataType === TableDataType.USERS ? 'email' : 'title'}
                    placeholder={dataType === TableDataType.BORROWED_RECORDS ? 'Search by book title' :
                        dataType === TableDataType.USERS ? 'Search by email' : 'Search by title'}
                />
            </div>
            <div className="rounded-md border overflow-hidden">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead
                                            key={header.id}
                                            className=" text-primary-admin bg-neutral-200 font-semibold !min-w-36"
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="h-12"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className={cn({
                                                'text-green-700': cell.getValue() === BorrowStatus.RETURNED || cell.getValue() === UserStatus.APPROVED,
                                                'text-red-700': cell.getValue() === BorrowStatus.BORROWED || cell.getValue() === UserStatus.REJECTED,
                                                'text-yellow-600': cell.getValue() === UserStatus.PENDING,
                                            })}
                                        >
                                            {
                                                cell.getValue() !== null ?
                                                    flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    ) : '-'
                                            }
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div
                className="flex items-center justify-end gap-4"
            >
                <div className="flex w-[100px] items-center justify-center text-sm font-medium text-primary-admin">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="border-primary-admin text-primary-admin"
                    >
                        <ChevronLeft />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="border-primary-admin text-primary-admin"
                    >
                        <ChevronRight />
                    </Button>
                </div>
            </div>
        </>
    )
}
