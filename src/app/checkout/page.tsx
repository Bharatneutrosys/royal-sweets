import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";

export const metadata: Metadata = {
  title: "Checkout coming soon | Royal Sweets",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Container narrow className="py-20">
        <h1 className="font-display text-page text-primary">
          Checkout coming soon
        </h1>
        <p className="mt-5 text-muted">
          This website cannot accept orders or payments yet. Browse the menu or
          call the restaurant for current information.
        </p>
        <Link
          href="/menu"
          className="mt-8 inline-flex min-h-11 items-center font-semibold"
        >
          Explore menu
        </Link>
      </Container>
    </main>
  );
}
