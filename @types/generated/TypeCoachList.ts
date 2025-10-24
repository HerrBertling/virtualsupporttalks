import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeCoachListFields {
	internalTitle?: EntryFieldTypes.Symbol;
}

export type TypeCoachListSkeleton = EntrySkeletonType<TypeCoachListFields, "coachList">;
export type TypeCoachList<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeCoachListSkeleton, Modifiers, Locales>;
