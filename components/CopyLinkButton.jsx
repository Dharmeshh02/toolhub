"use client";

import { useState } from "react";
import { Check, Link2 } from "lucide-react";

export default function CopyLinkButton() {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            // clipboard allowed nahi hai to chup-chaap ignore
        }
    };

    return (
        <button
            type="button"
            onClick={copy}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-border bg-card px-4 text-sm font-medium transition hover:border-accent/50"
        >
            {copied ? <Check size={16} className="text-accent" /> : <Link2 size={16} />}
            {copied ? "Link copied" : "Copy link"}
        </button>
    );
}