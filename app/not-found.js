import Link from "next/link";

export const metadata = {
    title: "Page not found",
};

export default function NotFound() {
    return (
        <main className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
            <p className="text-6xl font-bold text-accent">404</p>
            <h1 className="mt-4 text-2xl font-semibold tracking-tight">
                Page not found
            </h1>
            <p className="mt-3 text-muted">
                Ye page exist nahi karta ya hata diya gaya hai. Tool dhundhne ke liye
                home pe jao ya <kbd className="rounded border border-border bg-surface px-1.5 py-0.5 text-xs">Ctrl K</kbd> se search karo.
            </p>
            <Link
                href="/"
                className="mt-8 inline-flex h-11 items-center rounded-xl bg-accent px-5 text-sm font-medium text-accent-fg transition hover:opacity-90"
            >
                Back to home
            </Link>
        </main>
    );
}