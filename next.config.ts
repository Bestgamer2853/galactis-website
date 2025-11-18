import type { NextConfig } from "next";

/**
 * Next.js 16 Configuration
 * 
 * Compatible with Vercel and Netlify deployments
 * 
 * IMPORTANT NOTES:
 * - Next.js 16 uses Turbopack by default (faster builds)
 * - ESLint config moved to separate .eslintrc or removed (handled by next lint)
 * - Webpack config replaced with Turbopack config if needed
 * - Image optimization works on both Vercel and Netlify
 * - For Netlify: Use @netlify/plugin-nextjs plugin for best compatibility
 */
const nextConfig: NextConfig = {
  // React strict mode for better development experience
  reactStrictMode: true,

  // Image optimization settings (works on Vercel and Netlify)
  images: {
    // Allow images from external domains if needed
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Optimize images for better performance
    formats: ["image/avif", "image/webp"],
    // For Netlify: Use loader if needed, otherwise Next.js handles it
    // loader: "custom",
    // loaderFile: "./lib/imageLoader.js",
  },

  // TypeScript configuration
  typescript: {
    // Don't fail build on type errors (set to false for strict checking)
    ignoreBuildErrors: false,
  },

  // Output configuration
  // For static export: output: 'export'
  // For SSR/SSG (Vercel/Netlify): Leave undefined (default)
  // Netlify requires @netlify/plugin-nextjs for App Router support

  // Compiler options
  compiler: {
    // Remove console logs in production (optional)
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ["error", "warn"], // Keep errors and warnings
    } : false,
  },

  // Turbopack configuration (Next.js 16+)
  // Disabled due to runtime chunk issues - using webpack instead
  // turbopack: {},
};

export default nextConfig;
