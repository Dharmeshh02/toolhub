import fs from "node:fs";
import path from "node:path";

let cache = null;

function load() {
    if (cache) return cache;
    cache = {};

    const dir = path.join(process.cwd(), "data", "content");
    let files = [];
    try {
        files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    } catch {
        return cache; // folder nahi hai to koi article nahi
    }

    for (const f of files) {
        try {
            Object.assign(cache, JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")));
        } catch (e) {
            console.warn(`content: ${f} padh nahi paaya (${e.message})`);
        }
    }
    return cache;
}

export function getToolContent(slug) {
    return load()[slug] || null;
}