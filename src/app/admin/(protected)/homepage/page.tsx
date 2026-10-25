import { requireAdmin } from "@/lib/admin/auth";
import { saveHomepageSectionAction } from "@/lib/admin/contentActions";
import { ContentImageForm } from "@/components/admin/ContentImageForm";
import { imageUrl } from "@/lib/supabase/catalog";

type SectionRow = {
  id: string;
  section_key: string;
  section_type: "hero" | "categories" | "specials" | "offers" | "visit";
  heading: string;
  eyebrow: string | null;
  subheading: string | null;
  description: string | null;
  image_path: string | null;
  image_alt: string | null;
  is_visible: boolean;
  display_order: number;
};

export default async function HomepageEditor({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; status?: string }>;
}) {
  const [{ supabase }, message] = await Promise.all([
    requireAdmin(),
    searchParams,
  ]);
  const { data, error } = await supabase
    .from("homepage_sections")
    .select("*")
    .order("display_order");
  if (error) throw new Error("Could not load homepage sections");
  const sections = data as SectionRow[];
  const urls = new Map(
    await Promise.all(
      sections.map(
        async (item) =>
          [item.id, await imageUrl(item.image_path, supabase)] as const,
      ),
    ),
  );
  return (
    <>
      <h1 className="font-display text-page text-primary">Homepage Editor</h1>
      <p className="mt-2 text-muted">
        Edit approved section templates, change their order, or hide them
        without losing copy. Specials and offers also require a published active
        item before appearing.
      </p>
      {message.error && (
        <p role="alert" className="mt-4 text-error">
          Homepage change failed. Check text length and try again.
        </p>
      )}
      {message.status && (
        <p role="status" className="mt-4 text-success">
          Homepage change saved.
        </p>
      )}
      <div className="mt-8 space-y-6">
        {sections.map((item) => (
          <section key={item.id} className="surface-panel p-5 sm:p-7">
            <h2 className="font-display text-card text-primary">
              {item.section_type === "hero"
                ? "Heritage Hero"
                : item.section_type === "categories"
                  ? "Menu Discovery"
                  : item.section_type === "specials"
                    ? "Today's Specials"
                    : item.section_type === "offers"
                      ? "Promotional Offers"
                      : "Visit Us"}
            </h2>
            <p className="mt-1 text-xs text-muted">
              Template: {item.section_key}
            </p>
            <form
              action={saveHomepageSectionAction}
              className="mt-5 grid gap-3 sm:grid-cols-2"
            >
              <input type="hidden" name="id" value={item.id} />
              <label className="grid gap-1 sm:col-span-2">
                Heading
                <input
                  name="heading"
                  maxLength={180}
                  defaultValue={item.heading}
                  className="min-h-11 rounded-control border border-border px-3"
                />
              </label>
              <label className="grid gap-1 sm:col-span-2">
                Eyebrow / heritage message
                <input
                  name="eyebrow"
                  maxLength={180}
                  defaultValue={item.eyebrow ?? ""}
                  className="min-h-11 rounded-control border border-border px-3"
                />
              </label>
              <label className="grid gap-1 sm:col-span-2">
                Subheading / introductory text
                <textarea
                  name="subheading"
                  rows={2}
                  maxLength={400}
                  defaultValue={item.subheading ?? ""}
                  className="rounded-control border border-border p-3"
                />
              </label>
              <label className="grid gap-1 sm:col-span-2">
                Description
                <textarea
                  name="description"
                  rows={3}
                  maxLength={1500}
                  defaultValue={item.description ?? ""}
                  className="rounded-control border border-border p-3"
                />
              </label>
              <label className="grid gap-1">
                Display order
                <input
                  name="display_order"
                  type="number"
                  min={0}
                  defaultValue={item.display_order}
                  className="min-h-11 rounded-control border border-border px-3"
                />
              </label>
              <label className="flex min-h-11 items-center gap-2">
                <input
                  name="is_visible"
                  type="checkbox"
                  defaultChecked={item.is_visible}
                />{" "}
                Visible on homepage
              </label>
              <button
                type="submit"
                className="min-h-11 rounded-control bg-primary px-5 font-semibold text-on-primary sm:col-span-2"
              >
                Save section
              </button>
            </form>
            <ContentImageForm
              kind="homepage"
              id={item.id}
              imageUrl={urls.get(item.id) ?? null}
              imageAlt={item.image_alt}
            />
          </section>
        ))}
      </div>
    </>
  );
}
