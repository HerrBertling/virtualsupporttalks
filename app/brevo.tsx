const Brevo = () => {
return (
<>
<script dangerouslySetInnerHTML={{
    __html: `"use strict";
(function () {
  let basePath = "https://sibautomation.com/";
  let findKey = function (arr) {
    if (Array.isArray(arr)) {
      for (const element of arr) {
        if (
          Array.isArray(element) &&
          element[0] === "init" &&
          typeof element[1] === "object" &&
          typeof element[1].client_key === "string"
        ) {
          return element[1].client_key;
        }
      }
    }
  };
  let scriptInjected = false;
  let injectScript = function (clientKey) {
    if (scriptInjected) return;
    scriptInjected = true;
    let scriptID = "sendinblue-js";
    if (self.document) {
      if (document.getElementById(scriptID)) {
        console.warn("Brevo script already loaded");
        return;
      }
      let url = basePath + "sa.js?key=" + clientKey;
      let firstScript = document.getElementsByTagName("script")[0];
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.id = scriptID;
      script.async = true;
      script.src = url;
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      } else {
        (document.head || document.body).prepend(script);
      }
    } else if (self.ServiceWorkerGlobalScope && self.importScripts) {
      importScripts(basePath + "sw.js?key=" + clientKey);
    }
  };

  let loadSDK = function () {
    let key = findKey(self.Brevo);
    if (key) {
      injectScript(key);
      return;
    }
    self.Brevo = self.Brevo || [];
    if (Array.isArray(self.Brevo)) {
      let originalPush = self.Brevo.push;
      self.Brevo.push = function () {
        originalPush.apply(self.Brevo, arguments);
        let key = findKey(Array.from(arguments));
        if (key) {
          injectScript(key);
          self.Brevo.push = originalPush;
        }
      };
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("message", function (event) {
      let data = event.data;
      if (!(data instanceof Object)) return;
      if (data.sdk !== "Brevo") return;
      switch (data.type) {
        case "ping":
          if (event.ports && event.ports.length > 0) {
            event.ports[0].postMessage({ type: "pong" });
          }
          break;
        case "init": {
          let initOptions = data.initOpts;
          if (!initOptions) return;
          let clientKey = initOptions.client_key;
          window.Brevo = window.Brevo || [];
          window.Brevo.push(["init", initOptions]);
          window.Brevo.push(function () {
            if (event.ports && event.ports.length > 0) {
              event.ports[0].postMessage({ type: "ready" });
            }
          });
          injectScript(clientKey);
          break;
        }
      }
    });
    let searchParams = new URLSearchParams(window.location.search);
    let brevoInitOptsString = searchParams.get("brevoInitOpts");
    if (brevoInitOptsString) {
      try {
        let brevoInitOpts = JSON.parse(brevoInitOptsString);
        let clientKey = (brevoInitOpts || {}).client_key;
        if (clientKey) {
          window.Brevo = window.Brevo || [];
          window.Brevo.push(["init", brevoInitOpts]);
          injectScript(clientKey);
        }
      } catch (e) {
        console.error(
          "Could not initialize Brevo from query string param brevoInitOpts",
          e
        );
      }
    }
  }
  loadSDK();
})();
`
}}/>  
<script dangerouslySetInnerHTML={{
    __html: `window.Brevo = window.Brevo || []; Brevo.push(["init",{client_key: "ir90lm6djp5yl513z778118q"}]);`
}}/>
    
</>)
}

export default Brevo;