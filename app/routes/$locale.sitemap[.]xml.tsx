import { redirect } from "react-router";
import type { Route } from "./+types/$locale.sitemap[.]xml";

// The sitemap was never locale-specific — it always listed every language.
// It now lives at the root, where crawlers and robots.txt expect it.
export function loader(_args: Route.LoaderArgs) {
  throw redirect("/sitemap.xml", 301);
}
