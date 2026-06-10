import Link from "next/link";
import LegalNavbar from "./_legal/legal-navbar";

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
            <span className="text-2xl text-stone-900 sm:text-3xl">Tamkko</span>
          </Link>
          <LegalNavbar />
        </header>

        <main className="flex-1 py-8">{children}</main>
      </div>
    </div>
  );
}
