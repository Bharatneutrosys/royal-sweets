import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";

export const metadata: Metadata = {
  title: "Cart coming soon | Royal Sweets",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <Container narrow className="py-20">
        <h1 className="font-display text-page text-primary">
          Cart coming soon
        </h1>
        <p className="mt-5 text-muted">
          Online ordering is not available yet. Browse the menu or call the
          restaurant for current information.
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
