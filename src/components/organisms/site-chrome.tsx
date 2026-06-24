"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { withBase } from "@/lib/href";

const FOOTER_LINKS = [
  { label: "Tentang", href: withBase("/about") },
  { label: "Kontak", href: withBase("/contact") },
  { label: "Masuk", href: withBase("/login") },
  { label: "Daftar", href: withBase("/register") },
];

/**
 * Public chrome (unauthenticated). A front-door header with the brand and
 * auth actions only — no app menu. The app menu lives behind login in
 * {@link AppChrome}. Used by the landing, about, contact, login, and register.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const T = useTierComponents();
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex items-center justify-between gap-4 border-b border-[var(--border)] bg-[var(--background)] px-5 py-3">
        <button
          type="button"
          className="typo-card-title font-bold"
          onClick={() => router.push("/")}
        >
          Cikal Amri Setu
        </button>
        <div className="flex items-center gap-2">
          <T.Button size="sm" variant="ghost" onClick={() => router.push("/login")}>
            Masuk
          </T.Button>
          <T.Button size="sm" onClick={() => router.push("/register")}>
            Daftar
          </T.Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:py-14">
        {children}
      </main>

      <T.Footer
        brandName="Cikal Amri Setu"
        links={FOOTER_LINKS}
        copyright={`© ${new Date().getFullYear()} Sekolah Cikal Amri Setu`}
      />
    </div>
  );
}
