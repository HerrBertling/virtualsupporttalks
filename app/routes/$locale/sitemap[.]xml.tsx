import { type LoaderFunction } from "remix";
import formatDate from "date-fns/format";

import { getAllDePages, getAllEnPages } from "~/utils/contentful";

export const loader: LoaderFunction = async ({ params, request }) => {
  const searchParams = new URL(request.url).searchParams;
  const locale = "de";
  const lang = searchParams.get("lang") || "en";

  const encoding = request.headers.get("accept-encoding") ?? "";
  const allEnPages = await getAllEnPages().catch(() => {
    throw new Error();
  });
  const allDePages = await getAllDePages().catch(() => {
    throw new Error();
  });
  const allPages = [...allDePages, ...allEnPages];
  allPages.forEach((el, index) => console.log("PAGES", index, el));
  const postPages =
    allPages &&
    allPages.map((page) => {
      return [
        `<url>`,

        `<loc>https://www.virtualsupporttalks.de/${
          page.sys.locale === "en" ? "en/" : ""
        }${page.fields.slug}</loc>`,
        `</url>`,
      ].join("");
    });

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...postPages,
    `</urlset>`,
  ];

  const headers: HeadersInit = {
    "Content-Type": "application/xml; charset=utf-8",
    "x-content-type-options": "nosniff",
  };

  return new Response(xml.join(""), { headers });
};
