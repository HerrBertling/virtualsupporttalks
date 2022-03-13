import { LoaderFunction, redirect } from "remix";

export const loader: LoaderFunction = () => {
  console.warn("REDIRECTING FROM INDEX FILE");
  throw redirect("/de", 301);
};
