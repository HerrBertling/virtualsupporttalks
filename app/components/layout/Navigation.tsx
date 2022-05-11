import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getCurrentLocale } from "~/utils/locales";
import type {
  INavigationItem,
  LOCALE_CODE,
} from "../../../@types/generated/contentful";
import LanguageSwitcher from "../LanguageSwitcher";
import NavItem from "./NavItem";

export default function Navigation({
  nav,
  lang,
}: {
  nav: INavigationItem[];
  lang: LOCALE_CODE;
}) {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const currentLang = getCurrentLocale();

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
      } else if (lang != "de") {
        path = `/${lang}${path}`;
      }
      return {
        title,
        path,
        id,
      };
    })
    .filter((item) => {
      if (["uk", "ru"].includes(currentLang)) {
        return item.title !== "Blog";
      }
      return item;
    });
  return (
    <nav
      className="relative z-30 flex items-center lg:max-w-4xl"
      aria-roledescription="navigation"
    >
      <button
        className={`flex h-12 w-12 items-center justify-center rounded-full lg:hidden ${
          open && "bg-white"
        }`}
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
        className={`fixed top-24 right-0 z-30 flex w-screen max-w-[90vw] flex-col overflow-hidden rounded-md bg-white shadow-2xl transition-transform duration-300 lg:static lg:top-auto lg:left-auto lg:h-auto lg:w-auto lg:transform-none lg:flex-row lg:items-center lg:justify-end lg:rounded-none lg:bg-transparent lg:shadow-none ${
          open ? "-translate-x-[5vw]" : "translate-x-[90vw]"
        }`}
      >
        {navItems.map((item) => {
          return (
            <NavItem key={item.id} to={item.path}>
              {item.title}
            </NavItem>
          );
        })}
        <LanguageSwitcher />
      </ul>
    </nav>
  );
}
