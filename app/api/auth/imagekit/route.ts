import { config } from "@/lib/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";

const { publicKey, privateKey, urlEndpoint } = config.env.imagekit;

const imagekit = new ImageKit({
    publicKey,
    urlEndpoint,
    privateKey,
})

export async function GET() {
    return NextResponse.json(imagekit.getAuthenticationParameters());
}