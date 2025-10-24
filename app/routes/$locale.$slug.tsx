import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import BasicCatchBoundary from "~/components/BasicErrorBoundary";
import ContentBlocks from "~/components/ContentBlocks";
import { getSeoMeta } from "~/seo";
import { getLatestBlogposts, getPage } from "~/utils/contentful";
import type { IBlogpost, IPage, LOCALE_CODE } from "../../@types/generated/contentful";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
	if (!data?.page) {
		return [
			{
				title: "404 – page not found",
			},
		];
	}
	const { title, seo } = data.page.fields;

	const seoMeta = getSeoMeta({
		title: seo?.fields?.title || title,
		description: seo?.fields?.description || undefined,
	});
	return [
		{
			...seoMeta,
		},
	];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
	const { slug, locale } = params;

	if (!slug) {
		throw new Response("Not Found", { status: 404 });
	}

	const page = await getPage(slug, locale as LOCALE_CODE);

	if (!page) {
		throw new Response("Not Found", { status: 404 });
	}

	const latestPosts = (await getLatestBlogposts((locale || "de") as LOCALE_CODE)) as IBlogpost[];

	return json({ page, locale: locale as LOCALE_CODE, latestPosts });
};

export default function Index() {
	const { page, locale } = useLoaderData<typeof loader>();
	return <ContentBlocks content={page.fields.content} locale={locale} />;
}

export function ErrorBoundary() {
	return <BasicCatchBoundary />;
}
