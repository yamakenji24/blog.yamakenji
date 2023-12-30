// eslint-disable-next-line @typescript-eslint/no-var-requires
const { createRoutesFromFolders } = require("@remix-run/v1-route-convention");
/**
 * @type {import('@remix-run/dev').AppConfig}
 */
 module.exports = {
  publicPath: "/build/",
  serverBuildPath: "api/index.js",
  // serverMainFields: "main, module",
  serverModuleFormat: "cjs",
  serverPlatform: "node",
  serverMinify: false,
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  ignoredRouteFiles: [".*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  mdx: async () => {
    const [rehypeHighlight] = await Promise.all([
      import("rehype-highlight").then(m => m.default),
    ]);

    return {
      rehypePlugins: [rehypeHighlight],
    }
  },
  routes(defineRoutes) {
    // uses the v1 convention, works in v1.15+ and v2
    return createRoutesFromFolders(defineRoutes);
  },
};
