import { describe, expect, test } from "vitest";
import { isScannerProbe, teapotResponse } from "./scannerTrap";

const req = (url: string) => new Request(url);

describe("isScannerProbe", () => {
  test.each([
    "/admin/phpinfo.php",
    "/php/phpinfo.php",
    "/phpinfo.php",
    "/info.php",
    "/test.php",
    "/config.php",
    "/xmlrpc.php",
    "/.env",
    "/.env.local",
    "/.env.production",
    "/.env.bak",
    "/.env~",
    "/.ENV",
    "/api/.env",
    "/familie/.env",
    "/%2Eenv",
    "/.%65nv",
    "/.git/HEAD",
    "/wp-content/plugins/foo/readme.txt",
    "/wp-admin/install.php",
    "/wp-login.php",
    "/actuator",
    "/actuator/env",
    "/_ignition/execute-solution",
    "/debug/pprof/",
    "/debug/vars",
    "/_layouts/15/",
    "/appsettings.json",
    "/appsettings.Production.json",
    "/web.config",
    "/swagger.json",
    "/openapi.json",
  ])("flags scanner path %s", (path) => {
    expect(isScannerProbe(req(`https://example.com${path}`))).toBe(true);
  });

  test.each([
    "/?=phpinfo()",
    "/index.php?=phpinfo()",
    "/?url=http://169.254.169.254/latest/meta-data/iam/security-credentials/",
    "/?redirect=http://169.254.169.254/",
    "/?proxy=https://169.254.169.254/",
  ])("flags scanner query in %s", (path) => {
    expect(isScannerProbe(req(`https://example.com${path}`))).toBe(true);
  });

  test.each([
    "/",
    "/de",
    "/de/blog",
    "/de/blog/some-post",
    "/de/ich-suche-redezeit",
    "/en/i-need-speaking-time",
    "/fragen-und-antworten",
    "/fragen-und-antworten.data",
    "/robots.txt",
    "/favicon.ico",
    "/apple-touch-icon.png",
    "/de/blog/?page=2",
    "/de/ich-suche-redezeit?lang=de&search=anna",
  ])("does not flag legitimate path %s", (path) => {
    expect(isScannerProbe(req(`https://example.com${path}`))).toBe(false);
  });
});

describe("teapotResponse", () => {
  test("returns HTTP 418 with text/plain body", async () => {
    const res = teapotResponse();
    expect(res.status).toBe(418);
    expect(res.headers.get("Content-Type")).toMatch(/^text\/plain/);
    expect(await res.text()).toContain("teapot");
  });
});
