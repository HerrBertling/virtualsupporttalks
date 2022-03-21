import i18next from "i18next";
import { hydrate } from "react-dom";
import { I18nextProvider, initReactI18next } from "react-i18next";
import { RemixBrowser } from "remix";
import i18nextOptions from "./utils/i18nextOptions";

if (!i18next.isInitialized)
  i18next
    .use(initReactI18next)
    .init(i18nextOptions)
    .then(() => {
      // then hydrate your app wrapped in the RemixI18NextProvider
      i18next.services.backendConnector.backend = {
        read: (language, namespace, callback) => callback(null, {}),
      };

      return hydrate(
        <I18nextProvider i18n={i18next}>
          <RemixBrowser />
        </I18nextProvider>,
        document
      );
    });
