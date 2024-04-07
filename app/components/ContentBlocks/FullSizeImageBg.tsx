import type { ReactNode } from "react";
import type { IContentWithFullSizeImageFields } from "../../../@types/generated/contentful";
interface FullSizeImageBgProps extends IContentWithFullSizeImageFields {
  children: ReactNode;
}

export default function FullSizeImageBg({
  image,
  backgroundcolor,
  imageRight,
  children,
}: FullSizeImageBgProps) {
  const styleObject = { backgroundColor: backgroundcolor };
  const imagePath = image?.fields?.file?.url || null;
  return (
    <section
      className="grid w-screen max-w-full grid-cols-1 lg:grid-cols-2"
      style={styleObject}
    >
      {image && imagePath && (
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
        className={`py-8 px-4 lg:max-w-[70ch] lg:px-12 lg:pb-12 lg:pt-36 ${
          imageRight && "col-start-1 ml-auto lg:row-start-1"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
