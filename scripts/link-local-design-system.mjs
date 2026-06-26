// Dev-only design-system linking.
//
// If a sibling `../forgekit` checkout exists, symlink its design-system packages
// into node_modules so the app builds against local source (including changes
// not yet published to GitHub Packages). On hosting / CI the sibling checkout
// is absent, so the registry versions pinned in package.json are used unchanged.
//
// This runs as `postinstall`, so the right source is selected automatically:
//   • local machine with ../forgekit present  → local source
//   • GitHub Actions / any clone without it    → registry (npm ci stays reproducible)
//
// It never edits package.json or package-lock.json — it only swaps directories
// inside node_modules. To force the registry locally: `USE_LOCAL_FORGEKIT=0 npm ci`.

import { existsSync, lstatSync, rmSync, symlinkSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const appRoot = resolve(here, "..");
const forgekitPkgs = resolve(appRoot, "../forgekit/packages");

const PACKAGES = ["ui-base-bronze", "ui-base-silver", "ui-base-gold", "ui-tier-runtime"];

if (process.env.USE_LOCAL_FORGEKIT === "0") {
  console.log("[forgekit] USE_LOCAL_FORGEKIT=0 → using registry packages.");
  process.exit(0);
}
if (!existsSync(forgekitPkgs)) {
  // No sibling forgekit checkout (CI / hosting) → keep the registry packages.
  process.exit(0);
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

let linked = 0;
for (const name of PACKAGES) {
  const target = resolve(forgekitPkgs, name);
  if (!existsSync(target)) continue; // package not present locally → leave registry copy
  const link = resolve(scope, name);
  if (exists(link)) rmSync(link, { recursive: true, force: true }); // drop registry copy / stale link
  symlinkSync(target, link, "dir");
  linked++;
  console.log(`[forgekit] linked @handharr-labs/${name} → ${target}`);
}

if (linked > 0) {
  console.log(
    `[forgekit] ${linked} package(s) linked from local forgekit. ` +
      "Set USE_LOCAL_FORGEKIT=0 and reinstall to use the registry.",
  );
}
