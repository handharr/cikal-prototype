/**
 * Static mock content for the prototype — UI only, no domain/data layer.
 * Shapes loosely follow the PRD entities (Sport, Competition Event) but carry
 * no business logic, validation, or fetching. Swap for real data post-deal.
 */

export type EventStatus = "ACTIVE" | "NOT_STARTED" | "CLOSED";

export interface CompetitionEvent {
  id: string;
  sport: string;
  name: string;
  description: string;
  feeRupiah: number;
  ageMin: number;
  ageMax: number;
  gender: "Putra" | "Putri" | "Campuran";
  status: EventStatus;
  closingDate: string; // ISO date
}

export interface Sport {
  id: string;
  name: string;
  description: string;
  eventCount: number;
}

export const SPORTS: Sport[] = [
  {
    id: "futsal",
    name: "Futsal",
    description: "Kompetisi futsal antar kelas dan sekolah undangan.",
    eventCount: 3,
  },
  {
    id: "renang",
    name: "Renang",
    description: "Nomor gaya bebas, dada, dan punggung untuk berbagai kelompok usia.",
    eventCount: 4,
  },
  {
    id: "bulutangkis",
    name: "Bulutangkis",
    description: "Tunggal dan ganda putra/putri.",
    eventCount: 2,
  },
  {
    id: "atletik",
    name: "Atletik",
    description: "Lari, lompat jauh, dan estafet.",
    eventCount: 3,
  },
];

export const COMPETITIONS: CompetitionEvent[] = [
  {
    id: "futsal-u12",
    sport: "Futsal",
    name: "Futsal Putra U-12",
    description: "Turnamen futsal untuk peserta usia maksimal 12 tahun.",
    feeRupiah: 150_000,
    ageMin: 9,
    ageMax: 12,
    gender: "Putra",
    status: "ACTIVE",
    closingDate: "2026-07-20",
  },
  {
    id: "renang-gaya-bebas-u15",
    sport: "Renang",
    name: "Renang Gaya Bebas 50m U-15",
    description: "Nomor gaya bebas 50 meter, putra dan putri.",
    feeRupiah: 100_000,
    ageMin: 13,
    ageMax: 15,
    gender: "Campuran",
    status: "ACTIVE",
    closingDate: "2026-07-15",
  },
  {
    id: "bulutangkis-tunggal-putri",
    sport: "Bulutangkis",
    name: "Bulutangkis Tunggal Putri",
    description: "Pertandingan tunggal putri sistem gugur.",
    feeRupiah: 120_000,
    ageMin: 10,
    ageMax: 17,
    gender: "Putri",
    status: "NOT_STARTED",
    closingDate: "2026-08-01",
  },
  {
    id: "atletik-lari-100m",
    sport: "Atletik",
    name: "Lari 100m Putra",
    description: "Nomor lari cepat 100 meter, babak penyisihan dan final.",
    feeRupiah: 90_000,
    ageMin: 13,
    ageMax: 18,
    gender: "Putra",
    status: "CLOSED",
    closingDate: "2026-06-10",
  },
];

export const BANK = {
  name: "Bank Cikal",
  accountNumber: "123-456-7890",
  accountHolder: "Sekolah Cikal Amri Setu",
};

export function formatRupiah(value: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export const STATUS_LABEL: Record<EventStatus, string> = {
  ACTIVE: "Aktif",
  NOT_STARTED: "Belum Dimulai",
  CLOSED: "Ditutup",
};

// Maps a competition status to a tier Badge variant.
export const STATUS_BADGE: Record<EventStatus, "success" | "info" | "muted"> = {
  ACTIVE: "success",
  NOT_STARTED: "info",
  CLOSED: "muted",
};
