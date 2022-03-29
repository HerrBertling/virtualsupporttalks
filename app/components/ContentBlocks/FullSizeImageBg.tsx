import type { IContentWithFullSizeImageFields } from "../../../@types/generated/contentful";
import type { ReactNode } from "react";
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
  return (
    <section
      className="grid w-screen max-w-full grid-cols-1 lg:grid-cols-2"
      style={styleObject}
    >
      {image && (
        <img
          src={image.fields.file.url}
          className={`h-auto max-h-[60vh] w-full object-cover lg:h-full lg:max-h-max ${
            imageRight && "row-start-1 lg:col-start-2"
          }`}
        />
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
