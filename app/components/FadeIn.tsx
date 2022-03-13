import { useRef } from "react";

import { useIntersectionObserver } from "usehooks-ts";

export default function FadeIn({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const entry = useIntersectionObserver(ref, {});
  const isVisible = !!entry?.isIntersecting;

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-10 scale-95 transition-all duration-300 ${
        isVisible && "opacity-100 transform-none"
      }`}
    >
      {children}
    </div>
  );
}
