import { auth } from "@/auth";
import { BookOverview } from "@/components/client";
import { BookVideo } from "@/components/client/BookVideo";
import { getBookDetail } from "@/lib/apis/queries";
import { redirect } from "next/navigation";

export default async function BookDetaiPage({ params }: { params: Promise<{ id: string }> }) {

    const id = (await params).id;

    const session = await auth();

    const bookDetail = await getBookDetail(id, session?.user?.id!);

    if (!bookDetail) return redirect('/404');

    return (
        <>
            <BookOverview
                {...bookDetail}
                userId={session?.user?.id!}
            />
            <div
                className="book-details"
            >
                <div
                    className="flex-[1.5]"
                >
                    <section
                        className="flex flex-col gap-8"
                    >
                        <h3>
                            Video
                        </h3>
                        <BookVideo
                            videoUrl={bookDetail.videoUrl}
                        />
                    </section>
                    <article
                        className="mt-10 flex flex-col gap-8"
                    >
                        <h3>
                            Summary
                        </h3>
                        <div
                            className="space-y-5 text-xl text-light-100"
                        >
                            {
                                bookDetail.summary.split('\n').map((line, index) => (
                                    <p
                                        key={index}
                                    >
                                        {line}
                                    </p>
                                ))
                            }
                        </div>
                    </article>
                </div>
            </div>
        </>
    )
}
