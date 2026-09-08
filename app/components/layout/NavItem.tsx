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
 * A white fill with a green border and green label reads in both; the hover state
 * inverts it to the solid brand pill used elsewhere on the site.
 */
const ctaClasses =
  "m-4 block rounded-full border-2 border-vsp-500 bg-white px-5 py-2 text-center font-bold tracking-button text-vsp-700 no-underline transition-colors duration-300 hover:bg-vsp-500 hover:text-white focus:bg-vsp-500 focus:text-white lg:m-0 lg:inline-block lg:whitespace-nowrap";

const linkClasses =
  "block rounded-full p-4 no-underline hover:bg-white hover:text-vsp-500 lg:inline-block lg:rounded-full lg:py-1 lg:px-3";

export default function NavItem({ to, children, cta = false }: NavItemProps) {
  return (
    <li className="block w-full lg:mr-4 lg:w-auto">
      <NavLink
        className={({ isActive }) =>
          cta
            ? `${ctaClasses} ${isActive && "bg-vsp-500 text-white"}`
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
