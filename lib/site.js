export const SITE = {
    name: "ToolHub",
    tagline: "Find the right tool, fast.",
    description:
        "A hand-curated directory of software and developer tools, organized by category and searchable in seconds.",
    // Deploy ke baad .env.local me apna real domain daalna (neeche testing me bataya hai)
    url: (process.env.NEXT_PUBLIC_SITE_URL || "https://example.com").replace(
        /\/$/,
        ""
    ),
};