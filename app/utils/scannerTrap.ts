// Vulnerability scanners constantly probe public sites for leaked secrets and
// admin panels. We don't run any of those, so when we see a probe we return
// HTTP 418 instead of the usual 404.
const SCANNER_PATH_PATTERNS: RegExp[] = [
  /(^|\/)(phpinfo|info|php|i|phpi|phptest|server-info|infophp|php_info|test|config)\.php(\/|$)/i,
  /(^|\/)xmlrpc\.php(\/|$)/i,
  /(^|\/)\.env(\.[\w~]+|~)?(\/|$)/i,
  /(^|\/)%2Eenv(\/|$)/i,
  /(^|\/)\.%65nv(\/|$)/i,
  /(^|\/)\.git\//i,
  /(^|\/)wp-(content|admin|login|includes)([./]|$)/i,
  /(^|\/)actuator(\/|$)/i,
  /(^|\/)_ignition\//i,
  /(^|\/)debug\/(pprof|vars)(\/|$)/i,
  /(^|\/)_layouts\//i,
  /(^|\/)appsettings(\.\w+)?\.json(\/|$)/i,
  /(^|\/)web\.config(\/|$)/i,
  /(^|\/)(swagger|openapi)\.json(\/|$)/i,
];

const SCANNER_QUERY_PATTERNS: RegExp[] = [
  /=phpinfo\(\)/i,
  // SSRF probes targeting AWS IMDS
  /\b(url|redirect|path|webhook|fetch|dest|target|proxy)=https?:\/\/169\.254\./i,
];

export function isScannerProbe(request: Request): boolean {
  const url = new URL(request.url);
  if (SCANNER_PATH_PATTERNS.some((re) => re.test(url.pathname))) return true;
  if (url.search && SCANNER_QUERY_PATTERNS.some((re) => re.test(url.search))) return true;
  return false;
}

export function teapotResponse(): Response {
  return new Response("I'm a teapot. \u{1FAD6}\nThis server brews tea, not vulnerabilities.\n", {
    status: 418,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      // Same body for every scanner probe — pin it on Netlify's durable edge
      // cache for 30 days so repeat hits never wake the function.
      "Cache-Control": "public, max-age=86400, immutable",
      "Netlify-CDN-Cache-Control": "public, s-maxage=2592000, immutable, durable",
    },
  });
}
