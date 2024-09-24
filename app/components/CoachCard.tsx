import type { Asset } from "contentful";
import type { ReactNode } from "react";
import { ReactCountryFlag } from "react-country-flag";
import { useTranslation } from "react-i18next";
import GlobeIcon from "~/components/icons/GlobeIcon";
import MailIcon from "~/components/icons/MailIcon";
import PhoneIcon from "~/components/icons/PhoneIcon";
import type { EmailTemplate } from "~/utils/contentful";
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
  mhfaTraining?: Asset;
  completedMhfaTraining?: string;
  message?: EmailTemplate;
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
    mhfaTraining,
    completedMhfaTraining,
    children,
    message,
  } = props;

  const { t } = useTranslation("searchingCoach");
  const flagCodes = getFlagCode(languages);
  const mailSubject = message ? message.subject : "Ich brauche Redezeit!";
  const mailContent = message
    ? message.content
    : encodeURI(
        "Hallo, ich würde gerne kostenfreie REDEZEIT in Anspruch nehmen und bitte um einen Termin.\n\nSie können mich unter dieser Email-Adresse oder unter folgender Telefonnummer erreichen:\n\nXXXXX XXXXX XXXX\n\nDanke für dieses wertvolle Angebot.\n\nNAME",
      );
  const contactMethods = [];
  if (email) {
    const address = `mailto:${email}?subject=${mailSubject}&body=${mailContent}`;
    contactMethods.push({
      type: "email",
      address,
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

  const imagePath = image?.fields?.file?.url;
  const mhfaTrainingLabel = mhfaTraining?.fields?.file?.url;

  return (
    <article
      className={`mb-3 break-inside-avoid relative grid grid-cols-[4rem_1fr] grid-rows-[4rem_1fr] gap-3 overflow-hidden rounded-md bg-white px-3 py-3 shadow-lg`}
    >
      <div className="shadow-inset-md col-start-1 row-start-1 h-16 w-16 overflow-hidden rounded-full">
        {imagePath ? (
          <picture>
            <source
              srcSet={`${imagePath}?w=120&h=120&fm=avif&f=face&fit=thumb, ${imagePath}?w=240&h=240&fm=avif&f=face&fit=thumb 2x`}
              type="image/avif"
            />
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
      </div>
      <header className="col-start-2 row-start-1 self-center">
        <h3 className="text-xl font-bold text-slate-500">{name}</h3>

        <section className="inline-flex items-center justify-center gap-2 px-1">
          <p className="text-sm font-extralight text-slate-500">
            {t("languages")}
            {flagCodes.map((lang, index) => (
              <ReactCountryFlag
                key={index}
                className="px-1"
                style={{
                  fontSize: "1.2em",
                }}
                countryCode={lang}
              />
            ))}
          </p>

          {mhfaTraining ? (
            <div className="inline-flex items-center ">
              |
              <picture>
                <source
                  srcSet={`${mhfaTrainingLabel}?w=25&h=25&fm=png, ${mhfaTrainingLabel}?w=240&h=240&fm=png&f=face&fit=thumb 2x`}
                  type="image/png"
                />
                <img
                  src={`${mhfaTrainingLabel}`}
                  alt={completedMhfaTraining}
                  className="ml-1 p-1 w-6 h-6 object-contain"
                  loading="lazy"
                />
              </picture>
              <span className="absolute pl-10 text-center text-sm text-slate-500 opacity-0 duration-300 hover:opacity-100">
                {completedMhfaTraining}
              </span>
            </div>
          ) : null}
        </section>
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
            rel="noopener noreferrer"
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
        <span className="absolute right-4 top-0 w-48 translate-x-16 translate-y-8 rotate-45 transform bg-orange-300 py-1 text-center text-xs text-orange-900 shadow-md">
          {t("emergency")}
        </span>
      ) : null}
    </article>
  );
}
