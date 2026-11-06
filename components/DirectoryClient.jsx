"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Fuse from "fuse.js";
import { Search, X, LayoutGrid, List, ArrowRight } from "lucide-react";
import Hero from "./Hero";
import CategoryBar from "./CategoryBar";
import ToolCard from "./ToolCard";
import RecentlyViewed from "./RecentlyViewed";
// Har section me maximum kitne tools dikhane hain
const SECTION_LIMIT = 6;

export default function DirectoryClient({ tools, categories }) {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("default");
    const [view, setView] = useState("grid");

    const fuse = useMemo(
        () =>
            new Fuse(tools, {
                keys: [
                    { name: "name", weight: 0.5 },
                    { name: "tags", weight: 0.25 },
                    { name: "description", weight: 0.15 },
                    { name: "categoryName", weight: 0.1 },
                ],
                threshold: 0.35,
                ignoreLocation: true,
            }),
        [tools]
    );

    // Pehle search, uske upar category filter
    const searched = useMemo(() => {
        const q = query.trim();
        return q ? fuse.search(q).map((r) => r.item) : tools;
    }, [query, fuse, tools]);

    // Category chips ke counts search ke hisaab se badalte hain
    const counts = useMemo(() => {
        const map = {};
        for (const t of searched) map[t.category] = (map[t.category] || 0) + 1;
        return map;
    }, [searched]);

    const results = useMemo(() => {
        let list =
            category === "all"
                ? searched
                : searched.filter((t) => t.category === category);

        if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        if (sort === "za") list = [...list].sort((a, b) => b.name.localeCompare(a.name));
        return list;
    }, [searched, category, sort]);

    // NAYA: "All" me category-wise sections
    const groups = useMemo(() => {
        if (category !== "all") return [];
        return categories
            .map((c) => ({
                slug: c.slug,
                name: c.name,
                total: tools.filter((t) => t.category === c.slug).length,
                items: results.filter((t) => t.category === c.slug),
            }))
            .filter((g) => g.items.length > 0);
    }, [category, categories, tools, results]);

    const clearAll = () => {
        setQuery("");
        setCategory("all");
    };

    const toggleBtn = (active) =>
        `inline-flex h-9 w-9 items-center justify-center transition ${active ? "bg-surface text-fg" : "text-muted hover:text-fg"
        }`;

    // NAYA: grid/list ki class ek jagah, sections aur flat view dono me use hoti hai
    const gridCls =
        view === "grid"
            ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            : "flex flex-col gap-3";

    return (
        <>
            <Hero total={tools.length} categoryCount={categories.length}>
                <div className="relative mx-auto max-w-xl">
                    <Search
                        size={18}
                        className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
                    />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search tools, tags or categories..."
                        aria-label="Search tools"
                        className="h-12 w-full rounded-xl border border-border bg-card pl-11 pr-11 text-base shadow-sm outline-none transition placeholder:text-muted focus:border-accent"
                    />
                    {query && (
                        <button
                            type="button"
                            aria-label="Clear search"
                            onClick={() => setQuery("")}
                            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted hover:text-fg"
                        >
                            <X size={16} />
                        </button>
                    )}
                </div>
            </Hero>
            <RecentlyViewed tools={tools} />
            <CategoryBar
                categories={categories}
                counts={counts}
                total={searched.length}
                active={category}
                onChange={setCategory}
            />

            <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-muted">
                        Showing {results.length} of {tools.length} tools
                    </p>

                    <div className="flex items-center gap-2">
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                            aria-label="Sort tools"
                            className="h-9 rounded-lg border border-border bg-card px-3 text-sm outline-none focus:border-accent"
                        >
                            <option value="default">Default</option>
                            <option value="az">A to Z</option>
                            <option value="za">Z to A</option>
                        </select>

                        <div className="flex overflow-hidden rounded-lg border border-border bg-card">
                            <button
                                type="button"
                                aria-label="Grid view"
                                aria-pressed={view === "grid"}
                                onClick={() => setView("grid")}
                                className={toggleBtn(view === "grid")}
                            >
                                <LayoutGrid size={16} />
                            </button>
                            <button
                                type="button"
                                aria-label="List view"
                                aria-pressed={view === "list"}
                                onClick={() => setView("list")}
                                className={toggleBtn(view === "list")}
                            >
                                <List size={16} />
                            </button>
                        </div>
                    </div>
                </div>

                {results.length === 0 ? (
                    <div className="rounded-xl border border-dashed border-border py-16 text-center">
                        <p className="font-medium">No tools match that search.</p>
                        <p className="mt-1 text-sm text-muted">
                            Try a different keyword or clear the filters.
                        </p>
                        <button
                            type="button"
                            onClick={clearAll}
                            className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-accent-fg"
                        >
                            Clear filters
                        </button>
                    </div>
                ) : category === "all" ? (
                    // NAYA: category-wise sections
                    <div className="space-y-12">
                        {groups.map((g) => (
                            <section key={g.slug}>
                                <div className="mb-4 flex items-end justify-between gap-4">
                                    <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight">
                                        <span className="h-2.5 w-2.5 bg-accent" />
                                        {g.name}
                                    </h2>
                                    <Link
                                        href={`/category/${g.slug}/`}
                                        className="inline-flex shrink-0 items-center gap-1 font-mono text-xs uppercase tracking-wider text-fg hover:underline"
                                    >
                                        View all ({g.total}) <ArrowRight size={14} />
                                    </Link>
                                </div>

                                <div className={gridCls}>
                                    {g.items.slice(0, SECTION_LIMIT).map((tool) => (
                                        <ToolCard key={tool.slug} tool={tool} view={view} />
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                ) : (
                    <div className={gridCls}>
                        {results.map((tool) => (
                            <ToolCard key={tool.slug} tool={tool} view={view} />
                        ))}
                    </div>
                )}
            </main>
        </>
    );
}