import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeVideoPlayerFields {
    videoId: EntryFieldTypes.Symbol;
    title?: EntryFieldTypes.Symbol;
    content?: EntryFieldTypes.RichText;
    showOnlyOnGermanPage?: EntryFieldTypes.Boolean;
    videoAlignment?: EntryFieldTypes.Boolean;
}

export type TypeVideoPlayerSkeleton = EntrySkeletonType<TypeVideoPlayerFields, "videoPlayer">;
export type TypeVideoPlayer<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeVideoPlayerSkeleton, Modifiers, Locales>;
