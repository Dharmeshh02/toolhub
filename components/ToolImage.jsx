"use client";

import { useState } from "react";
import { getToolColor } from "@/lib/colors";
import LOGOS from "@/data/logos.json";

const HAS_LOGO = new Set(LOGOS);

export default function ToolImage({
    name,
    slug,
    className = "h-36",
    imgClass = "h-16 w-16",
}) {
    const [failed, setFailed] = useState(false);
    const show = slug && HAS_LOGO.has(slug) && !failed;

    return (
        <div className={`flex items-center justify-center bg-white ${className}`}>
            {show ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={`/logos/${slug}.svg`}
                    alt={`${name} logo`}
                    loading="lazy"
                    onError={() => setFailed(true)}
                    className={`object-contain ${imgClass}`}
                />
            ) : (
                <span
                    aria-hidden="true"
                    className={`flex items-center justify-center text-3xl font-bold ${getToolColor(name)} ${imgClass}`}
                >
                    {(name || "?").trim().charAt(0).toUpperCase()}
                </span>
            )}
        </div>
    );
}