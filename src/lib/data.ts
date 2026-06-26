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
    eventCount: 5,
  },
  {
    id: "bulutangkis",
    name: "Bulutangkis",
    description: "Tunggal dan ganda putra/putri.",
    eventCount: 4,
  },
  {
    id: "atletik",
    name: "Atletik",
    description: "Lari, lompat jauh, dan estafet.",
    eventCount: 4,
  },
];

export const COMPETITIONS: CompetitionEvent[] = [
  // ── Futsal ──
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
    id: "futsal-u15",
    sport: "Futsal",
    name: "Futsal Putra U-15",
    description: "Turnamen futsal antar sekolah untuk usia maksimal 15 tahun.",
    feeRupiah: 150_000,
    ageMin: 13,
    ageMax: 15,
    gender: "Putra",
    status: "ACTIVE",
    closingDate: "2026-07-25",
  },
  {
    id: "futsal-putri-u15",
    sport: "Futsal",
    name: "Futsal Putri U-15",
    description: "Turnamen futsal putri sistem grup dan gugur.",
    feeRupiah: 150_000,
    ageMin: 13,
    ageMax: 15,
    gender: "Putri",
    status: "NOT_STARTED",
    closingDate: "2026-08-05",
  },
  // ── Renang ──
  {
    id: "renang-gaya-bebas-u12",
    sport: "Renang",
    name: "Renang Gaya Bebas 50m U-12",
    description: "Nomor gaya bebas 50 meter untuk usia maksimal 12 tahun.",
    feeRupiah: 90_000,
    ageMin: 9,
    ageMax: 12,
    gender: "Campuran",
    status: "ACTIVE",
    closingDate: "2026-07-12",
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
    id: "renang-gaya-dada-u15",
    sport: "Renang",
    name: "Renang Gaya Dada 50m U-15",
    description: "Nomor gaya dada 50 meter untuk berbagai kelompok usia.",
    feeRupiah: 100_000,
    ageMin: 13,
    ageMax: 15,
    gender: "Campuran",
    status: "ACTIVE",
    closingDate: "2026-07-18",
  },
  {
    id: "renang-gaya-punggung-u15",
    sport: "Renang",
    name: "Renang Gaya Punggung 50m U-15",
    description: "Nomor gaya punggung 50 meter, putra dan putri.",
    feeRupiah: 100_000,
    ageMin: 13,
    ageMax: 15,
    gender: "Campuran",
    status: "NOT_STARTED",
    closingDate: "2026-08-10",
  },
  {
    id: "renang-estafet-u18",
    sport: "Renang",
    name: "Renang Estafet 4x50m U-18",
    description: "Nomor estafet beregu 4x50 meter, gaya bebas.",
    feeRupiah: 120_000,
    ageMin: 16,
    ageMax: 18,
    gender: "Campuran",
    status: "CLOSED",
    closingDate: "2026-06-12",
  },
  // ── Bulutangkis ──
  {
    id: "bulutangkis-tunggal-putra",
    sport: "Bulutangkis",
    name: "Bulutangkis Tunggal Putra",
    description: "Pertandingan tunggal putra sistem gugur.",
    feeRupiah: 120_000,
    ageMin: 10,
    ageMax: 17,
    gender: "Putra",
    status: "ACTIVE",
    closingDate: "2026-07-22",
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
    id: "bulutangkis-ganda-putra",
    sport: "Bulutangkis",
    name: "Bulutangkis Ganda Putra",
    description: "Pertandingan ganda putra, pendaftaran berpasangan.",
    feeRupiah: 140_000,
    ageMin: 12,
    ageMax: 17,
    gender: "Putra",
    status: "ACTIVE",
    closingDate: "2026-07-28",
  },
  {
    id: "bulutangkis-ganda-putri",
    sport: "Bulutangkis",
    name: "Bulutangkis Ganda Putri",
    description: "Pertandingan ganda putri, pendaftaran berpasangan.",
    feeRupiah: 140_000,
    ageMin: 12,
    ageMax: 17,
    gender: "Putri",
    status: "NOT_STARTED",
    closingDate: "2026-08-03",
  },
  // ── Atletik ──
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
  {
    id: "atletik-lari-200m",
    sport: "Atletik",
    name: "Lari 200m Putri",
    description: "Nomor lari 200 meter putri, babak penyisihan dan final.",
    feeRupiah: 90_000,
    ageMin: 13,
    ageMax: 18,
    gender: "Putri",
    status: "ACTIVE",
    closingDate: "2026-07-30",
  },
  {
    id: "atletik-lompat-jauh",
    sport: "Atletik",
    name: "Lompat Jauh Putra",
    description: "Nomor lompat jauh, tiga kali percobaan per peserta.",
    feeRupiah: 95_000,
    ageMin: 13,
    ageMax: 18,
    gender: "Putra",
    status: "ACTIVE",
    closingDate: "2026-08-02",
  },
  {
    id: "atletik-estafet-4x100m",
    sport: "Atletik",
    name: "Estafet 4x100m Campuran",
    description: "Nomor estafet beregu 4x100 meter, tim campuran.",
    feeRupiah: 110_000,
    ageMin: 14,
    ageMax: 18,
    gender: "Campuran",
    status: "NOT_STARTED",
    closingDate: "2026-08-12",
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

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
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

// ── Participant account & registrations (mock for the logged-in dashboard) ──

export type AccountStatus = "UNVERIFIED" | "UNDER_REVIEW" | "VERIFIED";

export const ACCOUNT_LABEL: Record<AccountStatus, string> = {
  UNVERIFIED: "Belum Verifikasi",
  UNDER_REVIEW: "Dalam Pengecekan",
  VERIFIED: "Terverifikasi",
};

export const ACCOUNT_BADGE: Record<AccountStatus, "success" | "info" | "muted"> = {
  UNVERIFIED: "muted",
  UNDER_REVIEW: "info",
  VERIFIED: "success",
};

export const ACCOUNT = {
  name: "Peserta Cikal",
  status: "VERIFIED" as AccountStatus,
  dob: "2013-05-14",
  originSchool: "SD Cikal",
  phone: "081234567890",
  gender: "Putra" as "Putra" | "Putri",
};

export type PaymentStatus = "UNPAID" | "PAID" | "PAYMENT_VERIFIED";

export const PAYMENT_LABEL: Record<PaymentStatus, string> = {
  UNPAID: "Belum Bayar",
  PAID: "Sudah Bayar",
  PAYMENT_VERIFIED: "Pembayaran Diverifikasi",
};

// Progression muted → info → success.
export const PAYMENT_BADGE: Record<PaymentStatus, "success" | "info" | "muted"> = {
  UNPAID: "muted",
  PAID: "info",
  PAYMENT_VERIFIED: "success",
};

export interface Registration {
  id: string;
  eventId: string;
  eventName: string;
  sport: string;
  feeRupiah: number;
  closingDate: string; // ISO date
  paymentStatus: PaymentStatus;
}

// Admin-wide registrations across all participants (ADM-07 reconciliation).
// Per the PRD, a row can only be PAID/PAYMENT_VERIFIED if a proof was uploaded;
// UNPAID rows carry no proof.
export interface AdminRegistration {
  id: string;
  participantName: string;
  originSchool: string;
  sport: string;
  eventName: string;
  amountRupiah: number;
  paymentStatus: PaymentStatus;
  hasProof: boolean;
}

export const ALL_REGISTRATIONS: AdminRegistration[] = [
  { id: "ar-1", participantName: "Budi Santoso", originSchool: "SD Cikal", sport: "Futsal", eventName: "Futsal Putra U-12", amountRupiah: 150_000, paymentStatus: "PAID", hasProof: true },
  { id: "ar-2", participantName: "Siti Aminah", originSchool: "SMP Harapan", sport: "Renang", eventName: "Renang Gaya Bebas 50m U-15", amountRupiah: 100_000, paymentStatus: "PAID", hasProof: true },
  { id: "ar-3", participantName: "Andi Wijaya", originSchool: "SD Cikal", sport: "Atletik", eventName: "Lari 100m Putra", amountRupiah: 90_000, paymentStatus: "PAYMENT_VERIFIED", hasProof: true },
  { id: "ar-4", participantName: "Dewi Lestari", originSchool: "SMP Nusantara", sport: "Bulutangkis", eventName: "Bulutangkis Tunggal Putri", amountRupiah: 120_000, paymentStatus: "UNPAID", hasProof: false },
  { id: "ar-5", participantName: "Rizki Pratama", originSchool: "SD Bina", sport: "Futsal", eventName: "Futsal Putra U-12", amountRupiah: 150_000, paymentStatus: "PAYMENT_VERIFIED", hasProof: true },
  { id: "ar-6", participantName: "Maya Putri", originSchool: "SMP Harapan", sport: "Renang", eventName: "Renang Gaya Bebas 50m U-15", amountRupiah: 100_000, paymentStatus: "UNPAID", hasProof: false },
  { id: "ar-7", participantName: "Fajar Nugroho", originSchool: "SD Cikal", sport: "Futsal", eventName: "Futsal Putra U-12", amountRupiah: 150_000, paymentStatus: "PAID", hasProof: true },
  { id: "ar-8", participantName: "Putri Handayani", originSchool: "SMP Nusantara", sport: "Bulutangkis", eventName: "Bulutangkis Tunggal Putri", amountRupiah: 120_000, paymentStatus: "PAID", hasProof: true },
];

export const MY_REGISTRATIONS: Registration[] = [
  {
    id: "reg-1",
    eventId: "futsal-u12",
    eventName: "Futsal Putra U-12",
    sport: "Futsal",
    feeRupiah: 150_000,
    closingDate: "2026-07-20",
    paymentStatus: "UNPAID",
  },
  {
    id: "reg-2",
    eventId: "renang-gaya-bebas-u15",
    eventName: "Renang Gaya Bebas 50m U-15",
    sport: "Renang",
    feeRupiah: 100_000,
    closingDate: "2026-07-15",
    paymentStatus: "PAYMENT_VERIFIED",
  },
];
