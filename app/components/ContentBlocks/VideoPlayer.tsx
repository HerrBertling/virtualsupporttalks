import { IVideoPlayerFields } from "../../../@types/generated/contentful";
import ContentfulRichText from "../ContentfulRichText";

export default function VideoPlayer({ videoId, content }: IVideoPlayerFields) {
  return (
      <section className="mx-auto max-w-7xl grid w-screen grid-cols-1 gap-6 py-16 px-4 lg:grid-cols-2">
      <div className="flex-grid self-center lg:row-start-1">
        {content && <ContentfulRichText content={content} />}
      </div>
      <div className="row-start-2 h-96 w-full lg:col-start-2 lg:row-start-1"  style={{aspectRatio: "16/9"}}>
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=white`}
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  );
}
