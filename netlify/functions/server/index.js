var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/@remix-run/dev/compiler/shims/react.ts
var React;
var init_react = __esm({
  "node_modules/@remix-run/dev/compiler/shims/react.ts"() {
    React = __toModule(require("react"));
  }
});

// node_modules/remix/index.js
var require_remix = __commonJS({
  "node_modules/remix/index.js"(exports) {
    init_react();
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var node = require("@remix-run/node");
    Object.defineProperty(exports, "createFileSessionStorage", {
      enumerable: true,
      get: function() {
        return node.createFileSessionStorage;
      }
    });
    Object.defineProperty(exports, "unstable_createFileUploadHandler", {
      enumerable: true,
      get: function() {
        return node.unstable_createFileUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_createMemoryUploadHandler", {
      enumerable: true,
      get: function() {
        return node.unstable_createMemoryUploadHandler;
      }
    });
    Object.defineProperty(exports, "unstable_parseMultipartFormData", {
      enumerable: true,
      get: function() {
        return node.unstable_parseMultipartFormData;
      }
    });
    Object.defineProperty(exports, "__esModule", { value: true });
    var serverRuntime = require("@remix-run/server-runtime");
    Object.defineProperty(exports, "createCookie", {
      enumerable: true,
      get: function() {
        return serverRuntime.createCookie;
      }
    });
    Object.defineProperty(exports, "createCookieSessionStorage", {
      enumerable: true,
      get: function() {
        return serverRuntime.createCookieSessionStorage;
      }
    });
    Object.defineProperty(exports, "createMemorySessionStorage", {
      enumerable: true,
      get: function() {
        return serverRuntime.createMemorySessionStorage;
      }
    });
    Object.defineProperty(exports, "createSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.createSession;
      }
    });
    Object.defineProperty(exports, "createSessionStorage", {
      enumerable: true,
      get: function() {
        return serverRuntime.createSessionStorage;
      }
    });
    Object.defineProperty(exports, "isCookie", {
      enumerable: true,
      get: function() {
        return serverRuntime.isCookie;
      }
    });
    Object.defineProperty(exports, "isSession", {
      enumerable: true,
      get: function() {
        return serverRuntime.isSession;
      }
    });
    Object.defineProperty(exports, "json", {
      enumerable: true,
      get: function() {
        return serverRuntime.json;
      }
    });
    Object.defineProperty(exports, "redirect", {
      enumerable: true,
      get: function() {
        return serverRuntime.redirect;
      }
    });
    Object.defineProperty(exports, "__esModule", { value: true });
    var react = require("@remix-run/react");
    Object.defineProperty(exports, "Form", {
      enumerable: true,
      get: function() {
        return react.Form;
      }
    });
    Object.defineProperty(exports, "Link", {
      enumerable: true,
      get: function() {
        return react.Link;
      }
    });
    Object.defineProperty(exports, "Links", {
      enumerable: true,
      get: function() {
        return react.Links;
      }
    });
    Object.defineProperty(exports, "LiveReload", {
      enumerable: true,
      get: function() {
        return react.LiveReload;
      }
    });
    Object.defineProperty(exports, "Meta", {
      enumerable: true,
      get: function() {
        return react.Meta;
      }
    });
    Object.defineProperty(exports, "NavLink", {
      enumerable: true,
      get: function() {
        return react.NavLink;
      }
    });
    Object.defineProperty(exports, "Outlet", {
      enumerable: true,
      get: function() {
        return react.Outlet;
      }
    });
    Object.defineProperty(exports, "PrefetchPageLinks", {
      enumerable: true,
      get: function() {
        return react.PrefetchPageLinks;
      }
    });
    Object.defineProperty(exports, "RemixBrowser", {
      enumerable: true,
      get: function() {
        return react.RemixBrowser;
      }
    });
    Object.defineProperty(exports, "RemixServer", {
      enumerable: true,
      get: function() {
        return react.RemixServer;
      }
    });
    Object.defineProperty(exports, "Scripts", {
      enumerable: true,
      get: function() {
        return react.Scripts;
      }
    });
    Object.defineProperty(exports, "ScrollRestoration", {
      enumerable: true,
      get: function() {
        return react.ScrollRestoration;
      }
    });
    Object.defineProperty(exports, "useActionData", {
      enumerable: true,
      get: function() {
        return react.useActionData;
      }
    });
    Object.defineProperty(exports, "useBeforeUnload", {
      enumerable: true,
      get: function() {
        return react.useBeforeUnload;
      }
    });
    Object.defineProperty(exports, "useCatch", {
      enumerable: true,
      get: function() {
        return react.useCatch;
      }
    });
    Object.defineProperty(exports, "useFetcher", {
      enumerable: true,
      get: function() {
        return react.useFetcher;
      }
    });
    Object.defineProperty(exports, "useFetchers", {
      enumerable: true,
      get: function() {
        return react.useFetchers;
      }
    });
    Object.defineProperty(exports, "useFormAction", {
      enumerable: true,
      get: function() {
        return react.useFormAction;
      }
    });
    Object.defineProperty(exports, "useHref", {
      enumerable: true,
      get: function() {
        return react.useHref;
      }
    });
    Object.defineProperty(exports, "useLoaderData", {
      enumerable: true,
      get: function() {
        return react.useLoaderData;
      }
    });
    Object.defineProperty(exports, "useLocation", {
      enumerable: true,
      get: function() {
        return react.useLocation;
      }
    });
    Object.defineProperty(exports, "useMatches", {
      enumerable: true,
      get: function() {
        return react.useMatches;
      }
    });
    Object.defineProperty(exports, "useNavigate", {
      enumerable: true,
      get: function() {
        return react.useNavigate;
      }
    });
    Object.defineProperty(exports, "useNavigationType", {
      enumerable: true,
      get: function() {
        return react.useNavigationType;
      }
    });
    Object.defineProperty(exports, "useOutlet", {
      enumerable: true,
      get: function() {
        return react.useOutlet;
      }
    });
    Object.defineProperty(exports, "useOutletContext", {
      enumerable: true,
      get: function() {
        return react.useOutletContext;
      }
    });
    Object.defineProperty(exports, "useParams", {
      enumerable: true,
      get: function() {
        return react.useParams;
      }
    });
    Object.defineProperty(exports, "useResolvedPath", {
      enumerable: true,
      get: function() {
        return react.useResolvedPath;
      }
    });
    Object.defineProperty(exports, "useSearchParams", {
      enumerable: true,
      get: function() {
        return react.useSearchParams;
      }
    });
    Object.defineProperty(exports, "useSubmit", {
      enumerable: true,
      get: function() {
        return react.useSubmit;
      }
    });
    Object.defineProperty(exports, "useTransition", {
      enumerable: true,
      get: function() {
        return react.useTransition;
      }
    });
  }
});

// server.js
__export(exports, {
  handler: () => handler
});
init_react();
var import_netlify = __toModule(require("@remix-run/netlify"));

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  entry: () => entry,
  routes: () => routes
});
init_react();

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
init_react();
var import_server = __toModule(require("react-dom/server"));
var import_react_i18next = __toModule(require("react-i18next"));
var import_remix = __toModule(require_remix());

// app/utils/i18nextOptions.tsx
init_react();

// public/locales/en/translation.json
var networkPartnerMedia = {
  title: {
    network: "Our network",
    partner: "Our company partners",
    media: "Redezeit in de Media"
  }
};
var searchingCoach = {
  filter: {
    language: "Filter by language",
    tag: "Filter by topic",
    submitCta: "Apply filter"
  },
  result: "listeners found.",
  noResult: "No listeners found for these filters :("
};
var blogpostCard = {
  ctaToBlogpost: "Continue reading..."
};
var blogpostByTag = {
  title: "BLOGPOSTS for the tag "
};
var translation_default = {
  networkPartnerMedia,
  searchingCoach,
  blogpostCard,
  blogpostByTag
};

// public/locales/de/translation.json
var networkPartnerMedia2 = {
  title: {
    network: "Unser Netzwerk",
    partner: "Unsere Unternehmenspartner",
    media: "Redezeit in den Medien"
  }
};
var searchingCoach2 = {
  filter: {
    language: "Nach Sprache filtern",
    tag: "Nach Thema filtern",
    submitCta: "Filter anwenden"
  },
  result: "Zuh\xF6rer*innen gefunden.",
  noResult: "Keine Zuh\xF6rer*innen zu diesen Filtern gefunden :("
};
var blogpostCard2 = {
  ctaToBlogpost: "Weiterlesen..."
};
var blogpostByTag2 = {
  title: "BLOGPOSTS f\xFCr den Tag "
};
var translation_default2 = {
  networkPartnerMedia: networkPartnerMedia2,
  searchingCoach: searchingCoach2,
  blogpostCard: blogpostCard2,
  blogpostByTag: blogpostByTag2
};

// app/utils/i18nextOptions.tsx
var i18nextOptions_default = {
  debug: false,
  fallbackLng: "de",
  supportedLngs: ["en", "de"],
  ns: [
    "networkPartnerMedia",
    "searchingCoach",
    "blogpostCard",
    "blogpostByTag"
  ],
  react: { useSuspense: false },
  resources: {
    en: translation_default,
    de: translation_default2
  }
};

// app/entry.server.tsx
var import_i18next = __toModule(require("i18next"));
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let i18n = import_i18next.default.createInstance();
  await i18n.use(import_react_i18next.initReactI18next).init(i18nextOptions_default);
  let markup = (0, import_server.renderToString)(/* @__PURE__ */ React.createElement(import_react_i18next.I18nextProvider, {
    i18n
  }, /* @__PURE__ */ React.createElement(import_remix.RemixServer, {
    context: remixContext,
    url: request.url
  })));
  responseHeaders.set("Content-Type", "text/html");
  return new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// route:/Users/markussiering/Sites/redezeit/app/root.tsx
