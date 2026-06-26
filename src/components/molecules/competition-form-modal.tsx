"use client";

import { useState } from "react";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { NativeSelect } from "@/components/atoms/native-select";
import {
  STATUS_LABEL,
  type CompetitionEvent,
  type EventStatus,
} from "@/lib/data";

type Draft = Omit<CompetitionEvent, "id">;

const GENDERS: CompetitionEvent["gender"][] = ["Putra", "Putri", "Campuran"];
const STATUSES: EventStatus[] = ["ACTIVE", "NOT_STARTED", "CLOSED"];

function blankDraft(sports: string[]): Draft {
  return {
    sport: sports[0] ?? "",
    name: "",
    description: "",
    feeRupiah: 0,
    ageMin: 0,
    ageMax: 0,
    gender: "Campuran",
    status: "NOT_STARTED",
    closingDate: "",
  };
}

/**
 * Create / edit form for a competition event (ADM-04). Prototype only — edits a
 * local draft and hands it back via onSave; no validation or persistence.
 * Pass `event` to edit an existing row, or omit it to create a new one.
 */
export function CompetitionFormModal({
  event,
  sports,
  onSave,
  onClose,
}: {
  event?: CompetitionEvent;
  sports: string[];
  onSave: (draft: Draft) => void;
  onClose: () => void;
}) {
  const T = useTierComponents();
  const [draft, setDraft] = useState<Draft>(() =>
    event ? { ...event } : blankDraft(sports),
  );

  function set<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(draft);
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[var(--radius)] bg-[var(--background)] p-5 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="typo-card-title font-bold">
            {event ? "Ubah Kompetisi" : "Tambah Kompetisi"}
          </span>
          <button
            type="button"
            className="typo-label text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            onClick={onClose}
          >
            Tutup
          </button>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <T.Field label="Nama Nomor Kompetisi" htmlFor="name" required>
            <T.Input
              id="name"
              value={draft.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="cth. Futsal Putra U-12"
              required
            />
          </T.Field>

          <T.Field label="Deskripsi" htmlFor="description">
            <T.Textarea
              id="description"
              value={draft.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Ringkasan singkat nomor kompetisi…"
              rows={3}
            />
          </T.Field>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <T.Field label="Cabang Olahraga" htmlFor="sport" required>
              <NativeSelect
                id="sport"
                className="w-full"
                value={draft.sport}
                onChange={(e) => set("sport", e.target.value)}
              >
                {sports.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </NativeSelect>
            </T.Field>

            <T.Field label="Biaya (Rupiah)" htmlFor="fee" required>
              <T.Input
                id="fee"
                type="number"
                min={0}
                value={draft.feeRupiah}
                onChange={(e) => set("feeRupiah", Number(e.target.value))}
              />
            </T.Field>

            <T.Field label="Usia Minimum" htmlFor="ageMin" required>
              <T.Input
                id="ageMin"
                type="number"
                min={0}
                value={draft.ageMin}
                onChange={(e) => set("ageMin", Number(e.target.value))}
              />
            </T.Field>

            <T.Field label="Usia Maksimum" htmlFor="ageMax" required>
              <T.Input
                id="ageMax"
                type="number"
                min={0}
                value={draft.ageMax}
                onChange={(e) => set("ageMax", Number(e.target.value))}
              />
            </T.Field>

            <T.Field label="Gender" htmlFor="gender" required>
              <NativeSelect
                id="gender"
                className="w-full"
                value={draft.gender}
                onChange={(e) => set("gender", e.target.value as Draft["gender"])}
              >
                {GENDERS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </NativeSelect>
            </T.Field>

            <T.Field label="Status" htmlFor="status" required>
              <NativeSelect
                id="status"
                className="w-full"
                value={draft.status}
                onChange={(e) => set("status", e.target.value as EventStatus)}
              >
                {STATUSES.map((st) => (
                  <option key={st} value={st}>
                    {STATUS_LABEL[st]}
                  </option>
                ))}
              </NativeSelect>
            </T.Field>

            <T.Field label="Batas Pendaftaran" htmlFor="closingDate" required className="sm:col-span-2">
              <T.Input
                id="closingDate"
                type="date"
                value={draft.closingDate}
                onChange={(e) => set("closingDate", e.target.value)}
              />
            </T.Field>
          </div>

          <div className="mt-1 flex justify-end gap-3">
            <T.Button type="button" variant="outline" onClick={onClose}>
              Batal
            </T.Button>
            <T.Button type="submit">{event ? "Simpan Perubahan" : "Tambah"}</T.Button>
          </div>
        </form>
      </div>
    </div>
  );
}
