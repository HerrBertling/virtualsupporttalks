import type { IGenericContentFields } from "../../../@types/generated/contentful";
import ContentfulRichText from "../ContentfulRichText";

export default function GenericContent({ content }: IGenericContentFields) {
  return (
    <section className="mx-auto min-h-[50vh] w-screen max-w-3xl px-4 pt-24 pb-12">
      {content && <ContentfulRichText content={content} />}
    </section>
  );
}
