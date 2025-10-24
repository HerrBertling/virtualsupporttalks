import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeHeaderBlockFields {
	title?: EntryFieldTypes.Symbol;
	image?: EntryFieldTypes.AssetLink;
	backgroundcolor?: EntryFieldTypes.Symbol;
	content?: EntryFieldTypes.RichText;
	buttonText?: EntryFieldTypes.Symbol;
	buttonUrl?: EntryFieldTypes.Symbol;
}

export type TypeHeaderBlockSkeleton = EntrySkeletonType<TypeHeaderBlockFields, "headerBlock">;
export type TypeHeaderBlock<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeHeaderBlockSkeleton, Modifiers, Locales>;
