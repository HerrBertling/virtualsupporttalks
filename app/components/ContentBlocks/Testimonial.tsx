import type { Entry } from "contentful";
import type { TypeTestimonialsSkeleton } from "../../../@types/generated/contentful";

type TestimonialProps = Entry<TypeTestimonialsSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">["fields"];

export default function Testimonial({ link, image, testimonialText, author }: TestimonialProps) {
  return (
    <section className="mx-auto my-8 max-w-7xl px-4 pt-12 md:px-12">
      <div className="max-w-[100%] h-[auto] flex flex-col gap-8 items-center justify-center p-8 shadow shadow-black-500/40 hover:shadow-vsp-500/40 rounded-lg ">
        <div className="h-auto  rounded-lg object-cover flex justify-center ">
          <a href={link}>
            {image && (
              <img
                src={image.fields.file?.url}
                alt=""
                className="h-auto max-h-40  rounded-lg object-cover transition-opacity duration-300 group-hover:opacity-50"
              />
            )}
          </a>
        </div>
        <div className="flex flex-col gap-6 ">
          {testimonialText && (
            <blockquote className="richtext prose-a:text-vsp-600 hover:prose-a:text-vsp-700 lg:prose-h1:leading-tight prose prose-slate max-w-none lg:prose-lg prose-headings:font-headline false">
              {testimonialText}
            </blockquote>
          )}

          <cite className="group-hover:text-vsp-500 flex flex-end">{author}</cite>
        </div>
      </div>
    </section>
  );
}
