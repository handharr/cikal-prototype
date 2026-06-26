"use client";

import type { ReactNode } from "react";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";

type FilterConfig = {
  value: string;
  onChange: (value: string) => void;
  allLabel: string;
  options: { value: string; label: string }[];
};

/**
 * Search + filter-select row shared by the listing pages (competitions,
 * admin competitions, reconciliation). The Reset link appears only when
 * `onReset` is given and at least one control is non-empty.
 */
export function FilterBar({
  search,
  filters,
  onReset,
  trailing,
}: {
  search: { value: string; onChange: (v: string) => void; placeholder: string; className?: string };
  filters: FilterConfig[];
  onReset?: () => void;
  trailing?: ReactNode;
}) {
  const T = useTierComponents();
  const hasFilters = search.value !== "" || filters.some((f) => f.value !== "");

  return (
    <div className="flex flex-wrap items-center gap-3">
      <T.SearchBar
        value={search.value}
        onChange={search.onChange}
        placeholder={search.placeholder}
        className={search.className ?? "w-full sm:w-72"}
      />
      {filters.map((f, i) => (
        <T.FilterSelect
          key={i}
          value={f.value}
          onChange={f.onChange}
          allLabel={f.allLabel}
          options={f.options}
        />
      ))}
      {onReset && hasFilters && (
        <button
          type="button"
          className="typo-label text-[var(--primary)] hover:underline"
          onClick={onReset}
        >
          Reset
        </button>
      )}
      {trailing && <div className="ml-auto">{trailing}</div>}
    </div>
  );
}
