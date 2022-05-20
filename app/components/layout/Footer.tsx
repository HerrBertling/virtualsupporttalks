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
      <a
        className="my-8 mx-auto block w-full max-w-[100px]"
        href="https://www.contentful.com/"
        rel="nofollow"
        target="_blank"
      >
        <img
          src="https://images.ctfassets.net/fo9twyrwpveg/44baP9Gtm8qE2Umm8CQwQk/c43325463d1cb5db2ef97fca0788ea55/PoweredByContentful_LightBackground.svg"
          className="mx-auto w-full max-w-[100px]"
          alt="Powered by Contentful"
        />
      </a>
    </nav>
  );
}
