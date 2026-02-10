import withMDX from "@next/mdx";
import { NextConfig } from "next";

export default withMDX()({
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  redirects: async () => [
    {
      source: "/posts/:slug",
      destination: "/thoughts/:slug",
      permanent: false,
    },
  ],
  experimental: {
    viewTransition: true,
    mdxRs: {
      mdxType: "gfm",
    },
  },
  transpilePackages: ["shiki"],
  images: {
    contentDispositionType: "inline",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000,
  },
} satisfies NextConfig);
