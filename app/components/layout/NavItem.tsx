import type { ReactNode } from "react";
import { NavLink } from "react-router";

type NavItemProps = {
  to: string;
  children: ReactNode;
  /** Render as the Foundation-style pill CTA rather than a plain nav link. */
  cta?: boolean;
};

/*
 * The CTA pill has to stay legible in both header states: over the green hero,
 * where the header is transparent, and over white once it turns opaque on scroll.
 * A white fill with a green border and green label reads in both; hover inverts it
 * to the solid brand pill used elsewhere on the site, and so does the active page.
 *
 * Fill and label colours live only in the state classes, never in the base:
 * Tailwind resolves two conflicting utilities by stylesheet order, not by their
 * order in the class attribute, so layering the active colours over the base ones
 * yielded a white fill with the white active label — an invisible button. The
 * label is ink in every state; only the fill changes.
 */
const ctaBase =
  "m-4 block rounded-full border-2 border-vsp-500 px-5 py-2 text-center font-bold tracking-button no-underline transition-colors duration-300 lg:m-0 lg:inline-block lg:whitespace-nowrap";
const ctaIdle = "bg-white text-ink hover:bg-vsp-500 focus:bg-vsp-500";
const ctaActive = "bg-vsp-500 text-ink";

const linkClasses =
  "block rounded-full p-4 no-underline hover:bg-white hover:text-vsp-500 lg:inline-block lg:rounded-full lg:py-1 lg:px-3";

export default function NavItem({ to, children, cta = false }: NavItemProps) {
  return (
    <li className="block w-full lg:mr-4 lg:w-auto">
      <NavLink
        className={({ isActive }) =>
          cta
            ? `${ctaBase} ${isActive ? ctaActive : ctaIdle}`
            : `${linkClasses} ${
                isActive &&
                "border-l-4 border-l-vsp-500 bg-slate-100 lg:border-none lg:bg-white lg:underline lg:decoration-vsp-500"
              }`
        }
        to={to}
        prefetch="intent"
      >
        {children}
      </NavLink>
    </li>
  );
}
