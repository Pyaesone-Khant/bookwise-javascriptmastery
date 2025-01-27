'use client';

import { AuthForm, FormTypes } from "@/components/AuthForm";
import { SignupSchema } from "@/lib/validations";

export default function SignupPage() {
    return (
        <AuthForm
            type={FormTypes.SIGN_UP}
            schema={SignupSchema}
            defaultValues={{
                fullName: "",
                email: "",
                password: "",
                universityId: 0,
                universityCard: "",
            }}
            onSubmit={() => { }}
        />
    )
}
