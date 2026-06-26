// Opt-in: preview unpublished design-system changes from a sibling ../forgekit
// checkout, without publishing.
//
// Run `npm run link:local` to COPY the local @handharr-labs source over the
// registry packages in node_modules. Copies are in-tree, so Turbopack resolves
// them normally (no workspace-wide `turbopack.root`, which would drag ~20 sibling
// repos into the watch scope and make dev reloads crawl). Trade-off: copies are a
// snapshot — re-run this after editing forgekit. Revert to the registry with
// `npm ci`.
//
// Not a postinstall hook: by default dev/CI use the pinned registry versions, so
// installs stay fast and reproducible.

import { existsSync, lstatSync, rmSync, cpSync, mkdirSync } from "node:fs";
import { resolve, dirname, sep } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, "..");
const forgekitPkgs = resolve(appRoot, "../forgekit/packages");

const PACKAGES = ["ui-base-bronze", "ui-base-silver", "ui-base-gold", "ui-tier-runtime"];

if (!existsSync(forgekitPkgs)) {
  console.error(`[forgekit] no sibling checkout at ${forgekitPkgs} — nothing to link.`);
  process.exit(1);
}

const scope = resolve(appRoot, "node_modules/@handharr-labs");
mkdirSync(scope, { recursive: true });

const exists = (p) => {
  try {
    lstatSync(p);
    return true;
  } catch {
    return false;
  }
};

let copied = 0;
for (const name of PACKAGES) {
  const target = resolve(forgekitPkgs, name);
  if (!existsSync(target)) continue;
  const dest = resolve(scope, name);
  if (exists(dest)) rmSync(dest, { recursive: true, force: true }); // drop registry copy
  // Copy source only — skip the package's own node_modules / VCS metadata.
  cpSync(target, dest, {
    recursive: true,
    filter: (src) => !src.includes(`${sep}node_modules${sep}`) && !src.endsWith(`${sep}.git`),
  });
  copied++;
  console.log(`[forgekit] copied @handharr-labs/${name} ← ${target}`);
}

if (copied > 0) {
  console.log(`[forgekit] ${copied} package(s) copied from local forgekit. Run \`npm ci\` to restore the registry.`);
}
