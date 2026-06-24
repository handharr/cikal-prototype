import type { Metadata } from "next";

// Tailwind first, then each tier's token layer, then the CIKAL brand overrides
// LAST so brand knobs win the cascade tie against the active .tier-* class.
import "./globals.css";
import "@handharr-labs/ui-base-bronze/tokens/globals.css";
import "@handharr-labs/ui-base-silver/tokens/globals.css";
import "@handharr-labs/ui-base-gold/tokens/globals.css";
import "@/styles/brand-cikal.css";

import { AppFrame } from "@/components/organisms/app-frame";

export const metadata: Metadata = {
  title: "Sekolah Cikal Amri Setu — Kompetisi Olahraga",
  description:
    "Showcase kompetisi olahraga & pendaftaran online Sekolah Cikal Amri Setu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <AppFrame>{children}</AppFrame>
      </body>
    </html>
  );
}
