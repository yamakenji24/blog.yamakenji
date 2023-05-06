/**
 * @type {import('@remix-run/dev').AppConfig}
 */
 module.exports = {
  // serverBuildTarget: "vercel",
  // When running locally in development mode, we use the built in remix
  // server. This does not understand the vercel lambda module format,
  // so we default back to the standard build output.
  server: process.env.NODE_ENV === "development" ? undefined : "./server.js",
  ignoredRouteFiles: [".*"],
  publicPath: "/build/",
  serverBuildPath: "api/index.js",
  serverModuleFormat: "cjs",

  // Default settings when cjs
  // serverMainFields: ["main, module"], 
  serverPlatform: "node",
  serverMinify: false,
  mdx: async () => {
    const [rehypeHighlight] = await Promise.all([
      import("rehype-highlight").then(m => m.default),
    ]);

    return {
      rehypePlugins: [rehypeHighlight],
    }
  },
  future: {
    v2_errorBoundary: true,
    v2_meta: true,
    v2_normalizeFormMethod: true,
    v2_routeConvention: true,
  },
};
