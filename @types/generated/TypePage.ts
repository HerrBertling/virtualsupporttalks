import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";
import type { TypeBannerSkeleton } from "./TypeBanner";
import type { TypeBlogPreviewSkeleton } from "./TypeBlogPreview";
import type { TypeCenteredContentSkeleton } from "./TypeCenteredContent";
import type { TypeCoachListSkeleton } from "./TypeCoachList";
import type { TypeContentImageBgSkeleton } from "./TypeContentImageBg";
import type { TypeContentWithFullSizeImageSkeleton } from "./TypeContentWithFullSizeImage";
import type { TypeGenericContentSkeleton } from "./TypeGenericContent";
import type { TypeHeaderBlockSkeleton } from "./TypeHeaderBlock";
import type { TypeImageCollectionSkeleton } from "./TypeImageCollection";
import type { TypeNewsletterSkeleton } from "./TypeNewsletter";
import type { TypeSeoSkeleton } from "./TypeSeo";
import type { TypeTeamSectionSkeleton } from "./TypeTeamSection";
import type { TypeTestimonialSectionSkeleton } from "./TypeTestimonialSection";
import type { TypeTestimonialsSkeleton } from "./TypeTestimonials";
import type { TypeTrackingGaSkeleton } from "./TypeTrackingGa";
import type { TypeTwoImagesSkeleton } from "./TypeTwoImages";
import type { TypeVideoPlayerSkeleton } from "./TypeVideoPlayer";

export interface TypePageFields {
	title?: EntryFieldTypes.Symbol;
	slug?: EntryFieldTypes.Symbol;
	content: EntryFieldTypes.Array<
		EntryFieldTypes.EntryLink<
			| TypeBannerSkeleton
			| TypeBlogPreviewSkeleton
			| TypeCenteredContentSkeleton
			| TypeCoachListSkeleton
			| TypeContentImageBgSkeleton
			| TypeContentWithFullSizeImageSkeleton
			| TypeGenericContentSkeleton
			| TypeHeaderBlockSkeleton
			| TypeImageCollectionSkeleton
			| TypeNewsletterSkeleton
			| TypeTeamSectionSkeleton
			| TypeTestimonialSectionSkeleton
			| TypeTestimonialsSkeleton
			| TypeTrackingGaSkeleton
			| TypeTwoImagesSkeleton
			| TypeVideoPlayerSkeleton
		>
	>;
	seo?: EntryFieldTypes.EntryLink<TypeSeoSkeleton>;
}

export type TypePageSkeleton = EntrySkeletonType<TypePageFields, "page">;
export type TypePage<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypePageSkeleton, Modifiers, Locales>;
