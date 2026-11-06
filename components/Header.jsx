import Link from "next/link";
import { SITE } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";
import SearchTrigger from "./SearchTrigger";

export default function Header() {
    return (
        <header className="sticky top-0 z-40 border-b border-border bg-bg/80 backdrop-blur">
            <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                <Link href="/" className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center bg-accent font-mono text-sm font-bold text-accent-fg">
                        T
                    </span>
                    <span className="font-mono text-sm font-bold uppercase tracking-wider">
                        {SITE.name}
                    </span>
                </Link>

                <nav className="flex items-center gap-1 sm:gap-2">
                    <Link
                        href="/"
                        className="px-3 py-2 font-mono text-xs uppercase tracking-wider text-muted transition hover:text-fg"
                    >
                        Tools
                    </Link>
                    <Link
                        href="/#categories"
                        className="px-3 py-2 font-mono text-xs uppercase tracking-wider text-muted transition hover:text-fg"
                    >
                        Categories
                    </Link>
                    <SearchTrigger />
                    <ThemeToggle />
                </nav>
            </div>
        </header>
    );
}