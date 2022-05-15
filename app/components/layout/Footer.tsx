import { getCurrentLocale } from "~/utils/locales";
import CleverLink from "../CleverLink";

type FooterNavLink = {
  link: { [char: string]: string };
  title: { [char: string]: string };
};

export default function LayoutFooter({}) {
  const footerNav: FooterNavLink[] = [
    {
      link: {
        de: "/impressum/",
        en: "/en/imprint/",
        ru: "/ru/imprint/",
        uk: "/uk/imprint/",
      },
      title: {
        de: "Impressum",
        en: "Legal info",
        ru: "Юридическая информация",
        uk: "Юридична інформація",
      },
    },
    {
      link: {
        de: "/datenschutz/",
        en: "/en/privacy/",
        ru: "/ru/privacy/",
        uk: "/uk/privacy/",
      },
      title: {
        de: "Datenschutz",
        en: "Privacy",
        ru: "Конфиденциальность",
        uk: "Конфіденційність",
      },
    },
  ];

  const currentLocale = getCurrentLocale();
  return (
    <nav className="p-8 text-xs">
      <ul className="flex flex-col items-center justify-center md:flex-row">
        {footerNav.map(({ link, title }) => (
          <li key={link.de}>
            <CleverLink
              className="block p-2 underline md:py-4 md:px-2"
              to={link[currentLocale]}
            >
              {title[currentLocale]}
            </CleverLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
