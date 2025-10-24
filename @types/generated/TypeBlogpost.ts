import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";
import type { TypeCenteredContentSkeleton } from "./TypeCenteredContent";
import type { TypeContentImageBgSkeleton } from "./TypeContentImageBg";
import type { TypeContentWithFullSizeImageSkeleton } from "./TypeContentWithFullSizeImage";
import type { TypeGenericContentSkeleton } from "./TypeGenericContent";
import type { TypeHeaderBlockSkeleton } from "./TypeHeaderBlock";
import type { TypeImageCollectionSkeleton } from "./TypeImageCollection";
import type { TypeSeoSkeleton } from "./TypeSeo";
import type { TypeTagSkeleton } from "./TypeTag";
import type { TypeTwoImagesSkeleton } from "./TypeTwoImages";

export interface TypeBlogpostFields {
	title?: EntryFieldTypes.Symbol;
	slug?: EntryFieldTypes.Symbol;
	description?: EntryFieldTypes.Text;
	content: EntryFieldTypes.Array<
		EntryFieldTypes.EntryLink<
			| TypeCenteredContentSkeleton
			| TypeContentImageBgSkeleton
			| TypeContentWithFullSizeImageSkeleton
			| TypeGenericContentSkeleton
			| TypeHeaderBlockSkeleton
			| TypeImageCollectionSkeleton
			| TypeTwoImagesSkeleton
		>
	>;
	seo?: EntryFieldTypes.EntryLink<TypeSeoSkeleton>;
	mainImage?: EntryFieldTypes.AssetLink;
	tagList?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeTagSkeleton>>;
}

export type TypeBlogpostSkeleton = EntrySkeletonType<TypeBlogpostFields, "blogpost">;
export type TypeBlogpost<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeBlogpostSkeleton, Modifiers, Locales>;
