import type {
  INavigationItem,
  IPage,
  LOCALE_CODE,
} from "../../@types/generated/contentful";
import { ActionFunction, json, LoaderFunction, MetaFunction } from "remix";
import { Form, useLoaderData, useSubmit } from "remix";
import { getMainNav, getPageById } from "~/utils/contentful";
import ContentBlocks from "~/components/ContentBlocks";
import pageIds from "~/utils/pageIds";
import { gdprConsent } from "../cookies";

import { getSeoMeta } from "~/seo";
import BasicLayout from "~/components/layout/BasicLayout";
import ToggleInput from "~/components/ToggleInput";
import { FormEvent } from "react";

export const meta: MetaFunction = ({ data }) => {
  const { title, seo } = data?.page?.fields;

  let seoMeta = getSeoMeta({
    title: seo?.fields?.title || title,
    description: seo?.fields?.description || null,
  });
  return {
    ...seoMeta,
  };
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await gdprConsent.parse(cookieHeader)) || {};

  if (formData.get("accept-gdpr") === "true") {
    cookie.gdprConsent = true;
  }

  if (formData.get("accept-gdpr") === "false") {
    cookie.gdprConsent = false;
  }

  return json(
    { success: true },
    {
      headers: {
        "Set-Cookie": await gdprConsent.serialize(cookie),
      },
    }
  );
};

export const loader: LoaderFunction = async ({ request }) => {
  const locale = "de";
  const pageRequest = getPageById(pageIds.DATA_PRIVACY, locale);
  const navigationRequest = getMainNav(locale);
  const cookieHeader = request.headers.get("Cookie");
  const cookie = (await gdprConsent.parse(cookieHeader)) || {};

  const [page, navigation] = await Promise.all([
    pageRequest,
    navigationRequest,
  ]);

  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }
  if (!navigation?.fields?.items) {
    throw new Response("Could not load navigation", { status: 404 });
  }

  return {
    page,
    locale,
    navigationItems: navigation.fields.items,
    track: cookie.gdprConsent,
  };
};

type PageProps = {
  locale: LOCALE_CODE;
  page: IPage;
  track: boolean;
  navigationItems: INavigationItem[];
};

export default function PrivacyDe() {
  const {
    page: {
      fields: { content },
    },
    locale,
    track,
    navigationItems,
  }: PageProps = useLoaderData();
  const submit = useSubmit();

  const handleChange = (event: FormEvent<HTMLFormElement>) => {
    submit(event.currentTarget.form, { replace: true });
  };

  return (
    <BasicLayout nav={navigationItems} lang={locale}>
      <ContentBlocks content={content} locale={locale} />
      <div className="mx-auto w-screen max-w-3xl px-4 pt-24 pb-12">
        <Form method="post" onChange={handleChange}>
          <ToggleInput name="accept-gdpr" checked={track} />
        </Form>
      </div>
    </BasicLayout>
  );
}
