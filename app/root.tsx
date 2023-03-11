import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getSeo } from "~/seo";
import * as gtag from "~/utils/gtag.client";
import BasicCatchBoundary from "./components/BasicCatchBoundary";
import { gdprConsent } from "./cookies";
import styles from "./styles/app.css";

let [seoMeta, seoLinks] = getSeo();

export const links: LinksFunction = () => {
  return [
    ...seoLinks,
    { rel: "stylesheet", href: styles },
    { rel: "icon", href: "/icon.png", type: "image/png" },
  ];
};

export const meta: MetaFunction = () => {
  return { ...seoMeta };
};

const GA_TRACKING_ID = "GTM-NH6W3MZ";

export const loader: LoaderFunction = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await gdprConsent.parse(cookieHeader)) || {};
  return json({
    track: cookie.gdprConsent,
    GA_TRACKING_ID,
  });
};

export default function App() {
  const { track, GA_TRACKING_ID } = useLoaderData();
  const analyticsFetcher = useFetcher();
  const location = useLocation();
  const [shouldTrack, setShouldTrack] = useState(track);

  useEffect(() => {
    setShouldTrack(track);
  }, [track]);

  useEffect(() => {
    if (shouldTrack) {
      gtag.init();
    }
  }, [shouldTrack]);

  useEffect(() => {
    if (shouldTrack) {
      gtag.pageview(location.pathname);
      gtag.conversion();
    }
  }, [location, shouldTrack]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <script
          async
          id="gtag-init"
          dangerouslySetInnerHTML={{
            __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
          }}
        />
      </head>
      <body>
        {!shouldTrack && (
          <div className="fixed bottom-0 right-4 z-50 w-full rounded-t-md bg-vsp-100 px-8 py-4 text-center text-slate-700 shadow-xl md:max-w-lg">
            <analyticsFetcher.Form method="post" action="/enable-analytics">
              <span className="mr-8">Wir nutzen Cookies.</span>
              <button
                name="accept-gdpr"
                value="true"
                type="submit"
                className="font-inherit inline-flex items-center justify-center rounded-md bg-slate-400 py-2 px-4 text-white no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 md:text-lg"
              >
                Akzeptieren
              </button>
            </analyticsFetcher.Form>
          </div>
        )}
        {process.env.NODE_ENV === "development" || !GA_TRACKING_ID ? null : (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
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
        <BasicCatchBoundary {...caught} />
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
        <BasicCatchBoundary status={503} statusText={error.message} />;
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
