// Backward compatibility layer for old type names
// Re-exports all generated types for easier importing

import type { Entry } from "contentful";

export type {
  TypeBanner,
  TypeBannerFields,
  TypeBannerSkeleton,
  TypeBlogpost,
  TypeBlogpostFields,
  TypeBlogpostSkeleton,
  TypeBlogPreview,
  TypeBlogPreviewFields,
  TypeBlogPreviewSkeleton,
  TypeCenteredContent,
  TypeCenteredContentFields,
  TypeCenteredContentSkeleton,
  TypeCoach,
  TypeCoachFields,
  TypeCoachSkeleton,
  TypeCoachList,
  TypeCoachListFields,
  TypeCoachListSkeleton,
  TypeCoachtag,
  TypeCoachtagFields,
  TypeCoachtagSkeleton,
  TypeContentImageBg,
  TypeContentImageBgFields,
  TypeContentImageBgSkeleton,
  TypeContentWithFullSizeImage,
  TypeContentWithFullSizeImageFields,
  TypeContentWithFullSizeImageSkeleton,
  TypeContributor,
  TypeContributorFields,
  TypeContributorSkeleton,
  TypeEmailTemplate,
  TypeEmailTemplateFields,
  TypeEmailTemplateSkeleton,
  TypeGenericContent,
  TypeGenericContentFields,
  TypeGenericContentSkeleton,
  TypeHeaderBlock,
  TypeHeaderBlockFields,
  TypeHeaderBlockSkeleton,
  TypeImageCollection,
  TypeImageCollectionFields,
  TypeImageCollectionSkeleton,
  TypeImageWithLink,
  TypeImageWithLinkFields,
  TypeImageWithLinkSkeleton,
  TypeMedia,
  TypeMediaFields,
  TypeMediaSkeleton,
  TypeNavigation,
  TypeNavigationFields,
  TypeNavigationSkeleton,
  TypeNavigationItem,
  TypeNavigationItemFields,
  TypeNavigationItemSkeleton,
  TypeNetwork,
  TypeNetworkFields,
  TypeNetworkSkeleton,
  TypeNewsletter,
  TypeNewsletterFields,
  TypeNewsletterSkeleton,
  TypePage,
  TypePageFields,
  TypePageSkeleton,
  TypeSeo,
  TypeSeoFields,
  TypeSeoSkeleton,
  TypeSupporter,
  TypeSupporterFields,
  TypeSupporterSkeleton,
  TypeTag,
  TypeTagFields,
  TypeTagSkeleton,
  TypeTeamSection,
  TypeTeamSectionFields,
  TypeTeamSectionSkeleton,
  TypeTestimonials,
  TypeTestimonialsFields,
  TypeTestimonialsSkeleton,
  TypeTestimonialSection,
  TypeTestimonialSectionFields,
  TypeTestimonialSectionSkeleton,
  TypeTrackingGa,
  TypeTrackingGaFields,
  TypeTrackingGaSkeleton,
  TypeTwoImages,
  TypeTwoImagesFields,
  TypeTwoImagesSkeleton,
  TypeVideoPlayer,
  TypeVideoPlayerFields,
  TypeVideoPlayerSkeleton,
} from "./index";

// LOCALE_CODE type
export type LOCALE_CODE = "de" | "en" | "ru" | "uk";

// Convenience type aliases for common usage patterns (using v10 unwrapped types)
export type IPage = Entry<TypePageSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
export type IBlogpost = Entry<TypeBlogpostSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
export type ICoach = Entry<TypeCoachSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
export type ICoachtag = Entry<TypeCoachtagSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
export type ITag = Entry<TypeTagSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
export type INavigationItem = Entry<TypeNavigationItemSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
export type INavigation = Entry<TypeNavigationSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
export type IMedia = Entry<TypeMediaSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
export type INetwork = Entry<TypeNetworkSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;
export type ISupporter = Entry<TypeSupporterSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">;

// Field type aliases
export type IBlogpostFields = IBlogpost["fields"];
export type IPageFields = IPage["fields"];
export type ICoachFields = ICoach["fields"];
