"use client";

import * as React from "react";
import {
  TierProvider,
  useTier,
  TierSwitcher,
} from "@handharr-labs/ui-tier-runtime";

/**
 * Applies the active `tier-{name}` token scope plus the permanent `brand-cikal`
 * scope, and floats a tier switcher so the prototype can be demoed across
 * Bronze / Silver / Gold without any code change.
 *
 * NOTE: runtime tier switching is a *demo* affordance. Post-deal the app is
 * rebuilt on the single chosen tier and this switcher is removed.
 */
function BrandSurface({ children }: { children: React.ReactNode }) {
  const { tier } = useTier();
  return (
    <div
      className={`tier-${tier} brand-cikal min-h-screen bg-[var(--background)] text-[var(--foreground)] transition-colors duration-200`}
    >
      {children}

      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-1.5">
        <span className="typo-label text-[var(--muted-foreground)]">
          Prototype — switch tier
        </span>
        <TierSwitcher className="shadow-lg" />
      </div>
    </div>
  );
}

export function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <TierProvider defaultTier="silver">
      <BrandSurface>{children}</BrandSurface>
    </TierProvider>
  );
}
