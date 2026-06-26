"use client";

import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { AdminChrome } from "@/components/organisms/admin-chrome";
import { EventStatusBadge, PaymentStatusBadge } from "@/components/atoms/status-badges";
import { SPORTS, COMPETITIONS, ALL_REGISTRATIONS, formatRupiah } from "@/lib/data";

const PREVIEW_COUNT = 5;
const RECENT_COMPETITIONS = COMPETITIONS.slice(0, PREVIEW_COUNT);
const RECENT_PAYMENTS = ALL_REGISTRATIONS.slice(0, PREVIEW_COUNT);

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
        <T.PageHeader title="Dashboard Admin" description="Ringkasan partisipasi kompetisi." />

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <T.StatCard label="Cabang Olahraga" value={SPORTS.length} />
          <T.StatCard label="Nomor Kompetisi" value={COMPETITIONS.length} />
          <T.StatCard label="Total Peserta" value={128} delta="+12" deltaDirection="up" />
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <T.Card>
          <T.CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <T.CardTitle>Kompetisi Terbaru</T.CardTitle>
              <button
                type="button"
                className="typo-label text-[var(--primary)] hover:underline"
                onClick={() => router.push("/admin/competitions")}
              >
                Kelola semua →
              </button>
            </div>
          </T.CardHeader>
          <T.Table>
            <T.TableHeader>
              <T.TableRow>
                <T.TableHead>Nomor Kompetisi</T.TableHead>
                <T.TableHead>Cabang</T.TableHead>
                <T.TableHead className="whitespace-nowrap">Biaya</T.TableHead>
                <T.TableHead>Status</T.TableHead>
              </T.TableRow>
            </T.TableHeader>
            <T.TableBody>
              {RECENT_COMPETITIONS.map((c) => (
                <T.TableRow key={c.id}>
                  <T.TableCell className="font-medium">{c.name}</T.TableCell>
                  <T.TableCell>{c.sport}</T.TableCell>
                  <T.TableCell className="whitespace-nowrap">{formatRupiah(c.feeRupiah)}</T.TableCell>
                  <T.TableCell>
                    <EventStatusBadge status={c.status} />
                  </T.TableCell>
                </T.TableRow>
              ))}
            </T.TableBody>
          </T.Table>
        </T.Card>

        <T.Card>
          <T.CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <T.CardTitle>Pembayaran Terbaru</T.CardTitle>
              <button
                type="button"
                className="typo-label text-[var(--primary)] hover:underline"
                onClick={() => router.push("/admin/reconciliation")}
              >
                Rekonsiliasi semua →
              </button>
            </div>
          </T.CardHeader>
          <T.Table>
            <T.TableHeader>
              <T.TableRow>
                <T.TableHead>Peserta</T.TableHead>
                <T.TableHead>Nomor Kompetisi</T.TableHead>
                <T.TableHead className="whitespace-nowrap">Jumlah</T.TableHead>
                <T.TableHead>Status</T.TableHead>
              </T.TableRow>
            </T.TableHeader>
            <T.TableBody>
              {RECENT_PAYMENTS.map((r) => (
                <T.TableRow key={r.id}>
                  <T.TableCell className="font-medium">{r.participantName}</T.TableCell>
                  <T.TableCell>{r.eventName}</T.TableCell>
                  <T.TableCell className="whitespace-nowrap">{formatRupiah(r.amountRupiah)}</T.TableCell>
                  <T.TableCell>
                    <PaymentStatusBadge status={r.paymentStatus} />
                  </T.TableCell>
                </T.TableRow>
              ))}
            </T.TableBody>
          </T.Table>
        </T.Card>
        </section>

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
