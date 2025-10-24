import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeTwoImagesFields {
	title?: EntryFieldTypes.Symbol;
	image1?: EntryFieldTypes.AssetLink;
	text1?: EntryFieldTypes.Symbol;
	link1?: EntryFieldTypes.Symbol;
	image2?: EntryFieldTypes.AssetLink;
	text2?: EntryFieldTypes.Symbol;
	link2?: EntryFieldTypes.Symbol;
}

export type TypeTwoImagesSkeleton = EntrySkeletonType<TypeTwoImagesFields, "twoImages">;
export type TypeTwoImages<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeTwoImagesSkeleton, Modifiers, Locales>;