var root_exports = {};
__export(root_exports, {
  CatchBoundary: () => CatchBoundary,
  ErrorBoundary: () => ErrorBoundary,
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
init_react();
var import_remix3 = __toModule(require_remix());
var import_react_router_dom = __toModule(require("react-router-dom"));
var import_react = __toModule(require("react"));

// app/utils/gtag.client.ts
init_react();
var import_react_ga4 = __toModule(require("react-ga4"));
var GA_TRACKING_ID = "G-3203CF2NDT";
var init = () => {
  import_react_ga4.default.initialize(GA_TRACKING_ID);
};
var pageview = (url) => {
  import_react_ga4.default.send({ hitType: "pageview", page: url });
};

// app/seo.ts
init_react();
var import_remix_seo = __toModule(require("remix-seo"));
var { getSeo, getSeoMeta, getSeoLinks } = (0, import_remix_seo.initSeo)({
  title: "REDEZEIT F\xDCR DICH #virtualsupporttalks",
  titleTemplate: "%s | REDEZEIT F\xDCR DICH #virtualsupporttalks",
  description: "Redezeit bietet dir ehrenamtlich ein Ohr bei Unsicherheiten, Selbstzweifeln, Einsamkeit, Wut, Hilflosigkeit, Frust, Unruhe, \xDCberforderung und allem, was einen Menschen belasten kann"
});

// app/cookies.ts
init_react();
var import_remix2 = __toModule(require_remix());
var gdprConsent = (0, import_remix2.createCookie)("vst-gdpr-consent", {
  maxAge: 31536e3
});

// app/styles/app.css
var app_default = "/build/_assets/app-NG6C744Y.css";

// route:/Users/markussiering/Sites/redezeit/app/root.tsx
var [seoMeta, seoLinks] = getSeo();
var links = () => {
  return [...seoLinks, { rel: "stylesheet", href: app_default }];
};
var meta = () => {
  return __spreadValues({}, seoMeta);
};
var loader = async ({ request }) => {
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await gdprConsent.parse(cookieHeader) || {};
  return (0, import_remix3.json)({ track: cookie.gdprConsent });
};
function App() {
  const { track } = (0, import_remix3.useLoaderData)();
  const analyticsFetcher = (0, import_remix3.useFetcher)();
  const location = (0, import_react_router_dom.useLocation)();
  const [shouldTrack, setShouldTrack] = (0, import_react.useState)(track);
  (0, import_react.useEffect)(() => {
    setShouldTrack(track);
  }, [track]);
  (0, import_react.useEffect)(() => {
    if (shouldTrack) {
      console.log("INitializing gtag");
      init();
    }
  }, [shouldTrack]);
  (0, import_react.useEffect)(() => {
    if (shouldTrack) {
      console.log("Tracking pageview", location.pathname);
      pageview(location.pathname);
    }
  }, [location]);
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }), /* @__PURE__ */ React.createElement(import_remix3.Meta, null), /* @__PURE__ */ React.createElement(import_remix3.Links, null)), /* @__PURE__ */ React.createElement("body", null, shouldTrack ? null : /* @__PURE__ */ React.createElement("div", {
    className: "fixed bottom-0 right-4 z-50 w-full rounded-t-md bg-vsp-100 px-8 py-4 text-center text-gray-700 shadow-xl md:max-w-lg"
  }, /* @__PURE__ */ React.createElement(analyticsFetcher.Form, {
    method: "post",
    action: "/enable-analytics"
  }, /* @__PURE__ */ React.createElement("span", {
    className: "mr-8"
  }, "Wir nutzen Cookies."), /* @__PURE__ */ React.createElement("button", {
    name: "accept-gdpr",
    value: "true",
    type: "submit",
    className: "font-inherit inline-flex items-center justify-center rounded-md bg-gray-400 py-2 px-4 text-white no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 md:text-lg"
  }, "Akzeptieren"))), /* @__PURE__ */ React.createElement(import_remix3.Outlet, null), /* @__PURE__ */ React.createElement(import_remix3.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_remix3.Scripts, null), /* @__PURE__ */ React.createElement(import_remix3.LiveReload, null)));
}
function CatchBoundary() {
  const caught = (0, import_remix3.useCatch)();
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }), /* @__PURE__ */ React.createElement(import_remix3.Meta, null), /* @__PURE__ */ React.createElement(import_remix3.Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement("h1", null, caught.status, " ", caught.statusText), /* @__PURE__ */ React.createElement(import_remix3.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_remix3.Scripts, null), /* @__PURE__ */ React.createElement(import_remix3.LiveReload, null)));
}
function ErrorBoundary({ error }) {
  return /* @__PURE__ */ React.createElement("html", {
    lang: "en"
  }, /* @__PURE__ */ React.createElement("head", null, /* @__PURE__ */ React.createElement("meta", {
    charSet: "utf-8"
  }), /* @__PURE__ */ React.createElement("meta", {
    name: "viewport",
    content: "width=device-width,initial-scale=1"
  }), /* @__PURE__ */ React.createElement(import_remix3.Meta, null), /* @__PURE__ */ React.createElement(import_remix3.Links, null)), /* @__PURE__ */ React.createElement("body", null, /* @__PURE__ */ React.createElement("h1", null, "Oh noez!"), /* @__PURE__ */ React.createElement("pre", null, /* @__PURE__ */ React.createElement("code", null, error)), /* @__PURE__ */ React.createElement(import_remix3.ScrollRestoration, null), /* @__PURE__ */ React.createElement(import_remix3.Scripts, null), /* @__PURE__ */ React.createElement(import_remix3.LiveReload, null)));
}

// route:/Users/markussiering/Sites/redezeit/app/routes/de.netzwerk-partner-medien.tsx
var de_netzwerk_partner_medien_exports = {};
__export(de_netzwerk_partner_medien_exports, {
  default: () => SupportMedia,
  loader: () => loader2,
  meta: () => meta2
});
init_react();
var import_remix7 = __toModule(require_remix());
var import_react_i18next2 = __toModule(require("react-i18next"));

// app/utils/contentful.ts
init_react();
var import_contentful = __toModule(require("contentful"));
var createContentfulClient = () => {
  const space = process.env.CONTENTFUL_SPACE;
  if (!space) {
    throw new Error("Contentful space environment variable is not set");
  }
  const accessToken = process.env.CONTENTFUL_ACCESSTOKEN;
  if (!accessToken) {
    throw new Error("Contentful access token environment variable is not set");
  }
  return import_contentful.default.createClient({
    space,
    accessToken
  });
};
var getPageById = async (id, locale) => {
  const client = createContentfulClient();
  const entry2 = await client.getEntry(id, {
    locale
  });
  if (!entry2) {
    return null;
  }
  return entry2;
};
var getMainNav = async (locale) => {
  const client = createContentfulClient();
  const entry2 = await client.getEntry("67EXX84GGCZfZayO0JxrFg", {
    include: 3,
    locale
  });
  if (!entry2) {
    return null;
  }
  return entry2;
};
var getPage = async (slug, locale) => {
  const client = createContentfulClient();
  const entries = await client.getEntries({
    content_type: "page",
    "fields.slug[in]": slug,
    locale,
    include: 5
  });
  if (entries.items.length === 0) {
    return null;
  }
  return entries.items[0];
};
function createResult(items) {
  if (items.length === 0) {
    return null;
  }
  return items;
}
var getAllPages = async () => {
  const client = createContentfulClient();
  const { items } = await client.getEntries({
    content_type: "page",
    locale: "*"
  });
  return createResult(items);
};
var getBlogposts = async (locale) => {
  const client = createContentfulClient();
  const { items } = await client.getEntries({
    content_type: "blogpost",
    locale,
    include: 5,
    order: "-sys.createdAt"
  });
  return createResult(items);
};
var getBlogpost = async (slug, locale) => {
  const client = createContentfulClient();
  const { items } = await client.getEntries({
    content_type: "blogpost",
    "fields.slug[in]": slug,
    locale,
    include: 5
  });
  if (items.length === 0) {
    return null;
  }
  return items[0];
};
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
var getLanguages = async () => {
  const coaches = await getCoaches("de");
  let languages = [];
  coaches.forEach((coach) => {
    if (coach.fields.languages) {
      languages.push(...coach.fields.languages);
    }
  });
  const lowercasedLangs = [...new Set(languages)].map((lang) => lang.toLowerCase());
  return [...new Set(lowercasedLangs)].sort();
};
var getTags = async (locale = "de") => {
  const client = createContentfulClient();
  const { items } = await client.getEntries({
    content_type: "coachtag",
    order: "fields.tag",
    locale
  });
  return items;
};
var getCoaches = async (lang = null) => {
  const client = createContentfulClient();
  const usedLanguage = lang === "de" ? null : lang;
  let options = {};
  const baseOptions = {
    limit: 500,
    content_type: "coach",
    order: "fields.name"
  };
  if (usedLanguage) {
    options = __spreadProps(__spreadValues({}, baseOptions), {
      "fields.languages[in]": usedLanguage
    });
  } else {
    options = baseOptions;
  }
  const coachesResponse = await client.getEntries(__spreadValues({}, options));
  return shuffle(coachesResponse.items);
};
var getNetwork = async () => {
  const client = createContentfulClient();
  const { items } = await client.getEntries({
    content_type: "network",
    order: "fields.title"
  });
  return createResult(items);
};
var getSupporters = async () => {
  const client = createContentfulClient();
  const { items } = await client.getEntries({
    content_type: "supporter",
    order: "fields.title"
  });
  return createResult(items);
};
var getMedia = async () => {
  const client = createContentfulClient();
  const { items } = await client.getEntries({
    content_type: "media",
    order: "fields.title"
  });
  return createResult(items);
};

// app/components/ContentBlocks.tsx
init_react();

// app/components/ContentBlocks/Header.tsx
init_react();
function Header({
  backgroundcolor,
  image,
  buttonUrl,
  buttonText
}) {
  const headerStyle = {
    backgroundColor: backgroundcolor
  };
  const hasButton = buttonUrl && buttonText;
  const styleObject = {
    backgroundColor: backgroundcolor,
    backgroundImage: image ? `url(${image.fields.file.url})` : void 0
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: "pt-20 md:pt-32",
    style: headerStyle
  }, /* @__PURE__ */ React.createElement("header", {
    className: `headerBlockHeight grid grid-cols-1 justify-items-center gap-4 ${hasButton && "pb-12"}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "w-full bg-contain bg-center bg-no-repeat",
    style: styleObject
  }), hasButton && /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", null, buttonText))));
}

// app/components/ContentBlocks/Centered.tsx
init_react();

// app/components/ContentfulRichText.tsx
init_react();
var import_rich_text_react_renderer = __toModule(require("@contentful/rich-text-react-renderer"));
var import_rich_text_types = __toModule(require("@contentful/rich-text-types"));

// app/components/CleverLink.tsx
init_react();
var import_remix4 = __toModule(require_remix());
function CleverLink({
  to,
  prefetch = "intent",
  children,
  className
}) {
  if (!to) {
    throw new Error('"to" prop is required');
  }
  const isInternalLink = to.startsWith("https://www.virtualsupporttalks.de/") || to.startsWith("/") || !to.startsWith("https://");
  if (isInternalLink) {
    const usedLink = to.replace("https://www.virtualsupporttalks.de", "");
    return /* @__PURE__ */ React.createElement(import_remix4.Link, {
      className,
      to: usedLink,
      prefetch
    }, children);
  }
  return /* @__PURE__ */ React.createElement("a", {
    href: to,
    target: "_blank",
    className,
    rel: "noopener noreferrer"
  }, children);
}

// app/components/ContentfulRichText.tsx
function ContentfulRichText({
  content,
  withProse = true,
  useWhiteProse = false
}) {
  const options = {
    renderNode: {
      [import_rich_text_types.INLINES.HYPERLINK]: (node, children) => /* @__PURE__ */ React.createElement(CleverLink, {
        to: node.data.uri,
        prefetch: "intent"
      }, node.data.url, " ", children)
    }
  };
  return /* @__PURE__ */ React.createElement("div", {
    className: `richtext prose-a:text-vsp-600 hover:prose-a:text-vsp-700 lg:prose-h1:leading-tight ${withProse && "prose max-w-none prose-headings:font-headline lg:prose-lg"} ${useWhiteProse && "prose-white prose-a:text-vsp-300 hover:prose-a:text-vsp-100"}`
  }, content && (0, import_rich_text_react_renderer.documentToReactComponents)(content, options));
}

// app/components/ContentBlocks/Centered.tsx
function ContentBlockCentered({
  content,
  bgcolor,
  buttonText,
  buttonUrl
}) {
  const colors = bgcolor === "gray" ? "bg-gray-400" : bgcolor === "green" ? "bg-vsp-500" : "bg-white";
  const useWhiteProse = bgcolor !== "white";
  const hasButton = buttonText && buttonUrl;
  return /* @__PURE__ */ React.createElement("section", {
    className: `py-12 px-4 md:px-12 ${colors} ${hasButton && "grid grid-cols-1 justify-items-center gap-4 pb-12"}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mx-auto w-full max-w-4xl"
  }, content && /* @__PURE__ */ React.createElement(ContentfulRichText, {
    content,
    useWhiteProse
  })), hasButton && /* @__PURE__ */ React.createElement("button", null, buttonText));
}

// app/components/ContentBlocks/FullSizeImageBg.tsx
init_react();
function FullSizeImageBg({
  image,
  backgroundcolor,
  imageRight,
  children
}) {
  const styleObject = { backgroundColor: backgroundcolor };
  return /* @__PURE__ */ React.createElement("section", {
    className: "grid w-screen max-w-full grid-cols-1 lg:grid-cols-2",
    style: styleObject
  }, image && /* @__PURE__ */ React.createElement("img", {
    src: image.fields.file.url,
    className: `h-auto max-h-[60vh] w-full object-cover lg:h-full lg:max-h-max ${imageRight && "row-start-1 lg:col-start-2"}`
  }), /* @__PURE__ */ React.createElement("div", {
    className: `py-8 px-4 lg:max-w-[70ch] lg:px-12 lg:pb-12 lg:pt-36 ${imageRight && "col-start-1 ml-auto lg:row-start-1"}`
  }, children));
}

// app/components/ContentBlocks/ImageBg.tsx
init_react();

// app/components/CleverButton.tsx
init_react();
function CleverButton({
  children,
  variant = "primary",
  to
}) {
  const variantClass = variant === "primary" ? "bg-vsp-500" : variant === "secondary" ? "bg-gray-400" : "";
  return /* @__PURE__ */ React.createElement(CleverLink, {
    to,
    className: `font-inherit inline-flex items-center justify-center rounded-md py-4 px-8 text-white no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 md:text-lg ${variantClass}`
  }, children);
}

