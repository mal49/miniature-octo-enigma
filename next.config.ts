import type { NextConfig } from "next";

// Static export for Cloudflare Pages. Security headers live in
// public/_headers, since next.config headers() doesn't apply to static output.
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
