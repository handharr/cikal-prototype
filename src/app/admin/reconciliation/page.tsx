"use client";

import { useMemo, useState } from "react";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { AdminChrome } from "@/components/organisms/admin-chrome";
import { PaymentStatusBadge } from "@/components/atoms/status-badges";
import { ProofPreviewModal } from "@/components/molecules/proof-preview-modal";
import {
  ALL_REGISTRATIONS,
  PAYMENT_LABEL,
  formatRupiah,
  type AdminRegistration,
  type PaymentStatus,
} from "@/lib/data";

const SPORT_OPTIONS = Array.from(new Set(ALL_REGISTRATIONS.map((r) => r.sport)))
  .sort()
  .map((s) => ({ value: s, label: s }));
const EVENT_OPTIONS = Array.from(new Set(ALL_REGISTRATIONS.map((r) => r.eventName)))
  .sort()
  .map((e) => ({ value: e, label: e }));
const STATUS_OPTIONS = (["UNPAID", "PAID", "PAYMENT_VERIFIED"] as PaymentStatus[]).map((st) => ({
  value: st,
  label: PAYMENT_LABEL[st],
}));

export default function ReconciliationPage() {
  const T = useTierComponents();

  // Local mutable copy so Verify / Cancel persist within the session.
  const [rows, setRows] = useState<AdminRegistration[]>(ALL_REGISTRATIONS);
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("");
  const [event, setEvent] = useState("");
  const [status, setStatus] = useState<"" | PaymentStatus>("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [preview, setPreview] = useState<AdminRegistration | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      rows.filter(
        (r) =>
          r.participantName.toLowerCase().includes(search.trim().toLowerCase()) &&
          (sport === "" || r.sport === sport) &&
          (event === "" || r.eventName === event) &&
          (status === "" || r.paymentStatus === status),
      ),
    [rows, search, sport, event, status],
  );

  const filteredIds = filtered.map((r) => r.id);
  const allSelected = filteredIds.length > 0 && filteredIds.every((id) => selected.has(id));

  function toggleRow(id: string, checked: boolean) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (checked) next.add(id);
      else next.delete(id);
      return next;
    });
  }

  function toggleAll(checked: boolean) {
    setSelected(checked ? new Set(filteredIds) : new Set());
  }

  // Bulk transition. `from` rows among the selection move to `to`; others are
  // reported as skipped (PRD: actions only affect eligible rows).
  function bulkTransition(from: PaymentStatus, to: PaymentStatus, verb: string) {
    const picked = rows.filter((r) => selected.has(r.id));
    const eligible = picked.filter((r) => r.paymentStatus === from);
    if (eligible.length === 0) {
      setNotice(`Tidak ada baris yang memenuhi syarat untuk ${verb}.`);
      return;
    }
    const eligibleIds = new Set(eligible.map((r) => r.id));
    setRows((prev) =>
      prev.map((r) => (eligibleIds.has(r.id) ? { ...r, paymentStatus: to } : r)),
    );
    const skipped = picked.length - eligible.length;
    setNotice(
      `${eligible.length} baris ${verb}.` +
        (skipped > 0 ? ` ${skipped} baris dilewati (status tidak sesuai).` : ""),
    );
    setSelected(new Set());
  }

  const selectedCount = selected.size;

  return (
    <AdminChrome>
      <div className="flex flex-col gap-6">
        <T.PageHeader
          title="Rekonsiliasi Pembayaran"
          description="Tinjau pendaftaran, periksa bukti pembayaran, lalu verifikasi atau batalkan verifikasi."
        />

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <T.SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Cari nama peserta…"
            className="w-full sm:w-64"
          />
          <T.FilterSelect value={sport} onChange={setSport} allLabel="Semua Cabang" options={SPORT_OPTIONS} />
          <T.FilterSelect value={event} onChange={setEvent} allLabel="Semua Nomor" options={EVENT_OPTIONS} />
          <T.FilterSelect
            value={status}
            onChange={(v) => setStatus(v as "" | PaymentStatus)}
            allLabel="Semua Status"
            options={STATUS_OPTIONS}
          />
        </div>

        {/* Bulk actions */}
        <div className="flex flex-wrap items-center gap-3">
          <T.Button
            size="sm"
            disabled={selectedCount === 0}
            onClick={() => bulkTransition("PAID", "PAYMENT_VERIFIED", "diverifikasi")}
          >
            Verifikasi Pembayaran
          </T.Button>
          <T.Button
            size="sm"
            variant="outline"
            disabled={selectedCount === 0}
            onClick={() => bulkTransition("PAYMENT_VERIFIED", "PAID", "dibatalkan")}
          >
            Batalkan Verifikasi
          </T.Button>
          <span className="typo-label text-[var(--muted-foreground)]">
            {selectedCount > 0 ? `${selectedCount} dipilih` : `${filtered.length} baris`}
          </span>
        </div>

        {notice && <T.Notice>{notice}</T.Notice>}

        {/* Table */}
        <div className="overflow-x-auto rounded-[var(--radius)] border border-[var(--border)]">
          <T.Table>
            <T.TableHeader>
              <T.TableRow>
                <T.TableHead className="w-10">
                  <T.Checkbox
                    aria-label="Pilih semua"
                    checked={allSelected}
                    onCheckedChange={(c: boolean) => toggleAll(c)}
                  />
                </T.TableHead>
                <T.TableHead>Peserta</T.TableHead>
                <T.TableHead>Cabang / Nomor</T.TableHead>
                <T.TableHead>Jumlah</T.TableHead>
                <T.TableHead>Bukti</T.TableHead>
                <T.TableHead>Status</T.TableHead>
              </T.TableRow>
            </T.TableHeader>
            <T.TableBody>
              {filtered.length === 0 ? (
                <T.TableRow>
                  <T.TableCell colSpan={6} className="py-10 text-center text-[var(--muted-foreground)]">
                    Tidak ada pendaftaran yang cocok.
                  </T.TableCell>
                </T.TableRow>
              ) : (
                filtered.map((r) => (
                  <T.TableRow key={r.id}>
                    <T.TableCell>
                      <T.Checkbox
                        aria-label={`Pilih ${r.participantName}`}
                        checked={selected.has(r.id)}
                        onCheckedChange={(c: boolean) => toggleRow(r.id, c)}
                      />
                    </T.TableCell>
                    <T.TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{r.participantName}</span>
                        <span className="typo-label text-[var(--muted-foreground)]">{r.originSchool}</span>
                      </div>
                    </T.TableCell>
                    <T.TableCell>
                      <div className="flex flex-col">
                        <span>{r.eventName}</span>
                        <span className="typo-label text-[var(--muted-foreground)]">{r.sport}</span>
                      </div>
                    </T.TableCell>
                    <T.TableCell className="whitespace-nowrap">{formatRupiah(r.amountRupiah)}</T.TableCell>
                    <T.TableCell>
                      {r.hasProof ? (
                        <button
                          type="button"
                          className="typo-label text-[var(--primary)] hover:underline"
                          onClick={() => setPreview(r)}
                        >
                          Lihat
                        </button>
                      ) : (
                        <span className="text-[var(--muted-foreground)]">—</span>
                      )}
                    </T.TableCell>
                    <T.TableCell>
                      <PaymentStatusBadge status={r.paymentStatus} />
                    </T.TableCell>
                  </T.TableRow>
                ))
              )}
            </T.TableBody>
          </T.Table>
        </div>
      </div>

      {preview && <ProofPreviewModal registration={preview} onClose={() => setPreview(null)} />}
    </AdminChrome>
  );
}
