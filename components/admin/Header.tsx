import { Session } from "next-auth"

export function Header({ session }: { session: Session }) {

    const { user } = session ?? {}

    return (
        <header
            className="admin-header"
        >
            <div>
                <h2
                    className="text-2xl font-semibold text-dark-400"
                >
                    {user?.name}
                </h2>
                <p
                    className="text-base text-slate-500"
                >
                    Monitor all of your users & all books from here!
                </p>
            </div>

            <p>
                Search
            </p>
        </header>
    )
}
