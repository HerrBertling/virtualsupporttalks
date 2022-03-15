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
  console.log(url, image, title);
  return (
    <a
      href={url}
      className="flex items-center justify-center transition-opacity no-underline hover:opacity-80 focus:opacity-80 active:opacity-80"
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
            className="object-cover max-w-[300px] max-h-[300px] w-[80%] m-auto"
          />
        </picture>
        {title && <h3 className="m-0 font-bold text-lg">{title}</h3>}
      </div>
    </a>
  );
}
