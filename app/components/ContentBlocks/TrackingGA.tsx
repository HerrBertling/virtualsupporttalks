import { useEffect } from "react";
import { trackSiteVisit } from "~/utils/gtag.client";
import type { ITrackingGaFields } from "../../../@types/generated/contentful";

export default function TrackingGa({ title }: ITrackingGaFields) {
  useEffect(() => {
    trackSiteVisit({ label: title });
  }, []);

  return null;
}
