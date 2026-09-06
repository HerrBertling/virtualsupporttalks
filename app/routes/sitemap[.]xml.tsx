import { getAllBlogposts, getAllPages } from "~/utils/contentful";
import { availableLocales } from "~/utils/locales";
import pageIds from "~/utils/pageIds";
import { requestOrigin } from "~/utils/siteUrl";
import type { Route } from "./+types/sitemap[.]xml";

/** A Contentful entry fetched with `withAllLocales`: every field is keyed by locale. */
type LocalizedEntry = {
  sys: { id: string; updatedAt: string };
  fields: { slug?: Record<string, string | undefined> };
};

type SitemapEntry = { path: string; lastmod: string };

export async function loader({ request }: Route.LoaderArgs) {
  const origin = requestOrigin(request);

  const [pages, posts] = await Promise.all([
    getAllPages() as Promise<LocalizedEntry[] | null>,
    getAllBlogposts() as Promise<LocalizedEntry[] | null>,
  ]);

  const entries = [
    ...homepageEntries(pages ?? []),
    ...contentEntries(pages ?? [], (locale, slug) => `/${locale}/${slug}`, isStartpage),
    ...blogIndexEntries(posts ?? []),
    ...contentEntries(posts ?? [], (locale, slug) => `/${locale}/blog/${slug}`),
  ];

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...entries.map(
      ({ path, lastmod }) =>
        `<url><loc>${escapeXml(`${origin}${encodeURI(path)}`)}</loc><lastmod>${lastmod}</lastmod></url>`
    ),
    `</urlset>`,
  ].join("");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Netlify-CDN-Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800, durable",
      "Cache-Tag": "collection:page,collection:blogpost",
    },
  });
}

const isStartpage = (entry: LocalizedEntry) => entry.sys.id === pageIds.STARTPAGE;

/**
 * `/de`, `/en`, … are served by $locale._index from the startpage entry, whose
 * own localized slugs are placeholders ("en", "ru", "uk") and must not be used
 * to build URLs.
 */
function homepageEntries(pages: LocalizedEntry[]): SitemapEntry[] {
  const startpage = pages.find(isStartpage);
  if (!startpage) return [];
  return availableLocales.map((locale) => ({
    path: `/${locale}`,
    lastmod: day(startpage.sys.updatedAt),
  }));
}

/** One URL per locale in which the entry actually has a slug. */
function contentEntries(
  entries: LocalizedEntry[],
  toPath: (locale: string, slug: string) => string,
  skip: (entry: LocalizedEntry) => boolean = () => false
): SitemapEntry[] {
  return entries.flatMap((entry) => {
    if (skip(entry)) return [];
    return availableLocales.flatMap((locale) => {
      const slug = entry.fields.slug?.[locale];
      if (!slug) return [];
      return [{ path: toPath(locale, slug), lastmod: day(entry.sys.updatedAt) }];
    });
  });
}

/** Only list a blog index for locales that actually have posts translated. */
function blogIndexEntries(posts: LocalizedEntry[]): SitemapEntry[] {
  return availableLocales.flatMap((locale) => {
    const localized = posts.filter((post) => post.fields.slug?.[locale]);
    if (localized.length === 0) return [];
    const newest = localized.reduce((a, b) => (a.sys.updatedAt > b.sys.updatedAt ? a : b));
    return [{ path: `/${locale}/blog`, lastmod: day(newest.sys.updatedAt) }];
  });
}

const day = (isoTimestamp: string) => isoTimestamp.slice(0, 10);

const escapeXml = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
