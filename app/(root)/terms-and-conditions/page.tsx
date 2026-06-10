import type { Metadata } from "next";

import LegalPage from "../_legal/legal-page";
import { legalHighlights, termsSections } from "../_legal/legal-content";

export const metadata: Metadata = {
  title: "Terms and Conditions | Tamkko Web",
  description: "Tamkko terms and conditions for creators, subscribers, rooms, and monetization features.",
};

export default function TermsAndConditionsPage() {
  return (
    <LegalPage
      eyebrow="Terms and Conditions"
      title="Tamkko Terms"
      intro="These terms describe the core expectations for using Tamkko across creator subscriptions, premium content, monetization flows, room participation, and account safety features."
      highlights={legalHighlights}
      sections={termsSections}
      ctaLabel="Read Privacy Policy"
      ctaHref="/privacy-policy"
    />
  );
}
