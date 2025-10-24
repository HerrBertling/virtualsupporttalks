import type { Entry } from "contentful";
import { useEffect } from "react";
import { trackSiteVisit } from "~/utils/gtag.client";
import type { TypeTrackingGaSkeleton } from "../../../types/contentful";

type TrackingGaProps = Entry<TypeTrackingGaSkeleton, "WITHOUT_UNRESOLVABLE_LINKS">["fields"];

export default function TrackingGa({ title }: TrackingGaProps) {
  useEffect(() => {
    trackSiteVisit({ label: title });
  }, [title]);

  return null;
}
