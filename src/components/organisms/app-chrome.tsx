"use client";

import * as React from "react";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { withBase } from "@/lib/href";

// Post-login navigation. This is the menu that belongs to the authenticated
// experience (not the public landing).
const NAV_LINKS = [
  { label: "Beranda", href: withBase("/home") },
  { label: "Kompetisi", href: withBase("/competitions") },
  { label: "Tentang", href: withBase("/about") },
  { label: "Kontak", href: withBase("/contact") },
  { label: "Keluar", href: withBase("/") },
];

/**
 * Authenticated app chrome. Renders the post-login NavBar (full menu) + an
 * account avatar around backoffice content. Used by the participant surfaces:
 * /home (dashboard), /competitions, /enroll, /checkout. (No real auth —
 * prototype state only.)
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const T = useTierComponents();

  return (
    <div className="flex min-h-screen flex-col">
      <T.NavBar
        brandName="Cikal Amri Setu"
        links={NAV_LINKS}
        user={{ name: "Peserta Cikal" }}
      />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:py-14">
        {children}
      </main>
      <T.Footer
        brandName="Cikal Amri Setu"
        copyright={`© ${new Date().getFullYear()} Sekolah Cikal Amri Setu`}
      />
    </div>
  );
}
