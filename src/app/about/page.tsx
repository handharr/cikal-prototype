"use client";

import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { SiteChrome } from "@/components/site-chrome";

export default function AboutPage() {
  const T = useTierComponents();

  return (
    <SiteChrome>
      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="typo-section-title font-bold">Tentang Kami</h1>
          <p className="text-[var(--muted-foreground)]">
            Sekolah Cikal Amri Setu & program kompetisi olahraga.
          </p>
        </header>

        <T.Card>
          <T.CardHeader>
            <T.CardTitle>Profil Sekolah</T.CardTitle>
          </T.CardHeader>
          <T.CardContent className="space-y-4 leading-relaxed text-[var(--foreground)]">
            <p>
              Sekolah Cikal Amri Setu secara rutin menyelenggarakan kompetisi
              olahraga (cabang olahraga) yang terdiri dari berbagai nomor
              kompetisi untuk mendorong sportivitas dan prestasi siswa.
            </p>
            <p>
              Portal ini menyatukan pengumuman kompetisi dan pendaftaran peserta
              dalam satu tempat — menggantikan proses manual yang sebelumnya
              tersebar di selebaran, pesan, dan spreadsheet.
            </p>
          </T.CardContent>
        </T.Card>

        <T.Card>
          <T.CardHeader>
            <T.CardTitle>Program Kompetisi</T.CardTitle>
          </T.CardHeader>
          <T.CardContent className="leading-relaxed text-[var(--foreground)]">
            <p>
              Setiap cabang olahraga memiliki sejumlah nomor kompetisi dengan
              syarat usia, gender, biaya, dan batas waktu pendaftaran tersendiri.
              Peserta yang memenuhi syarat dapat mendaftar dan mengunggah bukti
              pembayaran secara online.
            </p>
          </T.CardContent>
        </T.Card>
      </div>
    </SiteChrome>
  );
}
