# Cikal Prototype

UI + routing prototype for the **Sekolah Cikal Amri Setu — Competition Showcase & Online Registration** portal (see PRD). No domain/data layer — static mock content only.

Built on the Handharr Labs Web Forge Kit design system, with **runtime tier switching** (Bronze / Silver / Gold) for the pre-deal demo. A floating switcher (bottom-right) changes the entire design system live — no code change.

## Setup

This app consumes private packages from **GitHub Packages**. Set an auth token with `read:packages` scope:

```bash
export NODE_AUTH_TOKEN=ghp_xxx   # GitHub PAT with read:packages
npm install
npm run dev
```

`.npmrc` points `@handharr-labs` at `https://npm.pkg.github.com` and reads `NODE_AUTH_TOKEN`.

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds a static export (`output: "export"`) and publishes it to GitHub Pages on every push to `main`. `actions/configure-pages` injects the project base path (`/cikal-prototype`) via `NEXT_BASE_PATH`.

**Required secret — `GH_PACKAGES_TOKEN`:** this repo (`handharr/*`) installs packages from the `handharr-labs` org's GitHub Packages registry. That's a different owner, so the default `GITHUB_TOKEN` cannot read them. Add a classic PAT with `read:packages` (from an account with access to the `handharr-labs` packages):

```bash
gh secret set GH_PACKAGES_TOKEN --repo handharr/cikal-prototype   # paste the PAT when prompted
```

Pages source must be set to **GitHub Actions** (Settings → Pages). Site URL: `https://handharr.github.io/cikal-prototype/`.

## Design system

| Package | Version |
|---|---|
| `@handharr-labs/ui-base-bronze` | 0.6.0 |
| `@handharr-labs/ui-base-silver` | 0.6.0 |
| `@handharr-labs/ui-base-gold` | 0.6.0 |
| `@handharr-labs/ui-tier-runtime` | 0.1.0 |

- These packages ship **raw TypeScript** → listed in `next.config.ts` `transpilePackages` and scanned via `@source` in `src/app/globals.css`.
- Tier tokens are scoped to `.tier-bronze/.tier-silver/.tier-gold`; CIKAL brand tokens to `.brand-cikal` (`src/styles/brand-cikal.css`). The active tier class is applied in `src/components/app-frame.tsx`.
- Brand tokens are copied locally because `ui-cikal-showcase` is private/unpublished. **Post-deal:** pick one tier, move these tokens into a real `@handharr-labs/ui-cikal` brand package, and remove the runtime switcher.

## Routes

| Route | PRD | Status |
|---|---|---|
| `/` | PUB-01 Homepage | built |
| `/competitions` | PUB-02 Competition list | built |
| `/about` | PUB-03 About | built |
| `/contact` | PUB-04 Contact | built |
| `/login` | PUB-05 Login | built (visual) |
| `/register` | PUB-06 / AUTH-01 Registration | built (visual) |
| `/admin` | ADM-01 Admin dashboard | stub |
| `/dashboard` | USR-01 Participant dashboard | stub |

Forms and auth are visual only (no validation/submission). Backoffice management, checkout, and reconciliation surfaces are not built yet.
