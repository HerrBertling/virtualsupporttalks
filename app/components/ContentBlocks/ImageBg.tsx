import type { ReactNode } from "react";
import type { IContentImageBgFields } from "../../../@types/generated/contentful";
import AmazonCharityBanner from "../AmazonCharityBanner";
import CleverButton from "../CleverButton";

interface ContentBlockImageBgProps extends IContentImageBgFields {
  children: ReactNode;
  withPaddingTop: Boolean;
}

export default function ContentBlockImageBg({
  backgroundImage,
  withPaddingTop = false,
  buttonUrl = "",
  buttonText = "",
  withCharityBanner = false,
  children,
}: ContentBlockImageBgProps) {
  const hasButton = buttonUrl && buttonText;
  const usedBackgroundImage = backgroundImage?.fields?.file?.url;
  const backgroundStyle = usedBackgroundImage
    ? { backgroundImage: `url(${usedBackgroundImage})` }
    : {};
  return (
    <section
      className={`after:content-[\'\'], after::z-0 relative flex min-h-[400px] bg-cover bg-center bg-no-repeat text-center after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:block after:bg-gray-400/80 ${
        hasButton && "grid grid-cols-1 justify-center gap-4 pb-12"
      }`}
      style={backgroundStyle}
    >
      <div
        className={`z-10 m-auto w-screen max-w-4xl py-12 px-4 ${
          withPaddingTop && "px-4 py-12 pt-28"
        }`}
      >
        {children}
      </div>
      {hasButton && (
        <div className="z-10 flex flex-row flex-wrap items-center justify-center gap-8">
          <CleverButton to={buttonUrl}>{buttonText}</CleverButton>
          {withCharityBanner && <AmazonCharityBanner />}
        </div>
      )}
    </section>
  );
}
