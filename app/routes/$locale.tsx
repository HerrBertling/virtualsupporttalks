import { Outlet, redirect } from "react-router";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import BasicLayout from "~/components/layout/BasicLayout";
import { getMainNav } from "~/utils/contentful";
import { availableLocales } from "~/utils/locales";
import type { INavigationItem, LOCALE_CODE } from "../../types/contentful";
import type { Route } from "./+types/$locale";

export async function loader({ params }: Route.LoaderArgs) {
  const locale = (params.locale as LOCALE_CODE) || "de";
  if (!availableLocales.includes(locale)) {
    console.warn("REDIRECTING FROM LOCALE FILE BECAUSE THE LOCALE IS:", locale);
    throw redirect(`/de/${locale}`, 301);
  }

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
    <BasicLayout nav={nav as INavigationItem[]} lang={locale as LOCALE_CODE}>
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
