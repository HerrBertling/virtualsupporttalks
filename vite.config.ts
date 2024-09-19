import { vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { netlifyPlugin } from "@netlify/remix-adapter/plugin";
import { remixDevTools } from "remix-development-tools";


export default defineConfig({
  plugins: [remixDevTools(), remix({
  ignoredRouteFiles: ["**/.*"],
  }), netlifyPlugin(), tsconfigPaths()],
});
