import { BookList, BookOverview } from "@/components/client";
import { sampleBooks } from "@/constants";

export default async function Home() {

  return (
    <>
      <BookOverview
        {...sampleBooks[0]} />
      <BookList
        title={'Latest Books'}
        books={sampleBooks}
        containerClassName={'mt-28'}
      />
    </>
  );
}
