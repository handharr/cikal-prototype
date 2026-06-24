"use client";

import { AdminRegistration, formatRupiah } from "@/lib/data";

/**
 * Modal preview of a payment proof. The prototype has no real image storage, so
 * a placeholder receipt stands in for the uploaded proof.
 */
export function ProofPreviewModal({
  registration,
  onClose,
}: {
  registration: AdminRegistration;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-[var(--radius)] bg-[var(--background)] p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-3 flex items-center justify-between gap-4">
          <span className="typo-card-title font-bold">Bukti Pembayaran</span>
          <button
            type="button"
            className="typo-label text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>
        <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-[var(--radius)] border border-dashed border-[var(--border)] bg-[var(--muted)] text-center">
          <span className="typo-label text-[var(--muted-foreground)]">Pratinjau bukti transfer</span>
          <span className="font-medium">{registration.participantName}</span>
          <span className="typo-card-title font-bold">{formatRupiah(registration.amountRupiah)}</span>
          <span className="typo-label text-[var(--muted-foreground)]">{registration.eventName}</span>
        </div>
      </div>
    </div>
  );
}
