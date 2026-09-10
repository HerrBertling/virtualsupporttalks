import type { Entry } from "contentful";
import type { TypeTestimonialSectionSkeleton } from "../../../types/contentful";

type TestimonialsProps = Entry<
  TypeTestimonialSectionSkeleton,
  "WITHOUT_UNRESOLVABLE_LINKS"
>["fields"];

function Testimonials({ title }: TestimonialsProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 md:px-12">
      <h2 className="font-headline text-[clamp(2rem,1.5rem+2.5vw,2.625rem)] font-bold leading-[1.4]">
        {title}
      </h2>
    </section>
  );
}

export default Testimonials;