// app/components/AmazonCharityBanner.tsx
init_react();
function AmazonCharityBanner() {
  const script = () => '<div id="amznCharityBanner" className="flex justify-center min-w-[310px] min-h-[256px]"><script type="text/javascript">;(function () { var iFrame = document.createElement("iframe") iFrame.style.display = "none" iFrame.style.border = "none" iFrame.width = 310 iFrame.height = 256 iFrame.setAttribute && iFrame.setAttribute("scrolling", "no") iFrame.setAttribute("frameborder", "0") setTimeout(function () { var contents = iFrame.contentWindow ? iFrame.contentWindow : iFrame.contentDocument.document ? iFrame.contentDocument.document : iFrame.contentDocument contents.document.open() contents.document.write(decodeURIComponent(            "%3Cdiv%20id%3D%22amznCharityBannerInner%22%3E%3Ca%20href%3D%22https%3A%2F%2Fsmile.amazon.de%2Fch%2F17-451-10947%22%20target%3D%22_blank%22%3E%3Cdiv%20class%3D%22text%22%20height%3D%22%22%3E%3Cdiv%20class%3D%22support-wrapper%22%3E%3Cdiv%20class%3D%22support%22%20style%3D%22font-size%3A%2025px%3B%20line-height%3A%2028px%3B%20margin-top%3A%201px%3B%20margin-bottom%3A%200px%3B%22%3EUnterst%C3%BCtzen%20Sie%20%3Cspan%20id%3D%22charity-name%22%20style%3D%22display%3A%20inline-block%3B%22%3EREDEZEIT%20F%C3%9CR%20DICH%20%23virtualsupporttalks%2C%3C%2Fspan%3E%3C%2Fdiv%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22when-shop%22%3Eindem%20Sie%20auf%20%3Cb%3Esmile.amazon.de%3C%2Fb%3E%3C%2Fdiv%3E%3Cdiv%20class%3D%22donates%22%3E%20einkaufen.%3C%2Fdiv%3E%3C%2Fdiv%3E%3C%2Fa%3E%3C%2Fdiv%3E%3Cstyle%3E%23amznCharityBannerInner%7Bbackground-image%3Aurl(https%3A%2F%2Fimages-na.ssl-images-amazon.com%2Fimages%2FG%2F03%2Fx-locale%2Fpaladin%2Fcharitycentral%2Fbanner-background-image._CB485921641_.png)%3Bwidth%3A300px%3Bheight%3A250px%3Bposition%3Arelative%7D%23amznCharityBannerInner%20a%7Bdisplay%3Ablock%3Bwidth%3A100%25%3Bheight%3A100%25%3Bposition%3Arelative%3Bcolor%3A%23000%3Btext-decoration%3Anone%7D.text%7Bposition%3Aabsolute%3Btop%3A20px%3Bleft%3A15px%3Bright%3A15px%3Bbottom%3A100px%7D.support-wrapper%7Boverflow%3Ahidden%3Bmax-height%3A86px%7D.support%7Bfont-family%3AArial%2Csans%3Bfont-weight%3A700%3Bline-height%3A28px%3Bfont-size%3A25px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D.when-shop%7Bfont-family%3AArial%2Csans%3Bfont-size%3A15px%3Bfont-weight%3A400%3Bline-height%3A15px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D.donates%7Bfont-family%3AArial%2Csans%3Bfont-size%3A15px%3Bfont-weight%3A400%3Bline-height%3A21px%3Bcolor%3A%23333%3Btext-align%3Acenter%3Bmargin%3A0%3Bpadding%3A0%3Bbackground%3A0%200%7D%3C%2Fstyle%3E")) contents.document.close() iFrame.style.display = "block"}) document.getElementById("amznCharityBanner").appendChild(iFrame)})()<\/script></div>';
  return /* @__PURE__ */ React.createElement("div", {
    dangerouslySetInnerHTML: { __html: script() }
  });
}

// app/components/ContentBlocks/ImageBg.tsx
function ContentBlockImageBg({
  backgroundImage,
  withPaddingTop = false,
  buttonUrl = "",
  buttonText = "",
  withCharityBanner = false,
  children
}) {
  var _a, _b;
  const hasButton = buttonUrl && buttonText;
  const usedBackgroundImage = (_b = (_a = backgroundImage == null ? void 0 : backgroundImage.fields) == null ? void 0 : _a.file) == null ? void 0 : _b.url;
  const backgroundStyle = usedBackgroundImage ? { backgroundImage: `url(${usedBackgroundImage})` } : {};
  return /* @__PURE__ */ React.createElement("section", {
    className: `after:content-[''], after::z-0 relative flex min-h-[400px] bg-cover bg-center bg-no-repeat text-center after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:block after:bg-gray-400/80 ${hasButton && "grid grid-cols-1 justify-center gap-4 pb-12"}`,
    style: backgroundStyle
  }, /* @__PURE__ */ React.createElement("div", {
    className: `z-10 m-auto w-screen max-w-4xl py-12 px-4 ${withPaddingTop && "px-4 py-12 pt-28"}`
  }, children), hasButton && /* @__PURE__ */ React.createElement("div", {
    className: "z-10 flex flex-row flex-wrap items-center justify-center gap-8"
  }, /* @__PURE__ */ React.createElement(CleverButton, {
    to: buttonUrl
  }, buttonText), withCharityBanner && /* @__PURE__ */ React.createElement(AmazonCharityBanner, null)));
}

// app/components/ContentBlocks/TwoImages.tsx
init_react();

// app/components/FadeIn.tsx
init_react();
var import_react2 = __toModule(require("react"));
var import_usehooks_ts = __toModule(require("usehooks-ts"));
function FadeIn({ children }) {
  const ref = (0, import_react2.useRef)(null);
  const entry2 = (0, import_usehooks_ts.useIntersectionObserver)(ref, {});
  const isVisible = !!(entry2 == null ? void 0 : entry2.isIntersecting);
  return /* @__PURE__ */ React.createElement("div", {
    ref,
    className: `translate-y-10 scale-95 opacity-0 transition-all duration-300 ${isVisible && "transform-none opacity-100"}`
  }, children);
}

// app/components/ContentBlocks/TwoImages.tsx
function ContentBlockTwoImages({
  image1,
  image2,
  text1,
  text2,
  link1,
  link2,
  locale
}) {
  if (!image1 || !image2 || !text1 || !text2 || !link1 || !link2) {
    return null;
  }
  const images = [
    {
      image: image1 == null ? void 0 : image1.fields.file.url,
      text: text1,
      link: link1
    },
    {
      image: image2 == null ? void 0 : image2.fields.file.url,
      text: text2,
      link: link2
    }
  ];
  return /* @__PURE__ */ React.createElement("section", {
    className: "mx-auto grid max-w-7xl grid-cols-1 gap-6 py-16 px-4 md:grid-cols-2"
  }, images.map(({ image, link, text }) => /* @__PURE__ */ React.createElement(FadeIn, {
    key: link
  }, /* @__PURE__ */ React.createElement(CleverLink, {
    className: "group block max-w-full overflow-hidden rounded-md bg-gray-300 no-underline shadow-lg",
    to: `/${locale}${link}`
  }, /* @__PURE__ */ React.createElement("img", {
    src: image,
    alt: text,
    className: "h-[400px] w-full object-cover transition-opacity duration-300 group-hover:opacity-80"
  }), /* @__PURE__ */ React.createElement("h2", {
    className: "m-0 px-4 py-8 font-headline text-2xl font-bold"
  }, text)))));
}

// app/components/ContentBlocks/ContentBlockImageCollection.tsx
init_react();
function Image({ image, text }) {
  return /* @__PURE__ */ React.createElement("picture", null, /* @__PURE__ */ React.createElement("source", {
    srcSet: `
    ${image}?h=450&fm=webp,
    ${image}?h=900&fm=webp 2x`,
    type: "image/webp"
  }), /* @__PURE__ */ React.createElement("source", {
    srcSet: `
  ${image}?h=450&fm=jpeg,
  ${image}?h=900&fm=jpeg 2x`,
    type: "image/jpeg"
  }), /* @__PURE__ */ React.createElement("img", {
    src: `${image}?h=450`,
    alt: text,
    height: "450",
    loading: "lazy",
    className: "max-w-full h-auto"
  }));
}
function ContentBlockImageCollection({
  images,
  withPaddingTop
}) {
  const imageCollection = images == null ? void 0 : images.map(({ sys, fields }) => {
    var _a;
    return {
      image: (_a = fields == null ? void 0 : fields.image) == null ? void 0 : _a.fields.file.url,
      link: fields.url,
      text: fields.internalTitle,
      id: sys.id
    };
  });
  return /* @__PURE__ */ React.createElement("div", {
    className: `p-4 max-w-7xl mx-auto grid gap-4 grid-cols-1 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-12${withPaddingTop && "pt-20"}`
  }, imageCollection == null ? void 0 : imageCollection.map(({ image, link, text, id }) => /* @__PURE__ */ React.createElement("figure", {
    key: id,
    role: "figure",
    "aria-label": "text"
  }, link ? /* @__PURE__ */ React.createElement("a", {
    href: link
  }, /* @__PURE__ */ React.createElement(Image, {
    image,
    text
  })) : /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(Image, {
    image,
    text
  })))));
}

// app/components/ContentBlocks/GenericContent.tsx
init_react();
function GenericContent({ content }) {
  return /* @__PURE__ */ React.createElement("section", {
    className: "mx-auto min-h-[50vh] w-screen max-w-3xl px-4 pt-24 pb-12"
  }, content && /* @__PURE__ */ React.createElement(ContentfulRichText, {
    content
  }));
}

// app/components/ContentBlocks.tsx
function ContentBlocks({ content, locale }) {
  return /* @__PURE__ */ React.createElement("div", null, content.map((item, index) => {
    const {
      sys: {
        contentType: {
          sys: { id }
        }
      }
    } = item;
    if (id === "headerBlock") {
      const { backgroundcolor, image, buttonText, buttonUrl } = item.fields;
      return /* @__PURE__ */ React.createElement(Header, {
        key: item.sys.id,
        backgroundcolor,
        image,
        buttonText,
        buttonUrl
      });
    }
    if (id === "centeredContent") {
      const { bgcolor, content: content2, buttonText, buttonUrl } = item.fields;
      return /* @__PURE__ */ React.createElement(ContentBlockCentered, {
        key: item.sys.id,
        bgcolor,
        content: content2,
        buttonText,
        buttonUrl
      });
    }
    if (id === "contentWithFullSizeImage") {
      const { backgroundcolor, image, imageRight, content: content2 } = item.fields;
      return /* @__PURE__ */ React.createElement(FullSizeImageBg, {
        key: item.sys.id,
        backgroundcolor,
        image,
        imageRight
      }, content2 && /* @__PURE__ */ React.createElement(ContentfulRichText, {
        content: content2
      }));
    }
    if (id === "contentImageBg") {
      const {
        backgroundImage,
        buttonUrl,
        buttonText,
        withCharityBanner,
        content: content2
      } = item.fields;
      return /* @__PURE__ */ React.createElement(ContentBlockImageBg, {
        key: item.sys.id,
        backgroundImage,
        buttonUrl,
        buttonText,
        withCharityBanner,
        withPaddingTop: index === 0
      }, content2 && /* @__PURE__ */ React.createElement(ContentfulRichText, {
        content: content2
      }));
    }
    if (id === "twoImages") {
      const { image1, image2, text1, text2, link1, link2 } = item.fields;
      return /* @__PURE__ */ React.createElement(ContentBlockTwoImages, {
        key: item.sys.id,
        image1,
        image2,
        text1,
        text2,
        link1,
        link2,
        locale
      });
    }
    if (id === "imageCollection") {
      const { internalTitle, images } = item.fields;
      return /* @__PURE__ */ React.createElement(ContentBlockImageCollection, {
        key: item.sys.id,
        images,
        internalTitle,
        withPaddingTop: index === 0
      });
    }
    if (id === "coachList") {
      return null;
    } else {
      const { content: content2 } = item.fields;
      return /* @__PURE__ */ React.createElement(GenericContent, {
        key: item.sys.id,
        content: content2
      });
    }
  }));
}

