import { requireAdmin } from "@/lib/admin/auth";
import { adminCatalog } from "@/lib/admin/data";
import {
  saveSpecialAction,
  deleteSpecialAction,
} from "@/lib/admin/contentActions";
import { chicagoInput } from "@/lib/admin/validation";

type Special = {
  id: string;
  product_id: string;
  promotional_message: string | null;
  starts_at: string | null;
  ends_at: string | null;
  is_published: boolean;
  display_order: number;
};

function SpecialForm({
  special,
  products,
}: {
  special?: Special;
  products: { id: string; name: string }[];
}) {
  return (
    <form
      action={saveSpecialAction}
      className="surface-panel grid gap-3 p-5 sm:grid-cols-2"
    >
      {special && <input type="hidden" name="id" value={special.id} />}
      <label className="grid gap-1 sm:col-span-2">
        Product
        <select
          name="product_id"
          required
          defaultValue={special?.product_id ?? ""}
          className="min-h-11 rounded-control border border-border px-3"
        >
          <option value="" disabled>
            Select product
          </option>
          {products.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 sm:col-span-2">
        Message
        <input
          name="promotional_message"
          maxLength={300}
          defaultValue={special?.promotional_message ?? ""}
          className="min-h-11 rounded-control border border-border px-3"
        />
      </label>
      <label className="grid gap-1">
        Starts (Chicago time)
        <input
          name="starts_at"
          type="datetime-local"
          defaultValue={chicagoInput(special?.starts_at ?? null)}
          className="min-h-11 rounded-control border border-border px-3"
        />
      </label>
      <label className="grid gap-1">
        Ends (Chicago time)
        <input
          name="ends_at"
          type="datetime-local"
          defaultValue={chicagoInput(special?.ends_at ?? null)}
          className="min-h-11 rounded-control border border-border px-3"
        />
      </label>
      <label className="grid gap-1">
        Display order
        <input
          name="display_order"
          type="number"
          min={0}
          defaultValue={special?.display_order ?? 1}
          className="min-h-11 rounded-control border border-border px-3"
        />
      </label>
      <label className="flex min-h-11 items-center gap-2">
        <input
          name="is_published"
          type="checkbox"
          defaultChecked={special?.is_published ?? false}
        />{" "}
        Published
      </label>
      <button
        type="submit"
        className="min-h-11 rounded-control bg-primary px-5 font-semibold text-on-primary sm:col-span-2"
      >
        {special ? "Save special" : "Add special"}
      </button>
    </form>
  );
}

export default async function SpecialsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; status?: string }>;
}) {
  const [{ products }, { supabase }, message] = await Promise.all([
    adminCatalog(),
    requireAdmin(),
    searchParams,
  ]);
  const { data, error } = await supabase
    .from("todays_specials")
    .select("*")
    .order("display_order");
  if (error) throw new Error("Could not load specials");
  const specials = data as Special[];
  return (
    <>
      <h1 className="font-display text-page text-primary">
        Today&apos;s Specials
      </h1>
      <p className="mt-2 text-muted">
        Choose an existing product. Published specials appear only within their
        schedule and while the homepage section is visible. Times use
        America/Chicago; ambiguous daylight-saving times are rejected.
      </p>
      {message.error && (
        <p role="alert" className="mt-4 text-error">
          Special could not be saved. Check the product and schedule.
        </p>
      )}
      {message.status && (
        <p role="status" className="mt-4 text-success">
          Special change saved.
        </p>
      )}
      <h2 className="mt-8 font-display text-card text-primary">Add special</h2>
      <div className="mt-4">
        <SpecialForm products={products} />
      </div>
      <h2 className="mt-10 font-display text-card text-primary">
        Existing specials
      </h2>
      {specials.length === 0 && (
        <p className="mt-3 text-muted">No specials configured.</p>
      )}
      <div className="mt-4 space-y-5">
        {specials.map((item) => (
          <section key={item.id}>
            <h3 className="mb-2 font-semibold">
              {products.find((product) => product.id === item.product_id)
                ?.name ?? "Unavailable product"}
            </h3>
            <SpecialForm special={item} products={products} />
            <details className="mt-2">
              <summary className="cursor-pointer text-sm text-error">
                Delete special
              </summary>
              <form action={deleteSpecialAction} className="mt-2 flex gap-3">
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
