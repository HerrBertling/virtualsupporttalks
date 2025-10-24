import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeBlogPreviewFields {
	defaultText?: EntryFieldTypes.Symbol;
	titleAndHeader: EntryFieldTypes.RichText;
	buttonText?: EntryFieldTypes.Symbol;
}

export type TypeBlogPreviewSkeleton = EntrySkeletonType<TypeBlogPreviewFields, "BlogPreview">;
export type TypeBlogPreview<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeBlogPreviewSkeleton, Modifiers, Locales>;
