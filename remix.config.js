/** @type {import('@remix-run/dev').AppConfig} */
module.exports = {
  future: {
    unstable_postcss: true,
    unstable_tailwind: true,
    v2_routeConvention: true,
    v2_errorBoundary: true,
  },
  ignoredRouteFiles: ["**/.*"],
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.js"
      : undefined,
  serverBuildPath: ".netlify/functions-internal/server.js",
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
};