// app/utils/pageIds.ts
init_react();
var pageIds = {
  STARTPAGE: "2W0lOJiaTbb5Dptc3mjRhN",
  SEARCH_HELP: "3tWiFBv2glxL9ouznQYrG5",
  GIVE_HELP: "2WBTRHlycqG57zkTI0G5K3",
  NETWORK: "25tWaqDQRtqkh9Bh2idI2A",
  DATA_PRIVACY: "5BfG20EiaYrSWfnsBQKmhd",
  DONATIONS: "3w6prXbEVMxtdD81saQoIT"
};
var pageIds_default = pageIds;

// app/components/layout/BasicLayout.tsx
init_react();

// app/components/layout/Footer.tsx
init_react();
function LayoutFooter({}) {
  const footerNav = [
    {
      link: { de: "/impressum/", en: "/en/imprint/" },
      title: { de: "Impressum", en: "Legal info" }
    },
    {
      link: { de: "/datenschutz/", en: "/en/privacy/" },
      title: { de: "Datenschutz", en: "Privacy" }
    }
  ];
  return /* @__PURE__ */ React.createElement("nav", {
    className: "p-8 text-xs"
  }, /* @__PURE__ */ React.createElement("ul", {
    className: "flex flex-col items-center justify-center md:flex-row"
  }, footerNav.map(({ link, title }) => /* @__PURE__ */ React.createElement("li", {
    key: link.de
  }, /* @__PURE__ */ React.createElement(CleverLink, {
    className: "block p-2 underline md:py-4 md:px-2",
    to: link.de
  }, title.de)))));
}

// app/components/layout/Header.tsx
init_react();
var import_react4 = __toModule(require("react"));
var import_remix6 = __toModule(require_remix());

// app/components/layout/Navigation.tsx
init_react();

// app/components/layout/NavItem.tsx
init_react();
var import_remix5 = __toModule(require_remix());
function NavItem({ to, children }) {
  return /* @__PURE__ */ React.createElement("li", {
    className: "block w-full lg:mr-1 lg:w-auto"
  }, /* @__PURE__ */ React.createElement(import_remix5.NavLink, {
    className: ({ isActive }) => `block p-4 no-underline lg:inline-block lg:rounded-md lg:py-1 lg:px-2 ${isActive && "border-l-4 border-l-vsp-500 bg-gray-100 lg:border-none lg:bg-white lg:underline lg:decoration-vsp-500"}`,
    to
  }, children));
}

// app/components/layout/Navigation.tsx
var import_react3 = __toModule(require("react"));
var import_react_router_dom2 = __toModule(require("react-router-dom"));
function Navigation({
  nav,
  lang
}) {
  const [open, setOpen] = (0, import_react3.useState)(false);
  const { pathname } = (0, import_react_router_dom2.useLocation)();
  (0, import_react3.useEffect)(() => {
    setOpen(false);
  }, [pathname]);
  const navItems = nav.map((item) => {
    var _a;
    const { page, title, url } = item.fields;
    const id = item.sys.id;
    let path = "/";
    if (url) {
      path = url.replace("https://www.virtualsupporttalks.de", "");
    }
    if ((_a = page == null ? void 0 : page.fields) == null ? void 0 : _a.slug) {
      path = `/${lang}/${page.fields.slug}`;
    }
    return {
      title,
      path,
      id
    };
  });
  return /* @__PURE__ */ React.createElement("nav", {
    className: "relative z-30 lg:max-w-4xl"
  }, /* @__PURE__ */ React.createElement("button", {
    className: `flex h-12 w-12 items-center justify-center rounded-full lg:hidden ${open && "bg-white"}`,
    "aria-expanded": open,
    "aria-controls": "navigation",
    onClick: () => setOpen(!open)
  }, /* @__PURE__ */ React.createElement("span", {
    className: "sr-only"
  }, "Menu"), /* @__PURE__ */ React.createElement("span", {
    className: "inline-block h-6 w-6"
  }, !open ? /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-6 w-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /* @__PURE__ */ React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M4 6h16M4 12h8m-8 6h16"
  })) : /* @__PURE__ */ React.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    className: "h-6 w-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor"
  }, /* @__PURE__ */ React.createElement("path", {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "2",
    d: "M6 18L18 6M6 6l12 12"
  })))), /* @__PURE__ */ React.createElement("ul", {
    className: `fixed top-24 right-0 z-30 flex w-screen max-w-[90vw] flex-col overflow-hidden rounded-md bg-white shadow-2xl transition-transform duration-300 lg:static lg:top-auto lg:left-auto lg:h-auto lg:w-auto lg:transform-none lg:flex-row lg:items-center lg:justify-end lg:rounded-none lg:bg-transparent lg:shadow-none ${open ? "-translate-x-[5vw]" : "translate-x-[90vw]"}`
  }, navItems.map((item) => {
    return /* @__PURE__ */ React.createElement(NavItem, {
      key: item.id,
      to: item.path
    }, item.title);
  }), lang === "de" ? /* @__PURE__ */ React.createElement(NavItem, {
    to: "/en"
  }, "English version") : /* @__PURE__ */ React.createElement(NavItem, {
    to: "/de"
  }, "Deutsche Version")));
}

// app/components/layout/Header.tsx
function LayoutHeader({
  nav,
  lang
}) {
  const [hasScrolled, setHasScrolled] = (0, import_react4.useState)(false);
  const handleScroll = () => {
    window.scrollY >= 40 ? setHasScrolled(true) : setHasScrolled(false);
  };
  (0, import_react4.useEffect)(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });
  return /* @__PURE__ */ React.createElement("header", {
    className: `max-w-screen fixed top-0 z-50 h-20 w-full bg-transparent transition-all duration-300 after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:z-10 after:block after:bg-white after:opacity-0 after:transition-opacity after:duration-300 after:content-[''] ${hasScrolled && "h-16 after:opacity-100"}`
  }, /* @__PURE__ */ React.createElement("div", {
    className: "mx-auto flex h-full w-full max-w-6xl items-center justify-between px-4"
  }, /* @__PURE__ */ React.createElement("em", {
    className: "relative z-20"
  }, /* @__PURE__ */ React.createElement(import_remix6.NavLink, {
    to: "/"
  }, /* @__PURE__ */ React.createElement("img", {
    className: `max-h-12 w-auto transition-transform ${hasScrolled && "scale-[0.8]"}`,
    src: "/img/logo.png",
    alt: "Virtual Support Talks Logo"
  }))), /* @__PURE__ */ React.createElement(Navigation, {
    nav,
    lang
  })));
}

// app/components/layout/BasicLayout.tsx
function BasicLayout({ nav, lang, children }) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(LayoutHeader, {
    nav,
    lang
  }), /* @__PURE__ */ React.createElement("main", null, children), /* @__PURE__ */ React.createElement(LayoutFooter, null));
}

// app/components/SupporterTile.tsx
init_react();
function SupporterTile({
  url,
  image,
  title
}) {
  return /* @__PURE__ */ React.createElement("a", {
    href: url,
    className: "flex items-center justify-center no-underline transition-opacity hover:opacity-80 focus:opacity-80 active:opacity-80"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "text-center"
  }, /* @__PURE__ */ React.createElement("picture", null, /* @__PURE__ */ React.createElement("source", {
    srcSet: `${image}?w=240&h=240&fit=pad&fm=webp`,
    type: "image/webp"
  }), /* @__PURE__ */ React.createElement("source", {
    srcSet: `${image}?w=240&h=240&fit=pad&fm=jpeg`,
    type: "image/jpeg"
  }), /* @__PURE__ */ React.createElement("img", {
    src: `${image}?w=240&h=240&fit=pad`,
    alt: title,
    loading: "lazy",
    className: "m-auto max-h-[300px] w-[80%] max-w-[300px] object-cover"
  })), title && /* @__PURE__ */ React.createElement("h3", {
    className: "m-0 text-lg font-bold"
  }, title)));
}

// route:/Users/markussiering/Sites/redezeit/app/routes/de.netzwerk-partner-medien.tsx
var meta2 = ({ data }) => {
  var _a, _b, _c;
  const { title, seo } = (_a = data == null ? void 0 : data.page) == null ? void 0 : _a.fields;
  let seoMeta2 = getSeoMeta({
    title: ((_b = seo == null ? void 0 : seo.fields) == null ? void 0 : _b.title) || title || null,
    description: ((_c = seo == null ? void 0 : seo.fields) == null ? void 0 : _c.description) || null
  });
  return __spreadValues({}, seoMeta2);
};
var loader2 = async () => {
  const locale = "de";
  const page = getPageById(pageIds_default.NETWORK, locale);
  const navigation = getMainNav(locale);
  const network = getNetwork();
  const supporters = getSupporters();
  const media = getMedia();
  const data = await Promise.all([
    page,
    navigation,
    network,
    supporters,
    media
  ]);
  if (!navigation) {
    throw new Response("Could not load navigation", { status: 404 });
  }
  return {
    page: data[0],
    navigation: data[1],
    network: data[2],
    supporters: data[3],
    media: data[4],
    locale
  };
};
function SupportMedia() {
  const { page, navigation, network, supporters, media, locale } = (0, import_remix7.useLoaderData)();
  const { t } = (0, import_react_i18next2.useTranslation)("networkPartnerMedia");
  return /* @__PURE__ */ React.createElement(BasicLayout, {
    nav: navigation.fields.items,
    lang: locale
  }, /* @__PURE__ */ React.createElement("div", {
    className: "container mx-auto max-w-6xl"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "pt-24"
  }, /* @__PURE__ */ React.createElement("section", {
    className: "mx-auto max-w-7xl py-12 px-4 md:px-12"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "mb-12 font-headline text-4xl font-bold"
  }, t("title.network")), network.length && /* @__PURE__ */ React.createElement("div", {
    style: {
      gridTemplateColumns: "repeat(auto-fit,minmax(270px, 1fr))"
    },
    className: "grid-rows-auto grid gap-x-4 gap-y-8"
  }, network.map((entry2) => /* @__PURE__ */ React.createElement(SupporterTile, {
    key: entry2.fields.url,
    image: entry2.fields.image.fields.file.url,
    url: entry2.fields.url
  }))))), supporters && /* @__PURE__ */ React.createElement("section", {
    className: "mx-auto max-w-7xl py-12 px-4 md:px-12"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "mb-12 font-headline text-4xl font-bold"
  }, t("title.partner")), /* @__PURE__ */ React.createElement("div", {
    style: {
      gridTemplateColumns: "repeat(auto-fit,minmax(270px, 1fr))"
    },
    className: "grid-rows-auto grid gap-x-4 gap-y-8"
  }, supporters.map((entry2) => /* @__PURE__ */ React.createElement(SupporterTile, {
    key: entry2.fields.url,
    url: entry2.fields.url,
    image: entry2.fields.image.fields.file.url
  }))))), /* @__PURE__ */ React.createElement(ContentBlocks, {
    content: page.fields.content,
    locale
  }), media && /* @__PURE__ */ React.createElement("section", {
    className: "mx-auto max-w-7xl py-12 px-4 md:px-12"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "mb-12 font-headline text-4xl font-bold"
  }, t("title.media")), /* @__PURE__ */ React.createElement("div", {
    style: {
      gridTemplateColumns: "repeat(auto-fit,minmax(270px, 1fr))"
    },
    className: "grid-rows-auto grid gap-x-4 gap-y-8"
  }, media.map((entry2) => /* @__PURE__ */ React.createElement(SupporterTile, {
    key: entry2.fields.url,
    url: entry2.fields.url,
    image: entry2.fields.image.fields.file.url,
    title: entry2.fields.title
  })))));
}

