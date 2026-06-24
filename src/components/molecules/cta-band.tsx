"use client";

import { useTierComponents } from "@handharr-labs/ui-tier-runtime";

interface CtaAction {
  label: string;
  onClick: () => void;
}

/** Centered call-to-action band on a muted surface, with primary + optional secondary buttons. */
export function CtaBand({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: CtaAction;
  secondary?: CtaAction;
}) {
  const T = useTierComponents();
  return (
    <section className="flex flex-col items-center gap-5 rounded-[var(--radius)] bg-[var(--muted)] px-6 py-12 text-center">
      <div className="flex max-w-xl flex-col gap-2">
        <h2 className="typo-section-title font-bold">{title}</h2>
        <p className="text-[var(--muted-foreground)]">{description}</p>
      </div>
      <div className="flex flex-wrap justify-center gap-3">
        <T.Button size="lg" onClick={primary.onClick}>
          {primary.label}
        </T.Button>
        {secondary && (
          <T.Button variant="outline" size="lg" onClick={secondary.onClick}>
            {secondary.label}
          </T.Button>
        )}
      </div>
    </section>
  );
}
