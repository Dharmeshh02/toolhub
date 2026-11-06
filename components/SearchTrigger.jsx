"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export default function SearchTrigger() {
    const [isMac, setIsMac] = useState(false);

    useEffect(() => {
        setIsMac(/mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent));
    }, []);

    return (
        <button
            type="button"
            aria-label="Search"
            onClick={() => window.dispatchEvent(new Event("open-command-palette"))}
            className="inline-flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-2.5 text-sm text-muted transition hover:text-fg sm:px-3"
        >
            <Search size={16} />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] font-medium sm:inline">
                {isMac ? "⌘K" : "Ctrl K"}
            </kbd>
        </button>
    );
}