import {
  json,
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useFetcher,
  useLoaderData,
} from "remix";
import type { LinksFunction, MetaFunction } from "remix";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import * as gtag from "~/utils/gtag.client";

import { getSeo } from "~/seo";
let [seoMeta, seoLinks] = getSeo();

import { gdprConsent } from "./cookies";

import styles from "./styles/app.css";

export const links: LinksFunction = () => {
  return [...seoLinks, { rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => {
  return { ...seoMeta };
};

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await gdprConsent.parse(cookieHeader)) || {};
  return json({ track: cookie.gdprConsent });
};

export default function App() {
  const { track } = useLoaderData();
  const analyticsFetcher = useFetcher();
  const location = useLocation();

  useEffect(() => {
    if (track) {
      gtag.pageview(location.pathname);
    }
  }, [location]);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        {track ? (
          <script
            async
            id="gtag-init"
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        ) : (
          <div className="fixed bottom-0 right-4 z-50 w-full rounded-t-md bg-vsp-100 px-8 py-4 text-center text-gray-700 shadow-xl md:max-w-lg">
            <analyticsFetcher.Form method="post" action="/enable-analytics">
              <span className="mr-8">Wir nutzen Cookies.</span>
              <button
                name="accept-gdpr"
                value="true"
                type="submit"
                className="font-inherit inline-flex items-center justify-center rounded-md bg-gray-400 py-2 px-4 text-white no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 md:text-lg"
              >
                Akzeptieren
              </button>
            </analyticsFetcher.Form>
          </div>
        )}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>
          {caught.status} {caught.statusText}
        </h1>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Oh noez!</h1>
        <pre>
          <code>{error}</code>
        </pre>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
