import type { Metadata } from "next";
import Link from "next/link";

import LegalPage from "../_legal/legal-page";
import { legalHighlights, privacySections } from "../_legal/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy | Tamkko Web",
  description: "Tamkko privacy policy covering account data, subscriptions, payouts, moderation, and user controls.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="space-y-6">
      <LegalPage
        eyebrow="Privacy Policy"
        title="Privacy Policy"
        intro="This policy explains how Tamkko handles the account, content, moderation, and transaction data needed to run a creator-focused platform with subscriptions, payouts, and community spaces."
        highlights={legalHighlights}
        sections={privacySections}
        ctaLabel="Read Terms and Conditions"
        ctaHref="/terms-and-conditions"
      />

      <section className="scaffold-card">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-secondary-text)]">
          Privacy requests
        </p>
        <h3 className="mt-3 text-3xl text-[var(--color-text)]">Manage deletion requests</h3>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-[var(--color-secondary-text)]">
          If you want Tamkko to remove some of your data or schedule deletion of your full account, use one of the
          request pages below.
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
      </section>
    </section>
  );
}
