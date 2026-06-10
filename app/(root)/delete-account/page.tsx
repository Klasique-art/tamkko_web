import type { Metadata } from "next";

import DeleteAccountForm from "./delete-account-form";

export const metadata: Metadata = {
  title: "Delete Account Request | Tamkko Web",
  description: "Request deletion of your Tamkko account and associated platform data.",
};

export default function DeleteAccountPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-[2rem] border border-[var(--border)] bg-[var(--color-primary)] p-6 text-white shadow-[0_24px_70px_-42px_rgba(87,18,23,0.9)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/75">Privacy Request</p>
        <h2 className="mt-4 text-4xl sm:text-5xl">Request account deletion</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/88 sm:text-base">
          This page lets a user request that their Tamkko account and associated platform data be deleted. The
          deletion flow follows the same scheduled-deletion model described in the mobile project: a confirmed request,
          a deletion-pending state, a grace period, and permanent removal handled by backend jobs and retention rules.
        </p>
      </div>

      <DeleteAccountForm />
    </section>
  );
}
