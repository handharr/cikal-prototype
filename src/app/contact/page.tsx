"use client";

import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { SiteChrome } from "@/components/site-chrome";

const CONTACT = {
  address: "Jl. Setu Raya No. 1, Jakarta Timur",
  phone: "+62 21 1234 5678",
  email: "kompetisi@cikalamrisetu.sch.id",
};

export default function ContactPage() {
  const T = useTierComponents();

  return (
    <SiteChrome>
      <div className="mx-auto flex max-w-2xl flex-col gap-6">
        <header className="flex flex-col gap-1">
          <h1 className="typo-section-title font-bold">Kontak</h1>
          <p className="text-[var(--muted-foreground)]">
            Hubungi kami untuk pertanyaan seputar kompetisi.
          </p>
        </header>

        <T.Card>
          <T.CardContent className="flex flex-col gap-4 py-2">
            <div className="flex flex-col gap-1">
              <span className="typo-label text-[var(--muted-foreground)]">Alamat</span>
              <span>{CONTACT.address}</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="typo-label text-[var(--muted-foreground)]">Telepon</span>
              <a className="text-[var(--primary)] hover:underline" href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}>
                {CONTACT.phone}
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <span className="typo-label text-[var(--muted-foreground)]">Email</span>
              <a className="text-[var(--primary)] hover:underline" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>
            </div>
          </T.CardContent>
        </T.Card>
      </div>
    </SiteChrome>
  );
}
