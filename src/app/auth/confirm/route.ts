import { NextResponse, type NextRequest } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseConfig } from "@/lib/supabase/config";

export async function GET(request: NextRequest) {
  const tokenHash = request.nextUrl.searchParams.get("token_hash");
  const type = request.nextUrl.searchParams.get("type");
  const destination = new URL("/admin/login?error=reset-failed", request.url);
  if (!supabaseConfig() || !tokenHash || type !== "recovery")
    return NextResponse.redirect(destination);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.verifyOtp({
    token_hash: tokenHash,
    type: "recovery",
  });
  if (error) return NextResponse.redirect(destination);
  return NextResponse.redirect(new URL("/admin/reset-password", request.url));
}
