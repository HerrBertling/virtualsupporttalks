import type {
  LinksFunction,
  LoaderArgs,
  V2_MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useTranslation } from "react-i18next";
import * as gtag from "~/utils/gtag.client";
import { gdprConsent } from "./cookies";
import { useEffect, useState } from "react";
import BasicCatchBoundary from "./components/BasicErrorBoundary";
import styles from "./styles/app.css";
import { CookieBanner } from "./components/CookieBanner";

const GA_TRACKING_ID = "GTM-NH6W3MZ";

export const meta: V2_MetaFunction = () => {
  return [];
};

export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: styles },
    { rel: "icon", href: "/icon.png", type: "image/png" },
  ];
};

export async function loader({ request, params }: LoaderArgs) {
  let { locale } = params;
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

  // useEffect(() => {
  //   if (shouldTrack) {
  //     gtag.pageview(location.pathname);
  //     gtag.conversion();
  //   }
  // }, [location, shouldTrack]);

  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        {shouldTrack && (
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${GA_TRACKING_ID}');`,
            }}
          />
        )}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {!shouldTrack && <CookieBanner initialOpen={!shouldTrack} />}
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
