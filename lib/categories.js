import categories from "@/data/categories.json";

export function getAllCategories() {
    return categories;
}

export function getCategoryBySlug(slug) {
    return categories.find((c) => c.slug === slug) || null;
}