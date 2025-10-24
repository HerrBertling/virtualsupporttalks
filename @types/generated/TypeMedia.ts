import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeMediaFields {
    url?: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
    title?: EntryFieldTypes.Symbol;
}

export type TypeMediaSkeleton = EntrySkeletonType<TypeMediaFields, "media">;
export type TypeMedia<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeMediaSkeleton, Modifiers, Locales>;
