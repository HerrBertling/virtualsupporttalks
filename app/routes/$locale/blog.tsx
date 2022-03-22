import { Outlet } from "remix";
import type { MetaFunction } from "remix";
import { getSeoMeta } from "~/seo";

export const meta: MetaFunction = () => {
  let seoMeta = getSeoMeta({
    title: "Lesezeit – das Redezeit Blog.",
    description: "Beiträge rund um Redezeit.",
  });
  return {
    ...seoMeta,
  };
};

export default function BlogWrapepr() {
  return (
    <div className="container mx-auto max-w-6xl">
      <Outlet />
    </div>
  );
}