const LABELS = {
    free: "Free",
    "open-source": "Open Source",
    freemium: "Freemium",
    paid: "Paid",
};

export default function Badge({ pricing }) {
    const label = LABELS[pricing];
    if (!label) return null;

    return (
        <span className="inline-flex shrink-0 items-center rounded-md border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
            {label}
        </span>
    );
}