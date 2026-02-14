import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import type { INavigationItem, LOCALE_CODE } from "types/contentful";
import LayoutFooter from "./Footer";
import LayoutHeader from "./Header";

type BasicLayoutProps = {
  children: ReactNode;
  nav: INavigationItem[];
  lang: LOCALE_CODE;
};

export default function BasicLayout({ nav, lang, children }: BasicLayoutProps) {
  const { t } = useTranslation("common");
  return (
    <div>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-vsp-900"
      >
        {t("skipToContent")}
      </a>
      <LayoutHeader nav={nav} lang={lang} />
      <main id="main-content">{children}</main>
      <LayoutFooter />
    </div>
  );
}
