import type {
  LinksFunction,
  LoaderFunctionArgs,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSeo } from "~/seo";
import * as gtag from "~/utils/gtag.client";
import BasicCatchBoundary from "./components/BasicErrorBoundary";
import { CookieBanner } from "./components/CookieBanner";
import { gdprConsent } from "./cookies";
import styles from "./styles/app.css?url";

let [seoMeta, seoLinks] = getSeo();

const GA_TRACKING_ID = "GTM-NH6W3MZ";

export const meta: MetaFunction = () => {
  return [
    {
      ...seoMeta,
    },
  ];
};

export const links: LinksFunction = () => {
  return [
    ...seoLinks,
    { rel: "stylesheet", href: styles },
    { rel: "icon", href: "/icon.png", type: "image/png" },
  ];
};

export const Layout = ({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) => {
  let { i18n } = useTranslation();
  return (
    <html lang={locale} dir={i18n.dir()}>
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

export async function loader({ request, params }: LoaderFunctionArgs) {
  let { locale = "de" } = params;
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
  const [shouldTrack, setShouldTrack] = useState(false);

  useEffect(() => {
    setShouldTrack(track);
  }, [track]);

  useEffect(() => {
    if (shouldTrack) {
      gtag.init();
    }
  }, [shouldTrack]);

  useChangeLanguage(locale);

  return (
    <>
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

      {!shouldTrack && <CookieBanner initialOpen={!shouldTrack} />}
      <Outlet />
    </>
  );
}

export function ErrorBoundary() {
  return <BasicCatchBoundary />;
}
