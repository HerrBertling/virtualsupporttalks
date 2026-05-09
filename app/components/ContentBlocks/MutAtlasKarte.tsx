import type { Entry } from "contentful";
import type { TypeMutAtlasKarteSkeleton } from "../../../types/contentful";
import ContentfulRichText from "../ContentfulRichText";

type MutAtlasKarteProps = Entry<TypeMutAtlasKarteSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">["fields"];

export default function MutAtlasKarte({ title, description }: MutAtlasKarteProps) {
  return (
    <section className="w-screen max-w-full">
      {(title || description) && (
        <div className="mx-auto max-w-4xl px-4 md:px-12 py-12">
          {title && <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>}
          {description && (
            <div className="mt-6">
              <ContentfulRichText content={description} />
            </div>
          )}
        </div>
      )}
      <div className="mx-auto w-full max-w-7xl h-[60vh] min-h-[360px] md:h-[70vh] md:min-h-[500px] lg:h-[80vh] lg:min-h-[600px]">
        <iframe
          src="https://iframe.mut-atlas.de/"
          title={title || "MUT-ATLAS"}
          loading="lazy"
          allow="fullscreen"
          className="block w-full h-full border-0"
        />
      </div>
    </section>
  );
}
