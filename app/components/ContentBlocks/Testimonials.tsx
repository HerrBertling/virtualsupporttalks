import type { Entry } from "contentful";
import type { TypeTestimonialSectionSkeleton } from "../../../types/contentful";

type TestimonialsProps = Entry<
  TypeTestimonialSectionSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS"
>["fields"];

function Testimonials({ title }: TestimonialsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 md:px-12">
      <h2 className="font-headline text-4xl font-bold">{title}</h2>
    </section>
  );
}

export default Testimonials;
