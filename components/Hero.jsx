export default function Hero({ total, categoryCount, children }) {
    return (
        <section className="border-b border-border">
            <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-end">
                <div>
                    <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted">
                        <span className="h-2.5 w-2.5 bg-accent" />
                        Directory / {total} tools / {categoryCount} categories
                    </p>

                    <h1 className="mt-6 text-5xl font-bold leading-[0.95] tracking-tighter sm:text-7xl">
                        Find the right tool<span className="text-accent">.</span>
                        <br />
                        Fast<span className="text-accent">.</span>
                    </h1>
                </div>

                <div>
                    <p className="mb-5 max-w-md text-base text-muted">
                        A hand-curated shelf of software and developer tools. Search by
                        name, tag or category.
                    </p>
                    {children}
                </div>
            </div>
        </section>
    );
}