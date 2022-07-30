import ContentfulRichText from "../ContentfulRichText";

export default function VideoPlayer({ videoId, text, content }) {
  return (
    <section className="grid w-screen max-w-full grid-cols-1 lg:grid-cols-2">
      <div className="col-start-1 py-8 px-4 lg:row-start-1 lg:ml-auto lg:max-w-[70ch] lg:px-12 lg:pb-12 lg:pt-36">
        {content && <ContentfulRichText content={content} />}
      </div>
      <div className="row-start-2 h-auto max-h-[60vh] w-full lg:col-start-2 lg:row-start-1 lg:max-h-max">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=white`}
          frameBorder="0"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          style={{
            height: "400px",
          }}
        />
      </div>
    </section>
  );
}
