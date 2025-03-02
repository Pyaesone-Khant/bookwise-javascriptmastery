'use client';
import { Input } from "@/components/ui/input";
import { FilterFn, Table } from "@tanstack/react-table";

export function SearchFilter<TData>({ table, columnId, placeholder }: { table: Table<TData>, columnId: string, placeholder?: string }) {

    return (
        <>
            <Input
                placeholder={placeholder}
                onChange={
                    (e) => table.getColumn(columnId)?.setFilterValue(e.target.value)
                }
                className="w-60"
            />
        </>
    )
}

export const filterByBookTitle: FilterFn<any> = (row, columnId, filterValue) => {
    if (!filterValue) return true; // If no filter, show all rows
    const cellValue = getNestedValue(row.original, columnId); // Get nested value
    return cellValue?.toLowerCase().includes(filterValue.toLowerCase());
};

const getNestedValue = (obj: any, path: string) => {
    return path.split('.').reduce((acc, key) => acc?.[key], obj)
}