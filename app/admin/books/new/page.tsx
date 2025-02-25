import { BookForm } from "@/components/admin";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function AddNewBookPage() {

    return (
        <section
            className="space-y-8"
        >
            <Breadcrumb>
                <BreadcrumbList
                    className="font-medium font-bebas-neue tracking-wide text-base"
                >
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/admin/books">
                            Books
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>
                            New
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div
                className="max-w-3xl"
            >
                <BookForm
                    type="create"
                />
            </div>

        </section>
    )
}
