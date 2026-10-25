import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { loginAction, requestResetAction } from "@/lib/admin/actions";
import { supabaseConfig } from "@/lib/supabase/config";

export const metadata: Metadata = {
  title: "Admin sign in | Royal Sweets",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; status?: string }>;
}) {
  const { error, status } = await searchParams;
  const configured = Boolean(supabaseConfig());
  return (
    <main id="main-content" tabIndex={-1}>
      <Container narrow className="py-20 sm:py-28">
        <p className="text-label font-bold tracking-[0.18em] text-primary uppercase">
          Administration
        </p>
        <h1 className="mt-4 font-display text-page text-primary">
          Admin sign in
        </h1>
        {!configured ? (
          <p
            role="status"
            className="mt-5 max-w-xl rounded-surface border border-border bg-secondary p-5 text-foreground"
          >
            Secure admin setup is required. Connect Supabase, apply the
            migration and seed, and authorize the first administrator before
            signing in. No administrative access is available in this state.
          </p>
        ) : (
          <>
            <p className="mt-4 text-muted">
              Authorized restaurant administrators only.
            </p>
            {error && (
              <p role="alert" className="mt-5 text-error">
                {error === "unauthorized"
                  ? "This account is not authorized to administer the website."
                  : error === "reset-setup"
                    ? "Password reset needs the site URL configuration."
                    : "Sign in or reset failed. Please check your details and try again."}
              </p>
            )}
            {status === "reset-requested" && (
              <p role="status" className="mt-5 text-success">
                If an authorized account exists, a password reset email will be
                sent.
              </p>
            )}
            <form action={loginAction} className="mt-8 grid max-w-md gap-3">
              <label htmlFor="admin-email" className="font-semibold">
                Email
              </label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                maxLength={254}
                className="min-h-12 rounded-control border border-border bg-surface px-4"
              />
              <label htmlFor="admin-password" className="mt-2 font-semibold">
                Password
              </label>
              <input
                id="admin-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="min-h-12 rounded-control border border-border bg-surface px-4"
              />
              <button
                type="submit"
                className="mt-3 min-h-12 rounded-control bg-primary px-5 font-semibold text-on-primary hover:bg-primary-hover"
              >
                Sign in
              </button>
            </form>
            <details className="mt-8 max-w-md">
              <summary className="cursor-pointer font-semibold text-primary">
                Reset password
              </summary>
              <form action={requestResetAction} className="mt-4 grid gap-3">
                <label htmlFor="reset-email">Account email</label>
                <input
                  id="reset-email"
                  name="email"
                  type="email"
                  required
                  maxLength={254}
                  className="min-h-12 rounded-control border border-border bg-surface px-4"
                />
                <button
                  type="submit"
                  className="min-h-12 rounded-control border border-primary px-5 font-semibold text-primary"
                >
                  Send reset email
                </button>
              </form>
            </details>
          </>
        )}
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
