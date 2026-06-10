import Link from "next/link";

import type { LegalHighlight, LegalSection } from "./legal-content";

type LegalPageProps = {
  eyebrow: string;
  title: string;
  intro: string;
  highlights: LegalHighlight[];
  sections: LegalSection[];
  ctaLabel: string;
  ctaHref: string;
};

export default function LegalPage({
  eyebrow,
  title,
  intro,
  highlights,
  sections,
  ctaLabel,
  ctaHref,
}: LegalPageProps) {
  return (
    <section className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">
        <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--color-primary)] p-6 text-white shadow-[0_24px_70px_-42px_rgba(87,18,23,0.9)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">
            {eyebrow}
          </p>
          <h2 className="mt-4 text-4xl sm:text-5xl">{title}</h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/88 sm:text-base">
            {intro}
          </p>
        </div>

        <aside className="scaffold-card">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-secondary-text)]">
            Quick View
          </p>
          <div className="mt-4 space-y-4">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl bg-[var(--color-surface-soft)] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary-text)]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--color-text)]">{item.value}</p>
              </div>
            ))}
          </div>
        </aside>
      </div>

      <div className="grid gap-4">
        {sections.map((section) => (
          <article key={section.title} className="scaffold-card">
            <h3 className="text-2xl text-[var(--color-text)]">{section.title}</h3>
            <p className="mt-3 text-sm leading-7 text-[var(--color-secondary-text)] sm:text-base">
              {section.body}
            </p>
          </article>
        ))}
      </div>

      <div className="scaffold-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-[var(--color-text)]">Need the companion policy?</p>
          <p className="mt-1 text-sm text-[var(--color-secondary-text)]">
            Review the related Tamkko legal page for the full picture.
          </p>
        </div>
        <Link
          href={ctaHref}
          className="inline-flex items-center justify-center rounded-full bg-[var(--color-accent)] px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)]"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
