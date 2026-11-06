import { Fragment } from "react";

const SECTIONS = [
    { id: "capabilities", title: "High-Level Capabilities", kind: "titled" },
    { id: "helps", title: "What It Helps You Do", kind: "paras" },
    { id: "why", title: (n) => `Why ${n} Is So Widely Used`, kind: "paras" },
    { id: "commands", title: "Core Commands", kind: "code" },
    { id: "workflows", title: "Common Workflows", kind: "titled" },
    { id: "beyond", title: "Beyond the Basics", kind: "table" },
    { id: "tips", title: "Tips for Getting Started", kind: "bullets" },
    { id: "audience", title: "Who It Is Great For", kind: "paras" },
];

const PRICING = {
    free: "Free",
    "open-source": "Open source",
    freemium: "Freemium (free plan plus paid plans)",
    paid: "Paid",
};

const titleOf = (s, name) =>
    typeof s.title === "function" ? s.title(name) : s.title;

// `backtick` ke beech ka text inline code ban jata hai
function Inline({ text }) {
    return text.split("`").map((part, i) =>
        i % 2 ? (
            <code
                key={i}
                className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.85em] text-fg"
            >
                {part}
            </code>
        ) : (
            <span key={i}>{part}</span>
        )
    );
}

function Item({ children }) {
    return (
        <li className="flex gap-3 leading-relaxed text-muted">
            <span className="mt-2.5 h-1.5 w-1.5 shrink-0 bg-accent" />
            <span>{children}</span>
        </li>
    );
}

function Body({ kind, data }) {
    if (kind === "paras") {
        return data.map((p, i) => (
            <p key={i} className="mt-4 leading-relaxed text-muted">
                <Inline text={p} />
            </p>
        ));
    }

    if (kind === "bullets") {
        return (
            <ul className="mt-4 space-y-3">
                {data.map((t, i) => (
                    <Item key={i}>
                        <Inline text={t} />
                    </Item>
                ))}
            </ul>
        );
    }

    if (kind === "titled") {
        return (
            <ul className="mt-4 space-y-3">
                {data.map((x, i) => (
                    <Item key={i}>
                        <strong className="font-semibold text-fg">{x.title}:</strong>{" "}
                        <Inline text={x.text} />
                    </Item>
                ))}
            </ul>
        );
    }

    if (kind === "code") {
        return (
            <div className="mt-4 overflow-x-auto border border-border bg-neutral-900 p-4 font-mono text-xs leading-7 text-neutral-100">
                <div className="grid min-w-max grid-cols-[max-content_1fr] gap-x-8">
                    {data.map((c, i) => (
                        <Fragment key={i}>
                            <span>{c.cmd}</span>
                            <span className="text-neutral-500"># {c.note}</span>
                        </Fragment>
                    ))}
                </div>
            </div>
        );
    }

    if (kind === "table") {
        return (
            <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="border-b border-fg font-mono text-xs uppercase tracking-wider">
                            <th className="py-2 pr-6 font-medium">Feature</th>
                            <th className="py-2 font-medium">Purpose</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((r, i) => (
                            <tr key={i} className="border-b border-border">
                                <td className="whitespace-nowrap py-3 pr-6 align-top font-mono text-xs">
                                    {r.feature}
                                </td>
                                <td className="py-3 text-muted">
                                    <Inline text={r.purpose} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    if (kind === "facts") {
        return (
            <dl className="mt-4 divide-y divide-border border-y border-border text-sm">
                {data.map((r) => (
                    <div key={r.label} className="grid grid-cols-[110px_1fr] gap-4 py-3">
                        <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                            {r.label}
                        </dt>
                        <dd>{r.value}</dd>
                    </div>
                ))}
            </dl>
        );
    }

    return null;
}

export default function ToolArticle({ content, tool, categoryName }) {
    const data = content || {};
    const intro = Array.isArray(data.intro) ? data.intro : [];

    let host = tool.website;
    try {
        host = new URL(tool.website).hostname.replace(/^www\./, "");
    } catch { }

    const facts = [
        { label: "Category", value: categoryName },
        { label: "Pricing", value: PRICING[tool.pricing] || tool.pricing },
        { label: "Website", value: host },
        { label: "Topics", value: tool.tags.map((t) => `#${t}`).join("  ") },
    ];

    // Article ke sections (jo data me hain) + hamesha Quick Facts
    const sections = [
        ...SECTIONS.filter(
            (s) => Array.isArray(data[s.id]) && data[s.id].length > 0
        ).map((s) => ({
            id: s.id,
            title: titleOf(s, tool.name),
            kind: s.kind,
            data: data[s.id],
        })),
        { id: "facts", title: "Quick Facts", kind: "facts", data: facts },
    ];

    const showToc = sections.length > 1;

    return (
        <div
            className={`mt-12 grid gap-10 border-t border-border pt-10 ${showToc ? "lg:grid-cols-[minmax(0,1fr)_200px]" : ""
                }`}
        >
            <article>
                {intro.length > 0 && (
                    <div className="space-y-4 leading-relaxed text-muted">
                        {intro.map((p, i) => (
                            <p key={i}>
                                <Inline text={p} />
                            </p>
                        ))}
                    </div>
                )}

                {sections.map((s, i) => (
                    <section
                        key={s.id}
                        id={s.id}
                        className={`scroll-mt-24 ${i === 0 && intro.length === 0
                            ? ""
                            : "mt-10 border-t border-border pt-8"
                            }`}
                    >
                        <h2 className="flex items-center gap-3 text-xl font-bold tracking-tight">
                            <span className="h-2.5 w-2.5 bg-accent" />
                            {s.title}
                        </h2>
                        <Body kind={s.kind} data={s.data} />
                    </section>
                ))}
            </article>

            {showToc && (
                <aside className="hidden lg:block">
                    <nav aria-label="On this page" className="sticky top-24">
                        <p className="font-mono text-xs uppercase tracking-wider text-muted">
                            On this page
                        </p>
                        <ul className="mt-3 border-l border-border">
                            {sections.map((s) => (
                                <li key={s.id}>
                                    <a
                                        href={`#${s.id}`}
                                        className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-muted transition hover:border-accent hover:text-fg"
                                    >
                                        {s.title}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
            )}
        </div>
    );
}