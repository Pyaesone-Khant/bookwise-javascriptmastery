'use client'

import { toast } from "@/hooks/use-toast";
import { config } from "@/lib/config";
import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";

const { publicKey, urlEndpoint } = config.env.imagekit;

const authenticator = async () => {
    try {

        const res = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Request failed with the status ${res.status}: ${errText}`);
        }

        const data = await res.json();

        const { signature, token, expire } = data;

        return {
            token,
            expire,
            signature
        }

    } catch (error: any) {
        throw new Error(`Failed to authenticate: ${error.message}`);
    }
}

export function ImageUpload({
    onFileChange
}: { onFileChange: (filePath: string) => void }) {

    const ikuploadRef = useRef<null>(null);

    const [file, setFile] = useState<{ filePath: string } | null>(null);

    const onError = (error: any) => {
        console.error(error)

        toast({
            title: "File uploaded failed!",
            description: `Failed to upload file. Please try again!`,
            variant: "destructive"
        })
    }

    const onSuccess = (res: any) => {
        setFile(res)
        onFileChange(res.filePath)

        toast({
            title: "File uploaded successfully",
            description: `${res.filePath} uploaded successfully!`,
        })
    }

    const onUpload = (e: FormEvent) => {
        e.preventDefault();

        if (ikuploadRef.current) {
            // @ts-ignore
            ikuploadRef.current?.click();
        }
    }
    return (
        <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >
            <IKUpload
                className="hidden"
                ref={ikuploadRef}
                onError={onError}
                onSuccess={onSuccess}
            />

            <button
                type="button"
                className="upload-btn"
                onClick={onUpload}
            >
                <Image
                    src={'/icons/upload.svg'}
                    alt="Upload"
                    width={24}
                    height={24}
                    className="object-contain"
                />
                <p
                    className="text-base text-lime-100"
                >
                    Upload a File
                </p>

                {
                    file && (
                        <p
                            className="upload-filename"
                        >
                            {file.filePath}
                        </p>
                    )
                }
            </button>

            {
                file && (
                    <IKImage
                        alt={file.filePath}
                        path={file.filePath}
                        width={500}
                        height={300}
                        className=" object-cover "
                    />
                )
            }
        </ImageKitProvider>
    )
}
