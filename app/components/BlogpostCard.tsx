import { useTranslation } from "react-i18next";
import type { IBlogpost, LOCALE_CODE } from "../../@types/generated/contentful";
import CleverLink from "./CleverLink";
import TagGroup from "./TagGroup";

export default function BlogpostCard({
  post,
  locale,
}: {
  post: IBlogpost;
  locale: LOCALE_CODE;
}) {
  const { title, slug, tagList, description, mainImage } = post.fields;
  const image = mainImage?.fields?.file?.url;
  const dateObj = new Date(post.sys.createdAt);
  const date = dateObj.toLocaleString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const { t } = useTranslation("blogpostCard");

  return (
    <div
      key={post.sys.id}
      className="group grid grid-cols-1 content-start gap-2 no-underline"
    >
      {Boolean(image) ? (
        <CleverLink to={slug}>
          <img
            src={image}
            className="h-auto max-h-40 w-full rounded-lg object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
          />
        </CleverLink>
      ) : (
        <CleverLink
          to={slug}
          className={`h-40 max-h-40 w-full rounded-lg bg-vsp-500 bg-contain bg-center bg-no-repeat object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100`}
        >
          &nbsp;
        </CleverLink>
      )}
      <CleverLink to={slug}>
        <h3 className="font-headline text-xl font-bold group-hover:text-vsp-500">
          {title}
        </h3>
      </CleverLink>
      <aside
        className={`flex items-center gap-4 ${
          Boolean(tagList) ? "justify-between" : "justify-end"
        }`}
      >
        {Boolean(tagList) && <TagGroup tags={tagList} locale={locale} />}
        <time
          dateTime={post.sys.createdAt}
          className="text-xs italic text-gray-400"
        >
          {date}
        </time>
      </aside>
      <p>{description}</p>
      <CleverLink to={slug} className="block underline">
        {t("ctaToBlogpost")}
      </CleverLink>
    </div>
  );
}
