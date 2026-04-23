import { timingSafeEqual } from "node:crypto";
import type { Route } from "./+types/api.revalidate";

type ContentfulSysLink = { sys: { id: string } };
type ContentfulWebhookPayload = {
  sys?: {
    id?: string;
    contentType?: ContentfulSysLink;
  };
};

const NO_STORE = {
  "Cache-Control": "private, no-store",
  "Netlify-CDN-Cache-Control": "private, no-store",
};

export function loader() {
  return new Response("Method not allowed", { status: 405, headers: NO_STORE });
}

export async function action({ request }: Route.ActionArgs) {
  if (request.method !== "POST") {
    return new Response("Method not allowed", { status: 405, headers: NO_STORE });
  }

  const secret = process.env.CONTENTFUL_WEBHOOK_SECRET;
  const siteId = process.env.NETLIFY_SITE_ID;
  const token = process.env.NETLIFY_PURGE_TOKEN;

  if (!secret || !siteId || !token) {
    return new Response("Purge endpoint not configured", {
      status: 500,
      headers: NO_STORE,
    });
  }

  const given = Buffer.from(request.headers.get("X-Webhook-Secret") ?? "");
  const expected = Buffer.from(secret);
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) {
    return new Response("Unauthorized", { status: 401, headers: NO_STORE });
  }

  const payload = (await request.json().catch(() => null)) as ContentfulWebhookPayload | null;
  const entryId = payload?.sys?.id;
  const contentType = payload?.sys?.contentType?.sys?.id;

  if (!entryId) {
    return new Response("Payload missing sys.id", { status: 400, headers: NO_STORE });
  }

  const tags = [`entry:${entryId}`];
  if (contentType) {
    tags.push(`collection:${contentType}`);
    if (contentType === "navigation") {
      tags.push("nav:de", "nav:en", "nav:ru", "nav:uk");
    }
  }

  const purgeResponse = await fetch("https://api.netlify.com/api/v1/purge", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ site_id: siteId, cache_tags: tags }),
  });

  if (!purgeResponse.ok) {
    const detail = await purgeResponse.text().catch(() => "");
    console.error("Netlify purge failed", purgeResponse.status, detail);
    return new Response("Purge failed", { status: 502, headers: NO_STORE });
  }

  return new Response(JSON.stringify({ purged: tags }), {
    status: 200,
    headers: { "Content-Type": "application/json", ...NO_STORE },
  });
}
