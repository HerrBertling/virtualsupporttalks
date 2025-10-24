import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeBannerFields {
	textInBanner: EntryFieldTypes.RichText;
	action?: EntryFieldTypes.Symbol;
}

export type TypeBannerSkeleton = EntrySkeletonType<TypeBannerFields, "banner">;
export type TypeBanner<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeBannerSkeleton, Modifiers, Locales>;
