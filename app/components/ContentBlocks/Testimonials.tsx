import { type ITestimonialSectionFields } from "../../../@types/generated/contentful";

function Testimonials({ title }: ITestimonialSectionFields) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 md:px-12">
      <h2 className="font-headline text-4xl font-bold">{title}</h2>
    </section>
  );
}

export default Testimonials;
