"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { AppChrome } from "@/components/organisms/app-chrome";
import { PageHeader } from "@/components/molecules/page-header";
import { DetailRow } from "@/components/atoms/detail-row";
import { EventStatusBadge } from "@/components/atoms/status-badges";
import { NativeSelect } from "@/components/atoms/native-select";
import { COMPETITIONS, ACCOUNT, formatRupiah } from "@/lib/data";

function EnrollInner() {
  const T = useTierComponents();
  const router = useRouter();
  const params = useSearchParams();

  const eventId = params.get("event");
  const event =
    COMPETITIONS.find((c) => c.id === eventId) ??
    COMPETITIONS.find((c) => c.status === "ACTIVE") ??
    COMPETITIONS[0];

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
      <PageHeader
        title="Pendaftaran Kompetisi"
        description="Periksa data dirimu sebelum melanjutkan ke pembayaran."
      />

      {/* Event summary + requirements */}
      <T.Card>
        <T.CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <T.CardTitle>{event.name}</T.CardTitle>
              <T.CardDescription>{event.sport}</T.CardDescription>
            </div>
            <EventStatusBadge status={event.status} />
          </div>
        </T.CardHeader>
        <T.CardContent className="flex flex-col gap-2">
          <DetailRow label="Persyaratan usia" value={`${event.ageMin}–${event.ageMax} tahun`} />
          <DetailRow label="Kategori" value={event.gender} />
          <DetailRow label="Biaya pendaftaran" value={formatRupiah(event.feeRupiah)} />
        </T.CardContent>
      </T.Card>

      {/* Pre-filled participant data (editable) */}
      <T.Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/checkout?event=${event.id}`);
          }}
        >
          <T.CardHeader>
            <T.CardTitle>Data Peserta</T.CardTitle>
            <T.CardDescription>
              Terisi dari akunmu. Ubah jika perlu — perubahan hanya berlaku untuk pendaftaran ini.
            </T.CardDescription>
          </T.CardHeader>
          <T.CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <T.Field label="Nama Lengkap" htmlFor="name" required className="sm:col-span-2">
              <T.Input id="name" defaultValue={ACCOUNT.name} />
            </T.Field>
            <T.Field label="Tanggal Lahir" htmlFor="dob" required>
              <T.Input id="dob" type="date" defaultValue={ACCOUNT.dob} />
            </T.Field>
            <T.Field label="Asal Sekolah" htmlFor="school" required>
              <T.Input id="school" defaultValue={ACCOUNT.originSchool} />
            </T.Field>
            <T.Field label="Nomor Telepon" htmlFor="phone" required>
              <T.Input id="phone" type="tel" defaultValue={ACCOUNT.phone} />
            </T.Field>
            <T.Field label="Jenis Kelamin" htmlFor="gender" required>
              <NativeSelect id="gender" className="w-full" defaultValue={ACCOUNT.gender}>
                <option value="Putra">Putra</option>
                <option value="Putri">Putri</option>
              </NativeSelect>
            </T.Field>
            <p className="sm:col-span-2 typo-label text-[var(--muted-foreground)]">
              Foto identitas diambil dari akunmu yang telah terverifikasi.
            </p>
          </T.CardContent>
          <T.CardFooter className="flex-col items-stretch gap-3">
            <T.Button type="submit">Lanjut ke Pembayaran</T.Button>
            <T.Button type="button" variant="ghost" onClick={() => router.push("/competitions")}>
              Batal
            </T.Button>
          </T.CardFooter>
        </form>
      </T.Card>
    </div>
  );
}

export default function EnrollPage() {
  return (
    <AppChrome>
      <Suspense fallback={<p className="text-[var(--muted-foreground)]">Memuat…</p>}>
        <EnrollInner />
      </Suspense>
    </AppChrome>
  );
}
