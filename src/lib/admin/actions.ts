"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseConfig } from "@/lib/supabase/config";
import { getAdmin } from "@/lib/admin/auth";

const loginSchema = z.object({
  email: z.email().max(254),
  password: z.string().min(1).max(200),
});

export async function loginAction(formData: FormData) {
  if (!supabaseConfig()) redirect("/admin/login?error=setup");
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) redirect("/admin/login?error=invalid");
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(parsed.data);
  if (error) redirect("/admin/login?error=invalid");
  if (!(await getAdmin())) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }
  redirect("/admin");
}

export async function logoutAction() {
  if (supabaseConfig()) {
    const supabase = await createSupabaseServerClient();
    await supabase.auth.signOut();
  }
  redirect("/admin/login");
}

export async function requestResetAction(formData: FormData) {
  if (!supabaseConfig()) redirect("/admin/login?error=setup");
  const parsed = z.email().max(254).safeParse(formData.get("email"));
  if (!parsed.success) redirect("/admin/login?error=invalid");
  const origin = process.env.NEXT_PUBLIC_SITE_URL;
  if (!origin) redirect("/admin/login?error=reset-setup");
  const redirectTo = new URL("/auth/confirm", origin).toString();
  const supabase = await createSupabaseServerClient();
  await supabase.auth.resetPasswordForEmail(parsed.data, { redirectTo });
  // Same response regardless of account existence.
  redirect("/admin/login?status=reset-requested");
}

export async function updatePasswordAction(formData: FormData) {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login?error=unauthorized");
  const parsed = z
    .string()
    .min(12)
    .max(200)
    .safeParse(formData.get("password"));
  if (!parsed.success) redirect("/admin/reset-password?error=invalid");
  const { error } = await admin.supabase.auth.updateUser({
    password: parsed.data,
  });
  if (error) redirect("/admin/reset-password?error=failed");
  redirect("/admin?status=password-updated");
}
