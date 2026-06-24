"use client";

import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { PaymentStatusBadge } from "@/components/atoms/status-badges";
import { Registration, formatRupiah } from "@/lib/data";

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** A participant's registration as a card row, with a pay action when unpaid. */
export function RegistrationRow({
  registration: r,
  onPay,
}: {
  registration: Registration;
  onPay: () => void;
}) {
  const T = useTierComponents();

  return (
    <T.Card>
      <T.CardContent className="flex flex-wrap items-center justify-between gap-3 py-4">
        <div className="flex flex-col items-start gap-2">
          <span className="font-medium">{r.eventName}</span>
          <span className="typo-label text-[var(--muted-foreground)]">
            {r.sport} · {formatRupiah(r.feeRupiah)} · Tutup {formatDate(r.closingDate)}
          </span>
          <PaymentStatusBadge status={r.paymentStatus} />
        </div>
        {r.paymentStatus === "UNPAID" && (
          <T.Button size="sm" variant="outline" onClick={onPay}>
            Bayar Sekarang
          </T.Button>
        )}
      </T.CardContent>
    </T.Card>
  );
}
