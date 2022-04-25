import { NavLink } from "@remix-run/react";
import { useEffect, useState } from "react";
import type {
  INavigationItem,
  LOCALE_CODE,
} from "../../../@types/generated/contentful";
import HeaderNavigation from "./Navigation";

export default function LayoutHeader({
  nav,
  lang,
}: {
  nav: INavigationItem[];
  lang: LOCALE_CODE;
}) {
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = () => {
    window.scrollY >= 40 ? setHasScrolled(true) : setHasScrolled(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <header
      className={`max-w-screen fixed top-0 z-50 h-20 w-full bg-transparent transition-all duration-300 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:z-10 after:block after:bg-white after:opacity-0 after:transition-opacity after:duration-300 after:content-[\'\'] ${
        hasScrolled && "h-16 after:opacity-100"
      }`}
    >
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-4">
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
