import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeMutAtlasKarteFields {
    title?: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.RichText;
}

export type TypeMutAtlasKarteSkeleton = EntrySkeletonType<TypeMutAtlasKarteFields, "mutAtlasKarte">;
export type TypeMutAtlasKarte<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeMutAtlasKarteSkeleton, Modifiers, Locales>;
