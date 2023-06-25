import { useEffect } from "react";

const GA_TRACKING_ID = "GTM-NH6W3MZ";

const GtmScript = () => {
  useEffect(() => {
    // GTM script injection logic
    (function (w: any, d: any, s: string, l: string, i: any) {
      // GTM script code
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", GA_TRACKING_ID);
  }, []);

  return null;
};

export default GtmScript;
