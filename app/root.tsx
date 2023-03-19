import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetcher,
  useLoaderData,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import { useTranslation } from "react-i18next";
import * as gtag from "~/utils/gtag.client";
import { getSeo } from "~/seo";
import { gdprConsent } from "./cookies";
import { useEffect, useState } from "react";
import BasicCatchBoundary from "./components/BasicErrorBoundary";
import styles from "./styles/app.css";
import { getCurrentLocale } from "./utils/locales";

let [seoMeta, seoLinks] = getSeo();

const GA_TRACKING_ID = "GTM-NH6W3MZ";

export const meta: MetaFunction = () => seoMeta;

export const links: LinksFunction = () => {
  return [
    ...seoLinks,
    { rel: "stylesheet", href: styles },
    { rel: "icon", href: "/icon.png", type: "image/png" },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  let locale = await getCurrentLocale(url.pathname);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await gdprConsent.parse(cookieHeader)) || {};
  return json({ locale, track: cookie.gdprConsent, GA_TRACKING_ID });
}

export function useChangeLanguage(locale: string) {
  let { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);
}

export default function App() {
  let { locale, track, GA_TRACKING_ID } = useLoaderData<typeof loader>();
  const analyticsFetcher = useFetcher();
  const location = useLocation();
  const [shouldTrack, setShouldTrack] = useState(track);
  let { i18n } = useTranslation();

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

  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
        {shouldTrack && GA_TRACKING_ID && (
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
        )}
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
        {shouldTrack && (
          <noscript>
            <iframe
              title="gtm"
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            ></iframe>
          </noscript>
        )}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <BasicCatchBoundary
            status={error.status}
            statusText={error.statusText}
          />
          ;
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  } else if (error instanceof Error) {
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
  } else {
    return <h1>Unknown Error</h1>;
  }
}
