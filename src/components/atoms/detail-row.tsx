"use client";

import * as React from "react";
import { cn } from "@handharr-labs/ui-tier-runtime";

/** A label (muted, left) / value (medium, right) row — for summaries & detail lists. */
export function DetailRow({
  label,
  value,
  className,
  valueClassName,
}: {
  label: React.ReactNode;
  value: React.ReactNode;
  className?: string;
  valueClassName?: string;
}) {
  return (
    <div className={cn("flex items-center justify-between gap-4", className)}>
      <span className="text-[var(--muted-foreground)]">{label}</span>
      <span className={cn("font-medium", valueClassName)}>{value}</span>
    </div>
  );
}
