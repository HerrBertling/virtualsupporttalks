import { NavLink } from "@remix-run/react";
import type { ReactNode } from "react";

type NavItemProps = {
  to: string;
  children: ReactNode;
};

export default function NavItem({ to, children }: NavItemProps) {
  return (
    <li className="block w-full lg:mr-4 lg:w-auto">
      <NavLink
        className={({ isActive }) =>
          `block rounded-md p-4 no-underline hover:bg-white hover:text-vsp-500 lg:inline-block lg:rounded-md lg:py-1 lg:px-2 ${
            isActive &&
            "border-l-4 border-l-vsp-500 bg-gray-100 lg:border-none lg:bg-white lg:underline lg:decoration-vsp-500"
          }`
        }
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
}
