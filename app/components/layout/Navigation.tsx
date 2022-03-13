import NavItem from "./NavItem";
import { useState } from "react";
import type {
  INavigationItem,
  LOCALE_CODE,
} from "../../../@types/generated/contentful";

export default function Navigation({
  nav,
  lang,
}: {
  nav: INavigationItem[];
  lang: LOCALE_CODE;
}) {
  const [open, setOpen] = useState(false);
  const navItems = nav.map((item) => {
    const { page, title, url } = item.fields;
    const id = item.sys.id;
    let path = "/";
    if (url) {
      path = url.replace("https://www.virtualsupporttalks.de/", "");
    }
    if (page?.fields?.slug) {
      path = `/${lang}/${page.fields.slug}`;
    }
    return {
      title,
      path,
      id,
    };
  });
  return (
    <nav className="relative z-30 lg:max-w-4xl">
      <button
        className={`lg:hidden rounded-full w-12 h-12 flex items-center justify-center ${
          open && "bg-white"
        }`}
        aria-expanded={open}
        aria-controls="navigation"
        onClick={() => setOpen(!open)}
      >
        <span className="sr-only">Menu</span>
        <span className="inline-block w-6 h-6">
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
        className={`flex flex-col rounded-md overflow-hidden shadow-2xl fixed top-24 right-0 w-screen max-w-[90vw] transition-transform duration-300 bg-white lg:flex-row lg:static lg:w-auto lg:shadow-none lg:rounded-none lg:bg-transparent lg:justify-end lg:items-center lg:h-auto lg:transform-none lg:top-auto lg:left-auto z-30 ${
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
        {lang === "de" ? (
          <NavItem to="/en">English version</NavItem>
        ) : (
          <NavItem to="/de">Deutsche Version</NavItem>
        )}
      </ul>
    </nav>
  );
}
