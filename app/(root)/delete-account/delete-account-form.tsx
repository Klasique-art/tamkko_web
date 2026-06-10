"use client";

import { useState } from "react";

const reasons = [
  { value: "privacy_request", label: "I want my account data removed" },
  { value: "no_longer_needed", label: "I no longer need the app" },
  { value: "safety_concern", label: "I have a safety or trust concern" },
  { value: "other", label: "Other reason" },
];

type DeleteResponse = {
  success?: boolean;
  message?: string;
  data?: {
    account_state?: string;
    deletion_requested_at?: string;
    scheduled_deletion_at?: string;
    grace_period_days?: number;
  };
  errors?: Array<{ message?: string }>;
};

export default function DeleteAccountForm() {
  const [reasonCode, setReasonCode] = useState("privacy_request");
  const [details, setDetails] = useState("");
  const [confirmationText, setConfirmationText] = useState("");
  const [acknowledge, setAcknowledge] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [result, setResult] = useState<DeleteResponse["data"] | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setResult(null);

    if (confirmationText.trim().toUpperCase() !== "DELETE") {
      setError("Type DELETE exactly to confirm your deletion request.");
      return;
    }

    if (!acknowledge) {
      setError("You need to confirm that you understand the account deletion process.");
      return;
    }

    setSubmitting(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";
      const response = await fetch(`${baseUrl}/api/v1/users/me/delete-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          confirmation_text: confirmationText.trim(),
          reason_code: reasonCode,
          reason_details: details.trim() || null,
          acknowledge_data_removal: acknowledge,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as DeleteResponse;
      const message =
        payload.message ||
        payload.errors?.[0]?.message ||
        "We could not submit your deletion request right now.";

      if (!response.ok || payload.success !== true) {
        setError(message);
        return;
      }

      setSuccessMessage(message || "Account deletion scheduled.");
      setResult(payload.data ?? null);
      setConfirmationText("");
      setDetails("");
      setAcknowledge(false);
    } catch {
      setError(
        "The deletion request service is not available yet. Once the backend endpoint is implemented, this form will submit directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <section className="scaffold-card">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-secondary-text)]">
          Request Form
        </p>
        <h3 className="mt-3 text-3xl text-[var(--color-text)]">Delete account and associated data</h3>
        <p className="mt-3 text-sm leading-7 text-[var(--color-secondary-text)]">
          Use this request when you want Tamkko to schedule permanent removal of your account and associated platform
          data, subject to legal, accounting, fraud-prevention, or security retention requirements.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-text)]">Why are you leaving?</span>
            <select
              value={reasonCode}
              onChange={(event) => setReasonCode(event.target.value)}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-accent)]"
            >
              {reasons.map((reason) => (
                <option key={reason.value} value={reason.value}>
                  {reason.label}
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-text)]">Additional details</span>
            <textarea
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              rows={5}
              placeholder="Share anything the team should know before your account is deleted."
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-secondary-text)] focus:border-[var(--color-accent)]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-text)]">Type DELETE to confirm</span>
            <input
              value={confirmationText}
              onChange={(event) => setConfirmationText(event.target.value)}
              placeholder="DELETE"
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm uppercase text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-secondary-text)] focus:border-[var(--color-accent)]"
            />
          </label>

          <label className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--color-surface-soft)] px-4 py-4">
            <input
              type="checkbox"
              checked={acknowledge}
              onChange={(event) => setAcknowledge(event.target.checked)}
              className="mt-1 h-4 w-4 accent-[var(--color-accent)]"
            />
            <span className="text-sm leading-6 text-[var(--color-secondary-text)]">
              I understand this request places my account into a deletion-pending state and that some records may still
              be retained where required for security, fraud review, payments, tax, accounting, or legal compliance.
            </span>
          </label>

          {error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          ) : null}

          {successMessage ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {successMessage}
            </div>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[color:color-mix(in_srgb,var(--color-primary)_88%,black)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting request..." : "Request account deletion"}
          </button>
        </form>
      </section>

      <aside className="space-y-4">
        <div className="scaffold-card">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-secondary-text)]">
            What happens next
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--color-secondary-text)]">
            <li>Your account should move into a `deletion_pending` state.</li>
            <li>You should be signed out or have access restricted after the request succeeds.</li>
            <li>The backend should schedule hard deletion after the grace period.</li>
            <li>Some records may remain where payment, fraud, legal, or security rules require retention.</li>
          </ul>
        </div>

        <div className="scaffold-card">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-secondary-text)]">
            Expected API
          </p>
          <div className="mt-4 rounded-2xl bg-[var(--color-surface-soft)] p-4 text-sm text-[var(--color-text)]">
            <p className="font-semibold">POST `/api/v1/users/me/delete-request`</p>
            <p className="mt-2 text-[var(--color-secondary-text)]">
              Payload includes `confirmation_text`, `reason_code`, `reason_details`, and
              `acknowledge_data_removal`.
            </p>
          </div>
        </div>

        {result ? (
          <div className="scaffold-card">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-secondary-text)]">
              Request accepted
            </p>
            <div className="mt-4 space-y-2 text-sm text-[var(--color-secondary-text)]">
              <p>
                <span className="font-semibold text-[var(--color-text)]">Account state:</span>{" "}
                {result.account_state ?? "deletion_pending"}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-text)]">Requested at:</span>{" "}
                {result.deletion_requested_at ?? "Pending backend response"}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-text)]">Scheduled deletion:</span>{" "}
                {result.scheduled_deletion_at ?? "Pending backend response"}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-text)]">Grace period:</span>{" "}
                {result.grace_period_days ?? 7} days
              </p>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
