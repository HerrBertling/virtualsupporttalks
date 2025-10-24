import { useTranslation } from "react-i18next";
import type { IBlogpost, IBlogpostFields, LOCALE_CODE } from "../../@types/generated/contentful";
import CleverLink from "./CleverLink";
import TagGroup from "./TagGroup";

export default function BlogpostCard({
	post,
	locale,
	showTags = true,
}: {
	post: IBlogpost;
	locale: LOCALE_CODE;
	showTags?: boolean;
}) {
	const { title, slug, tagList, description, mainImage } = post.fields as IBlogpostFields;
	const image = ((mainImage as any)?.fields?.file?.url as string) || null;
	const dateObj = new Date(post.sys.createdAt);
	const date = dateObj.toLocaleString(locale, {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	});
	const { t } = useTranslation("blogpostCard");

	return (
		<div key={post.sys.id} className="group grid grid-cols-1 content-start gap-2 no-underline">
			{image ? (
				<CleverLink to={`/${locale}/blog/${slug}`}>
					<img
						src={image}
						className="h-auto max-h-40 w-full rounded-lg object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
						alt={title as string}
					/>
				</CleverLink>
			) : (
				<CleverLink
					to={`/${locale}/blog/${slug}`}
					className={`h-40 max-h-40 w-full rounded-lg bg-vsp-500 bg-contain bg-center bg-no-repeat object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
				>
					&nbsp;
				</CleverLink>
			)}
			<CleverLink to={`/${locale}/blog/${slug}`}>
				<h3 className="font-headline text-xl font-bold group-hover:text-vsp-500">
					{title as string}
				</h3>
			</CleverLink>
			<aside
				className={`flex flex-wrap items-center gap-4 ${
					tagList ? "justify-between" : "justify-end"
				}`}
			>
				{Boolean(tagList) && showTags && <TagGroup tags={tagList as any} locale={locale} />}
				<time dateTime={post.sys.createdAt} className="text-xs italic text-slate-400">
					{date}
				</time>
			</aside>
			<p>{description as string}</p>
			<CleverLink to={`/${locale}/blog/${slug}`} className="block underline">
				{t("ctaToBlogpost")}
			</CleverLink>
		</div>
	);
}
