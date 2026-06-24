"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";

const NAV_LINKS = [
  { label: "Beranda", href: "/" },
  { label: "Kompetisi", href: "/competitions" },
  { label: "Tentang", href: "/about" },
  { label: "Kontak", href: "/contact" },
];

const FOOTER_LINKS = [
  { label: "Kompetisi", href: "/competitions" },
  { label: "Daftar", href: "/register" },
  { label: "Masuk", href: "/login" },
  { label: "Tentang", href: "/about" },
];

/**
 * Public marketing chrome. Renders the active tier's NavBar + Footer around
 * page content. Backoffice routes use their own chrome.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const T = useTierComponents();
  const router = useRouter();

  return (
    <>
      <T.NavBar
        brandName="Cikal Amri Setu"
        links={NAV_LINKS}
        onLogin={() => router.push("/login")}
      />
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-14">
        {children}
      </main>
      <T.Footer
        brandName="Cikal Amri Setu"
        links={FOOTER_LINKS}
        copyright={`© ${new Date().getFullYear()} Sekolah Cikal Amri Setu`}
      />
    </>
  );
}
