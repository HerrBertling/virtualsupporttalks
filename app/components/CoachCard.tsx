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
      className={`grid grid-cols-[4rem_1fr] grid-rows-[4rem_1fr] gap-3 px-3 py-3 rounded-md shadow-lg overflow-hidden bg-white relative`}
      // $style.coachWrapper,
    >
      <a
        href={url ? url : `mailto:${email}`}
        target="_blank"
        rel="noopener"
        className="h-16 w-16 rounded-full overflow-hidden row-start-1 col-start-1 shadow-inset-md"
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
              className="w-full h-full object-cover"
              width="80"
              height="80"
              loading="lazy"
            />
          </picture>
        ) : null}
      </a>
      <header className="row-start-1 col-start-2 self-center">
        <a
          href={url ? url : `mailto:${email}`}
          target="_blank"
          rel="noopener"
          // @click="trackCoachClick('image', name)"
        >
          <h3 className="font-bold text-xl text-gray-500 hover:text-vsp-500 transition-colors">
            {name}
          </h3>
        </a>
      </header>
      <div className="row-start-2 col-span-full prose prose-sm">
        <p>
          <strong className="text-gray-500">Meine Schwerpunkte</strong>
        </p>
        {children}
      </div>
      <div className="flex flex-row justify-between col-start-1 col-span-2 gap-2">
        {contactMethods.map((method) => (
          <a
            key={method.type}
            href={method.address}
            target="_blank"
            rel="noopener"
            className="flex flex-grow py-2 border border-vsp-400 rounded-md text-sm w-full justify-center items-center text-gray-600 no-underline transition-colors duration-200 hover:text-vsp-900 hover:bg-vsp-100 hover:border-vsp-700 focus:border-vsp-700 focus:text-vsp-900 focus:bg-vsp-100 active:text-vsp-900 active:border-vsp-700 active:bg-vsp-100"
            // @click="trackCoachClick(method.type, name)"
          >
            {method.type === "phone" ? (
              <PhoneIcon className="w-6 h6 mr-1" />
            ) : method.type === "email" ? (
              <MailIcon className="w-6 h6 mr-1" />
            ) : (
              <GlobeIcon className="w-6 h6 mr-1" />
            )}
            <span>{method.type}</span>
          </a>
        ))}
      </div>
      {emergency ? (
        <span className="absolute top-0 right-4 w-48 text-center text-orange-900 text-xs transform rotate-45 translate-x-16 translate-y-8 py-1 bg-orange-300 shadow-md">
          Emergency!
        </span>
      ) : null}
    </article>
  );
}
