import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeContentWithFullSizeImageFields {
    content?: EntryFieldTypes.RichText;
    backgroundcolor?: EntryFieldTypes.Symbol;
    image?: EntryFieldTypes.AssetLink;
    imageRight?: EntryFieldTypes.Boolean;
    title?: EntryFieldTypes.Symbol;
}

export type TypeContentWithFullSizeImageSkeleton = EntrySkeletonType<TypeContentWithFullSizeImageFields, "contentWithFullSizeImage">;
export type TypeContentWithFullSizeImage<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeContentWithFullSizeImageSkeleton, Modifiers, Locales>;
