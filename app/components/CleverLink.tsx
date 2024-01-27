import { Link } from "@remix-run/react";
import type { RemixLinkProps } from "@remix-run/react/dist/components";
import type { ReactNode } from "react";

interface CleverLinkProps extends RemixLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  prefetch?: "intent" | "render" | "none" | "viewport";
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
      <Link className={className} to={usedLink} prefetch={prefetch}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={to}
      target="_blank"
      className={className}
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
