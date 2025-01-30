
const Page = () => {
    return (
        <main
            className="root-container flex min-h-screen flex-col items-center justify-center gap-4"
        >
            <h2
                className="font-bebas-neue text-5xl font-bold text-light-100"
            >
                Whoa, Slow Down There Partner!
            </h2>
            <p
                className="max-w-xl text-center text-light-100"
            >
                Looks like you're trying to access this page too quickly. Please wait a moment and try again.
            </p>
        </main>
    )
}

export default Page
