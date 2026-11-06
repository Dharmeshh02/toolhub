import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ToolCard from "./ToolCard";

export default function RelatedTools({ tools, categorySlug, categoryName }) {
    if (!tools.length) return null;

    return (
        <section className="mt-14">
            <div className="mb-4 flex items-end justify-between gap-4">
                <h2 className="text-xl font-semibold tracking-tight">
                    More in {categoryName}
                </h2>
                <Link
                    href={`/category/${categorySlug}/`}
                    className="inline-flex shrink-0 items-center gap-1 font-mono text-xs uppercase tracking-wider text-fg hover:underline"
                >
                    View all <ArrowRight size={14} />
                </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {tools.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} view="grid" />
                ))}
            </div>
        </section>
    );
}