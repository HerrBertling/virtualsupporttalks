import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypePageSkeleton } from "./TypePage";

export interface TypeNavigationItemFields {
    title?: EntryFieldTypes.Symbol;
    page?: EntryFieldTypes.EntryLink<TypePageSkeleton>;
    url?: EntryFieldTypes.Symbol;
}

export type TypeNavigationItemSkeleton = EntrySkeletonType<TypeNavigationItemFields, "navigationItem">;
export type TypeNavigationItem<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeNavigationItemSkeleton, Modifiers, Locales>;
