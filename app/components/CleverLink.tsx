import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router";

interface CleverLinkProps extends LinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  /**
   * Skip the default green, underlined link styling. For callers like buttons that
   * set their own colours: Tailwind resolves conflicting utilities by stylesheet
   * order, not class order, so a caller's text colour cannot reliably override ours.
   */
  unstyled?: boolean;
}

const linkStyle = "text-vsp-500 hover:text-vsp-700 underline";

export default function CleverLink({
  to,
  prefetch = "intent",
  children,
  className,
  unstyled = false,
}: CleverLinkProps) {
  const classes = unstyled ? className : `${linkStyle} ${className}`;
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
      <Link className={classes} to={usedLink} prefetch={prefetch}>
        {children}
      </Link>
    );
  }
  return (
    <a href={to} target="_blank" className={classes} rel="noopener noreferrer">
      {children}
    </a>
  );
}
