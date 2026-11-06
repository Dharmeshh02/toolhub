import { SITE } from "@/lib/site";
import { getAllTools } from "@/lib/tools";
import { getAllCategories } from "@/lib/categories";

export const dynamic = "force-static";

export default function sitemap() {
    const now = new Date();

    const home = [
        {
            url: `${SITE.url}/`,
            lastModified: now,
            changeFrequency: "weekly",
            priority: 1,
        },
    ];

    const categories = getAllCategories().map((c) => ({
        url: `${SITE.url}/category/${c.slug}/`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.8,
    }));

    const tools = getAllTools().map((t) => ({
        url: `${SITE.url}/tool/${t.slug}/`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
    }));

    return [...home, ...categories, ...tools];
}