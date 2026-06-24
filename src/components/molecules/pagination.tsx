"use client";

import { useTierComponents } from "@handharr-labs/ui-tier-runtime";

/** Numbered pagination with Prev/Next. Renders nothing for a single page. */
export function Pagination({
  page,
  pageCount,
  onPageChange,
}: {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
}) {
  const T = useTierComponents();
  if (pageCount <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-center gap-1 pt-2">
      <T.Button
        size="sm"
        variant="ghost"
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        Sebelumnya
      </T.Button>
      {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
        <T.Button
          key={n}
          size="sm"
          variant={n === page ? "default" : "ghost"}
          onClick={() => onPageChange(n)}
        >
          {n}
        </T.Button>
      ))}
      <T.Button
        size="sm"
        variant="ghost"
        disabled={page === pageCount}
        onClick={() => onPageChange(page + 1)}
      >
        Berikutnya
      </T.Button>
    </div>
  );
}
