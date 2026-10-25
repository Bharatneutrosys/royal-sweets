import Link from "next/link";
import { requireAdmin } from "@/lib/admin/auth";

export const dynamic = "force-dynamic";
import { logoutAction } from "@/lib/admin/actions";
import { Container } from "@/components/shared/Container";

const links = [
  ["Dashboard", "/admin"],
  ["Products", "/admin/products"],
  ["Categories", "/admin/categories"],
  ["Today's Specials", "/admin/specials"],
  ["Promotions", "/admin/promotions"],
  ["Homepage", "/admin/homepage"],
] as const;

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();
  return (
    <main id="main-content" tabIndex={-1} className="bg-background">
      <Container className="grid gap-8 py-8 lg:grid-cols-[14rem_minmax(0,1fr)] lg:py-12">
        <aside className="min-w-0">
          <p className="font-display text-card text-primary">Royal Admin</p>
          <nav
            aria-label="Admin navigation"
            className="mt-4 flex flex-wrap gap-2 lg:flex-col"
          >
            {links.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="inline-flex min-h-11 items-center rounded-control border border-border bg-surface px-4 text-sm font-semibold text-primary no-underline hover:bg-secondary"
              >
                {label}
              </Link>
            ))}
          </nav>
          <form action={logoutAction} className="mt-5">
            <button
              type="submit"
              className="min-h-11 text-sm font-semibold text-primary underline"
            >
              Sign out
            </button>
          </form>
        </aside>
        <div className="min-w-0">{children}</div>
      </Container>
    </main>
  );
}
