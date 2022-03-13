import { ITag, LOCALE_CODE } from "./../../@types/generated/contentful";
import CleverLink from "./CleverLink";

type TagGroupProps = {
  tags: ITag[] | undefined;
  locale: LOCALE_CODE;
};
export default function TagGroup({ tags, locale }: TagGroupProps) {
  return (
    <div className="flex gap-2 items-start">
      {tags?.map((tag) => {
        const { tagName, slug } = tag.fields;
        return (
          <CleverLink
            key={tagName}
            to={`/${locale}/blog/tag/${slug}`}
            className="inline-block bg-vsp-200 text-vsp-900 hover:bg-vsp-300 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap"
          >
            {tagName}
          </CleverLink>
        );
      })}
    </div>
  );
}
