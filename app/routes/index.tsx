import { LoaderFunction, redirect } from "@remix-run/node";

export const loader: LoaderFunction = () => {
  console.warn("REDIRECTING FROM INDEX FILE");
  throw redirect("/de", 301);
};
