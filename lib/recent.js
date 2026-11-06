// Recently viewed tools ke slugs browser ke localStorage me save hote hain.
// Har jagah try/catch hai, taaki private mode ya blocked storage me site crash na ho.
const KEY = "toolhub:recent";
const MAX = 6;

export function getRecent() {
    try {
        const raw = localStorage.getItem(KEY);
        const list = raw ? JSON.parse(raw) : [];
        return Array.isArray(list) ? list : [];
    } catch {
        return [];
    }
}

export function addRecent(slug) {
    try {
        const next = [slug, ...getRecent().filter((s) => s !== slug)].slice(0, MAX);
        localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
        // storage available nahi, ignore
    }
}

export function clearRecent() {
    try {
        localStorage.removeItem(KEY);
    } catch {
        // ignore
    }
}