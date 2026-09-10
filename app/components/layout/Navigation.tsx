import { useEffect, useState } from "react";
import type { INavigationItem, LOCALE_CODE } from "types/contentful";
import LanguageSwitcher from "../LanguageSwitcher";
import NavItem from "./NavItem";

/*
 * The Fürstenberg Foundation carries its primary CTA as a pill in the nav bar;
 * ours is "Ich brauche Redezeit!". The slug is stable across all four locales
 * (de uses ich-suche-redezeit, en/ru/uk use i-need-speaking-time), so match on
 * that rather than on nav position or the translated label.
 */
const CTA_SLUGS = ["ich-suche-redezeit", "i-need-speaking-time"];

export default function Navigation({ nav, lang }: { nav: INavigationItem[]; lang: LOCALE_CODE }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setOpen(false);
  }, []);

  const navItems = nav
    .map((item) => {
      const { page, title, url } = item.fields;
      const id = item.sys.id;
      let path = "/";
      if (url) {
        path = url.replace("https://www.virtualsupporttalks.de", "");
      }
      if (page?.fields?.slug) {
        path = `/${lang}/${page.fields.slug}`;
      } else if (path.startsWith("/")) {
        path = `/${lang}${path}`;
      }
      return {
        title: title ?? "",
        path,
        id,
        isCta: CTA_SLUGS.some((slug) => path.endsWith(`/${slug}`)),
      };
    })
    .filter((item) => {
      if (["uk", "ru"].includes(lang)) {
        return item.title !== "Blog";
      }
      return item;
    });

  // The Foundation sits its CTA at the end of the bar, immediately before the
  // language switcher, so it reads as an action rather than another nav link.
  const orderedNavItems = [
    ...navItems.filter((item) => !item.isCta),
    ...navItems.filter((item) => item.isCta),
  ];
  return (
    <nav className="relative z-30 flex items-center lg:max-w-4xl">
      <button
        className={`flex h-12 w-12 items-center justify-center rounded-full lg:hidden ${
          open && "bg-white"
        }`}
        type="button"
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        <span className="sr-only">Menu</span>
        <span className="inline-block h-6 w-6">
          {!open ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Menu icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <title>Close icon</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </span>
      </button>
      <ul
        className={`fixed top-24 right-0 z-30 flex w-screen max-w-[90vw] flex-col overflow-hidden rounded-panel bg-white shadow-2xl transition-transform duration-300 lg:static lg:top-auto lg:left-auto lg:h-auto lg:w-auto lg:transform-none lg:flex-row lg:items-center lg:justify-end lg:rounded-none lg:bg-transparent lg:shadow-none ${
          open ? "-translate-x-[5vw]" : "translate-x-[90vw]"
        }`}
      >
        {orderedNavItems.map((item) => {
          return (
            <NavItem key={item.id} to={item.path} cta={item.isCta}>
              {item.title}
            </NavItem>
          );
        })}
      </ul>
      <LanguageSwitcher lang={lang} />
    </nav>
  );
}
