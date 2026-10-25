import Link from "next/link";
import { adminCatalog } from "@/lib/admin/data";
import { requireAdmin } from "@/lib/admin/auth";

const actions = [
  ["Add Product", "/admin/products/new"],
  ["Manage Products", "/admin/products"],
  ["Manage Categories", "/admin/categories"],
  ["Today's Specials", "/admin/specials"],
  ["Promotions", "/admin/promotions"],
  ["Homepage Editor", "/admin/homepage"],
] as const;

export default async function AdminDashboard() {
  const [{ categories, products }, { supabase }] = await Promise.all([
    adminCatalog(),
    requireAdmin(),
  ]);
  const [specialsResult, promotionsResult] = await Promise.all([
    supabase
      .from("todays_specials")
      .select("id,starts_at,ends_at,is_published"),
    supabase.from("promotions").select("id,starts_at,ends_at,is_published"),
  ]);
  if (specialsResult.error || promotionsResult.error)
    throw new Error("Dashboard metrics unavailable");
  const isActive = (
    row: {
      is_published: boolean;
      starts_at: string | null;
      ends_at: string | null;
    },
    now: number,
  ) =>
    row.is_published &&
    (!row.starts_at || Date.parse(row.starts_at) <= now) &&
    (!row.ends_at || Date.parse(row.ends_at) > now);
  const now = new Date().getTime();
  const metrics = [
    ["Total products", products.length],
    [
      "Active categories",
      categories.filter((row) => row.is_active && !row.parent_id).length,
    ],
    ["Published products", products.filter((row) => row.is_published).length],
    [
      "Out of stock",
      products.filter((row) => row.stock_status === "out-of-stock").length,
    ],
    [
      "Current specials",
      (specialsResult.data ?? []).filter((row) => isActive(row, now)).length,
    ],
    [
      "Active promotions",
      (promotionsResult.data ?? []).filter((row) => isActive(row, now)).length,
    ],
  ] as const;
  return (
    <>
      <h1 className="font-display text-page text-primary">Dashboard</h1>
      <p className="mt-2 text-muted">Live business content overview.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map(([label, value]) => (
          <div key={label} className="surface-panel p-5">
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-2 font-display text-4xl text-primary">{value}</p>
          </div>
        ))}
      </div>
      <h2 className="mt-10 font-display text-card text-primary">
        Quick actions
      </h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {actions.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className="inline-flex min-h-11 items-center rounded-control border border-border bg-surface px-4 font-semibold text-primary no-underline hover:bg-secondary"
          >
            {label}
          </Link>
        ))}
      </div>
    </>
  );
}
