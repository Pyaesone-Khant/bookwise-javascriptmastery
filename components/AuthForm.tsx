'use client';

import { ImageUpload } from "@/components/ImageUpload";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { DefaultValues, FieldValues, Path, SubmitHandler, useForm, UseFormReturn } from "react-hook-form";
import { ZodType } from "zod";

export const FormTypes = {
    SIGN_IN: "SIGN_IN" as const,
    SIGN_UP: "SIGN_UP" as const,
}

interface Props<T extends FieldValues> {
    schema: ZodType<T>,
    defaultValues: T,
    onSubmit: (data: T) => Promise<{ success: boolean, error?: string }>,
    type: "SIGN_IN" | "SIGN_UP"
}

export function AuthForm<T extends FieldValues>({ type, schema, defaultValues, onSubmit }: Props<T>) {

    const form: UseFormReturn<T> = useForm({
        resolver: zodResolver(schema),
        defaultValues: defaultValues as DefaultValues<T>
    })

    const handleSubmit: SubmitHandler<T> = async (data) => { }

    const isSignin = type === FormTypes.SIGN_IN

    return (
        <section
            className="flex flex-col gap-4"
        >

            <h1
                className="text-2xl font-semibold text-white capitalize"
            >
                {isSignin ? 'Welcome back to BookWise' : "Create your library account"}
            </h1>

            <p
                className="text-light-400"
            >
                {isSignin
                    ? 'Access the vast collection of resources, and stay updated'
                    : 'Please complete all fields and upload a valid university ID to gain access to the library'
                }
            </p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 w-full">

                    {
                        Object.keys(defaultValues).map((field) => (
                            <FormField
                                key={field}
                                control={form.control}
                                name={field as Path<T>}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel
                                            className="capitalize"
                                        >{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}</FormLabel>
                                        <FormControl>

                                            {
                                                field.name === "universityCard" ? (
                                                    <ImageUpload
                                                        onFileChange={field.onChange}
                                                    />
                                                ) : (
                                                    <Input
                                                        required
                                                        type={FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]}
                                                        {...field}
                                                        className="form-input"
                                                    />
                                                )
                                            }

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))
                    }

                    <Button
                        type="submit"
                        className="form-btn"

                    >
                        {isSignin ? "Sign in" : "Sign up"}
                    </Button>
                </form>
            </Form>

            <p
                className="text-center text-base font-medium"
            >
                {isSignin
                    ? "New to BookWise?"
                    : "Already have an account?"
                }
                <Link
                    href={isSignin ? "/sign-up" : "/sign-in"}
                    className="font-bold text-primary mx-1"
                >
                    {
                        isSignin
                            ? "Create an account"
                            : "Sign in"
                    }
                </Link>
            </p>
        </section>
    )
}
