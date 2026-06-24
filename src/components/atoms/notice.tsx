"use client";

import * as React from "react";
import { cn } from "@handharr-labs/ui-tier-runtime";

/** Compact single-line inline banner for reminders / status messages. */
export function Notice({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 rounded-[var(--radius)] border border-[var(--border)] bg-[var(--muted)] px-4 py-2.5 text-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
