"use client";

import { NativeSelect } from "@/components/atoms/native-select";

export interface FilterOption {
  value: string;
  label: string;
}

/** A native select pre-seeded with an "all" option, for list filtering. */
export function FilterSelect({
  value,
  onChange,
  allLabel,
  options,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  allLabel: string;
  options: FilterOption[];
  className?: string;
}) {
  return (
    <NativeSelect
      className={className}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{allLabel}</option>
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </NativeSelect>
  );
}
