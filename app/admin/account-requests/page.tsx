import { AccountRequests } from "@/components/admin";
import { getPendingAccounts } from "@/lib/apis/queries";

export default async function Page() {

    const users = await getPendingAccounts();

    return (
        <>
            <h2
                className="text-2xl font-semibold"
            >
                Account Requests
            </h2>
            <div>
                <AccountRequests
                    users={users}
                />
            </div>
        </>
    )
}
