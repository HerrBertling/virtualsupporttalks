import { Link } from "react-router-dom";
import type { IImageCollectionFields } from "../../../@types/generated/contentful";

interface ImageCollectionProps extends IImageCollectionFields {
  withPaddingTop: boolean;
}

function Image({ image, text }: { image?: string; text?: string }) {
  return (
    <picture>
      <source
        srcSet={`
    ${image}?h=450&fm=webp,
    ${image}?h=900&fm=webp 2x`}
        type="image/webp"
      />
      <source
        srcSet={`
  ${image}?h=450&fm=jpeg,
  ${image}?h=900&fm=jpeg 2x`}
        type="image/jpeg"
      />
      <img
        src={`${image}?h=450`}
        alt={text}
        height="450"
        loading="lazy"
        className="max-w-full h-auto"
      />
    </picture>
  );
}

export default function ContentBlockImageCollection({
  images,
  withPaddingTop,
}: ImageCollectionProps) {
  const imageCollection = images?.map(({ sys, fields }) => ({
    image: fields?.image?.fields.file.url,
    link: fields.url,
    text: fields.internalTitle,
    id: sys.id,
  }));

  return (
    <div
      className={`p-4 max-w-7xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12${
        withPaddingTop && "pt-20"
      }`}
    >
      {imageCollection?.map(({ image, link, text, id }) => (
        <figure key={id} role="figure" aria-label="text">
          {link ? (
            <a href={link}>
              <Image image={image} text={text} />
            </a>
          ) : (
            <div>
              <Image image={image} text={text} />
            </div>
          )}
        </figure>
      ))}
    </div>
  );
}
