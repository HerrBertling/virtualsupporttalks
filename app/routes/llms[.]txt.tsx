// Prose, kept as plain text so it can be edited without touching the route.
// Vite inlines `?raw` imports at build time — no filesystem access at runtime.
import secondaryLlms from "~/content/llms.secondary.txt?raw";
import primaryLlms from "~/content/llms.txt?raw";
import { isSecondaryHost } from "~/utils/siteUrl";
import type { Route } from "./+types/llms[.]txt";

export function loader({ request }: Route.LoaderArgs) {
  // The second domain gets a short pointer instead of the full index, so an
  // AI system that lands there cites the primary address.
  const body = isSecondaryHost(request) ? secondaryLlms : primaryLlms;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Netlify-CDN-Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800, durable",
    },
  });
}
