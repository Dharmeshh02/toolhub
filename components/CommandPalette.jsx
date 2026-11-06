"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { Search } from "lucide-react";
import ToolLogo from "./ToolLogo";

export default function CommandPalette({ tools, categories }) {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
                e.preventDefault();
                setOpen((o) => !o);
            }
        };
        const onOpen = () => setOpen(true);

        window.addEventListener("keydown", onKeyDown);
        window.addEventListener("open-command-palette", onOpen);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("open-command-palette", onOpen);
        };
    }, []);

    const go = (path) => {
        setOpen(false);
        router.push(path);
    };

    const itemCls =
        "flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm data-[selected=true]:bg-surface";
    const groupCls =
        "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted";

    return (
        <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Search tools"
            overlayClassName="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            contentClassName="fixed left-1/2 top-[15%] z-50 w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-border bg-card text-fg shadow-2xl"
        >
            <div className="flex items-center gap-3 border-b border-border px-4">
                <Search size={18} className="shrink-0 text-muted" />
                <Command.Input
                    placeholder="Search tools, tags or categories..."
                    className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted"
                />
            </div>

            <Command.List className="max-h-80 overflow-y-auto p-2">
                <Command.Empty className="py-10 text-center text-sm text-muted">
                    No results found.
                </Command.Empty>

                <Command.Group heading="Tools" className={groupCls}>
                    {tools.map((t) => (
                        <Command.Item
                            key={t.slug}
                            value={t.name}
                            keywords={[...t.tags, t.categoryName]}
                            onSelect={() => go(`/tool/${t.slug}/`)}
                            className={itemCls}
                        >
                            <ToolLogo name={t.name} size="sm" />
                            <span className="font-medium">{t.name}</span>
                            <span className="ml-auto text-xs text-muted">
                                {t.categoryName}
                            </span>
                        </Command.Item>
                    ))}
                </Command.Group>

                <Command.Group heading="Categories" className={groupCls}>
                    {categories.map((c) => (
                        <Command.Item
                            key={c.slug}
                            value={`${c.name} category`}
                            onSelect={() => go(`/category/${c.slug}/`)}
                            className={itemCls}
                        >
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface text-muted">
                                #
                            </span>
                            <span className="font-medium">{c.name}</span>
                        </Command.Item>
                    ))}
                </Command.Group>
            </Command.List>

            <div className="flex items-center gap-4 border-t border-border px-4 py-2.5 text-xs text-muted">
                <span>↑↓ navigate</span>
                <span>Enter open</span>
                <span>Esc close</span>
            </div>
        </Command.Dialog>
    );
}