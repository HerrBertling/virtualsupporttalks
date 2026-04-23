import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { isbot } from "isbot";
import type { RenderToPipeableStreamOptions } from "react-dom/server";
import { renderToPipeableStream } from "react-dom/server";
import { I18nextProvider } from "react-i18next";
import type { EntryContext, RouterContextProvider } from "react-router";
import { ServerRouter } from "react-router";
import { getInstance } from "./middleware/i18next";

export const streamTimeout = 5_000;

export function handleDataRequest(response: Response, { request }: { request: Request }) {
  if (request.method !== "GET") return response;
  const isPrefetch =
    request.headers.get("Purpose") === "prefetch" ||
    request.headers.get("X-Purpose") === "prefetch" ||
    request.headers.get("Sec-Purpose") === "prefetch" ||
    request.headers.get("Sec-Fetch-Purpose") === "prefetch" ||
    request.headers.get("X-Moz") === "prefetch";
  if (isPrefetch) {
    response.headers.set("Cache-Control", "private, max-age=10");
  }
  return response;
}

export default async function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  entryContext: EntryContext,
  routerContext: RouterContextProvider
) {
  let i18n: import("i18next").i18n;
  try {
    i18n = getInstance(routerContext);
  } catch {
    const { createInstance } = await import("i18next");
    i18n = createInstance();
    await i18n.init({ lng: "de", resources: {} });
  }

  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const userAgent = request.headers.get("user-agent");

    const readyOption: keyof RenderToPipeableStreamOptions =
      (userAgent && isbot(userAgent)) || entryContext.isSpaMode ? "onAllReady" : "onShellReady";

    const { pipe, abort } = renderToPipeableStream(
      <I18nextProvider i18n={i18n}>
        <ServerRouter context={entryContext} url={request.url} />
      </I18nextProvider>,
      {
        [readyOption]() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);

          responseHeaders.set("Content-Type", "text/html");

          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode,
            })
          );

          pipe(body);
        },
        onShellError(error: unknown) {
          reject(error);
        },
        onError(error: unknown) {
          responseStatusCode = 500;
          if (shellRendered) console.error(error);
        },
      }
    );

    setTimeout(abort, streamTimeout + 1000);
  });
}
