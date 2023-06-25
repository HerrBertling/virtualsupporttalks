import type { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useLocation,
} from "@remix-run/react";
import { useTranslation } from "react-i18next";
import * as gtag from "~/utils/gtag.client";
import { getSeo } from "~/seo";
import { gdprConsent } from "./cookies";
import { useEffect, useState } from "react";
import BasicCatchBoundary from "./components/BasicErrorBoundary";
import styles from "./styles/app.css";
import { getCurrentLocale } from "./utils/locales";
import { CookieBanner } from "./components/CookieBanner";
import GtmScript from "./components/GtmScript";

let [seoMeta, seoLinks] = getSeo();

const GA_TRACKING_ID = "GTM-NH6W3MZ";

export const meta: MetaFunction = () => {
  return {
    ...seoMeta,
    charset: "utf-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

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
  return json({ locale, track: cookie.gdprConsent });
}

export function useChangeLanguage(locale: string) {
  let { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);
}

export default function App() {
  let { locale, track } = useLoaderData<typeof loader>();
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
        {shouldTrack && <GtmScript />}
        <Meta />
        <Links />
      </head>
      <body>
        {!shouldTrack ? (
          <CookieBanner initialOpen={!shouldTrack} />
        ) : (
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
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <BasicCatchBoundary />
        ;
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
