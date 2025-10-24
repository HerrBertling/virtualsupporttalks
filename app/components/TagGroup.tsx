import type { ITag, LOCALE_CODE } from "./../../@types/generated/contentful";
import CleverLink from "./CleverLink";

type TagGroupProps = {
  tags: ITag[] | undefined;
  locale: LOCALE_CODE;
};
export default function TagGroup({ tags, locale }: TagGroupProps) {
  return (
    <div className="flex flex-wrap items-start gap-2">
      {tags?.map((tag) => {
        const { tagName, slug } = tag.fields;

        // Type guard: only render if both fields are strings
        if (typeof tagName !== "string" || typeof slug !== "string") {
          return null;
        }

        return (
          <CleverLink
            key={tagName}
            to={`/${locale}/blog/tag/${slug}`}
            className="inline-block whitespace-nowrap rounded-full bg-vsp-200 px-3 py-1 text-xs font-semibold text-vsp-900 hover:bg-vsp-300"
          >
            {tagName}
          </CleverLink>
        );
      })}
    </div>
  );
}
