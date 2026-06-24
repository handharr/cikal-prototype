"use client";

import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { SiteChrome } from "@/components/site-chrome";
import { SPORTS, COMPETITIONS } from "@/lib/data";

export default function HomePage() {
  const T = useTierComponents();
  const router = useRouter();

  const activeCount = COMPETITIONS.filter((c) => c.status === "ACTIVE").length;

  return (
    <SiteChrome>
      <div className="flex flex-col gap-14">
        <T.HeroSection
          headline="Kompetisi Olahraga Cikal Amri Setu"
          subline="Temukan cabang olahraga, daftar secara online, dan pantau status pembayaranmu — semua dalam satu portal."
          primaryCta={{
            label: "Lihat Kompetisi",
            onClick: () => router.push("/competitions"),
          }}
          secondaryCta={{
            label: "Daftar Akun",
            onClick: () => router.push("/register"),
          }}
        />

        {/* Competition summary */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <T.StatCard label="Cabang Olahraga" value={SPORTS.length} description="Tersedia untuk diikuti" />
          <T.StatCard label="Nomor Kompetisi" value={COMPETITIONS.length} description="Beragam kelompok usia" />
          <T.StatCard
            label="Pendaftaran Aktif"
            value={activeCount}
            deltaDirection="up"
            delta="Buka sekarang"
            description="Segera daftar sebelum ditutup"
          />
        </section>

        {/* Sports shortlist */}
        <section className="flex flex-col gap-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="typo-section-title font-bold">Cabang Olahraga</h2>
              <p className="text-[var(--muted-foreground)]">Pilih cabang untuk melihat nomor kompetisinya.</p>
            </div>
            <T.Button variant="outline" onClick={() => router.push("/competitions")}>
              Semua Kompetisi
            </T.Button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SPORTS.map((sport) => (
              <T.Card key={sport.id}>
                <T.CardHeader>
                  <T.CardTitle>{sport.name}</T.CardTitle>
                  <T.CardDescription>{sport.description}</T.CardDescription>
                </T.CardHeader>
                <T.CardFooter className="justify-between">
                  <span className="typo-label text-[var(--muted-foreground)]">
                    {sport.eventCount} nomor
                  </span>
                  <T.Button size="sm" variant="ghost" onClick={() => router.push("/competitions")}>
                    Lihat
                  </T.Button>
                </T.CardFooter>
              </T.Card>
            ))}
          </div>
        </section>
      </div>
    </SiteChrome>
  );
}
