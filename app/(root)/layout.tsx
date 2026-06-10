import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="scaffold-shell">
      <div className="scaffold-frame">
        <header className="scaffold-nav">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-primary)] text-lg font-bold text-white">
              T
            </span>
            <span className="text-2xl text-stone-900 sm:text-3xl">Tankko</span>
          </Link>
          <nav className="scaffold-links">
            <Link className="scaffold-link" href="/terms-and-conditions">
              Terms &amp; Conditions
            </Link>
            <Link className="scaffold-link" href="/privacy-policy">
              Privacy Policy
            </Link>
          </nav>
        </header>

        <main className="flex-1 py-8">{children}</main>

        <footer className="border-t pt-5 text-sm text-stone-500" style={{ borderColor: "var(--border)" }}>
          Clean scaffold routes are live. Old `types/` and `utils/` files have been removed.
        </footer>
      </div>
    </div>
  );
}
