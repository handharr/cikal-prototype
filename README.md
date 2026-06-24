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
