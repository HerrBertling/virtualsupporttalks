import ReactGA from "react-ga4";

const GA_TRACKING_ID = "G-3203CF2NDT";

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
