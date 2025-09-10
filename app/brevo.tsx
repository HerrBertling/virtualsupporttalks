import { useEffect } from "react";

const Brevo = () => {
useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.id = "brevo-script";
    script.src = "https://cdn.brevo.com/js/sdk-loader.js";
    document.head.appendChild(script);
  }, []);
return (
<script dangerouslySetInnerHTML={{
    __html: `window.Brevo = window.Brevo || []; Brevo.push(["init",{client_key: "ir90lm6djp5yl513z778118q"}]);`
}}/>
)
};

export default Brevo;