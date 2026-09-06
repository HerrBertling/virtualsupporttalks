import { isSecondaryHost, requestOrigin } from "~/utils/siteUrl";
import type { Route } from "./+types/robots[.]txt";

// Technical endpoints that should never show up in a search result.
const DISALLOW = [
  "/api/",
  "/enable-analytics",
  "/de/admin/",
  "/en/admin/",
  "/ru/admin/",
  "/uk/admin/",
  "/brevo-frame.html",
];

export function loader({ request }: Route.LoaderArgs) {
  const origin = requestOrigin(request);

  // Crawling stays allowed on the second domain on purpose: Google has to keep
  // fetching those URLs to see the canonical pointing at the primary domain.
  // A "Disallow: /" there would hide exactly the signal we want it to read.
  const preamble = isSecondaryHost(request)
    ? [
        "# www.redezeitfuerdich.de is a second address for the same site.",
        "# Every page here declares a canonical on www.virtualsupporttalks.de.",
      ]
    : ["# www.virtualsupporttalks.de"];

  const body = [
    ...preamble,
    "",
    "User-agent: *",
    "Allow: /",
    "",
    ...DISALLOW.map((path) => `Disallow: ${path}`),
    "",
    `Sitemap: ${origin}/sitemap.xml`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Netlify-CDN-Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800, durable",
    },
  });
}
