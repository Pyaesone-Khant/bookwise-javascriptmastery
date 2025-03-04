import { getBookDetail } from "@/lib/apis/queries";

export default async function Page({ params: { id } }: { params: { id: string } }) {

    const book = await getBookDetail(id);

    return (
        <div>Page</div>
    )
}
