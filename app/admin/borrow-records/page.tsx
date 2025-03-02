import { DataTable } from "@/components/common";
import { filterByBookTitle } from "@/components/common/table-components/SearchFilter";
import { TableDataType } from "@/constants/enum";
import { getBorrowRecords } from "@/lib/apis/queries";
import { createColumns } from "@/lib/createColumns";

type BorrowRecordColumn = {
    id: string;
    'book.title': string;
    'user.fullName': string;
    borrowDate: string;
    dueDate: string;
    returnDate: string | null;
    status: BorrowStatus
}


export default async function BorrowRecords() {

    const borrowedRecords = await getBorrowRecords();

    const columns = createColumns<BorrowRecordColumn>(
        {
            id: "ID",
            "book.title": "Book",
            "user.fullName": "User",
            borrowDate: "Borrowed At",
            dueDate: "Due At",
            returnDate: "Returned At",
            status: "Status"
        },
        undefined,
        {
            "book.title": filterByBookTitle
        }
    )

    return (
        <>
            <div>
                <h2
                    className="text-xl font-bold text-gray-800"
                >
                    Borrowed Records
                </h2>
            </div>
            <div>
                <DataTable
                    data={borrowedRecords as BorrowedRecord[]}
                    columns={columns}
                    dataType={TableDataType.BORROWED_RECORDS}
                />
            </div>

        </>
    )
}
