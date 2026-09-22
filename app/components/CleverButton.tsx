import type { ReactNode } from "react";
import CleverLink from "./CleverLink";

type buttonVariant = "primary" | "secondary" | "inverted";

type CleverButtonProps = {
  variant?: buttonVariant;
  children: ReactNode;
  to: string;
};

// Foundation button language: a full pill, 15/33 padding, tracked out 1px, sentence case.
// "secondary" is their ghost treatment — 2px outline on a transparent fill.
const variantClasses: Record<buttonVariant, string> = {
  primary: "bg-vsp-500 text-ink border-2 border-vsp-500 hover:bg-vsp-600 hover:border-vsp-600",
  secondary: "bg-transparent text-ink border-2 border-vsp-500 hover:bg-vsp-100",
  // Ghost treatment for use on a brand-colour background.
  inverted: "bg-transparent text-ink border-2 border-white hover:bg-white",
};

export default function CleverButton({ children, variant = "primary", to }: CleverButtonProps) {
  return (
    <CleverLink
      to={to}
      unstyled
      className={`font-inherit inline-flex items-center justify-center rounded-full px-[33px] py-[15px] tracking-button no-underline transition-colors duration-300 md:text-lg ${variantClasses[variant]}`}
    >
      {children}
    </CleverLink>
  );
}
