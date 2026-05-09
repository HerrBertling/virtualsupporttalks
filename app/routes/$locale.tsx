import { Outlet, redirect } from "react-router";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BasicLayout from "~/components/layout/BasicLayout";
import { getMainNav } from "~/utils/contentful";
import { assertSupportedLocale, availableLocales } from "~/utils/locales";
import type { INavigationItem, LOCALE_CODE } from "../../types/contentful";
import type { Route } from "./+types/$locale";

export async function loader({ params, request }: Route.LoaderArgs) {
  const locale = params.locale;
  // Treat anything shaped like a locale code (two letters, optional region) as
  // a typo and redirect to /de/<locale>. Everything else falls through to the
  // shared validator, which returns 418 to scanners and 404 to humans.
  if (locale && !availableLocales.includes(locale as LOCALE_CODE)) {
    if (/^[a-z]{2}(-[a-z]{2})?$/i.test(locale)) {
      throw redirect(`/de/${locale}`, 301);
    }
  }
  assertSupportedLocale(locale, request);

  const navObject = await getMainNav(locale);
  const rawNav = navObject?.fields?.items;
  if (!rawNav || rawNav.length === 0) {
    throw new Response("Could not load navigation", { status: 404 });
  }

  // Filter out undefined items
  const nav = rawNav.filter((item): item is NonNullable<typeof item> => item !== undefined);

  return { nav, locale };
}

export default function Wrapper({ loaderData }: Route.ComponentProps) {
  const { nav, locale } = loaderData;

  return (
    <BasicLayout nav={nav as INavigationItem[]} lang={locale}>
      <div>
        <Outlet />
      </div>
    </BasicLayout>
  );
}

export function shouldRevalidate({ currentParams, nextParams }: { currentParams: Record<string, string>; nextParams: Record<string, string> }) {
  return currentParams.locale !== nextParams.locale;
}

export function ErrorBoundary() {
  return <BasicCatchBoundary />;
}
