import { ICenteredContentFields } from "../../../@types/generated/contentful";
import ContentfulRichText from "../ContentfulRichText";

import type { Document } from "@contentful/rich-text-types";

type ContentCenteredProps = {
  content: ICenteredContentFields["content"];
  bgcolor: ICenteredContentFields["bgcolor"];
  buttonText: ICenteredContentFields["buttonText"];
  buttonUrl: ICenteredContentFields["buttonUrl"];
};

export default function ContentCentered({
  content,
  bgcolor,
  buttonText,
  buttonUrl,
}: ContentCenteredProps) {
  const colors =
    bgcolor === "gray"
      ? "bg-gray-400"
      : bgcolor === "green"
      ? "bg-vsp-500"
      : "bg-white";

  const useWhiteProse = bgcolor !== "white";

  const hasButton = buttonText && buttonUrl;

  return (
    <section
      className={`py-12 px-4 md:px-12 ${colors} ${
        hasButton && "grid grid-cols-1 gap-4 justify-items-center pb-12"
      }`}
    >
      <div className="w-full mx-auto max-w-4xl">
        {content && (
          <ContentfulRichText content={content} useWhiteProse={useWhiteProse} />
        )}
      </div>
      <div v-if="hasButton">
        <button>{buttonText}</button>
      </div>
    </section>
  );
}
