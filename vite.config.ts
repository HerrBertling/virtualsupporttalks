import netlifyPlugin from "@netlify/vite-plugin-react-router";
import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter(), netlifyPlugin()],
  resolve: {
    tsconfigPaths: true,
  },
});
