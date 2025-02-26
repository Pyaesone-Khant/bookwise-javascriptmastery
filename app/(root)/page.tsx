import { auth } from "@/auth";
import { BookList, BookOverview } from "@/components/client";
import { getBookList } from "@/lib/apis/queries";

export default async function Home() {

  const session = await auth();
  const userId = session?.user?.id as string;

  const latestBooks = await getBookList(userId!)

  return (
    <>
      <BookOverview
        {...latestBooks[0]}
        userId={userId}
      />
      <BookList
        title={'Latest Books'}
        books={latestBooks.slice(1)}
        containerClassName={'mt-28'}
      />
    </>
  );
}
