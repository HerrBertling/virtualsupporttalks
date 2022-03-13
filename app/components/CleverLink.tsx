import type { ReactNode } from "react";
import type { RemixLinkProps } from "@remix-run/react/components";
import { Link } from "remix";

interface CleverLinkProps extends RemixLinkProps {
  to: string | undefined;
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
