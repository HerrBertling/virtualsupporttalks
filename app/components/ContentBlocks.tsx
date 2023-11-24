import type {
  IBlogpostFields,
  ICenteredContentFields,
  IContentImageBgFields,
  IContentWithFullSizeImageFields,
  IGenericContentFields,
  IHeaderBlockFields,
  IImageCollectionFields,
  IPageFields,
  ITrackingGaFields,
  ITwoImagesFields,
  IVideoPlayerFields,
  IEmailTemplateFields,
  LOCALE_CODE,
} from "../../@types/generated/contentful";
import ContentBlockCentered from "./ContentBlocks/Centered";
import ContentBlockImageCollection from "./ContentBlocks/ContentBlockImageCollection";
import ContentBlockFullSizeImageBg from "./ContentBlocks/FullSizeImageBg";
import GenericContent from "./ContentBlocks/GenericContent";
import ContentBlockHeader from "./ContentBlocks/Header";
import ContentBlockImageBg from "./ContentBlocks/ImageBg";
import TrackingGa from "./ContentBlocks/TrackingGA";
import ContentBlockTwoImages from "./ContentBlocks/TwoImages";
import VideoPlayer from "./ContentBlocks/VideoPlayer";
import ContentfulRichText from "./ContentfulRichText";

type ContentBlockProps = {
  content: IPageFields["content"] | IBlogpostFields["content"];
  locale: LOCALE_CODE;
};

export default function ContentBlocks({ content, locale }: ContentBlockProps) {
  return (
    <div>
      {content.map((item, index) => {
        const {
          sys: {
            contentType: {
              sys: { id },
            },
          },
        } = item;
        if (id === "headerBlock") {
          const { backgroundcolor, image, buttonText, buttonUrl } =
            item.fields as IHeaderBlockFields;
          return (
            <ContentBlockHeader
              key={item.sys.id}
              backgroundcolor={backgroundcolor}
              image={image}
              buttonText={buttonText}
              buttonUrl={buttonUrl}
            />
          );
        }

        if (id === "centeredContent") {
          const { bgcolor, content, buttonText, buttonUrl } =
            item.fields as ICenteredContentFields;
          return (
            <ContentBlockCentered
              key={item.sys.id}
              bgcolor={bgcolor}
              content={content}
              buttonText={buttonText}
              buttonUrl={buttonUrl}
            />
          );
        }
        if (id === "contentWithFullSizeImage") {
          const { backgroundcolor, image, imageRight, content } =
            item.fields as IContentWithFullSizeImageFields;
          return (
            <ContentBlockFullSizeImageBg
              key={item.sys.id}
              backgroundcolor={backgroundcolor}
              image={image}
              imageRight={imageRight}
            >
              {content && <ContentfulRichText content={content} />}
            </ContentBlockFullSizeImageBg>
          );
        }
        if (id === "contentImageBg") {
          const {
            backgroundImage,
            buttonUrl,
            buttonText,
            withCharityBanner,
            content,
          } = item.fields as IContentImageBgFields;
          return (
            <ContentBlockImageBg
              key={item.sys.id}
              backgroundImage={backgroundImage}
              buttonUrl={buttonUrl}
              buttonText={buttonText}
              withCharityBanner={withCharityBanner}
              withPaddingTop={index === 0}
            >
              {content && <ContentfulRichText content={content} />}
            </ContentBlockImageBg>
          );
        }
        if (id === "twoImages") {
          const { image1, image2, text1, text2, link1, link2 } =
            item.fields as ITwoImagesFields;
          return (
            <ContentBlockTwoImages
              key={item.sys.id}
              image1={image1}
              image2={image2}
              text1={text1}
              text2={text2}
              link1={link1}
              link2={link2}
              locale={locale}
            />
          );
        }

        if (id === "videoPlayer") {
          const { videoId, content } = item.fields as IVideoPlayerFields;
          if (
            !item.fields.showOnlyOnGermanPage ||
            (locale === "de" && item.fields.showOnlyOnGermanPage)
          ) {
            return (
              <VideoPlayer
                key={item.sys.id}
                videoId={videoId}
                content={content}
              />
            );
          }
        }

        if (id === "imageCollection") {
          const { internalTitle, images } =
            item.fields as IImageCollectionFields;
          return (
            <ContentBlockImageCollection
              key={item.sys.id}
              images={images}
              internalTitle={internalTitle}
              withPaddingTop={index === 0}
            />
          );
        }

        if (id === "trackingGa") {
          const { title } = item.fields as ITrackingGaFields;
          return <TrackingGa key={item.sys.id} title={title} />;
        }

        if (id === "coachList") {
          return null;
        } else {
          const { content } = item.fields as IGenericContentFields;

          return <GenericContent key={item.sys.id} content={content} />;
        }
      })}
    </div>
  );
}
