"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    href: "/terms-and-conditions",
    label: "Terms & Conditions",
  },
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
  },
];

export default function LegalNavbar() {
  const pathname = usePathname();

  return (
    <nav className="scaffold-links">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            className={`scaffold-link${isActive ? " scaffold-link-active" : ""}`}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
