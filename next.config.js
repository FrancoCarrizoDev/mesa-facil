/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "lh3.googleusercontent.com",
        pathname: "/a/**",
        protocol: "https",
        port: "",
      },
      {
        hostname: "s.gravatar.com",
        pathname: "/avatar/**",
        protocol: "https",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
