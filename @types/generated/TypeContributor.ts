import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeContributorFields {
    firstname?: EntryFieldTypes.Symbol;
    lastname?: EntryFieldTypes.Symbol;
    position?: EntryFieldTypes.Symbol;
    url?: EntryFieldTypes.Symbol;
    slug?: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
    content?: EntryFieldTypes.RichText;
}

export type TypeContributorSkeleton = EntrySkeletonType<TypeContributorFields, "contributor">;
export type TypeContributor<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeContributorSkeleton, Modifiers, Locales>;
