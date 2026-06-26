# CLAUDE.md

Handharr Labs · **Cikal Prototype** — pre-deal UI prototype for the Sekolah Cikal Amri Setu competition portal.

Next.js (App Router) · Handharr Labs Web Forge Kit design system · runtime tier switching.

## What this is

A **UI + routing only** prototype to demo to a potential client. There is **no domain or data layer** — pages render static mock content from `src/lib/data.ts`. Requirements come from the PRD (Sekolah Cikal Amri Setu — Competition Showcase & Online Registration).

This app is **throwaway by design**. Runtime Bronze/Silver/Gold switching is a sales affordance; once a tier is chosen post-deal, the app is rebuilt on that single tier and the switcher is removed.

## Design system

Consumes published packages from the `@handharr-labs` GitHub Packages registry:

| Package | Role |
|---|---|
| `@handharr-labs/ui-base-bronze` / `-silver` / `-gold` | The three tier component sets (identical API) |
| `@handharr-labs/ui-tier-runtime` | Runtime tier-switch engine — `TierProvider`, `useTierComponents`, `TierSwitcher` |

- Pages call `useTierComponents()` and render `T.Button`, `T.Card`, etc. — **never import a tier package directly.**
- `src/components/app-frame.tsx` applies the active `tier-{name} brand-cikal` scope and floats the `TierSwitcher`.
- CIKAL brand tokens live in `src/styles/brand-cikal.css` (copied; the source `ui-cikal-showcase` is private). Post-deal these graduate into a real `@handharr-labs/ui-cikal` brand package.

## Key Rules

- **No domain/business logic, no data fetching, no validation** — visual prototype only. Mock content lives in `src/lib/data.ts`.
- Render UI through `useTierComponents()` — do not hardcode to one tier.
- The packages ship **raw TypeScript**: any new design-system package must be added to both `transpilePackages` (`next.config.ts`) and `@source` (`src/app/globals.css`).
- Tier tokens are scoped to `.tier-{name}`, brand tokens to `.brand-cikal` — never `:root`. Import order in `layout.tsx` keeps brand last so its knobs win.
- The design system's `NavBar`/`Footer` render plain `<a>` anchors — prefix their hrefs with `NEXT_PUBLIC_BASE_PATH` (see `site-chrome.tsx`). `next/navigation` (`router.push`) auto-prefixes; plain anchors do not.

## Commands

```bash
export NODE_AUTH_TOKEN=ghp_…   # classic PAT, read:packages — required for install
npm install
npm run dev          # local dev
npm run type-check   # tsc --noEmit
npm run build        # static export → out/
```

### Local design-system source (`../forgekit`)

`postinstall` runs `scripts/link-local-design-system.mjs`: if a sibling `../forgekit` checkout exists, it symlinks the four `@handharr-labs` packages into `node_modules` so the app builds against **local source** (incl. changes not yet published). On CI / hosting the sibling is absent, so the **registry** versions pinned in `package.json` are used — `package.json`/lockfile are never edited, so `npm ci` stays reproducible. `next.config.ts` points Turbopack's `root` at the workspace only when the sibling is present, so the out-of-tree symlink targets resolve.

- Re-sync after editing forgekit: `npm run link:local` (symlinks are live, but a fresh `npm install` re-creates them).
- Force the registry locally: `USE_LOCAL_FORGEKIT=0 npm ci`.

## Deployment

Pushes to `main` auto-deploy to GitHub Pages via `.github/workflows/deploy.yml` (static export, base path injected by `actions/configure-pages`). Live: https://handharr.github.io/cikal-prototype/. CI installs packages using the `GH_PACKAGES_TOKEN` repo secret (cross-org: this repo is `handharr/*`, packages are `handharr-labs/*`).
