import type { NextConfig } from "next";
import path from "node:path";
import { existsSync } from "node:fs";

// Set by CI (actions/configure-pages → base_path) for project Pages, e.g.
// "/cikal-prototype". Empty for local dev / custom domain.
const basePath = process.env.NEXT_BASE_PATH || "";

// When a sibling ../forgekit checkout exists, postinstall symlinks its design-
// system packages into node_modules (see scripts/link-local-design-system.mjs).
// Those resolve to real paths outside this app dir, so Turbopack's root must be
// the shared workspace for them to resolve. Absent (CI / hosting) → registry.
const workspaceRoot = path.resolve(process.cwd(), "..");
const useLocalForgekit =
  process.env.USE_LOCAL_FORGEKIT !== "0" && existsSync(path.join(workspaceRoot, "forgekit/packages"));

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

  ...(useLocalForgekit ? { turbopack: { root: workspaceRoot } } : {}),
};

export default nextConfig;
