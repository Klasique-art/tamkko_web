import Link from "next/link";

export default function HomePage() {
  return (
    <section className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="scaffold-card">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
            Homepage
          </p>
          <h2 className="mt-4 text-4xl text-stone-900 sm:text-5xl">
            A clean baseline for the next build.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-stone-600">
            Welcome to Tamkko. Explore our legal pages and privacy request options while the full web experience continues to take shape.
          </p>
        </div>

        <div className="scaffold-card">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-stone-500">
            Starter Notes
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-600">
            <li>Home and dashboard routes are now placeholder pages.</li>
            <li>Legal pages are available at `/terms-and-conditions` and `/privacy-policy`.</li>
            <li>Layout uses a minimal shared shell for future expansion.</li>
            <li>Folder structure remains in place for the next phase of work.</li>
          </ul>
        </div>
      </div>

      <div className="scaffold-card">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-secondary-text)]">
          Privacy Requests
        </p>
        <h3 className="mt-3 text-3xl text-[var(--color-text)]">Manage your privacy requests</h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-secondary-text)]">
          Use these pages to request removal of selected data or to begin the process of deleting your Tamkko account.
        </p>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <Link
            href="/data-deletion-request"
            className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--color-surface-soft)] p-5 transition hover:border-[var(--color-accent)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary-text)]">
              Data deletion
            </p>
            <h4 className="mt-2 text-xl text-[var(--color-text)]">Delete some or all eligible data</h4>
            <p className="mt-2 text-sm leading-6 text-[var(--color-secondary-text)]">
              Request deletion of selected categories of data while keeping your account active.
            </p>
          </Link>

          <Link
            href="/delete-account"
            className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--color-surface-soft)] p-5 transition hover:border-[var(--color-accent)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary-text)]">
              Account deletion
            </p>
            <h4 className="mt-2 text-xl text-[var(--color-text)]">Delete your account and associated data</h4>
            <p className="mt-2 text-sm leading-6 text-[var(--color-secondary-text)]">
              Request a full account deletion flow with confirmation and backend scheduling.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
