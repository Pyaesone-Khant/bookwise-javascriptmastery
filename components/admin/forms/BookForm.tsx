'use client';

import { FileUpload } from "@/components/FileUpload";
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
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { createBookAction } from "@/lib/admin/actions/book";
import { BookSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ColorPicker } from "../ColorPicker";

interface Props extends Partial<Book> {
    type?: 'create' | 'update'
}

export function BookForm({ type }: Props) {

    const router = useRouter();
    const form = useForm<z.infer<typeof BookSchema>>({
        resolver: zodResolver(BookSchema),
        defaultValues: {
            title: '',
            description: '',
            author: '',
            genre: '',
            rating: 0,
            totalCopies: 0,
            coverUrl: '',
            coverColor: '',
            videoUrl: '',
            summary: '',
        }
    })

    const onSubmit = async (data: z.infer<typeof BookSchema>) => {
        const result = await createBookAction(data);
        if (result?.success) {
            toast({
                title: 'Scuccess',
                description: 'Book created successfully!',
            });
            router.push(`/admin/books/${result?.data.id}`)
        } else {
            toast({
                title: 'Error',
                description: result?.message ?? 'Error while creating book!',
                variant: 'destructive'
            })
        }
    }

    return (
        <section
            className="flex flex-col gap-4"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
                    <FormField
                        control={form.control}
                        name={'title'}
                        render={({ field }) => (
                            <FormItem
                                className="flex flex-col gap-1"
                            >
                                <FormLabel
                                    className="text-base  text-dark-500"
                                >
                                    Book Title
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="Book Title"
                                        required
                                        className="book-form_input"
                                    />


                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div
                        className="flex max-md:flex-col gap-6 "
                    >
                        <FormField
                            control={form.control}
                            name={'author'}
                            render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-1 w-full"
                                >
                                    <FormLabel
                                        className="text-base  text-dark-500"
                                    >
                                        Author
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Book Author"
                                            required
                                            className="book-form_input"
                                        />


                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'genre'}
                            render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-1 w-full"
                                >
                                    <FormLabel
                                        className="text-base  text-dark-500"
                                    >
                                        Genre
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            placeholder="Book Genre"
                                            required
                                            className="book-form_input"
                                        />


                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div
                        className="flex max-md:flex-col gap-6"
                    >
                        <FormField
                            control={form.control}
                            name={'rating'}
                            render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-1 w-full"
                                >
                                    <FormLabel
                                        className="text-base  text-dark-500"
                                    >
                                        Rating
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            min={1}
                                            max={5}
                                            placeholder="Book Title"
                                            required
                                            className="book-form_input"
                                        />


                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'totalCopies'}
                            render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-1 w-full"
                                >
                                    <FormLabel
                                        className="text-base  text-dark-500"
                                    >
                                        Total Copies
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="number"
                                            min={1}
                                            max={10000}
                                            placeholder="Total Copies"
                                            required
                                            className="book-form_input"
                                        />


                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name={'coverColor'}
                        render={({ field }) => (
                            <FormItem
                                className="flex flex-col gap-1"
                            >
                                <FormLabel
                                    className="text-base  text-dark-500"
                                >
                                    Cover Color
                                </FormLabel>
                                <FormControl>
                                    <ColorPicker
                                        value={field.value}
                                        onPickerChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div
                        className="flex max-lg:flex-col gap-6"
                    >
                        <FormField
                            control={form.control}
                            name={'coverUrl'}
                            render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-1 w-full"
                                >
                                    <FormLabel
                                        className="text-base  text-dark-500"
                                    >
                                        Cover Image
                                    </FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            type="image"
                                            accept="image/*"
                                            folder="books/covers"
                                            placeholder="Upload a book cover"
                                            variant="light"
                                            onFileChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'videoUrl'}
                            render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-1 w-full"
                                >
                                    <FormLabel
                                        className="text-base  text-dark-500"
                                    >
                                        Video
                                    </FormLabel>
                                    <FormControl>
                                        <FileUpload
                                            type="video"
                                            accept="video/*"
                                            folder="books/videos"
                                            placeholder="Upload a book trailer"
                                            variant="light"
                                            onFileChange={field.onChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>


                    <div
                        className="flex max-lg:flex-col gap-6"
                    >
                        <FormField
                            control={form.control}
                            name={'description'}
                            render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-1 w-full"
                                >
                                    <FormLabel
                                        className="text-base  text-dark-500"
                                    >
                                        Description
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Book description"
                                            rows={8}
                                            className="book-form_input resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name={'summary'}
                            render={({ field }) => (
                                <FormItem
                                    className="flex flex-col gap-1 w-full"
                                >
                                    <FormLabel
                                        className="text-base  text-dark-500"
                                    >
                                        Summary
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            {...field}
                                            placeholder="Book summary"
                                            rows={8}
                                            className="book-form_input resize-none"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="book-form_btn text-white text-base "

                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </section>
    )
}
