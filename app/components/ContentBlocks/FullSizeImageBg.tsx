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
      className="grid grid-cols-1 w-screen max-w-full lg:grid-cols-2"
      style={styleObject}
    >
      {image && (
        <img
          src={image.fields.file.url}
          className={`object-cover h-auto max-h-[60vh] w-full lg:h-full lg:max-h-max ${
            imageRight && "lg:col-start-2 lg:row-start-1"
          }`}
        />
      )}
      <div
        className={`py-8 px-4 lg:px-12 lg:pb-12 lg:pt-36 lg:max-w-[70ch] ${
          imageRight && "col-start-1 row-start-1 ml-auto"
        }`}
      >
        {children}
      </div>
    </section>
  );
}
