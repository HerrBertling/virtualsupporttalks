import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeSeoFields {
	title?: EntryFieldTypes.Symbol;
	description?: EntryFieldTypes.Text;
	image?: EntryFieldTypes.AssetLink;
}

export type TypeSeoSkeleton = EntrySkeletonType<TypeSeoFields, "seo">;
export type TypeSeo<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeSeoSkeleton, Modifiers, Locales>;
