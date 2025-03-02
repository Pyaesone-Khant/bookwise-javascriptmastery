import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { BorrowStatus, UserStatus } from "@/constants/enum"
import { Table } from "@tanstack/react-table"

type Props<TData> = {
    table: Table<TData>
    columnId: string
    filterValue: BorrowStatus | UserStatus | object
}

export function SelectFitler<TData>({ table, columnId = 'status', filterValue }: Props<TData>) {
    return (
        <>
            <Select
                onValueChange={
                    (value) => table.getColumn(columnId)?.setFilterValue(
                        value === 'ALL' ? undefined : value
                    )
                }
                defaultValue="ALL"
            >
                <SelectTrigger className="w-40">
                    <SelectValue placeholder="ALL" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value={'ALL'}>
                        ALL
                    </SelectItem>
                    {
                        Object.keys(filterValue).map((status) => {
                            return (
                                <SelectItem key={status} value={status}>
                                    {status}
                                </SelectItem>
                            )
                        })
                    }
                </SelectContent>
            </Select>
        </>
    )
}
