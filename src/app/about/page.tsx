"use client";

import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { SiteChrome } from "@/components/organisms/site-chrome";
import { SectionIntro } from "@/components/molecules/section-intro";

const HIGHLIGHTS = [
  {
    title: "Beragam cabang",
    description: "Futsal, renang, bulutangkis, dan atletik dengan banyak nomor kompetisi untuk berbagai usia.",
  },
  {
    title: "Pendaftaran online",
    description: "Daftar, unggah berkas, dan bayar tanpa formulir kertas — semua dari satu portal.",
  },
  {
    title: "Proses terverifikasi",
    description: "Identitas peserta dan bukti pembayaran diperiksa langsung oleh panitia sekolah.",
  },
];

export default function AboutPage() {
  const T = useTierComponents();
  const router = useRouter();

  return (
    <SiteChrome>
      <div className="flex flex-col gap-14">
        <SectionIntro
          eyebrow="Tentang Kami"
          title="Sekolah Cikal Amri Setu"
          description="Sekolah Cikal Amri Setu secara rutin menyelenggarakan kompetisi olahraga untuk mendorong sportivitas dan prestasi siswa. Portal ini menyatukan pengumuman kompetisi dan pendaftaran peserta dalam satu tempat."
        />

        {/* Highlights */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {HIGHLIGHTS.map((h) => (
            <T.InfoCard key={h.title} title={h.title} description={h.description} />
          ))}
        </section>

        {/* Detail sections */}
        <section className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <h2 className="typo-card-title font-bold">Profil Sekolah</h2>
            <p className="leading-relaxed text-[var(--muted-foreground)]">
              Menggantikan proses manual yang sebelumnya tersebar di selebaran, pesan, dan
              spreadsheet, portal ini memberi peserta dan orang tua satu tempat tepercaya untuk
              menemukan kompetisi yang sedang dibuka beserta syarat dan jadwalnya.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h2 className="typo-card-title font-bold">Program Kompetisi</h2>
            <p className="leading-relaxed text-[var(--muted-foreground)]">
              Setiap cabang olahraga memiliki sejumlah nomor kompetisi dengan syarat usia, gender,
              biaya, dan batas waktu pendaftaran tersendiri. Peserta yang memenuhi syarat dapat
              mendaftar dan mengunggah bukti pembayaran secara online.
            </p>
          </div>
        </section>

        <T.CtaBand
          title="Ingin ikut berkompetisi?"
          description="Buat akun peserta untuk mulai mendaftar kompetisi yang kamu minati."
          primary={{ label: "Daftar Akun", onClick: () => router.push("/register") }}
          secondary={{ label: "Masuk", onClick: () => router.push("/login") }}
        />
      </div>
    </SiteChrome>
  );
}
