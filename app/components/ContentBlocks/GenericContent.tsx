import type { Entry } from "contentful";
import type { TypeGenericContentSkeleton } from "../../../@types/generated/contentful";
import ContentfulRichText from "../ContentfulRichText";

type GenericContentProps = Entry<
  TypeGenericContentSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS"
>["fields"];

export default function GenericContent({ content }: GenericContentProps) {
  return (
    <section className="mx-auto min-h-[50vh] w-screen max-w-3xl px-4 pt-24 pb-12">
      {content && <ContentfulRichText content={content} />}
    </section>
  );
}
