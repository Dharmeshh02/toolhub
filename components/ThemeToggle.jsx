"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
    const { resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    const isDark = mounted && resolvedTheme === "dark";

    return (
        <button
            type="button"
            aria-label="Toggle theme"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted transition hover:text-fg"
        >
            {mounted ? (
                isDark ? <Sun size={18} /> : <Moon size={18} />
            ) : (
                <span className="block h-[18px] w-[18px]" />
            )}
        </button>
    );
}