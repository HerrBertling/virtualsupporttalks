import type { ReactNode } from "react";
import { useParams } from "@remix-run/react";

export default function LanguageFence({
  allowedLanguages,
  children,
}: {
  allowedLanguages: string[];
  children: ReactNode;
}) {
  const { locale } = useParams();
  console.log({ locale, allowedLanguages });
  if (!allowedLanguages.includes(locale ?? "")) {
    return null;
  }
  return children;
}
