import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";

export const metadata: Metadata = {
  title: "Admin setup pending | Royal Sweets",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Container narrow className="py-20 sm:py-28">
        <p className="text-label font-bold tracking-[0.18em] text-primary uppercase">
          Administration
        </p>
        <h1 className="mt-4 font-display text-page text-primary">
          Secure admin setup pending
        </h1>
        <p className="mt-5 max-w-xl text-muted">
          The owner portal is not available yet. Authentication, administrator
          authorization, and persistent menu management will be implemented in
          the next sprint. There is no login form or account access on this
          page.
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-flex min-h-11 items-center font-semibold text-primary"
        >
          Back to menu
        </Link>
      </Container>
    </main>
  );
}
