"use client";

import { useState } from "react";

const requestTypes = [
  { value: "partial", label: "Delete some of my data" },
  { value: "full_non_account", label: "Delete all eligible data without deleting my account" },
];

const dataCategories = [
  {
    value: "posts_and_media",
    label: "Posts and uploaded media",
    description: "Public videos, images, captions, and related creator content owned by this account.",
  },
  {
    value: "comments_and_replies",
    label: "Comments and replies",
    description: "Comment history, replies, and discussion activity tied to this account.",
  },
  {
    value: "profile_fields",
    label: "Profile fields",
    description: "Bio, display details, profile metadata, and editable account-facing information.",
  },
  {
    value: "room_activity",
    label: "Room and community activity",
    description: "Messages, participation records, and room-related content where deletion is operationally allowed.",
  },
  {
    value: "support_history",
    label: "Support history",
    description: "Support tickets and related request notes, except where retention is required.",
  },
  {
    value: "non_required_analytics",
    label: "Non-required analytics and usage history",
    description: "Product usage records that are not needed for security, legal, fraud, or accounting obligations.",
  },
];

type DataDeletionResponse = {
  success?: boolean;
  message?: string;
  data?: {
    request_id?: string;
    request_state?: string;
    request_type?: string;
    requested_categories?: string[];
    submitted_at?: string;
    review_eta?: string | null;
  };
  errors?: Array<{ message?: string }>;
};

export default function DataDeletionRequestForm() {
  const [requestType, setRequestType] = useState("partial");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [details, setDetails] = useState("");
  const [confirmationText, setConfirmationText] = useState("");
  const [acknowledge, setAcknowledge] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [result, setResult] = useState<DataDeletionResponse["data"] | null>(null);

  const toggleCategory = (value: string) => {
    setSelectedCategories((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccessMessage("");
    setResult(null);

    if (confirmationText.trim().toUpperCase() !== "DELETE DATA") {
      setError("Type DELETE DATA exactly to confirm this request.");
      return;
    }

    if (!acknowledge) {
      setError("You need to confirm that you understand some records may still be retained.");
      return;
    }

    if (requestType === "partial" && selectedCategories.length === 0) {
      setError("Choose at least one data category for a partial deletion request.");
      return;
    }

    setSubmitting(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/$/, "") ?? "";
      const response = await fetch(`${baseUrl}/api/v1/users/me/data-deletion-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          request_type: requestType,
          delete_all_eligible_data: requestType === "full_non_account",
          categories: requestType === "full_non_account" ? [] : selectedCategories,
          reason_details: details.trim() || null,
          confirmation_text: confirmationText.trim(),
          acknowledge_retention_exceptions: acknowledge,
        }),
      });

      const payload = (await response.json().catch(() => ({}))) as DataDeletionResponse;
      const message =
        payload.message ||
        payload.errors?.[0]?.message ||
        "We could not submit your data deletion request right now.";

      if (!response.ok || payload.success !== true) {
        setError(message);
        return;
      }

      setSuccessMessage(message || "Data deletion request submitted.");
      setResult(payload.data ?? null);
      setConfirmationText("");
      setDetails("");
      setAcknowledge(false);
      if (requestType === "partial") {
        setSelectedCategories([]);
      }
    } catch {
      setError(
        "The data deletion request service is not available yet. Once the backend endpoint is implemented, this form will submit directly."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <section className="scaffold-card">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-secondary-text)]">
          Request Form
        </p>
        <h3 className="mt-3 text-3xl text-[var(--color-text)]">Delete some or all eligible data</h3>
        <p className="mt-3 text-sm leading-7 text-[var(--color-secondary-text)]">
          Use this page when you want Tamkko to remove selected data, or all eligible data, without closing your
          account. Some records may still need to be kept for safety, legal, fraud, payment, accounting, or security
          reasons.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-text)]">Request type</span>
            <select
              value={requestType}
              onChange={(event) => setRequestType(event.target.value)}
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition focus:border-[var(--color-accent)]"
            >
              {requestTypes.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>

          <div>
            <span className="mb-3 block text-sm font-semibold text-[var(--color-text)]">
              Data categories
            </span>
            <div className="space-y-3">
              {dataCategories.map((category) => {
                const checked =
                  requestType === "full_non_account" ? true : selectedCategories.includes(category.value);

                return (
                  <label
                    key={category.value}
                    className="flex items-start gap-3 rounded-2xl border border-[var(--border)] bg-[var(--color-surface-soft)] px-4 py-4"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      disabled={requestType === "full_non_account"}
                      onChange={() => toggleCategory(category.value)}
                      className="mt-1 h-4 w-4 accent-[var(--color-accent)]"
                    />
                    <span>
                      <span className="block text-sm font-semibold text-[var(--color-text)]">{category.label}</span>
                      <span className="mt-1 block text-sm leading-6 text-[var(--color-secondary-text)]">
                        {category.description}
                      </span>
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-text)]">Additional details</span>
            <textarea
              value={details}
              onChange={(event) => setDetails(event.target.value)}
              rows={5}
              placeholder="Explain the scope of the deletion request or any privacy context the team should know."
              className="w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--color-text)] outline-none transition placeholder:text-[var(--color-secondary-text)] focus:border-[var(--color-accent)]"
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-[var(--color-text)]">
              Type DELETE DATA to confirm
            </span>
            <input
              value={confirmationText}
              onChange={(event) => setConfirmationText(event.target.value)}
              placeholder="DELETE DATA"
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
              I understand this request is for data removal without deleting my account, and that Tamkko may decline or
              narrow parts of the request where records must be retained for legal, security, fraud, payment,
              moderation, or accounting reasons.
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
            {submitting ? "Submitting request..." : "Submit data deletion request"}
          </button>
        </form>
      </section>

      <aside className="space-y-4">
        <div className="scaffold-card">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-secondary-text)]">
            How this differs
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--color-secondary-text)]">
            <li>Your account should remain active unless backend flags a separate account action.</li>
            <li>You can request specific categories or all eligible non-required data.</li>
            <li>Backend review may approve, partially approve, or reject categories based on retention rules.</li>
            <li>Required payment, fraud, legal, and security records may still remain on file.</li>
          </ul>
        </div>

        <div className="scaffold-card">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[var(--color-secondary-text)]">
            Expected API
          </p>
          <div className="mt-4 rounded-2xl bg-[var(--color-surface-soft)] p-4 text-sm text-[var(--color-text)]">
            <p className="font-semibold">POST `/api/v1/users/me/data-deletion-request`</p>
            <p className="mt-2 text-[var(--color-secondary-text)]">
              Payload includes request type, categories, confirmation text, details, and retention acknowledgement.
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
                <span className="font-semibold text-[var(--color-text)]">Request ID:</span>{" "}
                {result.request_id ?? "Pending backend response"}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-text)]">State:</span>{" "}
                {result.request_state ?? "submitted"}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-text)]">Type:</span>{" "}
                {result.request_type ?? requestType}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-text)]">Submitted at:</span>{" "}
                {result.submitted_at ?? "Pending backend response"}
              </p>
              <p>
                <span className="font-semibold text-[var(--color-text)]">Requested categories:</span>{" "}
                {(result.requested_categories ?? selectedCategories).join(", ") || "all eligible data"}
              </p>
            </div>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
