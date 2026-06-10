export type LegalSection = {
  title: string;
  body: string;
};

export type LegalHighlight = {
  label: string;
  value: string;
};

export const legalHighlights: LegalHighlight[] = [
  {
    label: "Platform",
    value: "Creator subscriptions, premium content, rooms, direct support flows, payouts, moderation, and community participation tools.",
  },
  {
    label: "Effective date",
    value: "April 8, 2026",
  },
  {
    label: "Applies to",
    value: "Tamkko mobile and web experiences, including creator and supporter accounts.",
  },
  {
    label: "Legal scope",
    value: "These pages are intended to cover user conduct, billing behavior, content responsibilities, privacy handling, and operational safeguards across the app.",
  },
];

export const termsSections: LegalSection[] = [
  {
    title: "1. Acceptance of the Service",
    body: "By creating an account, browsing premium or public content, joining rooms, subscribing to creators, sending payments, or otherwise using Tamkko, you agree to follow these terms and any related platform rules that apply to the specific feature you are using. If you do not agree with the terms, you should not access or continue using the service.",
  },
  {
    title: "2. Eligibility and Account Registration",
    body: "You must provide accurate registration information and keep your account details current. You are responsible for protecting your password, device access, recovery details, and any sessions connected to your account. Tamkko may require identity, age, ownership, payout, or security verification before enabling certain features, especially creator tools, wallet-related actions, or account recovery flows.",
  },
  {
    title: "3. Acceptable Use and Community Conduct",
    body: "You agree to use Tamkko lawfully and respectfully. Prohibited conduct includes harassment, threats, hate-based abuse, impersonation, payment abuse, spam, account selling, scraping, unauthorized automation, fraudulent disputes, attempts to gain access to restricted systems, and efforts to bypass subscriptions, room permissions, moderation actions, or technical safeguards. We expect creators and supporters alike to use community features in a way that does not harm other users or the platform.",
  },
  {
    title: "4. Creator Content and Rights",
    body: "Creators are responsible for the videos, images, captions, audio, room activity, descriptions, and other materials they publish through Tamkko. You must have the rights, licenses, permissions, and legal authority necessary to upload or monetize that content. Content that violates intellectual property rights, local law, platform safety standards, or payment-network rules may be removed, blocked, demonetized, or escalated for review.",
  },
  {
    title: "5. Subscriptions, Tips, Wallets, and Payouts",
    body: "Tamkko may offer paid subscriptions, tipping, wallet balances, creator earnings, and payout features. A subscription generally grants access for the active billing period tied to that purchase. Tips, wallet credits, settlement records, and payout logs may be tracked to support accounting, abuse prevention, customer support, reconciliation, and compliance. Access to premium content may end when a subscription expires, is refunded, is reversed, or is otherwise invalidated under our billing or fraud controls.",
  },
  {
    title: "6. Billing, Refunds, and Transaction Review",
    body: "Payment activity may be reviewed for failed charges, suspicious behavior, unauthorized use, duplicate processing, or chargeback risk. Refund decisions may depend on applicable law, platform policy, payment processor rules, subscription status, evidence of access, or signs of abuse. Tamkko may pause withdrawals, reverse credits, or restrict certain financial actions while transaction issues are being reviewed.",
  },
  {
    title: "7. Enforcement and Platform Safety",
    body: "We may investigate reports, review content or account activity, and take action when we reasonably believe a user has violated platform rules, harmed other users, exploited monetization systems, or created legal or security risk. Enforcement actions may include warnings, content removal, room restrictions, feature limitations, monetization holds, account suspension, or permanent termination depending on severity and recurrence.",
  },
  {
    title: "8. Availability, Changes, and Feature Evolution",
    body: "Tamkko is an evolving product. We may add, remove, pause, or redesign features, eligibility requirements, creator tools, room settings, moderation systems, or monetization flows at any time. We do not guarantee uninterrupted availability of every feature or that all functionality will remain identical over time. When changes are material, we may communicate them through updated legal pages, in-app notices, or account messaging.",
  },
  {
    title: "9. Account Closure and Continuing Obligations",
    body: "If your account is deactivated, deleted, or suspended, some records may still need to be retained for legal, fraud-prevention, tax, accounting, dispute-resolution, or security purposes. Any obligations tied to unresolved payments, chargebacks, investigations, misuse of creator tools, or rights complaints may continue after your access to the app has ended.",
  },
];

export const privacySections: LegalSection[] = [
  {
    title: "1. Data We Collect",
    body: "Tamkko may collect account identifiers, profile details, creator information, login and session activity, device or browser details, content metadata, room participation signals, moderation reports, support history, subscription records, payment events, payout information, and related operational logs needed to provide and secure the service.",
  },
  {
    title: "2. Information Provided by Users and Creators",
    body: "Some data is provided directly by users when they register, edit profiles, upload content, subscribe to creators, join community spaces, contact support, or request account actions such as deactivation, deletion, or export. Creators may also provide business, payout, verification, or moderation-relevant details so Tamkko can deliver monetization and compliance workflows.",
  },
  {
    title: "3. How We Use Personal Data",
    body: "We use personal data to create and manage accounts, authenticate users, personalize feeds, enable subscriptions and paid access, process tips and payouts, detect fraud, enforce platform rules, moderate rooms and content, investigate incidents, improve product performance, and send service-related notifications or legal updates when needed.",
  },
  {
    title: "4. Payments, Financial Records, and Risk Monitoring",
    body: "Transaction events, payout records, settlement information, refund or dispute data, and associated security logs may be retained to support payment processing, fraud prevention, accounting controls, reconciliation, compliance duties, customer support review, and protection of creators, supporters, and the platform itself.",
  },
  {
    title: "5. Sharing and Operational Access",
    body: "Tamkko may share or expose limited data where reasonably necessary to operate the platform, such as with payment providers, hosting or infrastructure partners, security tooling, customer support workflows, verification or compliance processes, or where disclosure is required by law. Internal access to sensitive records should be restricted to authorized personnel and legitimate operational use cases.",
  },
  {
    title: "6. Retention and Security",
    body: "We use administrative, organizational, and technical safeguards to reduce unauthorized access, misuse, and loss of data. Information may be retained for as long as necessary to provide the service, resolve disputes, investigate abuse, defend legal claims, satisfy tax or accounting obligations, and maintain appropriate security or audit records.",
  },
  {
    title: "7. Your Controls and Requests",
    body: "Depending on the tools available in the product and the legal obligations that apply, users may be able to update profile information, manage visibility settings, change notification preferences, request account deactivation or deletion, or request a copy of certain personal data. Some requests may require identity verification before action is taken.",
  },
  {
    title: "8. Children, Sensitive Risk Areas, and Platform Safety",
    body: "If a feature, category, or account type creates elevated safety, legal, or payment-network risk, Tamkko may require additional review, restrict access, or remove related data or content. We may also preserve relevant evidence when responding to misuse, fraud, policy violations, or suspected unlawful behavior.",
  },
  {
    title: "9. Policy Updates and Contact Path",
    body: "If this privacy policy changes in a material way, we may update the published policy and provide notice through the app, website, email, or other account messaging channels. Users with privacy-related questions, account requests, or legal concerns should contact the Tamkko support or compliance channel designated by the platform.",
  },
];
