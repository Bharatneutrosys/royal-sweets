import { requireAdmin } from "@/lib/admin/auth";
import {
  savePromotionAction,
  deletePromotionAction,
} from "@/lib/admin/contentActions";
import { chicagoInput } from "@/lib/admin/validation";
import { ContentImageForm } from "@/components/admin/ContentImageForm";
import { imageUrl } from "@/lib/supabase/catalog";

type PromotionRow = {
  id: string;
  title: string;
  description: string;
  image_path: string | null;
  image_alt: string | null;
  discount_type: "percent" | "amount" | null;
  discount_value: number | null;
  starts_at: string | null;
  ends_at: string | null;
  is_published: boolean;
  display_order: number;
};

function PromotionForm({ promotion }: { promotion?: PromotionRow }) {
  return (
    <form
      action={savePromotionAction}
      className="surface-panel grid gap-3 p-5 sm:grid-cols-2"
    >
      {promotion && <input type="hidden" name="id" value={promotion.id} />}
      <label className="grid gap-1 sm:col-span-2">
        Title
        <input
          name="title"
          required
          maxLength={140}
          defaultValue={promotion?.title}
          className="min-h-11 rounded-control border border-border px-3"
        />
      </label>
      <label className="grid gap-1 sm:col-span-2">
        Description
        <textarea
          name="description"
          maxLength={1200}
          rows={3}
          defaultValue={promotion?.description}
          className="rounded-control border border-border p-3"
        />
      </label>
      <label className="grid gap-1">
        Starts (Chicago time)
        <input
          name="starts_at"
          type="datetime-local"
          defaultValue={chicagoInput(promotion?.starts_at ?? null)}
          className="min-h-11 rounded-control border border-border px-3"
        />
      </label>
      <label className="grid gap-1">
        Ends (Chicago time)
        <input
          name="ends_at"
          type="datetime-local"
          defaultValue={chicagoInput(promotion?.ends_at ?? null)}
          className="min-h-11 rounded-control border border-border px-3"
        />
      </label>
      <label className="grid gap-1">
        Discount type (future checkout metadata)
        <select
          name="discount_type"
          defaultValue={promotion?.discount_type ?? ""}
          className="min-h-11 rounded-control border border-border px-3"
        >
          <option value="">None</option>
          <option value="percent">Percent</option>
          <option value="amount">Amount in cents</option>
        </select>
      </label>
      <label className="grid gap-1">
        Discount value
        <input
          name="discount_value"
          type="number"
          min={1}
          defaultValue={promotion?.discount_value ?? ""}
          className="min-h-11 rounded-control border border-border px-3"
        />
      </label>
      <label className="grid gap-1">
        Display order
        <input
          name="display_order"
          type="number"
          min={0}
          defaultValue={promotion?.display_order ?? 1}
          className="min-h-11 rounded-control border border-border px-3"
        />
      </label>
      <label className="flex min-h-11 items-center gap-2">
        <input
          name="is_published"
          type="checkbox"
          defaultChecked={promotion?.is_published ?? false}
        />{" "}
        Published
      </label>
      <p className="text-xs text-muted sm:col-span-2">
        Discount metadata is stored for future checkout and is not automatically
        applied or shown as a customer price.
      </p>
      <button
        type="submit"
        className="min-h-11 rounded-control bg-primary px-5 font-semibold text-on-primary sm:col-span-2"
      >
        {promotion ? "Save promotion" : "Add promotion"}
      </button>
    </form>
  );
}

export default async function PromotionsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; status?: string }>;
}) {
  const [{ supabase }, message] = await Promise.all([
    requireAdmin(),
    searchParams,
  ]);
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .order("display_order");
  if (error) throw new Error("Could not load promotions");
  const promotions = data as PromotionRow[];
  const urls = new Map(
    await Promise.all(
      promotions.map(
        async (item) =>
          [item.id, await imageUrl(item.image_path, supabase)] as const,
      ),
    ),
  );
  return (
    <>
      <h1 className="font-display text-page text-primary">Promotions</h1>
      <p className="mt-2 text-muted">
        Publish scheduled announcements without changing website code. Expired
        offers disappear automatically.
      </p>
      {message.error && (
        <p role="alert" className="mt-4 text-error">
          Promotion could not be saved. Check fields and schedule.
        </p>
      )}
      {message.status && (
        <p role="status" className="mt-4 text-success">
          Promotion change saved.
        </p>
      )}
      <h2 className="mt-8 font-display text-card text-primary">
        New promotion
      </h2>
      <div className="mt-4">
        <PromotionForm />
      </div>
      <h2 className="mt-10 font-display text-card text-primary">
        Existing promotions
      </h2>
      {promotions.length === 0 && (
        <p className="mt-3 text-muted">No promotions configured.</p>
      )}
      <div className="mt-4 space-y-6">
        {promotions.map((item) => (
          <section key={item.id}>
            <h3 className="mb-2 font-semibold">{item.title}</h3>
            <PromotionForm promotion={item} />
            <div className="surface-panel px-5 pb-5">
              <ContentImageForm
                kind="promotion"
                id={item.id}
                imageUrl={urls.get(item.id) ?? null}
                imageAlt={item.image_alt}
              />
            </div>
            <details className="mt-2">
              <summary className="cursor-pointer text-sm text-error">
                Delete promotion
              </summary>
              <form action={deletePromotionAction} className="mt-2 flex gap-3">
                <input type="hidden" name="id" value={item.id} />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="confirm"
                    value="DELETE"
                    required
                  />{" "}
                  Confirm
                </label>
                <button type="submit" className="min-h-11 text-error underline">
                  Delete
                </button>
              </form>
            </details>
          </section>
        ))}
      </div>
    </>
  );
}
