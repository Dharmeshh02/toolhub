import "./globals.css";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { SITE } from "@/lib/site";
import { getAllTools } from "@/lib/tools";
import { getAllCategories } from "@/lib/categories";
import ThemeProvider from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} - ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: `${SITE.name} - ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: { card: "summary" },
}; 

export default function RootLayout({ children }) {
  const categories = getAllCategories();
  const names = Object.fromEntries(categories.map((c) => [c.slug, c.name]));

  // Palette ko sirf zaroori fields bhej rahe hain
  const paletteTools = getAllTools().map((t) => ({
    slug: t.slug,
    name: t.name,
    tags: t.tags,
    categoryName: names[t.category] || t.category,
  }));
  const paletteCategories = categories.map((c) => ({
    slug: c.slug,
    name: c.name,
  }));

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${grotesk.variable} ${mono.variable}`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <ThemeProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
          <CommandPalette tools={paletteTools} categories={paletteCategories} />
        </ThemeProvider>
      </body>
    </html>
  );
}