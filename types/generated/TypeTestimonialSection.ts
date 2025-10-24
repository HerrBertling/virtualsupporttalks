import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeTestimonialsSkeleton } from "./TypeTestimonials";

export interface TypeTestimonialSectionFields {
    title: EntryFieldTypes.Symbol;
    testimonials: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeTestimonialsSkeleton>>;
}

export type TypeTestimonialSectionSkeleton = EntrySkeletonType<TypeTestimonialSectionFields, "testimonialSection">;
export type TypeTestimonialSection<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeTestimonialSectionSkeleton, Modifiers, Locales>;
