module.exports = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true,
  },
  publicRuntimeConfig: {
    app: {
      baseUrl: process.env.MAGLIT_BASE_URL,
    },
  },
};
