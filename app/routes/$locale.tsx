import type {
  INavigationItem,
  LOCALE_CODE,
} from "../../@types/generated/contentful";
import { LoaderFunction, useCatch } from "remix";
import { Outlet, useLoaderData, redirect } from "remix";
import { getMainNav } from "~/utils/contentful";
import BasicLayout from "~/components/layout/BasicLayout";

type WrapperLoaderItems = {
  nav: INavigationItem[];
  locale: LOCALE_CODE;
};

export const loader: LoaderFunction = async ({
  params,
}): Promise<WrapperLoaderItems> => {
  const locale = (params.locale as LOCALE_CODE) || "de";
  if (!["en", "de"].includes(locale)) {
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
      <div className="mt-32 container mx-auto">
        <h2>Oh noez! We failed.</h2>
        <p>
          {caught.status}: {caught.statusText}
        </p>
      </div>
    </BasicLayout>
  );
}
export function ErrorBoundary(error) {
  return (
    <div>
      <h2>Oh noez! Something went wrong.</h2>
      <p>{error.message}</p>
    </div>
  );
}
