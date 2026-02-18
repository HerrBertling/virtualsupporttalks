import { redirect } from "react-router";
import type { Route } from "./+types/_index";

export function loader(_args: Route.LoaderArgs) {
  throw redirect("/de", 301);
}
