import type { IHeaderBlockFields } from "../../../@types/generated/contentful";

export default function Header({
  backgroundcolor,
  image,
  buttonUrl,
  buttonText,
}: IHeaderBlockFields) {
  const headerStyle = {
    backgroundColor: backgroundcolor,
  };
  const hasButton = buttonUrl && buttonText;
  const styleObject = {
    backgroundColor: backgroundcolor,
    backgroundImage: image ? `url(${image.fields.file.url})` : undefined,
  };
  return (
    <div className="pt-20 md:pt-32" style={headerStyle}>
      <header
        className={`headerBlockHeight grid grid-cols-1 justify-items-center gap-4 ${
          hasButton && "pb-12"
        }`}
      >
        <div
          className="w-full bg-contain bg-center bg-no-repeat"
          style={styleObject}
        ></div>
        {hasButton && (
          <div>
            <button>{buttonText}</button>
          </div>
        )}
      </header>
    </div>
  );
}
