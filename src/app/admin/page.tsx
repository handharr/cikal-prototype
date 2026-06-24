"use client";

import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { AdminChrome } from "@/components/organisms/admin-chrome";
import { PageHeader } from "@/components/molecules/page-header";
import { SPORTS, COMPETITIONS } from "@/lib/data";

/**
 * Backoffice stub (ADM-01). Metric cards are placeholder; the dashboard charts
 * are not built yet. Payment reconciliation (ADM-07) lives at
 * /admin/reconciliation.
 */
export default function AdminDashboardPage() {
  const T = useTierComponents();
  const router = useRouter();

  return (
    <AdminChrome>
      <div className="flex flex-col gap-6">
        <PageHeader title="Dashboard Admin" description="Ringkasan partisipasi kompetisi." />

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <T.StatCard label="Cabang Olahraga" value={SPORTS.length} />
          <T.StatCard label="Nomor Kompetisi" value={COMPETITIONS.length} />
          <T.StatCard label="Total Peserta" value={128} delta="+12" deltaDirection="up" />
        </section>

        <T.Card>
          <T.CardHeader>
            <T.CardTitle>Rekonsiliasi Pembayaran</T.CardTitle>
            <T.CardDescription>
              Tinjau pendaftaran, periksa bukti, dan verifikasi pembayaran peserta.
            </T.CardDescription>
          </T.CardHeader>
          <T.CardFooter>
            <T.Button onClick={() => router.push("/admin/reconciliation")}>
              Buka Rekonsiliasi
            </T.Button>
          </T.CardFooter>
        </T.Card>

        <T.Card>
          <T.CardHeader>
            <T.CardTitle>Grafik menyusul</T.CardTitle>
            <T.CardDescription>
              Top-5 cabang, distribusi usia, dan gender (ADM-01) belum dibuat — halaman ini baru kerangka.
            </T.CardDescription>
          </T.CardHeader>
        </T.Card>
      </div>
    </AdminChrome>
  );
}
