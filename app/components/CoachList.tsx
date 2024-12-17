import type { ReactNode } from "react";

export default function CoachList({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-100">
      <section className="mx-auto block max-w-7xl gap-x-6 px-4 columns-sm">
        {children}
      </section>
    </div>
  );
}
