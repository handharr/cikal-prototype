"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { AppChrome } from "@/components/organisms/app-chrome";
import { PageHeader } from "@/components/molecules/page-header";
import { FilterSelect } from "@/components/molecules/filter-select";
import { Pagination } from "@/components/molecules/pagination";
import {
  COMPETITIONS,
  STATUS_LABEL,
  STATUS_BADGE,
  formatRupiah,
  type EventStatus,
} from "@/lib/data";

const SPORTS = Array.from(new Set(COMPETITIONS.map((c) => c.sport))).sort();
const SPORT_OPTIONS = SPORTS.map((s) => ({ value: s, label: s }));
const STATUS_OPTIONS = (["ACTIVE", "NOT_STARTED", "CLOSED"] as EventStatus[]).map((st) => ({
  value: st,
  label: STATUS_LABEL[st],
}));
const PAGE_SIZE = 6;

export default function CompetitionsPage() {
  const T = useTierComponents();
  const router = useRouter();

  const [search, setSearch] = useState("");
  const [sport, setSport] = useState("");
  const [status, setStatus] = useState<"" | EventStatus>("");
  const [page, setPage] = useState(1);

  // Any filter change resets to the first page so results never land on a
  // now-empty page.
  function resetTo<T>(setter: (v: T) => void) {
    return (v: T) => {
      setter(v);
      setPage(1);
    };
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return COMPETITIONS.filter(
      (c) =>
        (c.name.toLowerCase().includes(q) || c.sport.toLowerCase().includes(q)) &&
        (sport === "" || c.sport === sport) &&
        (status === "" || c.status === status),
    );
  }, [search, sport, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const pageItems = filtered.slice(start, start + PAGE_SIZE);

  const items = pageItems.map((c) => ({
    title: c.name,
    description: c.description,
    meta: `${c.sport} · ${formatRupiah(c.feeRupiah)} · Usia ${c.ageMin}–${c.ageMax} · ${c.gender}`,
    badge: STATUS_LABEL[c.status],
    badgeVariant: STATUS_BADGE[c.status],
    // Only ACTIVE events are registerable — they lead into the registration
    // review form (USR-02). The PRD has no event-detail page, so non-active
    // events show no action (status badge alone communicates their state).
    ...(c.status === "ACTIVE"
      ? { actionLabel: "Daftar", onAction: () => router.push(`/enroll?event=${c.id}`) }
      : {}),
  }));

  const hasFilters = search !== "" || sport !== "" || status !== "";

  return (
    <AppChrome>
      <div className="flex flex-col gap-6">
        <PageHeader
          title="Daftar Kompetisi"
          description="Semua cabang dan nomor kompetisi beserta status, biaya, dan batas pendaftaran."
        />

        {/* Search + filters */}
        <div className="flex flex-wrap items-center gap-3">
          <T.SearchBar
            value={search}
            onChange={resetTo(setSearch)}
            placeholder="Cari kompetisi atau cabang…"
            className="w-full sm:w-72"
          />
          <FilterSelect
            value={sport}
            onChange={resetTo(setSport)}
            allLabel="Semua Cabang"
            options={SPORT_OPTIONS}
          />
          <FilterSelect
            value={status}
            onChange={(v) => resetTo(setStatus)(v as "" | EventStatus)}
            allLabel="Semua Status"
            options={STATUS_OPTIONS}
          />
          {hasFilters && (
            <button
              type="button"
              className="typo-label text-[var(--primary)] hover:underline"
              onClick={() => {
                setSearch("");
                setSport("");
                setStatus("");
                setPage(1);
              }}
            >
              Reset
            </button>
          )}
        </div>

        <p className="typo-label text-[var(--muted-foreground)]">
          {filtered.length === 0
            ? "0 kompetisi"
            : `Menampilkan ${start + 1}–${start + pageItems.length} dari ${filtered.length} kompetisi`}
        </p>

        <T.EventGrid items={items} emptyMessage="Tidak ada kompetisi yang cocok." />

        <Pagination page={currentPage} pageCount={pageCount} onPageChange={setPage} />
      </div>
    </AppChrome>
  );
}
