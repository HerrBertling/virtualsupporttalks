import { createCookie } from "remix";

export const gdprConsent = createCookie("vst-gdpr-consent", {
  maxAge: 31536000, // One Year
});
