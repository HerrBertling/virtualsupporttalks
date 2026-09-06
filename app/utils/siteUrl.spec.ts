import { describe, expect, it } from "vitest";
import { canonicalUrl, isSecondaryHost, requestOrigin } from "./siteUrl";

const req = (url: string) => new Request(url);

describe("canonicalUrl", () => {
  it("returns an absolute URL on the primary origin", () => {
    expect(canonicalUrl("/de/impressum")).toBe("https://www.virtualsupporttalks.de/de/impressum");
  });

  it("collapses a trailing slash so /de and /de/ share one canonical", () => {
    expect(canonicalUrl("/de/")).toBe(canonicalUrl("/de"));
  });

  it("keeps the root path, which must not become an empty href", () => {
    expect(canonicalUrl("/")).toBe("https://www.virtualsupporttalks.de/");
  });
});

describe("isSecondaryHost", () => {
  it.each([
    "https://redezeitfuerdich.de/de",
    "https://www.redezeitfuerdich.de/de",
    "https://WWW.REDEZEITFUERDICH.DE/de",
  ])("recognises %s", (url) => {
    expect(isSecondaryHost(req(url))).toBe(true);
  });

  it.each(["https://www.virtualsupporttalks.de/de", "http://localhost:5173/de"])(
    "does not flag %s",
    (url) => {
      expect(isSecondaryHost(req(url))).toBe(false);
    }
  );
});

describe("requestOrigin", () => {
  it("lets the second domain advertise its own URLs in robots.txt and the sitemap", () => {
    expect(requestOrigin(req("https://www.redezeitfuerdich.de/robots.txt"))).toBe(
      "https://www.redezeitfuerdich.de"
    );
  });

  it("uses the primary origin everywhere else", () => {
    expect(requestOrigin(req("https://www.virtualsupporttalks.de/robots.txt"))).toBe(
      "https://www.virtualsupporttalks.de"
    );
  });
});
