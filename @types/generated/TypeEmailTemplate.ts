import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeEmailTemplateFields {
	subject?: EntryFieldTypes.Symbol;
	emailTemplate?: EntryFieldTypes.Text;
}

export type TypeEmailTemplateSkeleton = EntrySkeletonType<TypeEmailTemplateFields, "emailTemplate">;
export type TypeEmailTemplate<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeEmailTemplateSkeleton, Modifiers, Locales>;
