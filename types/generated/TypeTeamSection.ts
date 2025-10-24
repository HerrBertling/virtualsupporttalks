import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeContributorSkeleton } from "./TypeContributor";

export interface TypeTeamSectionFields {
    title: EntryFieldTypes.Symbol;
    teamMembers: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeContributorSkeleton>>;
    description: EntryFieldTypes.Text;
}

export type TypeTeamSectionSkeleton = EntrySkeletonType<TypeTeamSectionFields, "teamSection">;
export type TypeTeamSection<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTeamSectionSkeleton, Modifiers, Locales>;
