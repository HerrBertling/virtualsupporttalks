import { NavLink } from "remix";
import type { ReactNode } from "react";

type NavItemProps = {
  to: string;
  children: ReactNode;
};

export default function NavItem({ to, children }: NavItemProps) {
  return (
    <li className="block w-full lg:mr-1 lg:w-auto">
      <NavLink
        className={({ isActive }) =>
          `block p-4 no-underline lg:inline-block lg:rounded-md lg:py-1 lg:px-2 ${
            isActive &&
            "border-l-4 border-l-vsp-500 bg-gray-100 lg:border-none lg:bg-white"
          }`
        }
        to={to}
      >
        {children}
      </NavLink>
    </li>
  );
}
