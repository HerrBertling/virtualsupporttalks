import { Outlet } from "remix";

export default function BlogWrapepr() {
  return (
    <div className="container mx-auto max-w-6xl">
      <Outlet />
    </div>
  );
}
