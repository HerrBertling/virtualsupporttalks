import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeImageWithLinkSkeleton } from "./TypeImageWithLink";

export interface TypeImageCollectionFields {
    internalTitle?: EntryFieldTypes.Symbol;
    images?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeImageWithLinkSkeleton>>;
}

export type TypeImageCollectionSkeleton = EntrySkeletonType<TypeImageCollectionFields, "imageCollection">;
export type TypeImageCollection<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeImageCollectionSkeleton, Modifiers, Locales>;
