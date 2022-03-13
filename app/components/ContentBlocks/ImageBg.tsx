import type { ReactNode } from "react";
import type { IContentImageBgFields } from "../../../@types/generated/contentful";

import CleverButton from "../CleverButton";
import AmazonCharityBanner from "../AmazonCharityBanner";

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
      className={`relative flex bg-cover bg-center bg-no-repeat min-h-[400px] text-center after:content-[\'\'], after:block after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after::z-0 after:bg-gray-400/80 ${
        hasButton && "grid grid-cols-1 gap-4 justify-center pb-12"
      }`}
      style={backgroundStyle}
    >
      <div
        className={`py-12 px-4 max-w-4xl w-screen m-auto z-10 ${
          withPaddingTop && "pt-28 px-4 py-12"
        }`}
      >
        {children}
      </div>
      {hasButton && (
        <div className="flex flex-row flex-wrap items-center justify-center gap-8 z-10">
          <CleverButton to={buttonUrl}>{buttonText}</CleverButton>
          {withCharityBanner && (
            <AmazonCharityBanner v-if="withCharityBanner" />
          )}
        </div>
      )}
    </section>
  );
}
