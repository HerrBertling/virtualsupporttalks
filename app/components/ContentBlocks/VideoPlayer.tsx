import type { IVideoPlayerFields } from "../../../@types/generated/contentful";
import ContentfulRichText from "../ContentfulRichText";

export default function VideoPlayer({
  videoId,
  content,
  videoAlignment,
}: IVideoPlayerFields) {
  return (
    <section
      className={`my-1 w-screen grid-cols-1 ${
        content ? "grid lg:grid-cols-2" : "max-w-4xl mx-auto"
      }`}
    >
      {content && (
        <div
          className={`flex self-center py-8 px-4 lg:row-start-1 lg:max-w-[70ch] lg:px-12 lg:pt-24 lg:pb-12 ${
            videoAlignment ? "lg:mr-auto lg:col-start-2" : "lg:ml-auto"
          } `}
        >
          <ContentfulRichText content={content} />
        </div>
      )}
      <div
        className={`lg:p-4 ${
          content
            ? "row-start-2 lg:row-start-1 h-auto w-full lg:max-h-max " &&
              videoAlignment
              ? "lg:col-start-1 "
              : "lg:col-start-2 "
            : "mx-auto"
        }`}
      >
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
