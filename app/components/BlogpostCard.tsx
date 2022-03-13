import { IBlogpost, LOCALE_CODE } from "../../@types/generated/contentful";
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
  return (
    <div
      key={post.sys.id}
      className="group grid grid-cols-1 content-start gap-2 no-underline"
    >
      {Boolean(image) ? (
        <CleverLink to={slug}>
          <img
            src={image}
            className="opacity-80 group-hover:opacity-100 transition-opacity duration-300 object-cover rounded-lg h-auto w-full max-h-40"
          />
        </CleverLink>
      ) : (
        <CleverLink
          to={slug}
          className={`opacity-80 group-hover:opacity-100 transition-opacity duration-300 object-cover rounded-lg h-40 w-full max-h-40 bg-contain bg-vsp-500 bg-no-repeat bg-center`}
        >
          &nbsp;
        </CleverLink>
      )}
      <CleverLink to={slug}>
        <h3 className="text-xl font-headline font-bold group-hover:text-vsp-500">
          {title}
        </h3>
      </CleverLink>
      <aside
        className={`flex gap-4 items-center ${
          Boolean(tagList) ? "justify-between" : "justify-end"
        }`}
      >
        {Boolean(tagList) && <TagGroup tags={tagList} locale={locale} />}
        <time
          dateTime={post.sys.createdAt}
          className="text-gray-400 italic text-xs"
        >
          {date}
        </time>
      </aside>
      <p>{description}</p>
      <CleverLink to={slug} className="block underline">
        Weiterlesen…
      </CleverLink>
    </div>
  );
}
