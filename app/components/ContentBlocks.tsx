import type { Entry } from "contentful";
import type {
  LOCALE_CODE,
  TypeBlogPreviewSkeleton,
  TypeBlogpostSkeleton,
  TypeCenteredContentSkeleton,
  TypeContentImageBgSkeleton,
  TypeContentWithFullSizeImageSkeleton,
  TypeGenericContentSkeleton,
  TypeHeaderBlockSkeleton,
  TypeImageCollectionSkeleton,
  TypePageSkeleton,
  TypeTeamSectionSkeleton,
  TypeTestimonialSectionSkeleton,
  TypeTestimonialsSkeleton,
  TypeTrackingGaSkeleton,
  TypeTwoImagesSkeleton,
  TypeVideoPlayerSkeleton,
} from "../../types/contentful";
import ContentBlockBlogPreview from "./ContentBlocks/BlogPreview";
import ContentBlockCentered from "./ContentBlocks/Centered";
import ContentBlockImageCollection from "./ContentBlocks/ContentBlockImageCollection";
import ContentBlockFullSizeImageBg from "./ContentBlocks/FullSizeImageBg";
import GenericContent from "./ContentBlocks/GenericContent";
import ContentBlockHeader from "./ContentBlocks/Header";
import ContentBlockImageBg from "./ContentBlocks/ImageBg";
import ContentBlockTeamSection from "./ContentBlocks/TeamSection";
import Testimonial from "./ContentBlocks/Testimonial";
import Testimonials from "./ContentBlocks/Testimonials";
import TrackingGa from "./ContentBlocks/TrackingGA";
import ContentBlockTwoImages from "./ContentBlocks/TwoImages";
import VideoPlayer from "./ContentBlocks/VideoPlayer";
import ContentfulRichText from "./ContentfulRichText";

type Resolved<T extends { fields: Record<string, unknown> }> = T["fields"];

type IPage = Entry<TypePageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
type IBlogpost = Entry<TypeBlogpostSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;

type PageContentItem = NonNullable<IPage["fields"]["content"]>[number];
type BlogContentItem = NonNullable<IBlogpost["fields"]["content"]>[number];
type ContentItem = NonNullable<PageContentItem | BlogContentItem>;

type ContentBlockProps = {
  content: IPage["fields"]["content"] | IBlogpost["fields"]["content"] | undefined | null;
  locale: LOCALE_CODE;
};

function renderBlock(item: ContentItem, index: number, locale: LOCALE_CODE) {
  const id = item.sys.contentType.sys.id;

  switch (id) {
    case "headerBlock": {
      const { backgroundcolor, image, buttonText, buttonUrl } = item.fields as Resolved<
        Entry<TypeHeaderBlockSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
      >;
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
    case "centeredContent": {
      const { bgcolor, content, buttonText, buttonUrl } = item.fields as Resolved<
        Entry<TypeCenteredContentSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
      >;
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
    case "contentWithFullSizeImage": {
      const { backgroundcolor, image, imageRight, content } = item.fields as Resolved<
        Entry<TypeContentWithFullSizeImageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
      >;
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
    case "contentImageBg": {
      const { backgroundImage, buttonUrl, buttonText, withCharityBanner, content } =
        item.fields as Resolved<Entry<TypeContentImageBgSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">>;
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
    case "twoImages": {
      const { image1, image2, text1, text2, link1, link2 } = item.fields as Resolved<
        Entry<TypeTwoImagesSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
      >;
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
    case "videoPlayer": {
      const { videoId, content, showOnlyOnGermanPage } = item.fields as Resolved<
        Entry<TypeVideoPlayerSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
      >;
      if (!showOnlyOnGermanPage || locale === "de") {
        return <VideoPlayer key={item.sys.id} videoId={videoId} content={content} />;
      }
      return null;
    }
    case "imageCollection": {
      const { internalTitle, images } = item.fields as Resolved<
        Entry<TypeImageCollectionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
      >;
      return (
        <ContentBlockImageCollection
          key={item.sys.id}
          images={images}
          internalTitle={internalTitle}
          withPaddingTop={index === 0}
        />
      );
    }
    case "BlogPreview": {
      const { titleAndHeader, buttonText } = item.fields as Resolved<
        Entry<TypeBlogPreviewSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
      >;
      return (
        <ContentBlockBlogPreview
          key={item.sys.id}
          titleAndHeader={titleAndHeader}
          buttonText={buttonText}
        />
      );
    }
    case "trackingGa": {
      const { title } = item.fields as Resolved<
        Entry<TypeTrackingGaSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
      >;
      return <TrackingGa key={item.sys.id} title={title} />;
    }
    case "teamSection": {
      const { title, teamMembers, description } = item.fields as Resolved<
        Entry<TypeTeamSectionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
      >;
      return (
        <ContentBlockTeamSection
          key={item.sys.id}
          title={title}
          description={description}
          teamMembers={teamMembers}
        />
      );
    }
    case "testimonials": {
      const { image, link, testimonialText, author } = item.fields as Resolved<
        Entry<TypeTestimonialsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
      >;
      return (
        <Testimonial
          key={item.sys.id}
          image={image}
          link={link}
          testimonialText={testimonialText}
          author={author}
        />
      );
    }
    case "testimonialSection": {
      const { title, testimonials } = item.fields as Resolved<
        Entry<TypeTestimonialSectionSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
      >;
      return <Testimonials key={item.sys.id} title={title} testimonials={testimonials} />;
    }
    case "coachList":
      return null;
    default: {
      const { content } = item.fields as Resolved<
        Entry<TypeGenericContentSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">
      >;
      return content ? <GenericContent key={item.sys.id} content={content} /> : null;
    }
  }
}

export default function ContentBlocks({ content, locale }: ContentBlockProps) {
  if (!content) return null;

  return (
    <div>
      {(content as (ContentItem | undefined)[])
        .filter((item): item is ContentItem => item !== undefined)
        .map((item, index) => renderBlock(item, index, locale))}
    </div>
  );
}
