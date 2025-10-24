import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeImageWithLinkFields {
	internalTitle?: EntryFieldTypes.Symbol;
	url?: EntryFieldTypes.Symbol;
	image?: EntryFieldTypes.AssetLink;
}

export type TypeImageWithLinkSkeleton = EntrySkeletonType<TypeImageWithLinkFields, "ImageWithLink">;
export type TypeImageWithLink<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeImageWithLinkSkeleton, Modifiers, Locales>;
