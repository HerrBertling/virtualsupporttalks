import type { V2_MetaFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Lesezeit – das Redezeit Blog." },
    { description: "Beiträge rund um Redezeit." },
  ];
};

export default function BlogWrapper() {
  return (
    <div className="container mx-auto max-w-6xl">
      <Outlet />
    </div>
  );
}
