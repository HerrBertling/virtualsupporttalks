import {
  INavigationItem,
  LOCALE_CODE,
} from "../../../@types/generated/contentful";
import type { ReactNode } from "react";
import LayoutFooter from "./Footer";
import LayoutHeader from "./Header";

type BasicLayoutProps = {
  children: ReactNode;
  nav: INavigationItem[];
  lang: LOCALE_CODE;
};

export default function BasicLayout({ nav, lang, children }: BasicLayoutProps) {
  return (
    <div>
      <LayoutHeader nav={nav} lang={lang} />
      <main>{children}</main>
      <LayoutFooter />
    </div>
  );
}
