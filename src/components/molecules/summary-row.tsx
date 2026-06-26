"use client";

import type { ReactNode } from "react";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";

/**
 * A card-shaped list row: a primary title, an optional meta line, an optional
 * status slot, and an optional trailing action. Purely presentational — the
 * caller supplies already-formatted content and any domain badges/buttons.
 */
export function SummaryRow({
  title,
  meta,
  status,
  action,
}: {
  title: ReactNode;
  meta?: ReactNode;
  status?: ReactNode;
  action?: ReactNode;
}) {
  const T = useTierComponents();

  return (
    <T.Card>
      <T.CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
        <div className="flex flex-col items-start gap-2">
          <span className="font-medium">{title}</span>
          {meta && <span className="typo-label text-[var(--muted-foreground)]">{meta}</span>}
          {status}
        </div>
        {action}
      </T.CardContent>
    </T.Card>
  );
}
