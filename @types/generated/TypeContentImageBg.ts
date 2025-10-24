import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeContentImageBgFields {
	backgroundImage?: EntryFieldTypes.AssetLink;
	content?: EntryFieldTypes.RichText;
	title?: EntryFieldTypes.Symbol;
	buttonText?: EntryFieldTypes.Symbol;
	buttonUrl?: EntryFieldTypes.Symbol;
	withCharityBanner?: EntryFieldTypes.Boolean;
}

export type TypeContentImageBgSkeleton = EntrySkeletonType<
	TypeContentImageBgFields,
	"contentImageBg"
>;
export type TypeContentImageBg<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeContentImageBgSkeleton, Modifiers, Locales>;
