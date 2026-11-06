import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";

import {
    getAllTools,
    getToolBySlug,
    getRelatedTools,
} from "@/lib/tools";

import { getCategoryBySlug } from "@/lib/categories";

import ToolLogo from "@/components/ToolLogo";
import Badge from "@/components/Badge";
import CopyLinkButton from "@/components/CopyLinkButton";
import RelatedTools from "@/components/RelatedTools";
import TrackView from "@/components/TrackView";

// Static export configuration
export const dynamicParams = false;

// Generate static pages for all tools
export function generateStaticParams() {
    const tools = getAllTools();

    return tools.map((tool) => ({
        slug: String(tool.slug),
    }));
}

// SEO Metadata
export function generateMetadata({ params }) {
    const tool = getToolBySlug(params.slug);

    if (!tool) {
        return {};
    }

    const category = getCategoryBySlug(tool.category);

    return {
        title: `${tool.name} - ${category?.name || "Tool"}`,
        description: tool.description,
        alternates: {
            canonical: `/tool/${tool.slug}/`,
        },
    };
}

// Tool Detail Page
export default function ToolPage({ params }) {
    const tool = getToolBySlug(params.slug);

    if (!tool) {
        notFound();
    }

    const category = getCategoryBySlug(tool.category);
    const categoryName = category?.name || tool.category;

    // Related tools
    const related = getRelatedTools(tool, 3).map((t) => ({
        ...t,
        categoryName,
    }));

    // Extract website hostname
    let host = tool.website;

    try {
        host = new URL(tool.website).hostname.replace(/^www\./, "");
    } catch {
        // Keep original website value
    }

    return (
        <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">

            {/* Track Tool View */}
            <TrackView slug={tool.slug} />

            {/* Breadcrumb */}
            <nav
                aria-label="Breadcrumb"
                className="mb-8 text-sm text-muted"
            >
                <Link href="/" className="hover:text-fg">
                    Home
                </Link>

                <span className="mx-2">/</span>

                <Link
                    href={`/category/${tool.category}/`}
                    className="hover:text-fg"
                >
                    {categoryName}
                </Link>

                <span className="mx-2">/</span>

                <span className="text-fg">
                    {tool.name}
                </span>
            </nav>

            {/* Tool Details */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

                <ToolLogo name={tool.name} size="lg" />

                <div className="min-w-0 flex-1">

                    {/* Tool Name and Pricing */}
                    <div className="flex flex-wrap items-center gap-3">

                        <h1 className="text-3xl font-bold tracking-tight">
                            {tool.name}
                        </h1>

                        <Badge pricing={tool.pricing} />

                    </div>

                    {/* Category */}
                    <Link
                        href={`/category/${tool.category}/`}
                        className="mt-2 inline-block text-sm text-muted hover:text-accent"
                    >
                        {categoryName}
                    </Link>

                    {/* Description */}
                    <p className="mt-5 text-lg leading-relaxed text-muted">
                        {tool.description}
                    </p>

                    {/* Website and Copy Link */}
                    <div className="mt-7 flex flex-wrap items-center gap-3">

                        <a
                            href={tool.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-medium text-white transition hover:opacity-90"
                        >
                            Visit website
                            <ExternalLink size={16} />
                        </a>

                        <CopyLinkButton />

                        <span className="text-sm text-muted">
                            {host}
                        </span>

                    </div>

                    {/* Tags */}
                    <div className="mt-8">

                        <h2 className="mb-3 text-sm font-medium text-muted">
                            Tags
                        </h2>

                        <div className="flex flex-wrap gap-2">

                            {tool.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-lg bg-surface px-3 py-1 text-sm text-muted"
                                >
                                    #{tag}
                                </span>
                            ))}

                        </div>

                    </div>

                </div>

            </div>

            {/* Related Tools */}
            <RelatedTools
                tools={related}
                categorySlug={tool.category}
                categoryName={categoryName}
            />

        </main>
    );
}