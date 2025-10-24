import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeGenericContentFields {
    title?: EntryFieldTypes.Symbol;
    content?: EntryFieldTypes.RichText;
}

export type TypeGenericContentSkeleton = EntrySkeletonType<TypeGenericContentFields, "genericContent">;
export type TypeGenericContent<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeGenericContentSkeleton, Modifiers, Locales>;
