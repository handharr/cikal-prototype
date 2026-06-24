"use client";

import * as React from "react";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { withBase } from "@/lib/href";

const NAV_LINKS = [
  { label: "Dashboard", href: withBase("/admin") },
  { label: "Rekonsiliasi", href: withBase("/admin/reconciliation") },
  { label: "Keluar", href: withBase("/") },
];

/**
 * Admin backoffice chrome. Renders the admin NavBar + account avatar around
 * admin content. Used by /admin and /admin/reconciliation. (No real auth —
 * prototype state only.)
 */
export function AdminChrome({ children }: { children: React.ReactNode }) {
  const T = useTierComponents();

  return (
    <div className="flex min-h-screen flex-col">
      <T.NavBar
        brandName="Cikal Admin"
        links={NAV_LINKS}
        user={{ name: "Admin Cikal" }}
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
