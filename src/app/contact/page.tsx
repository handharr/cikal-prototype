"use client";

import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { SiteChrome } from "@/components/organisms/site-chrome";

const CONTACT = {
  address: "Jl. Setu Raya No. 1, Jakarta Timur",
  phone: "+62 21 1234 5678",
  email: "kompetisi@cikalamrisetu.sch.id",
  hours: "Senin–Jumat, 08.00–16.00 WIB",
};

export default function ContactPage() {
  const T = useTierComponents();
  const telHref = `tel:${CONTACT.phone.replace(/\s/g, "")}`;

  const methods = [
    { label: "Alamat", value: CONTACT.address },
    { label: "Telepon", value: CONTACT.phone, href: telHref },
    { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
    { label: "Jam Operasional", value: CONTACT.hours },
  ];

  return (
    <SiteChrome>
      <div className="flex flex-col gap-10">
        {/* Intro */}
        <section className="flex max-w-2xl flex-col gap-4">
          <span className="typo-label text-[var(--primary)]">Kontak</span>
          <h1 className="typo-section-title font-bold">Hubungi Panitia</h1>
          <p className="typo-body text-[var(--muted-foreground)]">
            Ada pertanyaan seputar kompetisi, pendaftaran, atau pembayaran? Tim kami siap membantu
            pada jam operasional.
          </p>
        </section>

        {/* Contact methods */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {methods.map((m) => (
            <T.Card key={m.label}>
              <T.CardContent className="flex flex-col gap-1 py-5">
                <span className="typo-label text-[var(--muted-foreground)]">{m.label}</span>
                {m.href ? (
                  <a className="font-medium text-[var(--primary)] hover:underline" href={m.href}>
                    {m.value}
                  </a>
                ) : (
                  <span className="font-medium">{m.value}</span>
                )}
              </T.CardContent>
            </T.Card>
          ))}
        </section>

        {/* Map placeholder */}
        <section className="flex flex-col gap-3">
          <h2 className="typo-card-title font-bold">Lokasi</h2>
          <div className="flex h-56 flex-col items-center justify-center gap-1 rounded-[var(--radius)] border border-dashed border-[var(--border)] bg-[var(--muted)] text-center">
            <span className="font-medium">{CONTACT.address}</span>
            <span className="typo-label text-[var(--muted-foreground)]">Peta lokasi</span>
          </div>
        </section>
      </div>
    </SiteChrome>
  );
}
