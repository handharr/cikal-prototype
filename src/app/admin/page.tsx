"use client";

import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { SPORTS, COMPETITIONS } from "@/lib/data";

/**
 * Backoffice stub (ADM-01). Layout placeholder only — charts, tables, and the
 * reconciliation/participant-management surfaces from the PRD are not built yet.
 */
export default function AdminDashboardPage() {
  const T = useTierComponents();
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="typo-section-title font-bold">Dashboard Admin</h1>
          <p className="text-[var(--muted-foreground)]">Ringkasan partisipasi kompetisi.</p>
        </div>
        <T.Button variant="outline" onClick={() => router.push("/")}>
          Ke Situs Publik
        </T.Button>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <T.StatCard label="Cabang Olahraga" value={SPORTS.length} />
        <T.StatCard label="Nomor Kompetisi" value={COMPETITIONS.length} />
        <T.StatCard label="Total Peserta" value={128} delta="+12" deltaDirection="up" />
      </section>

      <T.Card className="mt-6">
        <T.CardHeader>
          <T.CardTitle>Belum dibuat</T.CardTitle>
          <T.CardDescription>
            Grafik (Top-5 sport, distribusi usia, gender) dan tabel rekonsiliasi
            pembayaran menyusul. Halaman ini baru kerangka.
          </T.CardDescription>
        </T.CardHeader>
      </T.Card>
    </div>
  );
}
