import { useEffect } from "react";

const Brevo = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.id = "brevo-script";
    script.src = "https://cdn.brevo.com/js/sdk-loader.js";
    document.head.appendChild(script);
    const scriptInit = document.createElement("script");
    scriptInit.type = "text/javascript";
    scriptInit.async = true;
    scriptInit.id = "brevo-init";
    const brevoKey = import.meta.env.VITE_BREVO_KEY || "ir90lm6djp5yl513z778118q";
    scriptInit.innerHTML = `window.Brevo = window.Brevo || []; Brevo.push(["init",{client_key: "${brevoKey}"}]);`;
    document.head.appendChild(scriptInit);
  }, []);
  return null;
};

export default Brevo;
