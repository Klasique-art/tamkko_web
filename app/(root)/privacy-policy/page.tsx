import type { Metadata } from "next";

import LegalPage from "../_legal/legal-page";
import { legalHighlights, privacySections } from "../_legal/legal-content";

export const metadata: Metadata = {
  title: "Privacy Policy | Tamkko Web",
  description: "Tamkko privacy policy covering account data, subscriptions, payouts, moderation, and user controls.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy Policy"
      title="Privacy Policy"
      intro="This policy explains how Tamkko handles the account, content, moderation, and transaction data needed to run a creator-focused platform with subscriptions, payouts, and community spaces."
      highlights={legalHighlights}
      sections={privacySections}
      ctaLabel="Read Terms and Conditions"
      ctaHref="/terms-and-conditions"
    />
  );
}
