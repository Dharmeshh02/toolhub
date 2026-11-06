import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import ToolArticle from "@/components/ToolArticle";
import ToolImage from "@/components/ToolImage";
import { getToolContent } from "@/lib/content";
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

// Required for static export
export const dynamicParams = false;

// Generate all tool pages during build
export async function generateStaticParams() {
    const tools = getAllTools();

    return tools.map((tool) => ({
        slug: String(tool.slug),
    }));
}

// SEO Metadata
export async function generateMetadata({ params }) {
    const { slug } = await params;

    const tool = getToolBySlug(slug);

    if (!tool) return {};

    const category = getCategoryBySlug(tool.category);

    return {
        title: `${tool.name} - ${category?.name || "Tool"}`,
        description: tool.description,
        alternates: {
            canonical: `/tool/${tool.slug}/`,
        },
    };
}

export default async function ToolPage({ params }) {
    const { slug } = await params;

    const tool = getToolBySlug(slug);

    if (!tool) {
        notFound();
    }

    const category = getCategoryBySlug(tool.category);
    const categoryName = category?.name || tool.category;

    const related = getRelatedTools(tool, 3).map((t) => ({
        ...t,
        categoryName,
    }));

    let host = tool.website;

    try {
        host = new URL(tool.website).hostname.replace(/^www\./, "");
    } catch {
        // Keep original website value
    }

    const pageUrl = `${SITE.url}/tool/${tool.slug}/`;
    const content = getToolContent(tool.slug);

    const softwareLd = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: tool.name,
        description: tool.description,
        url: pageUrl,
        sameAs: tool.website,
        applicationCategory: categoryName,
        keywords: tool.tags.join(", "),
        ...(tool.pricing !== "paid" && {
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }),
    };

    const breadcrumbLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE.url}/` },
            {
                "@type": "ListItem",
                position: 2,
                name: categoryName,
                item: `${SITE.url}/category/${tool.category}/`,
            },
            { "@type": "ListItem", position: 3, name: tool.name, item: pageUrl },
        ],
    };

    return (
        <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
            <JsonLd data={softwareLd} />
            <JsonLd data={breadcrumbLd} />
            <TrackView slug={tool.slug} />

            <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
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

                <span className="text-fg">{tool.name}</span>
            </nav>

            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                <ToolLogo name={tool.name} size="lg" />

                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-3xl font-bold tracking-tight">
                            {tool.name}
                        </h1>

                        <Badge pricing={tool.pricing} />
                    </div>

                    <Link
                        href={`/category/${tool.category}/`}
                        className="mt-2 inline-block text-sm text-muted hover:text-accent"
                    >
                        {categoryName}
                    </Link>

                    <p className="mt-5 text-lg leading-relaxed text-muted">
                        {tool.description}
                    </p>

                    <div className="mt-7 flex flex-wrap items-center gap-3">
                        <a
                            href={tool.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex h-11 items-center gap-2 rounded-xl bg-accent px-5 text-sm font-medium text-accent-fg transition hover:opacity-90"
                        >
                            Visit website
                            <ExternalLink size={16} />
                        </a>

                        <CopyLinkButton />

                        <span className="text-sm text-muted">{host}</span>
                    </div>

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

            <div className="mt-10 overflow-hidden border border-border">
                <ToolImage
                    name={tool.name}
                    slug={tool.slug}
                    className="h-52"
                    imgClass="h-24 w-24"
                />
            </div>

            <ToolArticle
                content={content}
                tool={tool}
                categoryName={categoryName}
            />
            <RelatedTools
                tools={related}
                categorySlug={tool.category}
                categoryName={categoryName}
            />
        </main>
    );
}