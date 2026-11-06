"use client";

import { useState } from "react";
import { getToolColor } from "@/lib/colors";
import LOGOS from "@/data/logos.json";

const HAS_LOGO = new Set(LOGOS);

const SIZES = {
    sm: "h-8 w-8 text-sm rounded-lg",
    md: "h-11 w-11 text-lg rounded-xl",
    lg: "h-16 w-16 text-2xl rounded-2xl",
};

const PAD = { sm: "p-1", md: "p-1.5", lg: "p-2.5" };

export default function ToolLogo({ name, slug, size = "md" }) {
    const [failed, setFailed] = useState(false);

    if (slug && HAS_LOGO.has(slug) && !failed) {
        return (
            <span
                aria-hidden="true"
                className={`inline-flex shrink-0 items-center justify-center overflow-hidden border border-border bg-white ${SIZES[size]} ${PAD[size]}`}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={`/logos/${slug}.svg`}
                    alt=""
                    loading="lazy"
                    onError={() => setFailed(true)}
                    className="h-full w-full object-contain"
                />
            </span>
        );
    }

    const initial = (name || "?").trim().charAt(0).toUpperCase();

    return (
        <span
            aria-hidden="true"
            className={`inline-flex shrink-0 items-center justify-center font-semibold ${SIZES[size]} ${getToolColor(name)}`}
        >
            {initial}
        </span>
    );
}