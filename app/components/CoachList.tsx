import type { ReactNode } from "react";

export default function CoachList({ children }: { children: ReactNode }) {
  return (
    <div className="bg-slate-100">
      <section className="mx-auto grid max-w-7xl grid-cols-coachgrid items-start gap-x-6 gap-y-12 py-12 px-4">
        {children}
      </section>
    </div>
  );
}
