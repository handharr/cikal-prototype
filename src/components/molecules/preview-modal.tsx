"use client";

import type { ReactNode } from "react";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";

/**
 * A modal wrapping a dashed placeholder tile — stands in for media the prototype
 * doesn't really store (payment proofs, scans, images). Purely presentational:
 * `caption` is the muted line at the top of the tile, `children` is whatever
 * detail the caller wants to show beneath it.
 */
export function PreviewModal({
  title,
  caption,
  closeLabel = "Tutup",
  onClose,
  children,
}: {
  title: string;
  caption: string;
  closeLabel?: string;
  onClose: () => void;
  children?: ReactNode;
}) {
  const T = useTierComponents();

  return (
    <T.Modal title={title} size="md" closeLabel={closeLabel} onClose={onClose}>
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-[var(--radius)] border border-dashed border-[var(--border)] bg-[var(--muted)] text-center">
        <span className="typo-label text-[var(--muted-foreground)]">{caption}</span>
        {children}
      </div>
    </T.Modal>
  );
}
