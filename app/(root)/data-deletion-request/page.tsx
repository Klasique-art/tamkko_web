import type { Metadata } from "next";

import DataDeletionRequestForm from "./data-deletion-request-form";

export const metadata: Metadata = {
  title: "Data Deletion Request | Tamkko Web",
  description: "Request deletion of some or all eligible Tamkko data without deleting your account.",
};

export default function DataDeletionRequestPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--color-primary)] p-6 text-white shadow-[0_24px_70px_-42px_rgba(87,18,23,0.9)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">Privacy Controls</p>
        <h2 className="mt-4 text-4xl sm:text-5xl">Request data deletion without deleting your account</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/88 sm:text-base">
          This page is for users who want Tamkko to remove selected categories of personal or platform data, or all
          eligible non-required data, while keeping their account open. It is separate from account deletion and should
          be reviewed under privacy, compliance, moderation, payment, and security retention rules.
        </p>
      </div>

      <section className="scaffold-card">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-secondary-text)]">
          Steps to request data deletion
        </p>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <article className="rounded-[1.5rem] bg-[var(--color-surface-soft)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary-text)]">
              Step 1
            </p>
            <h3 className="mt-2 text-xl text-[var(--color-text)]">Choose the scope</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-secondary-text)]">
              Decide whether you want Tamkko to remove only specific categories of data or all eligible non-required
              data while keeping your account active.
            </p>
          </article>

          <article className="rounded-[1.5rem] bg-[var(--color-surface-soft)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary-text)]">
              Step 2
            </p>
            <h3 className="mt-2 text-xl text-[var(--color-text)]">Complete the request form</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-secondary-text)]">
              Select the data categories, add any helpful details, and type <span className="font-semibold text-[var(--color-text)]">DELETE DATA</span> to confirm the request.
            </p>
          </article>

          <article className="rounded-[1.5rem] bg-[var(--color-surface-soft)] p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-secondary-text)]">
              Step 3
            </p>
            <h3 className="mt-2 text-xl text-[var(--color-text)]">Wait for backend review</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--color-secondary-text)]">
              Tamkko should review the request, remove eligible data, and retain only records that must stay for
              legal, safety, fraud, payment, accounting, or security reasons.
            </p>
          </article>
        </div>
      </section>

      <DataDeletionRequestForm />
    </section>
  );
}
