import { config } from "@/lib/config";
import { Client as QStashClient, resend } from "@upstash/qstash";
import { Client as WorkflowClient } from "@upstash/workflow";
import { ReactElement } from "react";

export const workflowClient = new WorkflowClient({
    baseUrl: config.env.upstash.qstashUrl,
    token: config.env.upstash.qstashToken,
});
const qstashClient = new QStashClient({ token: config.env.upstash.qstashToken });

export const sendEmail = async ({
    email,
    subject,
    message,
}: {
    email: string;
    subject: string;
    message: ReactElement;
}) => {
    await qstashClient.publishJSON({
        api: {
            name: "email",
            provider: resend({ token: config.env.resendToken }),
        },
        body: {
            from: "JSM x PK <contact@pyaesonekhant.space>",
            to: [email],
            subject,
            react: message,
        },
    });
};