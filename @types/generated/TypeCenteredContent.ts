import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeCenteredContentFields {
    content?: EntryFieldTypes.RichText;
    textcolor?: EntryFieldTypes.Symbol;
    backgroundcolor?: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    buttonText?: EntryFieldTypes.Symbol;
    buttonUrl?: EntryFieldTypes.Symbol;
    bgcolor?: EntryFieldTypes.Symbol<"gray" | "green" | "white">;
}

export type TypeCenteredContentSkeleton = EntrySkeletonType<TypeCenteredContentFields, "centeredContent">;
export type TypeCenteredContent<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCenteredContentSkeleton, Modifiers, Locales>;
