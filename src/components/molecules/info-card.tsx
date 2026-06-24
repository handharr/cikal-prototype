"use client";

import * as React from "react";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";

/** A simple informational card: optional eyebrow + title + description. */
export function InfoCard({
  title,
  description,
  eyebrow,
  eyebrowTone = "muted",
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  eyebrowTone?: "primary" | "muted";
}) {
  const T = useTierComponents();
  const eyebrowColor =
    eyebrowTone === "primary" ? "text-[var(--primary)]" : "text-[var(--muted-foreground)]";

  return (
    <T.Card>
      <T.CardHeader>
        {eyebrow && <span className={`typo-label ${eyebrowColor}`}>{eyebrow}</span>}
        <T.CardTitle>{title}</T.CardTitle>
        {description && <T.CardDescription>{description}</T.CardDescription>}
      </T.CardHeader>
    </T.Card>
  );
}
