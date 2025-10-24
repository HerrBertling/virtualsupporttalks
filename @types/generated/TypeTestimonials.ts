import type {
	ChainModifiers,
	Entry,
	EntryFieldTypes,
	EntrySkeletonType,
	LocaleCode,
} from "contentful";

export interface TypeTestimonialsFields {
	image?: EntryFieldTypes.AssetLink;
	link?: EntryFieldTypes.Symbol;
	testimonialText?: EntryFieldTypes.Text;
	author?: EntryFieldTypes.Symbol;
}

export type TypeTestimonialsSkeleton = EntrySkeletonType<TypeTestimonialsFields, "testimonials">;
export type TypeTestimonials<
	Modifiers extends ChainModifiers,
	Locales extends LocaleCode = LocaleCode,
> = Entry<TypeTestimonialsSkeleton, Modifiers, Locales>;
