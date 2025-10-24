import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeNewsletterFields {
	title?: EntryFieldTypes.Symbol;
	description?: EntryFieldTypes.Text;
}

export type TypeNewsletterSkeleton = EntrySkeletonType<TypeNewsletterFields, "newsletter">;
export type TypeNewsletter<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeNewsletterSkeleton, Modifiers, Locales>;
