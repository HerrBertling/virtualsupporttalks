import type { Asset } from "contentful";
import type { ReactNode } from "react";
import ReactCountryFlag from "react-country-flag";
import { useTranslation } from "react-i18next";
import GlobeIcon from "~/components/icons/GlobeIcon";
import MailIcon from "~/components/icons/MailIcon";
import PhoneIcon from "~/components/icons/PhoneIcon";
import getGenderCode from "~/utils/getGenderCode";
import getFlagCode from "~/utils/getFlagCodes";
import { trackCoachClick } from "~/utils/gtag.client";

type CoachProps = {
  email?: string;
  url?: string;
  phone?: string;
  name?: string;
  image?: Asset;
  emergency?: boolean;
  children: ReactNode;
  languages: string[] | undefined;
  gender?: string[] | undefined;
};

export default function CoachCard(props: CoachProps) {
  const {
    url,
    name,
    image,
    emergency,
    phone,
    email,
    languages,
    gender,
    children,
  } = props;

  const { t } = useTranslation("searchingCoach");
  const flagCodes = getFlagCode(languages);
  const genderTags = getGenderCode(gender);

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
    >
      <a
        href={url ? url : `mailto:${email}`}
        target="_blank"
        rel="noopener"
        className="shadow-inset-md col-start-1 row-start-1 h-16 w-16 overflow-hidden rounded-full"
        onClick={() => trackCoachClick({ type: "image", coachName: name! })}
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
          onClick={() => trackCoachClick({ type: "image", coachName: name! })}
        >
          <h3 className="text-xl font-bold text-slate-500 transition-colors hover:text-vsp-500">
            {name}
          </h3>
          <h2 className="text-sm font-extralight text-slate-500">
            {t("languages")}
            {flagCodes.map((lang, index) => {
              return (
                <ReactCountryFlag
                  key={index}
                  className="px-1"
                  style={{
                    fontSize: "1.2em",
                  }}
                  countryCode={lang}
                />
              );
            })}
          </h2>
          <h2 className="text-sm font-extralight text-slate-500">
            {t("gender")}
            {genderTags.map((gender, index) => {
              return (
                <div
                  className="inline-flex px-1"
                  style={{
                    fontSize: "1em",
                  }}
                  key={index}
                >
                  <h2>: {gender}</h2>
                </div>
              );
            })}
          </h2>
        </a>
      </header>
      <div className="prose prose-sm prose-slate col-span-full row-start-2">
        {children}
      </div>
      <div className="col-span-2 col-start-1 flex flex-row justify-between gap-2">
        {contactMethods.map((method) => (
          <a
            key={method.type}
            href={method.address}
            target="_blank"
            rel="noopener"
            className="flex w-full flex-grow items-center justify-center rounded-md border border-vsp-400 py-2 text-sm text-slate-600 no-underline transition-colors duration-200 hover:border-vsp-700 hover:bg-vsp-100 hover:text-vsp-900 focus:border-vsp-700 focus:bg-vsp-100 focus:text-vsp-900 active:border-vsp-700 active:bg-vsp-100 active:text-vsp-900"
            onClick={() =>
              trackCoachClick({ type: method.type, coachName: name! })
            }
          >
            {method.type === "phone" ? (
              <PhoneIcon classNames="h6 mr-1 w-6" />
            ) : method.type === "email" ? (
              <MailIcon classNames="h6 mr-1 w-6" />
            ) : (
              <GlobeIcon classNames="h6 mr-1 w-6" />
            )}
            <span>{t(method.type)}</span>
          </a>
        ))}
      </div>
      {emergency ? (
        <span className="absolute top-0 right-4 w-48 translate-x-16 translate-y-8 rotate-45 transform bg-orange-300 py-1 text-center text-xs text-orange-900 shadow-md">
          {t("emergency")}
        </span>
      ) : null}
    </article>
  );
}
