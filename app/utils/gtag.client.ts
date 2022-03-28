import ReactGA from "react-ga4";

const GA_TRACKING_ID = "G-3203CF2NDT";

export const init = () => {
  ReactGA.initialize(GA_TRACKING_ID);
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string) => {
  ReactGA.send({ hitType: "pageview", page: url });
};

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({ action, category, label, value }) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};
