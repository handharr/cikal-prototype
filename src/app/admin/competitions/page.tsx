"use client";

import { useMemo, useRef, useState } from "react";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { AdminChrome } from "@/components/organisms/admin-chrome";
import { EventStatusBadge } from "@/components/atoms/status-badges";
import { CompetitionFormModal } from "@/components/molecules/competition-form-modal";
import { FilterBar } from "@/components/molecules/filter-bar";
import {
  COMPETITIONS,
  SPORTS,
  STATUS_LABEL,
  formatRupiah,
  type CompetitionEvent,
  type EventStatus,
} from "@/lib/data";

const SPORT_NAMES = SPORTS.map((s) => s.name);
const SPORT_OPTIONS = SPORT_NAMES.map((s) => ({ value: s, label: s }));
const STATUS_OPTIONS = (["ACTIVE", "NOT_STARTED", "CLOSED"] as EventStatus[]).map((st) => ({
  value: st,
  label: STATUS_LABEL[st],
}));

/**
 * Competition event CRUD (ADM-04). Prototype only — create / edit / delete run
 * against local React state; nothing is persisted or validated server-side.
 */
export default function AdminCompetitionsPage() {
  const T = useTierComponents();

  const [rows, setRows] = useState<CompetitionEvent[]>(COMPETITIONS);
  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("");
  const [status, setStatus] = useState<"" | EventStatus>("");
  const [notice, setNotice] = useState<string | null>(null);

  // Modal state: "create", an event to edit, or an event pending deletion.
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState<CompetitionEvent | null>(null);
  const [deleting, setDeleting] = useState<CompetitionEvent | null>(null);

  const nextId = useRef(0);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) &&
        (sport === "" || r.sport === sport) &&
        (status === "" || r.status === status),
    );
  }, [rows, search, sport, status]);

  function handleCreate(draft: Omit<CompetitionEvent, "id">) {
    const id = `new-${nextId.current++}`;
    setRows((prev) => [{ ...draft, id }, ...prev]);
    setCreating(false);
    setNotice(`"${draft.name}" ditambahkan.`);
  }

  function handleEdit(draft: Omit<CompetitionEvent, "id">) {
    if (!editing) return;
    const id = editing.id;
    setRows((prev) => prev.map((r) => (r.id === id ? { ...draft, id } : r)));
    setEditing(null);
    setNotice(`"${draft.name}" diperbarui.`);
  }

  function handleDelete() {
    if (!deleting) return;
    const { id, name } = deleting;
    setRows((prev) => prev.filter((r) => r.id !== id));
    setDeleting(null);
    setNotice(`"${name}" dihapus.`);
  }

  return (
    <AdminChrome>
      <div className="flex flex-col gap-6">
        <T.PageHeader
          title="Kelola Kompetisi"
          description="Tambah, ubah, atau hapus nomor kompetisi beserta biaya, kelompok usia, dan jadwal."
          action={<T.Button onClick={() => setCreating(true)}>Tambah Kompetisi</T.Button>}
        />

        <FilterBar
          search={{
            value: search,
            onChange: setSearch,
            placeholder: "Cari nomor kompetisi…",
          }}
          filters={[
            { value: sport, onChange: setSport, allLabel: "Semua Cabang", options: SPORT_OPTIONS },
            {
              value: status,
              onChange: (v) => setStatus(v as "" | EventStatus),
              allLabel: "Semua Status",
              options: STATUS_OPTIONS,
            },
          ]}
          onReset={() => {
            setSearch("");
            setSport("");
            setStatus("");
          }}
          trailing={
            <span className="typo-label text-[var(--muted-foreground)]">
              {filtered.length} kompetisi
            </span>
          }
        />

        {notice && <T.Notice>{notice}</T.Notice>}

        {/* Table */}
        <div className="overflow-x-auto rounded-[var(--radius)] border border-[var(--border)]">
          <T.Table>
            <T.TableHeader>
              <T.TableRow>
                <T.TableHead>Nomor Kompetisi</T.TableHead>
                <T.TableHead>Cabang</T.TableHead>
                <T.TableHead>Biaya</T.TableHead>
                <T.TableHead>Usia / Gender</T.TableHead>
                <T.TableHead>Batas</T.TableHead>
                <T.TableHead>Status</T.TableHead>
                <T.TableHead className="text-right">Aksi</T.TableHead>
              </T.TableRow>
            </T.TableHeader>
            <T.TableBody>
              {filtered.length === 0 ? (
                <T.TableRow>
                  <T.TableCell colSpan={7} className="py-10 text-center text-[var(--muted-foreground)]">
                    Tidak ada kompetisi yang cocok.
                  </T.TableCell>
                </T.TableRow>
              ) : (
                filtered.map((r) => (
                  <T.TableRow key={r.id}>
                    <T.TableCell>
                      <span className="font-medium">{r.name}</span>
                    </T.TableCell>
                    <T.TableCell>{r.sport}</T.TableCell>
                    <T.TableCell className="whitespace-nowrap">{formatRupiah(r.feeRupiah)}</T.TableCell>
                    <T.TableCell className="whitespace-nowrap">
                      Usia {r.ageMin}–{r.ageMax} · {r.gender}
                    </T.TableCell>
                    <T.TableCell className="whitespace-nowrap">{r.closingDate}</T.TableCell>
                    <T.TableCell>
                      <EventStatusBadge status={r.status} />
                    </T.TableCell>
                    <T.TableCell>
                      <div className="flex justify-end gap-3 whitespace-nowrap">
                        <button
                          type="button"
                          className="typo-label text-[var(--primary)] hover:underline"
                          onClick={() => setEditing(r)}
                        >
                          Ubah
                        </button>
                        <button
                          type="button"
                          className="typo-label text-[var(--destructive)] hover:underline"
                          onClick={() => setDeleting(r)}
                        >
                          Hapus
                        </button>
                      </div>
                    </T.TableCell>
                  </T.TableRow>
                ))
              )}
            </T.TableBody>
          </T.Table>
        </div>
      </div>

      {creating && (
        <CompetitionFormModal
          sports={SPORT_NAMES}
          onSave={handleCreate}
          onClose={() => setCreating(false)}
        />
      )}

      {editing && (
        <CompetitionFormModal
          event={editing}
          sports={SPORT_NAMES}
          onSave={handleEdit}
          onClose={() => setEditing(null)}
        />
      )}

      {deleting && (
        <T.ConfirmDialog
          title="Hapus kompetisi?"
          message={
            <>
              Nomor kompetisi <strong className="text-[var(--foreground)]">{deleting.name}</strong> akan
              dihapus dari daftar. Tindakan ini tidak dapat dibatalkan.
            </>
          }
          confirmLabel="Hapus"
          cancelLabel="Batal"
          onConfirm={handleDelete}
          onClose={() => setDeleting(null)}
        />
      )}
    </AdminChrome>
  );
}
