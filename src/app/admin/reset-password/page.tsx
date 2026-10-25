import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Container } from "@/components/shared/Container";
import { getAdmin } from "@/lib/admin/auth";
import { updatePasswordAction } from "@/lib/admin/actions";

export const metadata: Metadata = {
  title: "Reset admin password",
  robots: { index: false, follow: false },
};

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (!(await getAdmin())) redirect("/admin/login");
  const { error } = await searchParams;
  return (
    <main id="main-content" tabIndex={-1}>
      <Container narrow className="py-16">
        <h1 className="font-display text-page text-primary">
          Set a new password
        </h1>
        <p className="mt-3 text-muted">Use at least 12 characters.</p>
        {error && (
          <p role="alert" className="mt-4 text-error">
            The password could not be updated. Check its length and try again.
          </p>
        )}
        <form
          action={updatePasswordAction}
          className="mt-7 grid max-w-md gap-4"
        >
          <label htmlFor="new-password" className="font-semibold">
            New password
          </label>
          <input
            id="new-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={12}
            maxLength={200}
            className="min-h-12 rounded-control border border-border bg-surface px-4"
          />
          <button
            type="submit"
            className="min-h-12 rounded-control bg-primary px-5 font-semibold text-on-primary"
          >
            Update password
          </button>
        </form>
      </Container>
    </main>
  );
}
