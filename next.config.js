/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lostsouls.infura-ipfs.io"],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
