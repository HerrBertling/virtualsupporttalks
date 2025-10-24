import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeSupporterFields {
	title?: EntryFieldTypes.Symbol;
	image?: EntryFieldTypes.AssetLink;
	url?: EntryFieldTypes.Symbol;
}

export type TypeSupporterSkeleton = EntrySkeletonType<TypeSupporterFields, "supporter">;
export type TypeSupporter<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeSupporterSkeleton, Modifiers, Locales>;
