"use client";

import { useTierComponents } from "@handharr-labs/ui-tier-runtime";

/**
 * Lightweight confirmation dialog for destructive actions (e.g. guarded delete,
 * ADM-04). Prototype only — no real side effects beyond the supplied callback.
 */
export function ConfirmDialog({
  title,
  message,
  confirmLabel = "Hapus",
  onConfirm,
  onClose,
}: {
  title: string;
  message: React.ReactNode;
  confirmLabel?: string;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const T = useTierComponents();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-[var(--radius)] bg-[var(--background)] p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
      >
        <span className="typo-card-title font-bold">{title}</span>
        <p className="mt-2 text-sm text-[var(--muted-foreground)]">{message}</p>
        <div className="mt-5 flex justify-end gap-3">
          <T.Button type="button" variant="outline" onClick={onClose}>
            Batal
          </T.Button>
          <T.Button type="button" variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </T.Button>
        </div>
      </div>
    </div>
  );
}
