"use client";

import * as React from "react";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";

/** Centered empty-state inside a card: title, optional description, optional action. */
export function EmptyState({
  title,
  description,
  action,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
}) {
  const T = useTierComponents();
  return (
    <T.Card>
      <T.CardContent className="flex flex-col items-center gap-4 py-12 text-center">
        <p className="typo-card-title font-semibold">{title}</p>
        {description && <p className="max-w-sm text-[var(--muted-foreground)]">{description}</p>}
        {action}
      </T.CardContent>
    </T.Card>
  );
}