// route:/Users/markussiering/Sites/redezeit/app/routes/en.network-partner-media.tsx
var en_network_partner_media_exports = {};
__export(en_network_partner_media_exports, {
  default: () => SupportMedia2,
  loader: () => loader3,
  meta: () => meta3
});
init_react();
var import_remix8 = __toModule(require_remix());
var import_react_i18next3 = __toModule(require("react-i18next"));
var meta3 = ({ data }) => {
  var _a, _b, _c;
  const { title, seo } = (_a = data == null ? void 0 : data.page) == null ? void 0 : _a.fields;
  let seoMeta2 = getSeoMeta({
    title: ((_b = seo == null ? void 0 : seo.fields) == null ? void 0 : _b.title) || title,
    description: ((_c = seo == null ? void 0 : seo.fields) == null ? void 0 : _c.description) || null
  });
  return __spreadValues({}, seoMeta2);
};
var loader3 = async () => {
  const locale = "en";
  const page = getPageById(pageIds_default.NETWORK, locale);
  const navigation = getMainNav(locale);
  const network = getNetwork();
  const supporters = getSupporters();
  const media = getMedia();
  const data = await Promise.all([
    page,
    navigation,
    network,
    supporters,
    media
  ]);
  if (!navigation) {
    throw new Response("Could not load navigation", { status: 404 });
  }
  return {
    page: data[0],
    navigation: data[1],
    network: data[2],
    supporters: data[3],
    media: data[4],
    locale
  };
};
function SupportMedia2() {
  const { page, navigation, network, supporters, media, locale } = (0, import_remix8.useLoaderData)();
  const { t } = (0, import_react_i18next3.useTranslation)("networkPartnerMedia");
  return /* @__PURE__ */ React.createElement(BasicLayout, {
    nav: navigation.fields.items,
    lang: locale
  }, /* @__PURE__ */ React.createElement("div", {
    className: "container mx-auto max-w-6xl"
  }, /* @__PURE__ */ React.createElement("div", {
    className: "pt-24"
  }, /* @__PURE__ */ React.createElement("section", {
    className: "mx-auto max-w-7xl py-12 px-4 md:px-12"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "mb-12 font-headline text-4xl font-bold"
  }, t("title.network")), network.length && /* @__PURE__ */ React.createElement("div", {
    style: {
      gridTemplateColumns: "repeat(auto-fit,minmax(270px, 1fr))"
    },
    className: "grid-rows-auto grid gap-x-4 gap-y-8"
  }, network.map((entry2) => /* @__PURE__ */ React.createElement(SupporterTile, {
    key: entry2.fields.url,
    image: entry2.fields.image.fields.file.url,
    url: entry2.fields.url
  }))))), supporters && /* @__PURE__ */ React.createElement("section", {
    className: "mx-auto max-w-7xl py-12 px-4 md:px-12"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "mb-12 font-headline text-4xl font-bold"
  }, t("title.partner")), /* @__PURE__ */ React.createElement("div", {
    style: {
      gridTemplateColumns: "repeat(auto-fit,minmax(270px, 1fr))"
    },
    className: "grid-rows-auto grid gap-x-4 gap-y-8"
  }, supporters.map((entry2) => /* @__PURE__ */ React.createElement(SupporterTile, {
    key: entry2.fields.url,
    url: entry2.fields.url,
    image: entry2.fields.image.fields.file.url
  }))))), /* @__PURE__ */ React.createElement(ContentBlocks, {
    content: page.fields.content,
    locale
  }), media && /* @__PURE__ */ React.createElement("section", {
    className: "mx-auto max-w-7xl py-12 px-4 md:px-12"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "mb-12 font-headline text-4xl font-bold"
  }, t("title.media")), /* @__PURE__ */ React.createElement("div", {
    style: {
      gridTemplateColumns: "repeat(auto-fit,minmax(270px, 1fr))"
    },
    className: "grid-rows-auto grid gap-x-4 gap-y-8"
  }, media.map((entry2) => /* @__PURE__ */ React.createElement(SupporterTile, {
    key: entry2.fields.url,
    url: entry2.fields.url,
    image: entry2.fields.image.fields.file.url,
    title: entry2.fields.title
  })))));
}

// route:/Users/markussiering/Sites/redezeit/app/routes/en.i-need-speaking-time.tsx
var en_i_need_speaking_time_exports = {};
__export(en_i_need_speaking_time_exports, {
  CatchBoundary: () => CatchBoundary2,
  ErrorBoundary: () => ErrorBoundary2,
  default: () => SearchingCoach,
  loader: () => loader4,
  meta: () => meta4
});
init_react();
var import_react5 = __toModule(require("react"));
var import_remix9 = __toModule(require_remix());
var import_react_i18next4 = __toModule(require("react-i18next"));

// app/utils/getSearchPageContents.ts
init_react();
var getSearchPageContents = async (request, locale) => {
  const searchParams = new URL(request.url).searchParams;
  const lang = searchParams.get("lang") || locale;
  const checkedTags = searchParams.getAll("tag");
  const [page, coaches, languages, tags, navigation] = await Promise.all([
    getPageById(pageIds_default.SEARCH_HELP, locale),
    getCoaches(lang),
    getLanguages(),
    getTags(locale),
    getMainNav(locale)
  ]);
  if (!coaches || coaches.length === 0) {
    throw new Response("Not Found", {
      status: 404
    });
  }
  if (!navigation) {
    throw new Response("Could not load navigation", { status: 404 });
  }
  const filteredCoaches = coaches.filter((coach) => {
    const coachTags = coach.fields.tag;
    if (!checkedTags || checkedTags.length === 0) {
      return true;
    }
    return !!coachTags && checkedTags.some((tag) => coachTags.some((cTag) => cTag.fields.tag === tag));
  });
  const availableTagIDs = coaches.map((coach) => coach.fields.tag).filter((tags2) => !!tags2).map((tags2) => tags2.map((tag) => tag.sys.id)).flat();
  return {
    page,
    coaches: filteredCoaches,
    languages,
    tags,
    navigation,
    checkedTags,
    locale,
    currentLang: lang,
    coachesAmount: (filteredCoaches == null ? void 0 : filteredCoaches.length) || 0,
    availableTagIDs
  };
};

// app/components/CoachList.tsx
init_react();

// app/components/CoachCard.tsx
init_react();
var import_outline = __toModule(require("@heroicons/react/outline"));
var import_react_country_flag = __toModule(require("react-country-flag"));

// app/utils/getFlagCodes.ts
init_react();
function getFlagCode(languages) {
  const flagCodes = {
    dan: "DK",
    de: "DE",
    en: "GB",
    esp: "ES",
    fr: "FR",
    nl: "NL",
    nor: "NO",
    pol: "PL",
    por: "PT",
    ru: "RU",
    ukr: "UA"
  };
  const result = ["DE"];
  languages && languages.forEach((lang) => {
    result.push(flagCodes[lang]);
  });
  return [...new Set(result)];
}

// app/components/CoachCard.tsx
function CoachCard(props) {
  const { url, name, image, emergency, phone, email, languages, children } = props;
  const flagCodes = getFlagCode(languages);
  const contactMethods = [];
  if (email) {
    contactMethods.push({
      type: "email",
      address: `mailto:${email}`
    });
  }
  if (url) {
    contactMethods.push({
      type: "website",
      address: url
    });
  }
  if (phone) {
    contactMethods.push({
      type: "phone",
      address: `tel:${phone}`
    });
  }
  const imagePath = image == null ? void 0 : image.fields.file.url;
  return /* @__PURE__ */ React.createElement("article", {
    className: `relative grid grid-cols-[4rem_1fr] grid-rows-[4rem_1fr] gap-3 overflow-hidden rounded-md bg-white px-3 py-3 shadow-lg`
  }, /* @__PURE__ */ React.createElement("a", {
    href: url ? url : `mailto:${email}`,
    target: "_blank",
    rel: "noopener",
    className: "shadow-inset-md col-start-1 row-start-1 h-16 w-16 overflow-hidden rounded-full"
  }, imagePath ? /* @__PURE__ */ React.createElement("picture", null, /* @__PURE__ */ React.createElement("source", {
    srcSet: `${imagePath}?w=120&h=120&fm=webp&f=face&fit=thumb, ${imagePath}?w=240&h=240&fm=webp&f=face&fit=thumb 2x`,
    type: "image/webp"
  }), /* @__PURE__ */ React.createElement("source", {
    srcSet: `${imagePath}?w=120&h=120&fm=jpeg&f=face&fit=thumb, ${imagePath}?w=240&h=240&fm=jpeg&f=face&fit=thumb 2x`,
    type: "image/jpeg"
  }), /* @__PURE__ */ React.createElement("img", {
    src: `${imagePath}?w=120&h=120&f=face&fit=thumb`,
    alt: name,
    className: "h-full w-full object-cover",
    width: "80",
    height: "80",
    loading: "lazy"
  })) : null), /* @__PURE__ */ React.createElement("header", {
    className: "col-start-2 row-start-1 self-center"
  }, /* @__PURE__ */ React.createElement("a", {
    href: url ? url : `mailto:${email}`,
    target: "_blank",
    rel: "noopener"
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "text-xl font-bold text-gray-500 transition-colors hover:text-vsp-500"
  }, name), /* @__PURE__ */ React.createElement("h2", {
    className: "text-sm font-extralight text-gray-500"
  }, "Sprachen:", flagCodes.map((lang, index) => {
    return /* @__PURE__ */ React.createElement(import_react_country_flag.default, {
      key: index,
      className: "px-1",
      style: {
        fontSize: "1.2em"
      },
      countryCode: lang
    });
  })))), /* @__PURE__ */ React.createElement("div", {
    className: "prose prose-sm col-span-full row-start-2"
  }, /* @__PURE__ */ React.createElement("p", null, /* @__PURE__ */ React.createElement("strong", {
    className: "text-gray-500"
  }, "Meine Schwerpunkte")), children), /* @__PURE__ */ React.createElement("div", {
    className: "col-span-2 col-start-1 flex flex-row justify-between gap-2"
  }, contactMethods.map((method) => /* @__PURE__ */ React.createElement("a", {
    key: method.type,
    href: method.address,
    target: "_blank",
    rel: "noopener",
    className: "flex w-full flex-grow items-center justify-center rounded-md border border-vsp-400 py-2 text-sm text-gray-600 no-underline transition-colors duration-200 hover:border-vsp-700 hover:bg-vsp-100 hover:text-vsp-900 focus:border-vsp-700 focus:bg-vsp-100 focus:text-vsp-900 active:border-vsp-700 active:bg-vsp-100 active:text-vsp-900"
  }, method.type === "phone" ? /* @__PURE__ */ React.createElement(import_outline.PhoneIcon, {
    className: "h6 mr-1 w-6"
  }) : method.type === "email" ? /* @__PURE__ */ React.createElement(import_outline.MailIcon, {
    className: "h6 mr-1 w-6"
  }) : /* @__PURE__ */ React.createElement(import_outline.GlobeIcon, {
    className: "h6 mr-1 w-6"
  }), /* @__PURE__ */ React.createElement("span", null, method.type)))), emergency ? /* @__PURE__ */ React.createElement("span", {
    className: "absolute top-0 right-4 w-48 translate-x-16 translate-y-8 rotate-45 transform bg-orange-300 py-1 text-center text-xs text-orange-900 shadow-md"
  }, "Emergency!") : null);
}

// app/components/CoachList.tsx
function CoachList({ coaches }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "bg-gray-100"
  }, /* @__PURE__ */ React.createElement("section", {
    className: "mx-auto grid max-w-7xl grid-cols-coachgrid items-start gap-x-6 gap-y-12 py-12 px-4"
  }, coaches.map((coach) => {
    const {
      email,
      name,
      url,
      phone,
      emergency,
      image,
      description,
      languages
    } = coach.fields;
    return /* @__PURE__ */ React.createElement(CoachCard, {
      key: coach.sys.id,
      name,
      email,
      url,
      phone,
      emergency,
      image,
      languages
    }, description && /* @__PURE__ */ React.createElement(ContentfulRichText, {
      content: description,
      withProse: false
    }));
  })));
}

// app/components/CoachFilterTag.tsx
init_react();
function CoachFilterTag({
  value,
  name,
  defaultValue,
  disabled,
  children,
  type
}) {
  return /* @__PURE__ */ React.createElement("label", {
    className: "min-h-4 mr-1 mb-1 inline-block"
  }, /* @__PURE__ */ React.createElement("input", {
    className: "peer sr-only",
    type,
    name,
    value,
    defaultChecked: defaultValue,
    disabled
  }), /* @__PURE__ */ React.createElement("span", {
    className: "inline-flex cursor-pointer items-center gap-1 rounded-md border px-2 py-1 peer-checked:bg-gray-500 peer-checked:text-white peer-disabled:pointer-events-none peer-disabled:cursor-default peer-disabled:opacity-40"
  }, /* @__PURE__ */ React.createElement("span", null, children)));
}

