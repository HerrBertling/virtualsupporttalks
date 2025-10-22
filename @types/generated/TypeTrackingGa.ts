import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeTrackingGaFields {
    title: EntryFieldTypes.Symbol;
}

export type TypeTrackingGaSkeleton = EntrySkeletonType<TypeTrackingGaFields, "trackingGa">;
export type TypeTrackingGa<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTrackingGaSkeleton, Modifiers, Locales>;
