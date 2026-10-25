import "server-only";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseConfig } from "@/lib/supabase/config";

export async function getAdmin() {
  if (!supabaseConfig()) return null;
  const supabase = await createSupabaseServerClient();
  const { data: claims, error } = await supabase.auth.getClaims();
  const userId = claims?.claims?.sub;
  if (error || !userId) return null;
  const { data: membership, error: roleError } = await supabase
    .from("admin_users")
    .select("user_id,role,is_active")
    .eq("user_id", userId)
    .eq("role", "admin")
    .eq("is_active", true)
    .maybeSingle();
  if (roleError || !membership) return null;
  return { userId, supabase };
}

export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) redirect("/admin/login");
  return admin;
}

export async function assertAdmin() {
  const admin = await getAdmin();
  if (!admin) throw new Error("Administrator authorization required");
  return admin;
}
