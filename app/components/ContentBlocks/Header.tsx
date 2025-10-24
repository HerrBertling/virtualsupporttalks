import type { Entry } from "contentful";
import type { TypeHeaderBlockSkeleton } from "../../../@types/generated/contentful";

type HeaderProps = Entry<TypeHeaderBlockSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">["fields"];

export default function Header({ backgroundcolor, image, buttonUrl, buttonText }: HeaderProps) {
  const headerStyle = {
    backgroundColor: backgroundcolor,
  };
  const hasButton = buttonUrl && buttonText;
  const styleObject = {
    backgroundColor: backgroundcolor,
    backgroundImage: image ? `url(${image.fields.file?.url}?fm=avif&q=80)` : undefined,
  };
  return (
    <div className="pt-20 md:pt-32" style={headerStyle}>
      <header
        className={`headerBlockHeight grid grid-cols-1 justify-items-center gap-4 ${
          hasButton && "pb-12"
        }`}
      >
        <div className="w-full bg-contain bg-center bg-no-repeat" style={styleObject}></div>
        {hasButton && (
          <div>
            <button>{buttonText}</button>
          </div>
        )}
      </header>
    </div>
  );
}
