import { Welcome } from "@/components/emails/Welcome"
import { users } from "@/database/schema"
import { db } from "@/db"
import { sendEmail } from "@/lib/workflow"
import { serve } from "@upstash/workflow/nextjs"
import { eq } from "drizzle-orm"

type UserState = 'non-active' | 'active'

type InitialData = {
    email: string,
    fullName: string
}

const ONE_DAY_IN_MILLISECONDS = 1000 * 60 * 60 * 24
const THREE_DAYS_IN_MILLISECONDS = ONE_DAY_IN_MILLISECONDS * 3
const ONE_MONTH_IN_MILLISECONDS = ONE_DAY_IN_MILLISECONDS * 30

export const { POST } = serve<InitialData>(async (context) => {
    const { email, fullName } = context.requestPayload

    // welcome email
    await context.run("new-signup", async () => {
        await sendEmail({
            email,
            subject: "Welcome to BookWise!",
            message: Welcome({ fullName })
        })
    })

    await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)

    while (true) {
        const state = await context.run("check-user-state", async () => {
            return await getUserState(email)
        })

        if (state === "non-active") {
            await context.run("send-email-non-active", async () => {
                await sendEmail({
                    email,
                    subject: "We miss you!",
                    message: `Hello ${fullName}, we miss you! Please come back to BookWise! There are new books waiting for you!`
                })
            })
        } else if (state === "active") {
            await context.run("send-email-active", async () => {
                await sendEmail({
                    email,
                    subject: "We are happy to see you active!",
                    message: `Hello ${fullName}, we are happy to see you active on BookWise! Keep reading!`
                })
            })
        }

        await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
    }
})

const getUserState = async (email: string): Promise<UserState> => {

    const user = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (user.length === 0) {
        return "non-active"
    }

    const lastActivityDate = new Date(user[0]?.lastActivityDate!);

    const now = new Date();

    const timeDiff = now.getTime() - lastActivityDate.getTime();

    if (timeDiff > THREE_DAYS_IN_MILLISECONDS && timeDiff <= ONE_MONTH_IN_MILLISECONDS) {
        return "non-active"
    }

    return "active"
}
