import tools from "@/data/tools.json";

export function getAllTools() {
    return tools;
}

export function getToolBySlug(slug) {
    return tools.find((tool) => tool.slug === slug) || null;
}

export function getToolsByCategory(categorySlug) {
    return tools.filter((tool) => tool.category === categorySlug);
}

export function getRelatedTools(currentTool, limit = 3) {
    return tools
        .filter(
            (tool) =>
                tool.slug !== currentTool.slug &&
                tool.category === currentTool.category
        )
        .slice(0, limit);
}