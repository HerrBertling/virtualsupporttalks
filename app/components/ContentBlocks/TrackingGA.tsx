import type { ITrackingGaFields } from "../../../@types/generated/contentful";

export default function TrackingGa({ title }: ITrackingGaFields) {
  console.log("title", title);
  return <h1> {title}</h1>;
}
