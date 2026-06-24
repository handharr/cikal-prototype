import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
