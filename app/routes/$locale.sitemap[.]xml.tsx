import { getAllPages } from "~/utils/contentful";
import type { Route } from "./+types/$locale.sitemap[.]xml";

export async function loader(_args: Route.LoaderArgs) {
  const allPages = await getAllPages().catch(() => {
    throw new Error();
  });

  const postPages = allPages
    ? allPages.map((page) => {
        const slug = page.fields.slug as unknown as Record<string, string | undefined>;
        const resultEn =
          (slug.en && [
            `<url>`,
            `<loc>https://www.virtualsupporttalks.de/en/${slug.en}</loc>`,
            `</url>`,
          ]) ||
          "";
        const resultDe =
          (slug.de && [
            `<url>`,
            `<loc>https://www.virtualsupporttalks.de/de/${slug.de}</loc>`,
            `</url>`,
          ]) ||
          "";
        return [...resultEn, ...resultDe].join("");
      })
    : [];

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    `<url>`,
    `<loc>https://www.virtualsupporttalks.de</loc>`,
    `</url>`,
    ...postPages,
    `</urlset>`,
  ];

  const headers: HeadersInit = {
    "Content-Type": "application/xml; charset=utf-8",
    "x-content-type-options": "nosniff",
    "Cache-Control": "public, max-age=3600, s-maxage=86400",
  };

  return new Response(xml.join(""), { headers });
}
