import type { LinksFunction, LoaderFunctionArgs, MetaFunction } from "react-router";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLoaderData } from "react-router";
import { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getSeoMeta, getSeoLinks } from "~/seo";
import * as gtag from "~/utils/gtag.client";
import BasicCatchBoundary from "./components/BasicErrorBoundary";
import { CookieBanner } from "./components/CookieBanner";
import { gdprConsent } from "./cookies";
import styles from "./styles/app.css?url";

const GA_TRACKING_ID = "GTM-NH6W3MZ";

export const meta: MetaFunction = () => {
  const seoMeta = getSeoMeta();
  return [
    { title: seoMeta.title },
    { name: "description", content: seoMeta.description },
    { property: "og:title", content: seoMeta["og:title"] },
    { property: "og:description", content: seoMeta["og:description"] },
    { name: "twitter:title", content: seoMeta["twitter:title"] },
    { name: "twitter:description", content: seoMeta["twitter:description"] },
  ];
};

export const links: LinksFunction = () => {
  const seoLinks = getSeoLinks();
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
  return { locale, track: cookie.gdprConsent };
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

  if (shouldTrack) {
    gtag.init();
  }

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
