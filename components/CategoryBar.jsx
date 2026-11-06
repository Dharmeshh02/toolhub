"use client";

export default function CategoryBar({ categories, counts, total, active, onChange }) {
    const chip = (isActive) =>
        `shrink-0 rounded-full border px-3.5 py-1.5 font-mono text-xs uppercase tracking-wide transition ${isActive
            ? "border-accent bg-accent text-accent-fg"
            : "border-border bg-card text-muted hover:border-fg hover:text-fg"
        }`;
    return (
        <div
            id="categories"
            className="sticky top-16 z-30 scroll-mt-16 border-b border-border bg-bg/80 backdrop-blur"
        >
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex gap-2 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                    <button
                        type="button"
                        onClick={() => onChange("all")}
                        aria-pressed={active === "all"}
                        className={chip(active === "all")}
                    >
                        All <span className="opacity-70">{total}</span>
                    </button>

                    {categories.map((c) => (
                        <button
                            key={c.slug}
                            type="button"
                            onClick={() => onChange(c.slug)}
                            aria-pressed={active === c.slug}
                            className={chip(active === c.slug)}
                        >
                            {c.name}{" "}
                            <span className="opacity-70">{counts[c.slug] || 0}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}