// route:/Users/markussiering/Sites/redezeit/app/routes/en.i-need-speaking-time.tsx
var loader4 = async ({
  request
}) => {
  const data = await getSearchPageContents(request, "en");
  return data;
};
var meta4 = ({ data }) => {
  var _a, _b, _c;
  const { title, seo } = (_a = data == null ? void 0 : data.page) == null ? void 0 : _a.fields;
  let seoMeta2 = getSeoMeta({
    title: ((_b = seo == null ? void 0 : seo.fields) == null ? void 0 : _b.title) || title,
    description: ((_c = seo == null ? void 0 : seo.fields) == null ? void 0 : _c.description) || null
  });
  return __spreadValues({}, seoMeta2);
};
function SearchingCoach() {
  const {
    page,
    coaches,
    coachesAmount,
    languages,
    tags,
    navigation,
    checkedTags,
    currentLang,
    locale,
    availableTagIDs
  } = (0, import_remix9.useLoaderData)();
  const submit = (0, import_remix9.useSubmit)();
  const formRef = (0, import_react5.useRef)(null);
  const { t } = (0, import_react_i18next4.useTranslation)("searchingCoach");
  const handleChange = () => {
    if (formRef) {
      submit(formRef.current, { replace: true });
    }
  };
  const state = (0, import_remix9.useTransition)();
  return /* @__PURE__ */ React.createElement(BasicLayout, {
    nav: navigation.fields.items,
    lang: locale
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(ContentBlocks, {
    content: page.fields.content,
    locale
  }), /* @__PURE__ */ React.createElement("details", {
    open: true,
    className: "mx-auto max-w-7xl py-8 px-4"
  }, /* @__PURE__ */ React.createElement("summary", null, /* @__PURE__ */ React.createElement("h5", {
    className: "inline-block text-xl"
  }, "Show filters")), /* @__PURE__ */ React.createElement(import_remix9.Form, {
    onChange: handleChange,
    ref: formRef,
    method: "get",
    id: "filter-form",
    className: "flex flex-col gap-2"
  }, /* @__PURE__ */ React.createElement("fieldset", {
    className: "mt-8"
  }, /* @__PURE__ */ React.createElement("legend", {
    className: "mb-4 inline-block text-xl"
  }, t("filter.language")), languages.map((lang) => /* @__PURE__ */ React.createElement(CoachFilterTag, {
    disabled: false,
    key: lang,
    value: lang,
    name: "lang",
    defaultValue: currentLang === lang,
    type: "radio"
  }, lang))), /* @__PURE__ */ React.createElement("fieldset", {
    className: "mt-8"
  }, /* @__PURE__ */ React.createElement("legend", {
    className: "mb-4 inline-block text-xl"
  }, t("filter.tag")), tags.map((tag) => {
    const isNotSelectable = !availableTagIDs.includes(tag.sys.id) && !checkedTags.includes(tag.fields.tag);
    return /* @__PURE__ */ React.createElement(CoachFilterTag, {
      disabled: isNotSelectable,
      key: tag.sys.id,
      value: tag.fields.tag,
      name: "tag",
      defaultValue: checkedTags.includes(tag.fields.tag),
      type: "checkbox"
    }, tag.fields.tag);
  })), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center gap-4"
  }, /* @__PURE__ */ React.createElement("noscript", null, /* @__PURE__ */ React.createElement("button", {
    className: "font-inherit my-8 inline-flex items-center justify-center rounded-md bg-vsp-500 py-2 px-4 text-white no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 disabled:pointer-events-none disabled:bg-vsp-200 md:text-lg",
    type: "submit",
    disabled: state.state === "submitting"
  }, t("filter.submitCta"))), /* @__PURE__ */ React.createElement("span", {
    className: "py-2 px-4 text-sm text-slate-400"
  }, coachesAmount ? `${coachesAmount} ${t("result")}` : t("noResult"))))), /* @__PURE__ */ React.createElement(CoachList, {
    coaches
  })));
}
function CatchBoundary2() {
  const caught = (0, import_remix9.useCatch)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Oh no!"), /* @__PURE__ */ React.createElement("p", null, "Status: ", caught.status), /* @__PURE__ */ React.createElement("pre", null, /* @__PURE__ */ React.createElement("code", null, JSON.stringify(caught.data, null, 2))));
}
function ErrorBoundary2({ error }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Error"), /* @__PURE__ */ React.createElement("p", null, error.message), /* @__PURE__ */ React.createElement("p", null, "The stack trace is:"), /* @__PURE__ */ React.createElement("pre", null, error.stack));
}

// route:/Users/markussiering/Sites/redezeit/app/routes/de.ich-suche-redezeit.tsx
var de_ich_suche_redezeit_exports = {};
__export(de_ich_suche_redezeit_exports, {
  CatchBoundary: () => CatchBoundary3,
  ErrorBoundary: () => ErrorBoundary3,
  default: () => SearchingCoach2,
  loader: () => loader5,
  meta: () => meta5
});
init_react();
var import_react6 = __toModule(require("react"));
var import_remix10 = __toModule(require_remix());
var import_react_i18next5 = __toModule(require("react-i18next"));
var loader5 = async ({
  request
}) => {
  const data = await getSearchPageContents(request, "de");
  return data;
};
var meta5 = ({ data }) => {
  var _a, _b, _c;
  const { title, seo } = (_a = data == null ? void 0 : data.page) == null ? void 0 : _a.fields;
  let seoMeta2 = getSeoMeta({
    title: ((_b = seo == null ? void 0 : seo.fields) == null ? void 0 : _b.title) || title,
    description: ((_c = seo == null ? void 0 : seo.fields) == null ? void 0 : _c.description) || null
  });
  return __spreadValues({}, seoMeta2);
};
function SearchingCoach2() {
  const {
    page,
    coaches,
    coachesAmount,
    languages,
    tags,
    navigation,
    checkedTags,
    currentLang,
    locale,
    availableTagIDs
  } = (0, import_remix10.useLoaderData)();
  const submit = (0, import_remix10.useSubmit)();
  const formRef = (0, import_react6.useRef)(null);
  const { t } = (0, import_react_i18next5.useTranslation)("searchingCoach");
  const handleChange = () => {
    if (formRef) {
      submit(formRef.current, { replace: true });
    }
  };
  const state = (0, import_remix10.useTransition)();
  return /* @__PURE__ */ React.createElement(BasicLayout, {
    nav: navigation.fields.items,
    lang: locale
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(ContentBlocks, {
    content: page.fields.content,
    locale
  }), /* @__PURE__ */ React.createElement("details", {
    open: true,
    className: "mx-auto max-w-7xl py-8 px-4"
  }, /* @__PURE__ */ React.createElement("summary", null, /* @__PURE__ */ React.createElement("h5", {
    className: "inline-block text-xl"
  }, "Filter anzeigen")), /* @__PURE__ */ React.createElement(import_remix10.Form, {
    onChange: handleChange,
    ref: formRef,
    method: "get",
    id: "filter-form",
    className: "flex flex-col gap-2"
  }, /* @__PURE__ */ React.createElement("fieldset", {
    className: "mt-8"
  }, /* @__PURE__ */ React.createElement("legend", {
    className: "mb-4 inline-block text-xl"
  }, t("filter.language")), languages.map((lang) => /* @__PURE__ */ React.createElement(CoachFilterTag, {
    disabled: false,
    key: lang,
    value: lang,
    name: "lang",
    defaultValue: currentLang === lang,
    type: "radio"
  }, lang))), /* @__PURE__ */ React.createElement("fieldset", {
    className: "mt-8"
  }, /* @__PURE__ */ React.createElement("legend", {
    className: "mb-4 inline-block text-xl"
  }, t("filter.tag")), tags.map((tag) => {
    const isNotSelectable = !availableTagIDs.includes(tag.sys.id) && !checkedTags.includes(tag.fields.tag);
    return /* @__PURE__ */ React.createElement(CoachFilterTag, {
      disabled: isNotSelectable,
      key: tag.sys.id,
      value: tag.fields.tag,
      name: "tag",
      defaultValue: checkedTags.includes(tag.fields.tag),
      type: "checkbox"
    }, tag.fields.tag);
  })), /* @__PURE__ */ React.createElement("div", {
    className: "flex items-center gap-4"
  }, /* @__PURE__ */ React.createElement("noscript", null, /* @__PURE__ */ React.createElement("button", {
    className: "font-inherit my-8 inline-flex items-center justify-center rounded-md bg-vsp-500 py-2 px-4 text-white no-underline transition-opacity duration-300 hover:opacity-90 focus:opacity-90 active:opacity-90 disabled:pointer-events-none disabled:bg-vsp-200 md:text-lg",
    type: "submit",
    disabled: state.state === "submitting"
  }, t("filter.submitCta"))), /* @__PURE__ */ React.createElement("span", {
    className: "py-2 px-4 text-sm text-slate-400"
  }, coachesAmount ? `${coachesAmount} ${t("result")}` : t("noResult"))))), /* @__PURE__ */ React.createElement(CoachList, {
    coaches
  })));
}
function CatchBoundary3() {
  const caught = (0, import_remix10.useCatch)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Oh no!"), /* @__PURE__ */ React.createElement("p", null, "Status: ", caught.status), /* @__PURE__ */ React.createElement("pre", null, /* @__PURE__ */ React.createElement("code", null, JSON.stringify(caught.data, null, 2))));
}
function ErrorBoundary3({ error }) {
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("h1", null, "Error"), /* @__PURE__ */ React.createElement("p", null, error.message), /* @__PURE__ */ React.createElement("p", null, "The stack trace is:"), /* @__PURE__ */ React.createElement("pre", null, error.stack));
}

// route:/Users/markussiering/Sites/redezeit/app/routes/enable-analytics.tsx
var enable_analytics_exports = {};
__export(enable_analytics_exports, {
  action: () => action
});
init_react();
var import_remix11 = __toModule(require_remix());
var action = async ({ request }) => {
  const formData = await request.formData();
  const cookieHeader = request.headers.get("Cookie");
  const cookie = await gdprConsent.parse(cookieHeader) || {};
  if (formData.get("accept-gdpr") === "true") {
    return (0, import_remix11.json)({ success: true }, {
      headers: {
        "Set-Cookie": await gdprConsent.serialize({
          gdprConsent: true
        })
      }
    });
  }
};

// route:/Users/markussiering/Sites/redezeit/app/routes/$locale.tsx
var locale_exports = {};
__export(locale_exports, {
  CatchBoundary: () => CatchBoundary4,
  ErrorBoundary: () => ErrorBoundary4,
  default: () => Wrapper,
  loader: () => loader6
});
init_react();
var import_remix12 = __toModule(require_remix());
var import_remix13 = __toModule(require_remix());
var import_remix_i18next = __toModule(require("remix-i18next"));
var loader6 = async ({
  params
}) => {
  var _a;
  const locale = params.locale || "de";
  if (!["en", "de"].includes(locale)) {
    console.warn("REDIRECTING FROM LOCALE FILE BECAUSE THE LOCALE IS:", locale);
    throw (0, import_remix13.redirect)(`/de/${locale}`, 301);
  }
  const navObject = await getMainNav(locale);
  const nav = (_a = navObject == null ? void 0 : navObject.fields) == null ? void 0 : _a.items;
  if (!nav || nav.length === 0) {
    throw new Response("Could not load navigation", { status: 404 });
  }
  return { nav, locale };
};
function Wrapper() {
  const { nav, locale } = (0, import_remix13.useLoaderData)();
  (0, import_remix_i18next.useSetupTranslations)(locale);
  return /* @__PURE__ */ React.createElement(BasicLayout, {
    nav,
    lang: locale
  }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(import_remix13.Outlet, null)));
}
function CatchBoundary4() {
  const caught = (0, import_remix12.useCatch)();
  const { nav, locale } = (0, import_remix13.useLoaderData)();
  return /* @__PURE__ */ React.createElement(BasicLayout, {
    nav,
    lang: locale
  }, /* @__PURE__ */ React.createElement("div", {
    className: "container mx-auto mt-32"
  }, /* @__PURE__ */ React.createElement("h2", null, "Oh noez! We failed."), /* @__PURE__ */ React.createElement("p", null, caught.status, ": ", caught.statusText)));
}
function ErrorBoundary4(error) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Oh noez! Something went wrong."), /* @__PURE__ */ React.createElement("p", null, error.message));
}

