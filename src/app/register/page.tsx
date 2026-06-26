"use client";

import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { SiteChrome } from "@/components/organisms/site-chrome";

export default function RegisterPage() {
  const T = useTierComponents();
  const router = useRouter();

  return (
    <SiteChrome>
      <div className="mx-auto w-full max-w-xl">
        <T.Card>
          <T.CardHeader>
            <T.CardTitle>Daftar Akun Peserta</T.CardTitle>
            <T.CardDescription>
              Buat akun untuk mengikuti kompetisi. Data akan diverifikasi oleh admin.
            </T.CardDescription>
          </T.CardHeader>

          {/* Prototype: no submission logic — visual only */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              router.push("/login");
            }}
          >
            <T.CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <T.Field label="Nama Lengkap" htmlFor="name" required className="sm:col-span-2">
                <T.Input id="name" placeholder="Nama sesuai identitas" />
              </T.Field>
              <T.Field label="Tanggal Lahir" htmlFor="dob" required>
                <T.Input id="dob" type="date" />
              </T.Field>
              <T.Field label="Asal Sekolah" htmlFor="school" required>
                <T.Input id="school" placeholder="Nama sekolah" />
              </T.Field>
              <T.Field label="Nomor Telepon" htmlFor="phone" required>
                <T.Input id="phone" type="tel" placeholder="08xxxxxxxxxx" />
              </T.Field>
              <T.Field label="Email" htmlFor="email" required>
                <T.Input id="email" type="email" placeholder="nama@email.com" />
              </T.Field>
              <T.Field label="Jenis Kelamin" htmlFor="gender" required>
                <T.NativeSelect id="gender" className="w-full" defaultValue="">
                  <option value="" disabled>Pilih…</option>
                  <option value="putra">Putra</option>
                  <option value="putri">Putri</option>
                </T.NativeSelect>
              </T.Field>
              <T.Field label="Foto Identitas" htmlFor="photo" description="JPEG/PNG/WEBP, maks 5 MB" required>
                <T.Input id="photo" type="file" accept="image/png,image/jpeg,image/webp" />
              </T.Field>
              <T.Field label="Kata Sandi" htmlFor="password" required>
                <T.Input id="password" type="password" placeholder="••••••••" />
              </T.Field>
              <T.Field label="Konfirmasi Kata Sandi" htmlFor="confirm" required>
                <T.Input id="confirm" type="password" placeholder="••••••••" />
              </T.Field>

              <label className="flex items-start gap-2 sm:col-span-2 typo-label text-[var(--muted-foreground)]">
                <input type="checkbox" className="mt-0.5" />
                <span>Saya menyetujui syarat & ketentuan dan kebijakan privasi.</span>
              </label>
            </T.CardContent>
            <T.CardFooter className="flex-col items-stretch gap-3">
              <T.Button type="submit">Daftar</T.Button>
              <p className="text-center typo-label text-[var(--muted-foreground)]">
                Setelah mendaftar, periksa email Anda untuk tautan verifikasi.
              </p>
            </T.CardFooter>
          </form>
        </T.Card>
      </div>
    </SiteChrome>
  );
}
