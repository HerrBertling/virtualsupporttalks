import { useEffect } from "react";
import { trackSiteVisit } from "~/utils/gtag.client";
import type { Entry } from "contentful";
import type { TypeTrackingGaSkeleton } from "../../../@types/generated/contentful";

type TrackingGaProps = Entry<TypeTrackingGaSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">["fields"];

export default function TrackingGa({ title }: TrackingGaProps) {
  useEffect(() => {
    trackSiteVisit({ label: title });
  }, [title]);

  return null;
}
