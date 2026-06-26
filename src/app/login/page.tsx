"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTierComponents } from "@handharr-labs/ui-tier-runtime";
import { SiteChrome } from "@/components/organisms/site-chrome";

export default function LoginPage() {
  const T = useTierComponents();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Prototype shortcut (no real auth): admin / admin (case-insensitive) →
  // admin backoffice; anything else → participant dashboard.
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const isAdmin =
      email.trim().toLowerCase() === "admin" && password.toLowerCase() === "admin";
    router.push(isAdmin ? "/admin" : "/home");
  }

  return (
    <SiteChrome>
      <div className="mx-auto w-full max-w-md">
        <T.Card>
          <T.CardHeader>
            <T.CardTitle>Masuk</T.CardTitle>
            <T.CardDescription>
              Masuk untuk mengakses dashboard Anda.
            </T.CardDescription>
          </T.CardHeader>

          <form onSubmit={handleSubmit}>
            <T.CardContent className="flex flex-col gap-4">
              <T.Field label="Email" htmlFor="email" required>
                <T.Input
                  id="email"
                  type="text"
                  placeholder="nama@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </T.Field>
              <T.Field label="Kata Sandi" htmlFor="password" required>
                <T.Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </T.Field>
              <a className="self-end typo-label text-[var(--primary)] hover:underline" href="#">
                Lupa kata sandi?
              </a>
            </T.CardContent>
            <T.CardFooter className="flex-col items-stretch gap-3">
              <T.Button type="submit">Masuk</T.Button>
              <p className="text-center typo-label text-[var(--muted-foreground)]">
                Belum punya akun?{" "}
                <button
                  type="button"
                  className="text-[var(--primary)] hover:underline"
                  onClick={() => router.push("/register")}
                >
                  Daftar
                </button>
              </p>
            </T.CardFooter>
          </form>
        </T.Card>
      </div>
    </SiteChrome>
  );
}
