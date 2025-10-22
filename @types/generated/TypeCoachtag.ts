import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCoachtagFields {
    tag: EntryFieldTypes.Symbol;
}

export type TypeCoachtagSkeleton = EntrySkeletonType<TypeCoachtagFields, "coachtag">;
export type TypeCoachtag<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCoachtagSkeleton, Modifiers, Locales>;
