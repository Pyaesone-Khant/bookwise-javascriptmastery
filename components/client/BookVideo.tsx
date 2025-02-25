'use client';

import { config } from "@/lib/config";
import { IKVideo, ImageKitProvider } from "imagekitio-next";

export function BookVideo({ videoUrl }: { videoUrl: string }) {
    return (
        <ImageKitProvider
            publicKey={config.env.imagekit.publicKey}
            urlEndpoint={config.env.imagekit.urlEndpoint}
        >
            <IKVideo
                path={videoUrl}
                width="100%"
                height="auto"
                className="w-full rounded-lg"
                controls
            />
        </ImageKitProvider>
    )
}
