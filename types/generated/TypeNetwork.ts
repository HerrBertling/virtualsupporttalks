import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeNetworkFields {
    title?: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
    url?: EntryFieldTypes.Symbol;
}

export type TypeNetworkSkeleton = EntrySkeletonType<TypeNetworkFields, "network">;
export type TypeNetwork<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNetworkSkeleton, Modifiers, Locales>;
