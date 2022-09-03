import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useCatch, useLoaderData } from "@remix-run/react";
import { useSetupTranslations } from "remix-i18next";
import BasicCatchBoundary from "~/components/BasicCatchBoundary";
import BasicLayout from "~/components/layout/BasicLayout";
import { getMainNav } from "~/utils/contentful";
import type {
  INavigationItem,
  LOCALE_CODE,
} from "../../@types/generated/contentful";

type WrapperLoaderItems = {
  nav: INavigationItem[];
  locale: LOCALE_CODE;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<WrapperLoaderItems> => {
  const locale = (params.locale as LOCALE_CODE) || "de";
  if (!["en", "de", "uk", "ru"].includes(locale)) {
    console.warn("REDIRECTING FROM LOCALE FILE BECAUSE THE LOCALE IS:", locale);
    throw redirect(`/de/${locale}`, 301);
  }

  const navObject = await getMainNav(locale);
  const nav = navObject?.fields?.items;
  if (!nav || nav.length === 0) {
    throw new Response("Could not load navigation", { status: 404 });
  }
  return { nav, locale };
};

export default function Wrapper() {
  const { nav, locale } = useLoaderData();
  useSetupTranslations(locale);

  return (
    <BasicLayout nav={nav} lang={locale}>
      <div>
        <Outlet />
      </div>
    </BasicLayout>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const { nav, locale } = useLoaderData();
  return (
    <BasicLayout nav={nav} lang={locale}>
      <BasicCatchBoundary {...caught} />;
    </BasicLayout>
  );
}
export function ErrorBoundary(error) {
  return (
    <div>
      <BasicCatchBoundary status={503} statusText={error.message} />;
    </div>
  );
}
