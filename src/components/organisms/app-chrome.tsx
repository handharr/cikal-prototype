"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { withBase } from "@/lib/href";

// Post-login navigation. This is the menu that belongs to the authenticated
// experience (not the public landing). Logout is an account action, not a
// destination, so it lives in the NavBar's actions slot — not here.
const NAV_LINKS = [
  { label: "Beranda", href: withBase("/home") },
  { label: "Kompetisi", href: withBase("/competitions") },
  { label: "Tentang", href: withBase("/about") },
  { label: "Kontak", href: withBase("/contact") },
];

/**
 * Authenticated app chrome. Renders the post-login NavBar (full menu) + an
 * account avatar and logout around backoffice content. Used by the participant
 * surfaces: /home (dashboard), /competitions, /enroll, /checkout. (No real
 * auth — prototype state only.)
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const T = useTierComponents();
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col">
      <T.NavBar
        brandName="Cikal Amri Setu"
        links={NAV_LINKS}
        actions={
          // Avatar anchors the far right; action items accumulate to its left.
          <div className="flex items-center gap-2">
            <T.Button size="sm" variant="ghost" onClick={() => router.push("/")}>
              Keluar
            </T.Button>
            <T.Avatar name="Peserta Cikal" />
          </div>
        }
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
