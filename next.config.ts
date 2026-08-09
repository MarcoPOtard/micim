import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, "styles/")],
  },

  // Sanity Studio (embarqué sur /studio) embarque des packages non encore
  // pleinement compatibles avec le bundling Turbopack des Server Components.
  serverExternalPackages: ["sanity", "@sanity/vision"],
  
  // Optimize images
  images: {
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },

  // Enable experimental features for better performance
  // experimental: {
  //   optimizeCss: true, // Disabled due to build issues
  // },
};

export default nextConfig;
