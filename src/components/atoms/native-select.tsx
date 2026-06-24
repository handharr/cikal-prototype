"use client";

import * as React from "react";
import { cn } from "@handharr-labs/ui-tier-runtime";

/**
 * Styled native `<select>`. The design system ships a base-ui Select, but for
 * the prototype's simple filters and form pickers a native select is more
 * robust. Pass `<option>` children.
 */
export function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-9 rounded-md border border-[var(--input)] bg-[var(--background)] px-3 text-sm",
        className,
      )}
      {...props}
    />
  );
}
