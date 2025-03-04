'use client';

import { TableDataType } from "@/constants/enum";
import { createColumns } from "@/lib/createColumns";
import { DataTable } from "../common";
import { AccountRequestTableActions } from "./table-actions";

const data = [
    {
        id: "1",
        fullName: 'John Doe',
        email: 'john@doe.com',
        universityId: '123456',
        status: 'PENDING',
    }
]

export function AccountRequests({ users }: { users: User[] }) {

    const renderActions = (user: User) => {
        return (
            <>
                <AccountRequestTableActions.Update
                    user={user}
                />
            </>
        )
    }

    const columns = createColumns<User>(
        {
            id: 'ID',
            fullName: 'Full Name',
            email: 'Email',
            universityId: 'University ID',
            status: 'Status',
        },
        renderActions,
    )

    return (
        <>
            <DataTable
                data={users}
                columns={columns}
                dataType={TableDataType.USERS}
            />
        </>
    )
}
