'use client'

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { useState } from "react";

export function DownloadReceiptButton() {

    const [loading, setLoading] = useState<boolean>(false);

    return (
        <Button
            className="book-btn"
            size={'lg'}
            onClick={() => { }}
            loading={loading}
            icon={
                <Download
                    className="!size-5 -mt-0.5"
                />
            }
        >
            <p
                className=" font-bebas-neue text-lg uppercase"
            >
                Download Receipt
            </p>
        </Button>
    )
}
