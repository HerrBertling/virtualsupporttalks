import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeCoachtagSkeleton } from "./TypeCoachtag";

export interface TypeCoachFields {
    name: EntryFieldTypes.Symbol;
    email?: EntryFieldTypes.Symbol;
    url?: EntryFieldTypes.Symbol;
    phone?: EntryFieldTypes.Symbol;
    languages?: EntryFieldTypes.Array<EntryFieldTypes.Symbol>;
    gender: EntryFieldTypes.Array<EntryFieldTypes.Symbol<"divers" | "männlich" | "weiblich">>;
    image?: EntryFieldTypes.AssetLink;
    mhfaTraining?: EntryFieldTypes.AssetLink;
    completedMhfaTraining?: EntryFieldTypes.Symbol;
    description?: EntryFieldTypes.RichText;
    tag?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCoachtagSkeleton>>;
    emergency?: EntryFieldTypes.Boolean;
}

export type TypeCoachSkeleton = EntrySkeletonType<TypeCoachFields, "coach">;
export type TypeCoach<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeCoachSkeleton, Modifiers, Locales>;
