"use client";

import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { SiteChrome } from "@/components/organisms/site-chrome";
import { SPORTS } from "@/lib/data";

const STEPS = [
  {
    step: "1",
    title: "Buat akun & verifikasi",
    description: "Daftar dengan data diri dan foto identitas, lalu konfirmasi email untuk diverifikasi sekolah.",
  },
  {
    step: "2",
    title: "Pilih nomor kompetisi",
    description: "Telusuri cabang olahraga dan daftar pada nomor yang sesuai usia dan kategorimu.",
  },
  {
    step: "3",
    title: "Bayar & pantau status",
    description: "Transfer biaya pendaftaran, unggah bukti, dan pantau status pembayaranmu dari dasbor.",
  },
];

export default function LandingPage() {
  const T = useTierComponents();
  const router = useRouter();

  return (
    <SiteChrome>
      <div className="flex flex-col gap-16">
        <T.HeroSection
          headline="Satu portal untuk semua kompetisi olahraga Cikal Amri Setu"
          subline="Temukan cabang olahraga, daftar secara online, dan ikuti seluruh prosesnya dari satu tempat — tanpa formulir kertas atau konfirmasi manual."
          primaryCta={{ label: "Daftar Akun", onClick: () => router.push("/register") }}
          secondaryCta={{ label: "Masuk", onClick: () => router.push("/login") }}
        />

        {/* How it works */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="typo-section-title font-bold">Cara Mengikuti</h2>
            <p className="text-[var(--muted-foreground)]">Tiga langkah dari pendaftaran hingga konfirmasi pembayaran.</p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {STEPS.map((s) => (
              <T.InfoCard
                key={s.step}
                eyebrow={`Langkah ${s.step}`}
                eyebrowTone="primary"
                title={s.title}
                description={s.description}
              />
            ))}
          </div>
        </section>

        {/* Sports overview — informational only */}
        <section className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <h2 className="typo-section-title font-bold">Cabang Olahraga</h2>
            <p className="text-[var(--muted-foreground)]">
              Beragam cabang olahraga dengan nomor kompetisi untuk berbagai kelompok usia.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SPORTS.map((sport) => (
              <T.InfoCard
                key={sport.id}
                eyebrow={`${sport.eventCount} nomor kompetisi`}
                title={sport.name}
                description={sport.description}
              />
            ))}
          </div>
        </section>

        <T.CtaBand
          title="Siap mengikuti kompetisi?"
          description="Buat akun sekarang dan amankan tempatmu sebelum pendaftaran ditutup."
          primary={{ label: "Daftar Akun", onClick: () => router.push("/register") }}
          secondary={{ label: "Masuk", onClick: () => router.push("/login") }}
        />
      </div>
    </SiteChrome>
  );
}
