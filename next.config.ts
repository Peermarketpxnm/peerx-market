import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["via.placeholder.com", "ipfs.io", "ipfs.infura.io"],
  },
  env: {
    NEXT_PUBLIC_ETHEREUM_NETWORK:
      process.env.NEXT_PUBLIC_ETHEREUM_NETWORK || "sepolia",
    NEXT_PUBLIC_INFURA_ID: process.env.NEXT_PUBLIC_INFURA_ID,
  },
};

export default nextConfig;
