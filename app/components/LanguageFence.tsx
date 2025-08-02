import type { ReactNode } from "react";
import { useParams } from "react-router";

export default function LanguageFence({
  allowedLanguages,
  children,
}: {
  allowedLanguages: string[];
  children: ReactNode;
}) {
  const { locale } = useParams();
  if (!allowedLanguages.includes(locale ?? "")) {
    return null;
  }
  return children;
}
