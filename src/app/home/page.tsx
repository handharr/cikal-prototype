"use client";

import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { AppChrome } from "@/components/organisms/app-chrome";
import { AccountStatusBadge, PaymentStatusBadge } from "@/components/atoms/status-badges";
import { SummaryRow } from "@/components/molecules/summary-row";
import { ACCOUNT, MY_REGISTRATIONS, formatRupiah, formatDate } from "@/lib/data";

export default function ParticipantHomePage() {
  const T = useTierComponents();
  const router = useRouter();

  const unpaidCount = MY_REGISTRATIONS.filter((r) => r.paymentStatus === "UNPAID").length;
  const hasRegistrations = MY_REGISTRATIONS.length > 0;

  return (
    <AppChrome>
      <div className="flex flex-col gap-8">
        <T.PageHeader
          title={`Halo, ${ACCOUNT.name}`}
          description="Kelola pendaftaran kompetisimu di sini."
          action={<AccountStatusBadge status={ACCOUNT.status} />}
        />

        {unpaidCount > 0 && (
          <T.Notice>
            <span className="font-medium">Perlu tindakan:</span>
            <span className="text-[var(--muted-foreground)]">
              {unpaidCount} pembayaran belum diselesaikan.
            </span>
          </T.Notice>
        )}

        <section className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="typo-card-title font-bold">Pendaftaran Saya</h2>
            <T.Button size="sm" variant="outline" onClick={() => router.push("/competitions")}>
              Jelajahi Kompetisi
            </T.Button>
          </div>

          {hasRegistrations ? (
            <div className="flex flex-col gap-3">
              {MY_REGISTRATIONS.map((r) => (
                <SummaryRow
                  key={r.id}
                  title={r.eventName}
                  meta={`${r.sport} · ${formatRupiah(r.feeRupiah)} · Tutup ${formatDate(r.closingDate)}`}
                  status={<PaymentStatusBadge status={r.paymentStatus} />}
                  action={
                    r.paymentStatus === "UNPAID" ? (
                      <T.Button
                        size="sm"
                        variant="outline"
                        onClick={() => router.push(`/checkout?event=${r.eventId}`)}
                      >
                        Bayar Sekarang
                      </T.Button>
                    ) : undefined
                  }
                />
              ))}
            </div>
          ) : (
            <T.EmptyState
              title="Belum ada pendaftaran"
              description="Kamu belum mendaftar kompetisi apa pun. Jelajahi kompetisi yang tersedia untuk memulai."
              action={
                <T.Button onClick={() => router.push("/competitions")}>Jelajahi Kompetisi</T.Button>
              }
            />
          )}
        </section>
      </div>
    </AppChrome>
  );
}
