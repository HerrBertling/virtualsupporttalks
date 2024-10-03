import { useRef } from "react";

import { useIntersectionObserver } from "usehooks-ts";

export default function FadeIn({ children }: { children: React.ReactNode }) {
  const { ref, isIntersecting } = useIntersectionObserver({});

  return (
    <div
      ref={ref}
      className={`translate-y-10 scale-95 opacity-0 transition-all duration-300 ${
        isIntersecting && "transform-none opacity-100"
      }`}
    >
      {children}
    </div>
  );
}
