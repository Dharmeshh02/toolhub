import fs from "node:fs/promises";
import path from "node:path";
import * as icons from "simple-icons";

const ROOT = process.cwd();
const TOOLS_FILE = path.join(ROOT, "data", "tools.json");
const LOGOS_FILE = path.join(ROOT, "data", "logos.json");
const OUT_DIR = path.join(ROOT, "public", "logos");
const FORCE = process.argv.includes("--force");

const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]/g, "");

// Auto-match na ho to yahan jodo:  "tool-slug": "simple-icons me us brand ka naam"
const ALIASES = {
    chatgpt: "OpenAI",
    "lm-studio": "LM Studio",
};

// simple-icons ke saare icons ko naam/slug se dhundne ke liye map
const byKey = new Map();
for (const icon of Object.values(icons)) {
    if (icon && typeof icon === "object" && icon.title && icon.path && icon.hex) {
        byKey.set(norm(icon.title), icon);
        byKey.set(norm(icon.slug), icon);
    }
}

function findIcon(tool) {
    const keys = [ALIASES[tool.slug], tool.name, tool.slug]
        .filter(Boolean)
        .map(norm);
    for (const k of keys) if (byKey.has(k)) return byKey.get(k);
    return null;
}

const iconToSvg = (icon) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="#${icon.hex}" d="${icon.path}"/></svg>`;

const TYPES = ["image/png", "image/jpeg", "image/webp", "image/svg+xml"];

async function getImage(url) {
    try {
        const res = await fetch(url, { signal: AbortSignal.timeout(10000) });
        if (!res.ok) return null;
        const type = (res.headers.get("content-type") || "").split(";")[0].trim();
        if (!TYPES.includes(type)) return null;
        const buf = Buffer.from(await res.arrayBuffer());
        return buf.length > 300 ? { buf, type } : null;
    } catch {
        return null;
    }
}

// PNG/JPG ko SVG ke andar daal dete hain, taaki har logo ka path /logos/<slug>.svg hi rahe
const wrap = ({ buf, type }) =>
    type === "image/svg+xml"
        ? buf.toString("utf8")
        : `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><image href="data:${type};base64,${buf.toString("base64")}" width="100" height="100" preserveAspectRatio="xMidYMid meet"/></svg>`;

async function fromWebsite(website) {
    let host;
    try {
        host = new URL(website).hostname;
    } catch {
        return null;
    }
    return (
        (await getImage(`https://${host}/apple-touch-icon.png`)) ||
        (await getImage(`https://www.google.com/s2/favicons?domain=${host}&sz=128`))
    );
}

const exists = (f) => fs.access(f).then(() => true, () => false);

async function main() {
    const tools = JSON.parse(await fs.readFile(TOOLS_FILE, "utf8"));
    await fs.mkdir(OUT_DIR, { recursive: true });

    const have = [];
    const missing = [];
    const stats = { existing: 0, "simple-icons": 0, website: 0 };

    for (const tool of tools) {
        const file = path.join(OUT_DIR, `${tool.slug}.svg`);

        // Pehle se file hai (ya aapne khud rakhi hai) to wahi use hogi
        if (!FORCE && (await exists(file))) {
            have.push(tool.slug);
            stats.existing++;
            continue;
        }

        let svg = null;
        let source = "";

        const icon = findIcon(tool);
        if (icon) {
            svg = iconToSvg(icon);
            source = "simple-icons";
        } else {
            const img = await fromWebsite(tool.website);
            if (img) {
                svg = wrap(img);
                source = "website";
            }
        }

        if (!svg) {
            missing.push(tool.slug);
            console.log(`MISS  ${tool.slug}`);
            continue;
        }

        await fs.writeFile(file, svg);
        have.push(tool.slug);
        stats[source]++;
        console.log(`OK    ${tool.slug}  (${source})`);
    }

    await fs.writeFile(LOGOS_FILE, JSON.stringify(have, null, 2) + "\n");

    console.log("\n--- Summary ---");
    console.log(`Total tools     : ${tools.length}`);
    console.log(`Logo mila       : ${have.length}`);
    console.log(`  simple-icons  : ${stats["simple-icons"]}`);
    console.log(`  website icon  : ${stats.website}`);
    console.log(`  pehle se tha  : ${stats.existing}`);
    console.log(`Logo nahi mila  : ${missing.length}`);
    if (missing.length) console.log(`  ${missing.join(", ")}`);
}

main();