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
import * as gtag from "~/utils/gtag";

import { gdprConsent } from "./cookies";

import styles from "./styles/app.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await gdprConsent.parse(cookieHeader)) || {};
  console.log(cookie);
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
        {track ? (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
            />
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
          </>
        ) : (
          <div className="fixed bottom-0 max-w-lg -translate-x-1/2 left-1/2 right-0 rounded-t-md px-8 py-4 bg-gray-100 text-gray-700 shadow-lg z-50 text-center">
            <analyticsFetcher.Form method="post" action="/enable-analytics">
              <span className="mr-8">Wir nutzen Cookies.</span>
              <button
                name="accept-gdpr"
                value="true"
                type="submit"
                className="inline-flex justify-center text-white items-center font-inherit rounded-md py-2 px-4 no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 md:text-lg bg-gray-400"
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
