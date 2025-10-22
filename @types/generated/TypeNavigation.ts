import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeNavigationItemSkeleton } from "./TypeNavigationItem";

export interface TypeNavigationFields {
    internalTitle?: EntryFieldTypes.Symbol;
    items?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeNavigationItemSkeleton>>;
}

export type TypeNavigationSkeleton = EntrySkeletonType<TypeNavigationFields, "navigation">;
export type TypeNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNavigationSkeleton, Modifiers, Locales>;
