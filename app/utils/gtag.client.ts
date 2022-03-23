export const GA_TRACKING_ID = "G-3203CF2NDT";

declare global {
  interface Window {
    gtag: (
      option: string,
      gaTrackingId: string,
      options: Record<string, unknown>
    ) => void;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  if (window.gtag) {
    console.log("Tracking pageview", url);
    window.gtag("config", GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: Record<string, string>) => {
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};
