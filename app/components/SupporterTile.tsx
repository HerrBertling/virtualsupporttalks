import { Link } from "react-router-dom";
import type { IImageCollectionFields } from "../../@types/generated/contentful";

interface ImageCollectionProps extends IImageCollectionFields {
  withPaddingTop: boolean;
}

export default function SupporterTile({
  url,
  image,
  title,
}: {
  url: string;
  image?: string;
  title?: string;
}) {
  return (
    <a
      href={url}
      className="flex items-center justify-center no-underline transition-opacity hover:opacity-80 focus:opacity-80 active:opacity-80"
    >
      <div className="text-center">
        <picture>
          <source
            srcSet={`${image}?w=240&h=240&fit=pad&fm=webp`}
            type="image/webp"
          />
          <source
            srcSet={`${image}?w=240&h=240&fit=pad&fm=jpeg`}
            type="image/jpeg"
          />
          <img
            src={`${image}?w=240&h=240&fit=pad`}
            alt={title}
            loading="lazy"
            className="m-auto max-h-[300px] w-[80%] max-w-[300px] object-cover"
          />
        </picture>
        {title && <h3 className="m-0 text-lg font-bold">{title}</h3>}
      </div>
    </a>
  );
}
