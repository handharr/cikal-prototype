"use client";

import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";

/**
 * Participant backoffice stub (USR-01). Shows the empty-state path; the real
 * registration list, checkout, and history surfaces are not built yet.
 */
export default function ParticipantDashboardPage() {
  const T = useTierComponents();
  const router = useRouter();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6">
      <header className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="typo-section-title font-bold">Dashboard Peserta</h1>
          <p className="text-[var(--muted-foreground)]">Pendaftaran dan status pembayaran Anda.</p>
        </div>
        <T.Button variant="outline" onClick={() => router.push("/")}>
          Ke Situs Publik
        </T.Button>
      </header>

      <T.Card>
        <T.CardContent className="flex flex-col items-center gap-4 py-12 text-center">
          <p className="typo-card-title font-semibold">Belum ada pendaftaran</p>
          <p className="max-w-sm text-[var(--muted-foreground)]">
            Anda belum mendaftar kompetisi apa pun. Jelajahi kompetisi yang tersedia untuk memulai.
          </p>
          <T.Button onClick={() => router.push("/competitions")}>Jelajahi Kompetisi</T.Button>
        </T.CardContent>
      </T.Card>
    </div>
  );
}
