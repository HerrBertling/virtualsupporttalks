import { type ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { LinksFunction, MetaFunction } from "react-router";
import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";
import { useChangeLanguage } from "remix-i18next/react";
import { getSeo } from "~/seo";
import * as gtag from "~/utils/gtag.client";
import type { Route } from "./+types/root";
import Brevo from "./brevo";
import BasicCatchBoundary from "./components/BasicErrorBoundary";
import { CookieBanner } from "./components/CookieBanner";
import { gdprConsent } from "./cookies";
import { getLocale, i18nextMiddleware } from "./middleware/i18next";
import styles from "./styles/app.css?url";

const [seoMeta] = getSeo();

const GA_TRACKING_ID = import.meta.env.VITE_GTM_ID || "GTM-NH6W3MZ";

export const middleware = [i18nextMiddleware];

export const meta: MetaFunction = () => {
  return [
    {
      ...seoMeta,
    },
  ];
};

export const links: LinksFunction = () => {
  return [
    { rel: "preload", href: "/fonts/Poppins-Regular.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
    { rel: "preload", href: "/fonts/Roboto-Regular.woff2", as: "font", type: "font/woff2", crossOrigin: "anonymous" },
    { rel: "stylesheet", href: styles },
    { rel: "icon", href: "/icon.png", type: "image/png" },
  ];
};

export const Layout = ({ children }: { children: ReactNode }) => {
  const { i18n } = useTranslation();
  return (
    <html lang={i18n.language} dir={i18n.dir()}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="utf-8" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
};

export async function loader({ request, context }: Route.LoaderArgs) {
  const locale = getLocale(context as Parameters<typeof getLocale>[0]);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await gdprConsent.parse(cookieHeader)) || {};
  return { locale, track: cookie.gdprConsent };
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { locale, track } = loaderData;
  const [shouldTrack, setShouldTrack] = useState(false);

  useChangeLanguage(locale);

  useEffect(() => {
    setShouldTrack(track);
  }, [track]);

  useEffect(() => {
    if (shouldTrack) {
      gtag.init();
    }
  }, [shouldTrack]);

  return (
    <>
      {shouldTrack && (
        <>
          <script
            // biome-ignore lint/security/noDangerouslySetInnerHtml: GTM requires inline script injection
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','${GA_TRACKING_ID}');`,
            }}
          />
          <Brevo />
        </>
      )}

      {!shouldTrack && <CookieBanner initialOpen={!shouldTrack} />}

      <Outlet />
    </>
  );
}

export function ErrorBoundary() {
  return <BasicCatchBoundary />;
}
