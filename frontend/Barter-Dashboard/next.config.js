/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config, { dev, isServer }) {
    if (dev) {
      config.devtool = 'source-map';
    }
    return config;
  },
  // Other potential settings
  reactStrictMode: true,
};
module.exports = {
  env: {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
}, nextConfig;
