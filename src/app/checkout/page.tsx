"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { AppChrome } from "@/components/organisms/app-chrome";
import { EventStatusBadge, PaymentStatusBadge } from "@/components/atoms/status-badges";
import { COMPETITIONS, BANK, formatRupiah } from "@/lib/data";

function CheckoutInner() {
  const T = useTierComponents();
  const router = useRouter();
  const params = useSearchParams();

  // Resolve which event we're paying for. Falls back to the first open event so
  // the page is always demoable even without a query param.
  const eventId = params.get("event");
  const event =
    COMPETITIONS.find((c) => c.id === eventId) ??
    COMPETITIONS.find((c) => c.status === "ACTIVE") ??
    COMPETITIONS[0];

  // Prototype: no upload/persistence — track the chosen file name to gate the
  // confirm button, then flip to a success ("PAID") state on confirm.
  const [fileName, setFileName] = useState<string | null>(null);
  const [paid, setPaid] = useState(false);

  if (paid) {
    return (
      <div className="mx-auto w-full max-w-xl">
        <T.Card>
          <T.CardContent className="flex flex-col items-center gap-4 py-12 text-center">
            <PaymentStatusBadge status="PAID" />
            <p className="typo-card-title font-semibold">Pembayaran tercatat</p>
            <p className="max-w-sm text-[var(--muted-foreground)]">
              Bukti pembayaranmu untuk <strong>{event.name}</strong> telah dikirim dan
              sedang menunggu verifikasi admin. Pantau statusnya di beranda.
            </p>
            <T.Button onClick={() => router.push("/home")}>Kembali ke Beranda</T.Button>
          </T.CardContent>
        </T.Card>
      </div>
    );
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
      <T.PageHeader
        title="Pembayaran"
        description="Selesaikan pembayaran untuk mengonfirmasi pendaftaranmu."
      />

      {/* Event summary */}
      <T.Card>
        <T.CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <T.CardTitle>{event.name}</T.CardTitle>
              <T.CardDescription>
                {event.sport} · Usia {event.ageMin}–{event.ageMax} · {event.gender}
              </T.CardDescription>
            </div>
            <EventStatusBadge status={event.status} />
          </div>
        </T.CardHeader>
        <T.CardContent>
          <T.DetailRow
            className="border-t border-[var(--border)] pt-4"
            label="Total pembayaran"
            value={formatRupiah(event.feeRupiah)}
            valueClassName="typo-card-title font-bold"
          />
        </T.CardContent>
      </T.Card>

      {/* Bank transfer instructions */}
      <T.Card>
        <T.CardHeader>
          <T.CardTitle>Transfer Bank</T.CardTitle>
          <T.CardDescription>
            Transfer tepat sejumlah di atas ke rekening berikut, lalu unggah buktinya.
          </T.CardDescription>
        </T.CardHeader>
        <T.CardContent className="flex flex-col gap-3">
          <T.DetailRow label="Bank" value={BANK.name} />
          <T.DetailRow label="Nomor Rekening" value={BANK.accountNumber} valueClassName="font-mono" />
          <T.DetailRow label="Atas Nama" value={BANK.accountHolder} />
        </T.CardContent>
      </T.Card>

      {/* Proof upload */}
      <T.Card>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (fileName) setPaid(true);
          }}
        >
          <T.CardHeader>
            <T.CardTitle>Unggah Bukti Pembayaran</T.CardTitle>
            <T.CardDescription>JPEG/PNG/WEBP, maks 5 MB.</T.CardDescription>
          </T.CardHeader>
          <T.CardContent className="pt-2 pb-6">
            <T.FileDropzone
              label="Pilih file bukti transfer"
              hint="JPEG/PNG/WEBP, maks 5 MB"
              accept="image/png,image/jpeg,image/webp"
              fileName={fileName}
              onFileChange={setFileName}
              removeLabel="Hapus"
            />
          </T.CardContent>
          <T.CardFooter className="flex-col items-stretch gap-3">
            <T.Button type="submit" disabled={!fileName}>
              Konfirmasi Pembayaran
            </T.Button>
            <T.Button type="button" variant="ghost" onClick={() => router.push("/home")}>
              Bayar Nanti
            </T.Button>
          </T.CardFooter>
        </form>
      </T.Card>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <AppChrome>
      <Suspense fallback={<p className="text-[var(--muted-foreground)]">Memuat…</p>}>
        <CheckoutInner />
      </Suspense>
    </AppChrome>
  );
}
