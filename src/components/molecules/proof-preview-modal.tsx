"use client";

import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { AdminRegistration, formatRupiah } from "@/lib/data";

/**
 * Modal preview of a payment proof. The prototype has no real image storage, so
 * a placeholder receipt stands in for the uploaded proof. Built on the design
 * system's Modal shell.
 */
export function ProofPreviewModal({
  registration,
  onClose,
}: {
  registration: AdminRegistration;
  onClose: () => void;
}) {
  const T = useTierComponents();

  return (
    <T.Modal title="Bukti Pembayaran" size="md" closeLabel="Tutup" onClose={onClose}>
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-[var(--radius)] border border-dashed border-[var(--border)] bg-[var(--muted)] text-center">
        <span className="typo-label text-[var(--muted-foreground)]">Pratinjau bukti transfer</span>
        <span className="font-medium">{registration.participantName}</span>
        <span className="typo-card-title font-bold">{formatRupiah(registration.amountRupiah)}</span>
        <span className="typo-label text-[var(--muted-foreground)]">{registration.eventName}</span>
      </div>
    </T.Modal>
  );
}
