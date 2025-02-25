import { neon } from "@neondatabase/serverless"
import { config } from "dotenv"
import { drizzle } from "drizzle-orm/neon-http"
import ImageKit from "imagekit"
import dummnyBooks from "../dummybooks.json"
import { books } from "./schema"

config({ path: '.env.local' })

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql })

const imageKit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
})

const seed = async () => {
    console.log('Seeding data')

    try {

        for (const book of dummnyBooks) {
            const coverUrl = (await uploadToImageKit(
                book.coverUrl,
                `${book.title}.jpg`,
                '/books/covers'
            )) as string;

            const videoUrl = (await uploadToImageKit(
                book.videoUrl,
                `${book.title}.mp4`,
                '/books/videos'
            )) as string;

            await db.insert(books).values({
                ...book,
                coverUrl,
                videoUrl
            })
        }

        console.log('Data seeded successfully!')

    } catch (error) {
        console.log('Error seeding data', error)
    }
}

const uploadToImageKit = async (url: string, fileName: string, folder: string) => {
    try {

        const response = await imageKit.upload({
            file: url,
            fileName,
            folder,
        })

        return response.filePath
    } catch (error) {
        console.log(
            'Error uploading image to ImageKit: ', error
        )
    }
}

seed();