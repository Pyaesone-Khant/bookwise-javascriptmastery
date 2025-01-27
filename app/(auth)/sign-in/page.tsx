'use client'

import { AuthForm, FormTypes } from "@/components/AuthForm";
import { SigninSchema } from "@/lib/validations";

export default function SigninPage() {
    return (
        <AuthForm
            type={FormTypes.SIGN_IN}
            schema={SigninSchema}
            defaultValues={{
                email: "",
                password: "",
            }}
            onSubmit={() => { }}
        />
    )
}
