"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ToolLogo from "./ToolLogo";
import { getRecent, clearRecent } from "@/lib/recent";

export default function RecentlyViewed({ tools }) {
    const [slugs, setSlugs] = useState([]);

    // localStorage sirf browser me milta hai, isliye useEffect me padhte hain
    useEffect(() => {
        setSlugs(getRecent());
    }, []);

    const bySlug = Object.fromEntries(tools.map((t) => [t.slug, t]));
    const items = slugs.map((s) => bySlug[s]).filter(Boolean);

    if (items.length === 0) return null;

    const handleClear = () => {
        clearRecent();
        setSlugs([]);
    };

    return (
        <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6">
            <div className="mb-3 flex items-center justify-between">
                <h2 className="text-sm font-medium text-muted">Recently viewed</h2>
                <button
                    type="button"
                    onClick={handleClear}
                    className="text-sm text-muted transition hover:text-fg"
                >
                    Clear
                </button>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {items.map((t) => (
                    <Link
                        key={t.slug}
                        href={`/tool/${t.slug}/`}
                        className="flex shrink-0 items-center gap-2.5 rounded-xl border border-border bg-card py-2 pl-2 pr-4 text-sm font-medium transition hover:border-accent/50"
                    >
                        <ToolLogo name={t.name} size="sm" />
                        {t.name}
                    </Link>
                ))}
            </div>
        </section>
    );
}