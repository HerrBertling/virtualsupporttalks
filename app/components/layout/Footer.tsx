import CleverLink from "../CleverLink";

export default function LayoutFooter({}) {
  const footerNav = [
    {
      link: { de: "/impressum/", en: "/en/imprint/" },
      title: { de: "Impressum", en: "Legal info" },
    },
    {
      link: { de: "/datenschutz/", en: "/en/privacy/" },
      title: { de: "Datenschutz", en: "Privacy" },
    },
  ];
  return (
    <nav className="p-8 text-xs">
      <ul className="flex flex-col items-center justify-center md:flex-row">
        {footerNav.map(({ link, title }) => (
          <li key={link.de}>
            <CleverLink
              className="block p-2 underline md:py-4 md:px-2"
              to={link.de}
            >
              {title.de}
            </CleverLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
