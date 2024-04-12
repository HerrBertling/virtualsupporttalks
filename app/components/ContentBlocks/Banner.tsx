import type { IBannerFields } from "../../../@types/generated/contentful";
import ContentfulRichText from "../ContentfulRichText";

export default function Banner({ textInBanner, action }: IBannerFields) {
  return (
    <section className="flex items-center justify-center fixed bottom-0 w-full py-2 px-4 bg-gradient-to-b from-vsp-600 to-vsp-300 z-10 text-center">
      <a href={action}>
        <ContentfulRichText content={textInBanner}></ContentfulRichText>
      </a>
    </section>
  );
}
