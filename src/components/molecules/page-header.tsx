"use client";

import * as React from "react";

/** Standard page header: optional eyebrow, title, description, and a right-aligned action slot. */
export function PageHeader({
  title,
  description,
  eyebrow,
  action,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  eyebrow?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <header className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex flex-col gap-1">
        {eyebrow && <span className="typo-label text-[var(--primary)]">{eyebrow}</span>}
        <h1 className="typo-section-title font-bold">{title}</h1>
        {description && <p className="text-[var(--muted-foreground)]">{description}</p>}
      </div>
      {action}
    </header>
  );
}
