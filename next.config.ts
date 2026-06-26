import type { NextConfig } from "next";

// Set by CI (actions/configure-pages → base_path) for project Pages, e.g.
// "/cikal-prototype". Empty for local dev / custom domain.
const basePath = process.env.NEXT_BASE_PATH || "";

const nextConfig: NextConfig = {
  // Static HTML export for GitHub Pages.
  output: "export",
  basePath,
  images: { unoptimized: true },

  // Expose the base path to client code so plain anchors (e.g. the design
  // system's NavBar links) can be prefixed — only next/navigation auto-prefixes.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  // The design-system packages ship raw TypeScript/TSX source, so Next must
  // transpile them rather than treat them as pre-built node_modules.
  transpilePackages: [
    "@handharr-labs/ui-base-bronze",
    "@handharr-labs/ui-base-silver",
    "@handharr-labs/ui-base-gold",
    "@handharr-labs/ui-tier-runtime",
  ],
};

export default nextConfig;
