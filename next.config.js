/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  experimental: {
    esmExternals: "loose",
  },
};

module.exports = nextConfig;
