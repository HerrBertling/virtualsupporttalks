// The site is served under two domains. www.virtualsupporttalks.de is the one
// Google should index; www.redezeitfuerdich.de is a second address that serves
// the exact same pages. Without a canonical pointing at one origin, search
// engines see two full copies of the site and split its ranking between them.
export const CANONICAL_ORIGIN = "https://www.virtualsupporttalks.de";

const SECONDARY_ORIGIN = "https://www.redezeitfuerdich.de";

const SECONDARY_HOSTS = new Set(["redezeitfuerdich.de", "www.redezeitfuerdich.de"]);

/** Absolute URL on the canonical origin, whichever host served the request. */
export function canonicalUrl(pathname: string): string {
  return `${CANONICAL_ORIGIN}${normalize(pathname)}`;
}

export function isSecondaryHost(request: Request): boolean {
  return SECONDARY_HOSTS.has(new URL(request.url).hostname.toLowerCase());
}

/**
 * Origin to use in robots.txt and sitemap.xml. These two files describe the
 * host that serves them, so the second domain has to advertise its own URLs —
 * that is how Google discovers its pages and follows them to the canonical.
 */
export function requestOrigin(request: Request): string {
  return isSecondaryHost(request) ? SECONDARY_ORIGIN : CANONICAL_ORIGIN;
}

// Keeps "/de/" and "/de" from being two different canonicals. The root path
// stays "/" because an empty href would resolve to the current URL.
function normalize(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}
