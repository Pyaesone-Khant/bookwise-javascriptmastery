'use client'

import { toast } from "@/hooks/use-toast";
import { config } from "@/lib/config";
import { cn } from "@/lib/utils";
import { IKImage, IKUpload, IKVideo, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";
import { FormEvent, useRef, useState } from "react";
import { Progress } from "./ui/progress";

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

interface Props {
    type: 'image' | 'video'
    accept: string
    placeholder: string
    folder: string
    variant: 'dark' | 'light'
    onFileChange: (filePath: string) => void
    value?: string
}

export function FileUpload({
    type,
    accept,
    placeholder,
    folder,
    variant,
    onFileChange,
    value
}: Props) {

    const ikUploadRef = useRef<null>(null);

    const [file, setFile] = useState<{ filePath: string | null } | null>({ filePath: value ?? null });
    const [progress, setProgress] = useState<number>(0);
    const [isUploading, setIsUploading] = useState<boolean>(false)

    const styles = {
        button: variant === 'dark' ? 'bg-dark-300' : 'bg-light-600 border-gray-100 border',
        placeholder: variant === 'dark' ? 'text-light-100' : 'text-slate-500',
        text: variant === 'dark' ? 'text-light-100' : 'text-dark-400'
    }

    const onError = (error: any) => {
        console.error(error)

        toast({
            title: `${type} uploaded failed!`,
            description: `Failed to upload ${type}. Please try again!`,
            variant: "destructive"
        })
    }

    const onSuccess = (res: any) => {

        setFile(res)
        onFileChange(res.filePath)
        setIsUploading(false);

        toast({
            title: `${type} uploaded successfully`,
            description: `${res.filePath} uploaded successfully!`,
        })
    }

    const onValidate = (file: File): boolean => {
        if (type === "image") {
            if (file.size > 10 * 1024 * 1024) {
                toast({
                    title: `Your file size is too large!`,
                    description: `Please upload a file that is less than 10MB in size!`,
                    variant: 'destructive'
                })
                return false;
            }
        }

        if (type === "video") {
            if (file.size > 50 * 1024 * 1024) {
                toast({
                    title: `Your file size is too large!`,
                    description: `Please upload a file that is less than 50MB in size!`,
                    variant: 'destructive'
                })
                return false;
            }
        }
        return true;
    }

    const onUpload = (e: FormEvent) => {
        e.preventDefault();
        if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
        }
    }


    return (
        <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >
            <IKUpload
                ref={ikUploadRef}
                onError={onError}
                className="hidden"
                onSuccess={onSuccess}
                useUniqueFileName={true}
                validateFile={onValidate}
                onUploadStart={() => {
                    setIsUploading(true)
                    setProgress(0)
                }}
                onUploadProgress={({ loaded, total }) => {
                    const percent = Math.round((loaded / total) * 100);
                    setProgress(percent);
                }}
                folder={folder}
                accept={accept}
            />

            <button
                type="button"
                className={cn("upload-btn", styles.button)}
                onClick={onUpload}
            >
                <Image
                    src={'/icons/upload.svg'}
                    alt="Upload"
                    width={24}
                    height={24}
                    className="object-contain"
                />


                {
                    file ? (
                        <p
                            className="upload-filename text-ellipsis text-wrap "
                        >
                            {file.filePath}
                        </p>
                    ) : (
                        <p
                            className={cn("text-base", styles.placeholder)}
                        >
                            {placeholder}
                        </p>
                    )
                }

            </button>
            {
                (progress > 0 && isUploading) && (
                    <Progress
                        value={progress}
                        className="[&>div]:bg-green-500"
                    />
                )
            }

            {
                file && (
                    type === 'image' ? (
                        <IKImage
                            alt={file.filePath ?? 'Image'}
                            path={file.filePath ?? ''}
                            width={500}
                            height={300}
                            className="object-cover rounded-md"
                        />

                    ) : type === 'video' ? (
                        <IKVideo
                            path={file.filePath ?? ''}
                            controls
                            className="w-full aspect-video rounded-md "
                        />
                    ) : null
                )
            }
        </ImageKitProvider>
    )
}
