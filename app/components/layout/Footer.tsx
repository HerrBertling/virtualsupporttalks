import { useParams } from "react-router";
import CleverLink from "../CleverLink";

type FooterNavLink = {
  link: { [char: string]: string };
  title: { [char: string]: string };
};

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

export default function LayoutFooter() {
  const { locale } = useParams();
  const usedLocale = locale || "de";
  return (
    <nav className="p-8 text-xs">
      <ul className="flex flex-col items-center justify-center md:flex-row">
        {footerNav.map(({ link, title }) => (
          <li key={link.de}>
            <CleverLink
              className="block p-2 underline md:px-2 md:py-4"
              to={link[usedLocale]}
            >
              {title[usedLocale]}
            </CleverLink>
          </li>
        ))}
      </ul>
      <a
        className="mx-auto my-8 block w-full max-w-[100px]"
        href="https://www.contentful.com/"
        rel="nofollow noreferrer"
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
