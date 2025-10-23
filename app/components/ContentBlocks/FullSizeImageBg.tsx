import type { ReactNode } from "react";
import type { Entry } from "contentful";
import type { TypeContentWithFullSizeImageSkeleton } from "../../../@types/generated/contentful";

type BaseFullSizeImageFields = Entry<TypeContentWithFullSizeImageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">["fields"];

interface FullSizeImageBgProps extends BaseFullSizeImageFields {
  children: ReactNode;
}

export default function FullSizeImageBg({
  image,
  backgroundcolor,
  imageRight,
  children,
}: FullSizeImageBgProps) {
  const styleObject = { backgroundColor: backgroundcolor };
  const imagePath = image?.fields?.file?.url;
  return (
    <section
      className="grid w-screen max-w-full grid-cols-1 lg:grid-cols-2"
      style={styleObject}
    >
      {image && (
        <picture>
          <source srcSet={`${imagePath}?fm=avif&q=80`} type="image/avif" />
          <source srcSet={`${imagePath}?fm=webp&q=80`} type="image/webp" />
          <source srcSet={`${imagePath}?fm=jpg&q=80`} type="image/jpeg" />
          <img
            alt={(image?.fields?.title as string) || ""}
            loading="lazy"
            src={imagePath}
            className={`h-auto max-h-[60vh] w-full object-cover lg:h-full lg:max-h-max ${
              imageRight && "row-start-1 lg:col-start-2"
            }`}
          />
        </picture>
      )}
      <div
        className={`py-8 px-4 lg:max-w-[70ch] lg:px-12 lg:pb-12 lg:pt-36 break-words overflow-hidden ${
          imageRight && "col-start-1 ml-auto lg:row-start-1"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
