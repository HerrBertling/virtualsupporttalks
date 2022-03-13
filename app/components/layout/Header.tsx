import {
  INavigationItem,
  LOCALE_CODE,
} from "../../../@types/generated/contentful";
import { NavLink } from "remix";

import HeaderNavigation from "./Navigation";

export default function LayoutHeader({
  nav,
  lang,
}: {
  nav: INavigationItem[];
  lang: LOCALE_CODE;
}) {
  const hasScrolled = false;
  return (
    <header
      className={`h-20 fixed top-0 w-full max-w-screen bg-transparent z-50 transition-all duration-300 after:content-[\'\'] after:block after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-white after:opacity-0 after:z-10 after:transition-opacity after:duration-300 ${
        hasScrolled && "h-16 after:opacity-100"
      }`}
    >
      <div className="flex justify-between items-center mx-auto max-w-6xl px-4 h-full w-full">
        <em className="relative z-20">
          <NavLink to="/">
            <img
              className={`max-h-12 w-auto transition-transform ${
                hasScrolled && "scale-[0.8]"
              }`}
              src="/img/logo.png"
              alt="Virtual Support Talks Logo"
            />
          </NavLink>
        </em>
        <HeaderNavigation nav={nav} lang={lang} />
      </div>
    </header>
  );
}
