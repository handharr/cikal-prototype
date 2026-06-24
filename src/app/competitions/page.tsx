"use client";

import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { SiteChrome } from "@/components/site-chrome";
import {
  COMPETITIONS,
  STATUS_LABEL,
  STATUS_BADGE,
  formatRupiah,
} from "@/lib/data";

export default function CompetitionsPage() {
  const T = useTierComponents();
  const router = useRouter();

  const items = COMPETITIONS.map((c) => ({
    title: c.name,
    description: c.description,
    meta: `${c.sport} · ${formatRupiah(c.feeRupiah)} · Usia ${c.ageMin}–${c.ageMax} · ${c.gender}`,
    badge: STATUS_LABEL[c.status],
    badgeVariant: STATUS_BADGE[c.status],
    actionLabel: c.status === "ACTIVE" ? "Daftar" : "Detail",
    onAction: () => router.push("/register"),
  }));

  return (
    <SiteChrome>
      <div className="flex flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="typo-section-title font-bold">Daftar Kompetisi</h1>
          <p className="text-[var(--muted-foreground)]">
            Semua cabang dan nomor kompetisi beserta status, biaya, dan batas pendaftaran.
          </p>
        </header>

        <T.EventGrid items={items} emptyMessage="Kompetisi segera hadir." />
      </div>
    </SiteChrome>
  );
}
