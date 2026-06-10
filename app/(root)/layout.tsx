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
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-stone-500">
              Fresh Start
            </p>
            <h1 className="mt-2 text-3xl text-stone-900 sm:text-4xl">
              Tamkko Web Scaffold
            </h1>
          </div>
          <nav className="scaffold-links">
            <Link className="scaffold-link" href="/">
              Home
            </Link>
            <Link className="scaffold-link" href="/dashboard">
              Dashboard
            </Link>
            <Link className="scaffold-link" href="/terms-and-conditions">
              Terms
            </Link>
            <Link className="scaffold-link" href="/privacy-policy">
              Privacy
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