// route:/Users/markussiering/Sites/redezeit/app/routes/$locale/sitemap[.]xml.tsx
var sitemap_xml_exports = {};
__export(sitemap_xml_exports, {
  loader: () => loader7
});
init_react();
var loader7 = async ({ request }) => {
  const encoding = request.headers.get("accept-encoding") ?? "";
  const allPages = await getAllPages().catch(() => {
    throw new Error();
  });
  const postPages = allPages && allPages.map((page) => {
    let resultEn = page.fields.slug.en && [
      `<url>`,
      `<loc>https://www.virtualsupporttalks.de/en/${page.fields.slug.en}</loc>`,
      `</url>`
    ] || "";
    let resultDe = page.fields.slug.de && [
      `<url>`,
      `<loc>https://www.virtualsupporttalks.de/de/${page.fields.slug.de}</loc>`,
      `</url>`
    ] || "";
    return [...resultEn, ...resultDe].join("");
  });
  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    `<url>`,
    `<loc>https://www.virtualsupporttalks.de</loc>`,
    `</url>`,
    ...postPages,
    `</urlset>`
  ];
  const headers = {
    "Content-Type": "application/xml; charset=utf-8",
    "x-content-type-options": "nosniff"
  };
  return new Response(xml.join(""), { headers });
};

// route:/Users/markussiering/Sites/redezeit/app/routes/$locale/$slug.tsx
var slug_exports = {};
__export(slug_exports, {
  default: () => Index,
  loader: () => loader8,
  meta: () => meta6
});
init_react();
var import_remix14 = __toModule(require_remix());
var meta6 = ({ data }) => {
  var _a, _b, _c;
  const { title, seo } = (_a = data == null ? void 0 : data.page) == null ? void 0 : _a.fields;
  let seoMeta2 = getSeoMeta({
    title: ((_b = seo == null ? void 0 : seo.fields) == null ? void 0 : _b.title) || title,
    description: ((_c = seo == null ? void 0 : seo.fields) == null ? void 0 : _c.description) || null
  });
  return __spreadValues({}, seoMeta2);
};
var loader8 = async ({ params }) => {
  const { slug, locale } = params;
  const page = await getPage(slug, locale);
  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }
  return { page, locale };
};
function Index() {
  const {
    page: {
      fields: { content }
    },
    locale
  } = (0, import_remix14.useLoaderData)();
  return /* @__PURE__ */ React.createElement(ContentBlocks, {
    content,
    locale
  });
}

// route:/Users/markussiering/Sites/redezeit/app/routes/$locale/index.tsx
var locale_exports2 = {};
__export(locale_exports2, {
  default: () => Index2,
  loader: () => loader9,
  meta: () => meta7
});
init_react();
var import_remix15 = __toModule(require_remix());
var meta7 = ({ data }) => {
  var _a, _b, _c;
  const { title, seo } = (_a = data == null ? void 0 : data.page) == null ? void 0 : _a.fields;
  let seoMeta2 = getSeoMeta({
    title: ((_b = seo == null ? void 0 : seo.fields) == null ? void 0 : _b.title) || title,
    description: ((_c = seo == null ? void 0 : seo.fields) == null ? void 0 : _c.description) || null
  });
  return __spreadValues({}, seoMeta2);
};
var loader9 = async ({
  params
}) => {
  const locale = params.locale;
  if (!locale) {
    throw new Error("No locale provided");
  }
  const page = await getPageById(pageIds_default.STARTPAGE, locale);
  if (!page) {
    throw new Response("Not Found", { status: 404 });
  }
  return { page, locale };
};
function Index2() {
  const {
    page: {
      fields: { content }
    },
    locale
  } = (0, import_remix15.useLoaderData)();
  return /* @__PURE__ */ React.createElement(ContentBlocks, {
    content,
    locale
  });
}

// route:/Users/markussiering/Sites/redezeit/app/routes/$locale/blog.tsx
var blog_exports = {};
__export(blog_exports, {
  default: () => BlogWrapepr,
  meta: () => meta8
});
init_react();
var import_remix16 = __toModule(require_remix());
var meta8 = () => {
  let seoMeta2 = getSeoMeta({
    title: "Lesezeit \u2013 das Redezeit Blog.",
    description: "Beitr\xE4ge rund um Redezeit."
  });
  return __spreadValues({}, seoMeta2);
};
function BlogWrapepr() {
  return /* @__PURE__ */ React.createElement("div", {
    className: "container mx-auto max-w-6xl"
  }, /* @__PURE__ */ React.createElement(import_remix16.Outlet, null));
}

// route:/Users/markussiering/Sites/redezeit/app/routes/$locale/blog/tag/$tag.tsx
var tag_exports = {};
__export(tag_exports, {
  CatchBoundary: () => CatchBoundary5,
  ErrorBoundary: () => ErrorBoundary5,
  default: () => Index3,
  loader: () => loader10
});
init_react();
var import_remix17 = __toModule(require_remix());

// app/components/BlogpostCard.tsx
init_react();

// app/components/TagGroup.tsx
init_react();
function TagGroup({ tags, locale }) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "flex items-start gap-2"
  }, tags == null ? void 0 : tags.map((tag) => {
    const { tagName, slug } = tag.fields;
    return /* @__PURE__ */ React.createElement(CleverLink, {
      key: tagName,
      to: `/${locale}/blog/tag/${slug}`,
      className: "inline-block whitespace-nowrap rounded-full bg-vsp-200 px-3 py-1 text-xs font-semibold text-vsp-900 hover:bg-vsp-300"
    }, tagName);
  }));
}

// app/components/BlogpostCard.tsx
var import_react_i18next6 = __toModule(require("react-i18next"));
function BlogpostCard({
  post,
  locale
}) {
  var _a, _b;
  const { title, slug, tagList, description, mainImage } = post.fields;
  const image = (_b = (_a = mainImage == null ? void 0 : mainImage.fields) == null ? void 0 : _a.file) == null ? void 0 : _b.url;
  const dateObj = new Date(post.sys.createdAt);
  const date = dateObj.toLocaleString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  const { t } = (0, import_react_i18next6.useTranslation)("blogpostCard");
  return /* @__PURE__ */ React.createElement("div", {
    key: post.sys.id,
    className: "group grid grid-cols-1 content-start gap-2 no-underline"
  }, Boolean(image) ? /* @__PURE__ */ React.createElement(CleverLink, {
    to: slug
  }, /* @__PURE__ */ React.createElement("img", {
    src: image,
    className: "h-auto max-h-40 w-full rounded-lg object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100"
  })) : /* @__PURE__ */ React.createElement(CleverLink, {
    to: slug,
    className: `h-40 max-h-40 w-full rounded-lg bg-vsp-500 bg-contain bg-center bg-no-repeat object-cover opacity-80 transition-opacity duration-300 group-hover:opacity-100`
  }, "\xA0"), /* @__PURE__ */ React.createElement(CleverLink, {
    to: slug
  }, /* @__PURE__ */ React.createElement("h3", {
    className: "font-headline text-xl font-bold group-hover:text-vsp-500"
  }, title)), /* @__PURE__ */ React.createElement("aside", {
    className: `flex items-center gap-4 ${Boolean(tagList) ? "justify-between" : "justify-end"}`
  }, Boolean(tagList) && /* @__PURE__ */ React.createElement(TagGroup, {
    tags: tagList,
    locale
  }), /* @__PURE__ */ React.createElement("time", {
    dateTime: post.sys.createdAt,
    className: "text-xs italic text-gray-400"
  }, date)), /* @__PURE__ */ React.createElement("p", null, description), /* @__PURE__ */ React.createElement(CleverLink, {
    to: slug,
    className: "block underline"
  }, t("ctaToBlogpost")));
}

// route:/Users/markussiering/Sites/redezeit/app/routes/$locale/blog/tag/$tag.tsx
var import_react_i18next7 = __toModule(require("react-i18next"));
var loader10 = async ({ params }) => {
  const tag = params.tag;
  const locale = params.locale || "de";
  const posts = await getBlogposts(locale);
  if (!posts) {
    throw new Response("Not Found", { status: 404 });
  }
  const postsWithCurrentTag = posts.filter((post) => {
    return post.fields.tagList && post.fields.tagList.some((tag2) => tag2.fields.slug === params.tag);
  });
  return { posts: postsWithCurrentTag, locale, tag };
};
function Index3() {
  const {
    posts,
    locale,
    tag
  } = (0, import_remix17.useLoaderData)();
  const { t } = (0, import_react_i18next7.useTranslation)("blogpostByTag");
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("header", {
    className: "w-full px-4 pt-24"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "font-headline text-3xl font-bold"
  }, t("title"), ' "', tag, '"')), /* @__PURE__ */ React.createElement("div", {
    className: "my-4 mx-auto grid grid-cols-1 gap-y-24 gap-x-16 px-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
  }, posts.map((post) => /* @__PURE__ */ React.createElement(BlogpostCard, {
    post,
    locale,
    key: post.sys.id
  }))));
}
function CatchBoundary5() {
  const caught = (0, import_remix17.useCatch)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "container mx-auto mt-32"
  }, /* @__PURE__ */ React.createElement("h2", null, "Oh noez! We failed."), /* @__PURE__ */ React.createElement("p", null, caught.status, ": ", caught.statusText));
}
function ErrorBoundary5(error) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Oh noez! Something went wrong."), /* @__PURE__ */ React.createElement("p", null, JSON.stringify(error)));
}

// route:/Users/markussiering/Sites/redezeit/app/routes/$locale/blog/$post.tsx
var post_exports = {};
__export(post_exports, {
  CatchBoundary: () => CatchBoundary6,
  ErrorBoundary: () => ErrorBoundary6,
  default: () => Blogpost,
  loader: () => loader11,
  meta: () => meta9
});
init_react();
var import_remix18 = __toModule(require_remix());
var meta9 = ({
  data
}) => {
  var _a, _b, _c;
  const { title, seo, description } = (_a = data == null ? void 0 : data.blogpost) == null ? void 0 : _a.fields;
  let seoMeta2 = getSeoMeta({
    title: ((_b = seo == null ? void 0 : seo.fields) == null ? void 0 : _b.title) || title,
    description: ((_c = seo == null ? void 0 : seo.fields) == null ? void 0 : _c.description) || description
  });
  return __spreadValues({}, seoMeta2);
};
var loader11 = async ({ params }) => {
  const { post, locale } = params;
  if (!post) {
    throw new Response("Not Found", { status: 404 });
  }
  const blogpost = await getBlogpost(post, locale);
  if (!blogpost) {
    throw new Response("Not Found", { status: 404 });
  }
  return { blogpost, locale };
};
function Blogpost() {
  const { blogpost, locale } = (0, import_remix18.useLoaderData)();
  const { mainImage, content, title, tagList } = blogpost.fields;
  const dateObj = new Date(blogpost.sys.createdAt);
  const date = dateObj.toLocaleString(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("header", {
    className: "mx-auto w-full max-w-4xl px-4 pt-24 pb-6"
  }, /* @__PURE__ */ React.createElement("div", {
    className: `grid min-h-[16rem] grid-cols-1 grid-rows-1 overflow-hidden rounded-lg shadow-lg after:relative after:z-10 after:col-start-1 after:row-start-1 after:block after:bg-vsp-500 after:mix-blend-multiply after:content-[''] ${!mainImage && "bg-contain"}`
  }, mainImage && /* @__PURE__ */ React.createElement("img", {
    className: "relative z-0 col-start-1 row-start-1 min-h-[16rem] w-full max-w-4xl object-cover",
    src: mainImage.fields.file.url
  }), /* @__PURE__ */ React.createElement("h1", {
    className: "relative z-20 col-start-1 row-start-1 m-0 self-end break-words p-4 font-headline text-3xl font-bold text-white md:text-4xl lg:text-5xl"
  }, title))), /* @__PURE__ */ React.createElement("aside", {
    className: `mx-auto flex max-w-4xl flex-wrap gap-4 px-4 ${Boolean(tagList) ? "justify-between" : "justify-end"}`
  }, Boolean(tagList) && /* @__PURE__ */ React.createElement(TagGroup, {
    tags: tagList,
    locale
  }), /* @__PURE__ */ React.createElement("div", {
    className: "flex gap-4"
  }, /* @__PURE__ */ React.createElement("time", {
    dateTime: "sys.createdAt",
    className: "text-sm italic text-gray-400 md:text-base"
  }, date))), /* @__PURE__ */ React.createElement(ContentBlocks, {
    content
  }));
}
function CatchBoundary6() {
  const caught = (0, import_remix18.useCatch)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "container mx-auto mt-32"
  }, /* @__PURE__ */ React.createElement("h2", null, "Oh noez! We failed."), /* @__PURE__ */ React.createElement("p", null, caught.status, ": ", caught.statusText));
}
function ErrorBoundary6(error) {
  return /* @__PURE__ */ React.createElement("div", {
    className: "container mx-auto mt-32"
  }, /* @__PURE__ */ React.createElement("h2", null, "Oh noez! Something went wrong."), /* @__PURE__ */ React.createElement("p", null, JSON.stringify(error)));
}

