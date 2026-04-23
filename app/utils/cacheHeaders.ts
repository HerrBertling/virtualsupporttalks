const BROWSER_CACHE = "public, max-age=0, must-revalidate";
const CDN_CACHE = "public, s-maxage=3600, stale-while-revalidate=604800, durable";

export function publicCacheHeaders(loaderHeaders: Headers) {
  const tag = loaderHeaders.get("Cache-Tag");
  return {
    "Cache-Control": BROWSER_CACHE,
    "Netlify-CDN-Cache-Control": CDN_CACHE,
    ...(tag ? { "Cache-Tag": tag } : {}),
  };
}
