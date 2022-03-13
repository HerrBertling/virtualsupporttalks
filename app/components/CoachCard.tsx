import type { Asset } from "contentful";
import type { ReactNode } from "react";
import { PhoneIcon, MailIcon, GlobeIcon } from "@heroicons/react/outline";

type CoachProps = {
  email?: string;
  url?: string;
  phone?: string;
  name?: string;
  image?: Asset;
  emergency?: boolean;
  children: ReactNode;
};

export default function CoachCard(props: CoachProps) {
  const { url, name, image, emergency, phone, email, children } = props;

  const contactMethods = [];

  if (email) {
    contactMethods.push({
      type: "email",
      address: `mailto:${email}`,
    });
  }
  if (url) {
    contactMethods.push({
      type: "website",
      address: url,
    });
  }
  if (phone) {
    contactMethods.push({
      type: "phone",
      address: `tel:${phone}`,
    });
  }

  const imagePath = image?.fields.file.url;

  return (
    <article
      className={`relative grid grid-cols-[4rem_1fr] grid-rows-[4rem_1fr] gap-3 overflow-hidden rounded-md bg-white px-3 py-3 shadow-lg`}
      // $style.coachWrapper,
    >
      <a
        href={url ? url : `mailto:${email}`}
        target="_blank"
        rel="noopener"
        className="shadow-inset-md col-start-1 row-start-1 h-16 w-16 overflow-hidden rounded-full"
        // @click="trackCoachClick('image', name)"
      >
        {imagePath ? (
          <picture>
            <source
              srcSet={`${imagePath}?w=120&h=120&fm=webp&f=face&fit=thumb, ${imagePath}?w=240&h=240&fm=webp&f=face&fit=thumb 2x`}
              type="image/webp"
            />
            <source
              srcSet={`${imagePath}?w=120&h=120&fm=jpeg&f=face&fit=thumb, ${imagePath}?w=240&h=240&fm=jpeg&f=face&fit=thumb 2x`}
              type="image/jpeg"
            />
            <img
              src={`${imagePath}?w=120&h=120&f=face&fit=thumb`}
              alt={name}
              className="h-full w-full object-cover"
              width="80"
              height="80"
              loading="lazy"
            />
          </picture>
        ) : null}
      </a>
      <header className="col-start-2 row-start-1 self-center">
        <a
          href={url ? url : `mailto:${email}`}
          target="_blank"
          rel="noopener"
          // @click="trackCoachClick('image', name)"
        >
          <h3 className="text-xl font-bold text-gray-500 transition-colors hover:text-vsp-500">
            {name}
          </h3>
        </a>
      </header>
      <div className="prose prose-sm col-span-full row-start-2">
        <p>
          <strong className="text-gray-500">Meine Schwerpunkte</strong>
        </p>
        {children}
      </div>
      <div className="col-span-2 col-start-1 flex flex-row justify-between gap-2">
        {contactMethods.map((method) => (
          <a
            key={method.type}
            href={method.address}
            target="_blank"
            rel="noopener"
            className="flex w-full flex-grow items-center justify-center rounded-md border border-vsp-400 py-2 text-sm text-gray-600 no-underline transition-colors duration-200 hover:border-vsp-700 hover:bg-vsp-100 hover:text-vsp-900 focus:border-vsp-700 focus:bg-vsp-100 focus:text-vsp-900 active:border-vsp-700 active:bg-vsp-100 active:text-vsp-900"
            // @click="trackCoachClick(method.type, name)"
          >
            {method.type === "phone" ? (
              <PhoneIcon className="h6 mr-1 w-6" />
            ) : method.type === "email" ? (
              <MailIcon className="h6 mr-1 w-6" />
            ) : (
              <GlobeIcon className="h6 mr-1 w-6" />
            )}
            <span>{method.type}</span>
          </a>
        ))}
      </div>
      {emergency ? (
        <span className="absolute top-0 right-4 w-48 translate-x-16 translate-y-8 rotate-45 transform bg-orange-300 py-1 text-center text-xs text-orange-900 shadow-md">
          Emergency!
        </span>
      ) : null}
    </article>
  );
}