// route:/Users/markussiering/Sites/redezeit/app/routes/$locale/blog/index.tsx
var blog_exports2 = {};
__export(blog_exports2, {
  CatchBoundary: () => CatchBoundary7,
  ErrorBoundary: () => ErrorBoundary7,
  default: () => Index4,
  loader: () => loader12
});
init_react();
var import_remix19 = __toModule(require_remix());
var loader12 = async ({ params }) => {
  const locale = params.locale || "de";
  const posts = await getBlogposts(locale);
  if (!posts) {
    throw new Response("Not Found", { status: 404 });
  }
  return { posts, locale };
};
function Index4() {
  const { posts, locale } = (0, import_remix19.useLoaderData)();
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("header", {
    className: "w-full px-4 pt-32 pb-12"
  }, /* @__PURE__ */ React.createElement("h2", {
    className: "font-headline text-3xl font-bold"
  }, "Die neuesten Blog-Beitr\xE4ge")), /* @__PURE__ */ React.createElement("div", {
    className: "my-4 mx-auto grid grid-cols-1 gap-16 px-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-y-16 lg:gap-x-12"
  }, posts.map((post) => /* @__PURE__ */ React.createElement(BlogpostCard, {
    post,
    locale,
    key: post.sys.id
  }))));
}
function CatchBoundary7() {
  const caught = (0, import_remix19.useCatch)();
  return /* @__PURE__ */ React.createElement("div", {
    className: "container mx-auto mt-32"
  }, /* @__PURE__ */ React.createElement("h2", null, "Oh noez! We failed."), /* @__PURE__ */ React.createElement("p", null, caught.status, ": ", caught.statusText));
}
function ErrorBoundary7(error) {
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", null, "Oh noez! Something went wrong."), /* @__PURE__ */ React.createElement("p", null, JSON.stringify(error)));
}

// route:/Users/markussiering/Sites/redezeit/app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  loader: () => loader13
});
init_react();
var import_remix20 = __toModule(require_remix());
var loader13 = () => {
  console.warn("REDIRECTING FROM INDEX FILE");
  throw (0, import_remix20.redirect)("/de", 301);
};

// server-assets-manifest:@remix-run/dev/assets-manifest
init_react();
var assets_manifest_default = { "version": "63d9fc92", "entry": { "module": "/build/entry.client-QYFARNOE.js", "imports": ["/build/_shared/chunk-6E57T6ZT.js", "/build/_shared/chunk-TEV4YBFU.js", "/build/_shared/chunk-M2Z6HUJH.js"] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "module": "/build/root-ZOKNVJSW.js", "imports": ["/build/_shared/chunk-IFAJNCYT.js", "/build/_shared/chunk-UO57PKS5.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/$locale": { "id": "routes/$locale", "parentId": "root", "path": ":locale", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/$locale-ZPBT5NIH.js", "imports": ["/build/_shared/chunk-QRV6SSQJ.js", "/build/_shared/chunk-QRC4XLAS.js", "/build/_shared/chunk-YFDVEAAO.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/$locale/$slug": { "id": "routes/$locale/$slug", "parentId": "routes/$locale", "path": ":slug", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/$locale/$slug-7KT4P753.js", "imports": ["/build/_shared/chunk-QQYTY27B.js", "/build/_shared/chunk-IFAJNCYT.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/$locale/blog": { "id": "routes/$locale/blog", "parentId": "routes/$locale", "path": "blog", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/$locale/blog-FWJZUAJ2.js", "imports": ["/build/_shared/chunk-IFAJNCYT.js"], "hasAction": false, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/$locale/blog/$post": { "id": "routes/$locale/blog/$post", "parentId": "routes/$locale/blog", "path": ":post", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/$locale/blog/$post-MXFQ54RI.js", "imports": ["/build/_shared/chunk-5ZF2UJ53.js", "/build/_shared/chunk-QQYTY27B.js", "/build/_shared/chunk-QRV6SSQJ.js", "/build/_shared/chunk-YFDVEAAO.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/$locale/blog/index": { "id": "routes/$locale/blog/index", "parentId": "routes/$locale/blog", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/$locale/blog/index-NVFZVOGC.js", "imports": ["/build/_shared/chunk-VGZIF3RF.js", "/build/_shared/chunk-5ZF2UJ53.js", "/build/_shared/chunk-QRV6SSQJ.js", "/build/_shared/chunk-YFDVEAAO.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/$locale/blog/tag/$tag": { "id": "routes/$locale/blog/tag/$tag", "parentId": "routes/$locale/blog", "path": "tag/:tag", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/$locale/blog/tag/$tag-JURUB3OW.js", "imports": ["/build/_shared/chunk-VGZIF3RF.js", "/build/_shared/chunk-5ZF2UJ53.js", "/build/_shared/chunk-QRV6SSQJ.js", "/build/_shared/chunk-YFDVEAAO.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/$locale/index": { "id": "routes/$locale/index", "parentId": "routes/$locale", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/$locale/index-H7QJDJAH.js", "imports": ["/build/_shared/chunk-QQYTY27B.js", "/build/_shared/chunk-IFAJNCYT.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/$locale/sitemap[.]xml": { "id": "routes/$locale/sitemap[.]xml", "parentId": "routes/$locale", "path": "sitemap.xml", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/$locale/sitemap[.]xml-OQVK4LLU.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/de.ich-suche-redezeit": { "id": "routes/de.ich-suche-redezeit", "parentId": "root", "path": "de/ich-suche-redezeit", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/de.ich-suche-redezeit-VZOCZXCB.js", "imports": ["/build/_shared/chunk-UUPKRTYE.js", "/build/_shared/chunk-QQYTY27B.js", "/build/_shared/chunk-QRC4XLAS.js", "/build/_shared/chunk-YFDVEAAO.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/de.netzwerk-partner-medien": { "id": "routes/de.netzwerk-partner-medien", "parentId": "root", "path": "de/netzwerk-partner-medien", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/de.netzwerk-partner-medien-MC6Z6FNY.js", "imports": ["/build/_shared/chunk-KZVMLNNA.js", "/build/_shared/chunk-QQYTY27B.js", "/build/_shared/chunk-QRV6SSQJ.js", "/build/_shared/chunk-QRC4XLAS.js", "/build/_shared/chunk-YFDVEAAO.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/en.i-need-speaking-time": { "id": "routes/en.i-need-speaking-time", "parentId": "root", "path": "en/i-need-speaking-time", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/en.i-need-speaking-time-HWJHT2YN.js", "imports": ["/build/_shared/chunk-UUPKRTYE.js", "/build/_shared/chunk-QQYTY27B.js", "/build/_shared/chunk-QRC4XLAS.js", "/build/_shared/chunk-YFDVEAAO.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": true, "hasErrorBoundary": true }, "routes/en.network-partner-media": { "id": "routes/en.network-partner-media", "parentId": "root", "path": "en/network-partner-media", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/en.network-partner-media-ZV2T5M3Q.js", "imports": ["/build/_shared/chunk-KZVMLNNA.js", "/build/_shared/chunk-QQYTY27B.js", "/build/_shared/chunk-QRV6SSQJ.js", "/build/_shared/chunk-QRC4XLAS.js", "/build/_shared/chunk-YFDVEAAO.js"], "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/enable-analytics": { "id": "routes/enable-analytics", "parentId": "root", "path": "enable-analytics", "index": void 0, "caseSensitive": void 0, "module": "/build/routes/enable-analytics-SRACTYI2.js", "imports": void 0, "hasAction": true, "hasLoader": false, "hasCatchBoundary": false, "hasErrorBoundary": false }, "routes/index": { "id": "routes/index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "module": "/build/routes/index-GQJKFOBN.js", "imports": void 0, "hasAction": false, "hasLoader": true, "hasCatchBoundary": false, "hasErrorBoundary": false } }, "url": "/build/manifest-63D9FC92.js" };

// server-entry-module:@remix-run/dev/server-build
var entry = { module: entry_server_exports };
var routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/de.netzwerk-partner-medien": {
    id: "routes/de.netzwerk-partner-medien",
    parentId: "root",
    path: "de/netzwerk-partner-medien",
    index: void 0,
    caseSensitive: void 0,
    module: de_netzwerk_partner_medien_exports
  },
  "routes/en.network-partner-media": {
    id: "routes/en.network-partner-media",
    parentId: "root",
    path: "en/network-partner-media",
    index: void 0,
    caseSensitive: void 0,
    module: en_network_partner_media_exports
  },
  "routes/en.i-need-speaking-time": {
    id: "routes/en.i-need-speaking-time",
    parentId: "root",
    path: "en/i-need-speaking-time",
    index: void 0,
    caseSensitive: void 0,
    module: en_i_need_speaking_time_exports
  },
  "routes/de.ich-suche-redezeit": {
    id: "routes/de.ich-suche-redezeit",
    parentId: "root",
    path: "de/ich-suche-redezeit",
    index: void 0,
    caseSensitive: void 0,
    module: de_ich_suche_redezeit_exports
  },
  "routes/enable-analytics": {
    id: "routes/enable-analytics",
    parentId: "root",
    path: "enable-analytics",
    index: void 0,
    caseSensitive: void 0,
    module: enable_analytics_exports
  },
  "routes/$locale": {
    id: "routes/$locale",
    parentId: "root",
    path: ":locale",
    index: void 0,
    caseSensitive: void 0,
    module: locale_exports
  },
  "routes/$locale/sitemap[.]xml": {
    id: "routes/$locale/sitemap[.]xml",
    parentId: "routes/$locale",
    path: "sitemap.xml",
    index: void 0,
    caseSensitive: void 0,
    module: sitemap_xml_exports
  },
  "routes/$locale/$slug": {
    id: "routes/$locale/$slug",
    parentId: "routes/$locale",
    path: ":slug",
    index: void 0,
    caseSensitive: void 0,
    module: slug_exports
  },
  "routes/$locale/index": {
    id: "routes/$locale/index",
    parentId: "routes/$locale",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: locale_exports2
  },
  "routes/$locale/blog": {
    id: "routes/$locale/blog",
    parentId: "routes/$locale",
    path: "blog",
    index: void 0,
    caseSensitive: void 0,
    module: blog_exports
  },
  "routes/$locale/blog/tag/$tag": {
    id: "routes/$locale/blog/tag/$tag",
    parentId: "routes/$locale/blog",
    path: "tag/:tag",
    index: void 0,
    caseSensitive: void 0,
    module: tag_exports
  },
  "routes/$locale/blog/$post": {
    id: "routes/$locale/blog/$post",
    parentId: "routes/$locale/blog",
    path: ":post",
    index: void 0,
    caseSensitive: void 0,
    module: post_exports
  },
  "routes/$locale/blog/index": {
    id: "routes/$locale/blog/index",
    parentId: "routes/$locale/blog",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: blog_exports2
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: routes_exports
  }
};

// server.js
function getLoadContext(event, context) {
  let rawAuthorizationString;
  let netlifyGraphToken;
  if (event.authlifyToken != null) {
    netlifyGraphToken = event.authlifyToken;
  }
  const authHeader = event.headers["authorization"];
  const graphSignatureHeader = event.headers["x-netlify-graph-signature"];
  if (authHeader != null && /Bearer /gi.test(authHeader)) {
    rawAuthorizationString = authHeader.split(" ")[1];
  }
  const loadContext = {
    clientNetlifyGraphAccessToken: rawAuthorizationString,
    netlifyGraphToken,
    netlifyGraphSignature: graphSignatureHeader
  };
  Object.keys(loadContext).forEach((key) => {
    if (loadContext[key] == null) {
      delete loadContext[key];
    }
  });
  return loadContext;
}
var handler = (0, import_netlify.createRequestHandler)({
  build: server_build_exports,
  getLoadContext,
  mode: "production"
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
/**
 * @remix-run/node v1.2.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/react v1.2.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
/**
 * @remix-run/server-runtime v1.2.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
