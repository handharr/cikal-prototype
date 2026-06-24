"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";

// The design system's NavBar/Footer render plain <a> anchors, which (unlike
// next/navigation) are not auto-prefixed with the Pages basePath. Prefix here.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const withBase = (href: string) => `${BASE}${href}`;

const NAV_LINKS = [
  { label: "Beranda", href: withBase("/") },
  { label: "Kompetisi", href: withBase("/competitions") },
  { label: "Tentang", href: withBase("/about") },
  { label: "Kontak", href: withBase("/contact") },
];

const FOOTER_LINKS = [
  { label: "Kompetisi", href: withBase("/competitions") },
  { label: "Daftar", href: withBase("/register") },
  { label: "Masuk", href: withBase("/login") },
  { label: "Tentang", href: withBase("/about") },
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
