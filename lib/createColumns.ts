import { ColumnDef, FilterFn } from "@tanstack/react-table";
import { JSX } from "react";

export const createColumns = <T extends object>(
    headers?: Partial<Record<keyof T, string>>,
    renderActions?: (row: T) => JSX.Element,
    filters?: Partial<Record<keyof T, FilterFn<T>>>
): ColumnDef<T>[] => {
    const columns: ColumnDef<T>[] = (Object.keys(headers ?? {}) as Array<keyof T>).map((key) => ({
        accessorKey: key,
        header: headers?.[key] ?? key.toString(),
        filterFn: filters?.[key] || "includesString",
    }));

    if (renderActions) {
        columns.push({
            accessorKey: "actions",
            header: "Actions",
            cell: ({ row }) => renderActions(row.original),
        });
    }

    return columns;
};
