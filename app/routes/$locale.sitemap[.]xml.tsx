import type { LoaderFunction } from "@remix-run/node";
import { getAllPages } from "~/utils/contentful";

type PageResult = {
  fields: {
    slug: {
      en?: string;
      de?: string;
    };
  };
};

export const loader: LoaderFunction = async () => {
  const allPages = await getAllPages().catch(() => {
    throw new Error();
  });

  const postPages = allPages
    ? allPages.map((page: PageResult) => {
        const resultEn =
          (page.fields.slug.en && [
            `<url>`,
            `<loc>https://www.virtualsupporttalks.de/en/${page.fields.slug.en}</loc>`,
            `</url>`,
          ]) ||
          "";
        const resultDe =
          (page.fields.slug.de && [
            `<url>`,
            `<loc>https://www.virtualsupporttalks.de/de/${page.fields.slug.de}</loc>`,
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
  };

  return new Response(xml.join(""), { headers });
};
