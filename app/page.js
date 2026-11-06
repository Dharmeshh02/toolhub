import { getAllTools } from "@/lib/tools";
import { getAllCategories } from "@/lib/categories";
import { SITE } from "@/lib/site";
import DirectoryClient from "@/components/DirectoryClient";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  const categories = getAllCategories();
  const names = Object.fromEntries(categories.map((c) => [c.slug, c.name]));

  // Har tool me categoryName jod rahe hain, taaki card aur search me kaam aaye
  const tools = getAllTools().map((t) => ({
    ...t,
    categoryName: names[t.category] || t.category,
  }));

  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: `${SITE.url}/`,
    description: SITE.description,
  };

  return (
    <>
      <JsonLd data={websiteLd} />
      <DirectoryClient tools={tools} categories={categories} />
    </>
  );
}