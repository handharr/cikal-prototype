"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { withBase } from "@/lib/href";

// Each item carries its raw route (for active matching against usePathname,
// which is base-path-stripped) and a base-prefixed href (the sidebar renders
// plain <a> anchors, which are not auto-prefixed).
const NAV_ITEMS = [
  { label: "Dashboard", path: "/admin" },
  { label: "Kompetisi", path: "/admin/competitions" },
  { label: "Rekonsiliasi", path: "/admin/reconciliation" },
];

/**
 * Admin backoffice chrome. Renders a left Sidebar (off-canvas on mobile, toggled
 * by the top bar) around admin content. Used by /admin, /admin/competitions, and
 * /admin/reconciliation. (No real auth — prototype state only.)
 */
export function AdminChrome({ children }: { children: React.ReactNode }) {
  const T = useTierComponents();
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const groups = [
    {
      items: NAV_ITEMS.map((item) => ({
        label: item.label,
        href: withBase(item.path),
        active: pathname === item.path,
      })),
    },
  ];

  return (
    <div className="flex min-h-screen">
      <T.Sidebar
        brandName="Cikal Admin"
        groups={groups}
        user={{ name: "Admin Cikal" }}
        actions={[{ label: "Keluar", href: withBase("/") }]}
        open={open}
        onOpenChange={setOpen}
        // The component hardcodes `md:h-full` (height:100%), which collapses to
        // content height under our `min-h-screen` parent (no definite height to
        // resolve the percentage against). Override to a full-viewport sticky
        // column so it spans the page and stays put while content scrolls.
        className="md:sticky md:top-0 md:h-screen"
      />

      <div className="flex min-h-screen flex-1 flex-col">
        {/* Mobile top bar — the sidebar is off-canvas below md. */}
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3 md:hidden">
          <button
            type="button"
            aria-label="Buka menu"
            onClick={() => setOpen(true)}
            className="text-[var(--foreground)]"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
          <span className="typo-card-title font-bold">Cikal Admin</span>
        </div>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:py-14">
          {children}
        </main>

        <T.Footer
          brandName="Cikal Amri Setu"
          copyright={`© ${new Date().getFullYear()} Sekolah Cikal Amri Setu`}
        />
      </div>
    </div>
  );
}
