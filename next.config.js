const MillionLint = require('@million/lint');
/** @type {import('next').NextConfig} */

module.exports = {
  eslint: {
    // Disabling on production builds because we're running checks on PRs via GitHub Actions.
    ignoreDuringBuilds: true
  },
  webpack: (config) => {
    const errorMsg =
      "Cannot get final name for export 'ResponseCookies' of ./node_modules/next/dist/esm/server/web/spec-extension/cookies.js";
    config.stats = {
      ...config.stats,
      warningsFilter: (warning) => {
        return !warning.includes(errorMsg);
      }
    };
    return config;
  },
  images: {
    domains: [
      'cdn.shopify.com',
      'asset.cloudinary.com',
      'res.cloudinary.com',
      'images.prismic.io',
      'i.ibb.co',
      'images.prismic.io'
    ]
  },
  async redirects() {
    return [
      {
        source: '/password',
        destination: '/',
        permanent: true
      }
    ];
  }
};
