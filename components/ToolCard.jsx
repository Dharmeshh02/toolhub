"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import ToolLogo from "./ToolLogo";
import ToolImage from "./ToolImage";
import Badge from "./Badge";

export default function ToolCard({ tool, view = "grid" }) {
    const href = `/tool/${tool.slug}/`;

    if (view === "list") {
        return (
            <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
            >
                <Link
                    href={href}
                    className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 shadow-card transition duration-200 hover:border-accent/40 hover:shadow-cardHover"
                >
                    <ToolLogo name={tool.name} slug={tool.slug} />
                    <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                            <h3 className="truncate font-semibold">{tool.name}</h3>
                            <Badge pricing={tool.pricing} />
                        </div>
                        <p className="mt-0.5 truncate text-sm text-muted">
                            {tool.description}
                        </p>
                    </div>
                    <span className="hidden text-xs text-muted sm:block">
                        {tool.categoryName}
                    </span>
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            className="h-full"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
        >
            <Link
                href={href}
                className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-cardHover"
            >
                <div className="border-b border-border">
                    <ToolImage
                        name={tool.name}
                        slug={tool.slug}
                        className="h-36"
                        imgClass="h-14 w-14"
                    />
                </div>

                <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="font-semibold">{tool.name}</h3>
                        <Badge pricing={tool.pricing} />
                    </div>
                    <p className="text-xs text-muted">{tool.categoryName}</p>

                    <p className="mt-2 line-clamp-2 text-sm text-muted">
                        {tool.description}
                    </p>

                    <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
                        {tool.tags.slice(0, 2).map((tag) => (
                            <span
                                key={tag}
                                className="rounded-md bg-surface px-2 py-0.5 text-xs text-muted"
                            >
                                #{tag}
                            </span>
                        ))}
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}