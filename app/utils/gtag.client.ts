import ReactGA4 from "react-ga4";

// react-ga4 is a CommonJS bundle that flags itself with `__esModule` and puts
// the instance on `exports.default`. Vite 8's Rolldown dep optimizer hands that
// raw `exports` object to the browser in dev instead of unwrapping it, so the
// default import arrives as `{ default, ReactGAImplementation }` and every
// method is undefined. Production builds unwrap it correctly, so accept both.
type GA4 = typeof ReactGA4;
const ReactGA: GA4 = (ReactGA4 as GA4 & { default?: GA4 }).default ?? ReactGA4;

const GA_TRACKING_ID = import.meta.env.VITE_GA_ID || "G-3203CF2NDT";

export const init = () => {
  ReactGA.initialize(GA_TRACKING_ID);
};

// // https://developers.google.com/analytics/devguides/collection/gtagjs/pages
// export const pageview = (url: string) => {
//   ReactGA.send({ hitType: "pageview", page: url });
// };

// export const conversion = () => {
//   ReactGA.gtag("config", "AW-11007581155");
// };

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value: number;
}) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

export const trackCoachClick = ({ type, coachName }: { type: string; coachName: string }) => {
  ReactGA.event({
    category: "coachClick",
    action: type,
    label: coachName,
  });
};

export const trackFilterClick = ({
  type,
  category,
  label,
}: {
  type: string;
  category: string;
  label: string;
}) => {
  ReactGA.event({
    category: category,
    action: type,
    label,
  });
};

export const trackSiteVisit = ({ label }: { label: string }) => {
  ReactGA.event({
    category: "event",
    action: "conversion",
    label,
  });
};
