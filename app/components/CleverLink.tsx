import { Link } from "react-router";
import { type LinkProps } from "react-router";
import type { ReactNode } from "react";

interface CleverLinkProps extends LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

export default function CleverLink({
  to,
  prefetch = "intent",
  children,
  className,
}: CleverLinkProps) {
  if (!to) {
    throw new Error('"to" prop is required');
  }
  if (to.startsWith("mailto:")) {
    return (
      <a href={to} className={className}>
        {children}
      </a>
    );
  }
  const isInternalLink =
    to.startsWith("https://www.virtualsupporttalks.de/") ||
    to.startsWith("/") ||
    !to.startsWith("https://");
  if (isInternalLink) {
    const usedLink = to.replace("https://www.virtualsupporttalks.de", "");
    return (
      <Link
        className={`text-vsp-500 hover:text-vsp-700 underline ${className}`}
        to={usedLink}
        prefetch={prefetch}
      >
        {children}
      </Link>
    );
  }
  return (
    <a
      href={to}
      target="_blank"
      className={`text-vsp-500 hover:text-vsp-700 underline ${className}`}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
