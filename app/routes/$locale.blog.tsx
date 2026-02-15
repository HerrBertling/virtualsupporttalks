import { Outlet } from "react-router";
import { getSeoMeta } from "~/seo";
import type { Route } from "./+types/$locale.blog";

export const meta: Route.MetaFunction = () => {
  const seoMeta = getSeoMeta({
    title: "Lesezeit – das Redezeit Blog.",
    description: "Beiträge rund um Redezeit.",
  });
  return [
    {
      ...seoMeta,
    },
  ];
};

export default function BlogWrapepr() {
  return (
    <div className="container mx-auto max-w-6xl">
      <Outlet />
    </div>
  );
}
