import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Static export for GitHub Pages
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: "/repic-blogpost",
};

export default nextConfig;
