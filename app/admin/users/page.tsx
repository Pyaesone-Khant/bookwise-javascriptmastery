import { DataTable } from "@/components/common";
import { TableDataType } from "@/constants/enum";
import { users } from "@/database/schema";
import { db } from "@/db";
import { createColumns } from "@/lib/createColumns";

export default async function Page() {

    const data = await db.select({
        fullName: users.fullName,
        email: users.email,
        universityId: users.universityId,
        status: users.status,
    }).from(users);

    const columns = createColumns(
        {
            fullName: 'Full Name',
            email: 'Email',
            universityId: 'University ID',
            status: 'Status',
        },
    )

    return (
        <>
            <h2
                className="text-lg font-semibold"
            >Users</h2>

            <div>
                <DataTable
                    data={data}
                    columns={columns}
                    dataType={TableDataType.USERS}
                />
            </div>
        </>
    )
}
