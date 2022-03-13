import { NavLink } from "remix";
import type { ReactNode } from "react";

type NavItemProps = {
  to: string;
  children: ReactNode;
};

export default function NavItem({ to, children }: NavItemProps) {
  return (
    <li className="w-full block lg:w-auto lg:mr-1">
      <NavLink
        className={({ isActive }) =>
          `block p-4 no-underline lg:inline-block lg:py-1 lg:px-2 lg:rounded-md ${
            isActive &&
            "bg-gray-100 lg:bg-white border-l-4 border-l-vsp-500 lg:border-none"
          }`
        }
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
}
