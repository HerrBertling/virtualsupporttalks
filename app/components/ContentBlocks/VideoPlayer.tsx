import type { Entry } from "contentful";
import type { TypeVideoPlayerSkeleton } from "../../../@types/generated/contentful";
import ContentfulRichText from "../ContentfulRichText";

type VideoPlayerProps = Entry<TypeVideoPlayerSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">["fields"];

export default function VideoPlayer({ videoId, content }: VideoPlayerProps) {
  return (
    <section className="my-1 grid w-screen max-w-full grid-cols-1 lg:grid-cols-2">
      <div className=" flex-grid self-center py-8 px-4 lg:row-start-1 lg:ml-auto lg:max-w-[70ch] lg:px-12 lg:pt-24 lg:pb-12">
        {content && <ContentfulRichText content={content} />}
      </div>
      <div className="row-start-2 h-auto w-full lg:col-start-2 lg:row-start-1 lg:max-h-max lg:p-4">
        <iframe
          title="video"
          loading="lazy"
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=white`}
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            width: "100%",
            aspectRatio: "16/9",
            objectFit: "cover",
          }}
        />
      </div>
    </section>
  );
}
