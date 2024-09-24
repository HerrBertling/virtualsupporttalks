import type { ICenteredContentFields } from "../../../@types/generated/contentful";
import ContentfulRichText from "../ContentfulRichText";

type ContentCenteredProps = {
  content: ICenteredContentFields["content"];
  bgcolor: ICenteredContentFields["bgcolor"];
  buttonText: ICenteredContentFields["buttonText"];
  buttonUrl: ICenteredContentFields["buttonUrl"];
};

export default function ContentBlockCentered({
  content,
  bgcolor,
  buttonText,
  buttonUrl,
}: ContentCenteredProps) {
  const colors =
    bgcolor === "gray"
      ? "bg-slate-400"
      : bgcolor === "green"
        ? "bg-vsp-500"
        : "bg-white";

  const useWhiteProse = bgcolor !== "white";
  const hasButton = buttonText && buttonUrl;

  return (
    <section
      className={`py-12 px-4 md:px-12 ${colors} ${
        hasButton && "grid grid-cols-1 justify-items-center gap-4 pb-12"
      }`}
    >
      <div className="mx-auto w-full max-w-4xl">
        {content && (
          <ContentfulRichText content={content} useWhiteProse={useWhiteProse} />
        )}
      </div>
      {hasButton && <button>{buttonText}</button>}
    </section>
  );
}
