import Image from "next/image";
import {
  uploadContentImageAction,
  removeContentImageAction,
} from "@/lib/admin/contentImageActions";

export function ContentImageForm({
  kind,
  id,
  imageUrl,
  imageAlt,
}: {
  kind: "category" | "homepage" | "promotion";
  id: string;
  imageUrl: string | null;
  imageAlt: string | null;
}) {
  return (
    <div className="mt-4 border-t border-border pt-4">
      <h3 className="font-semibold text-primary">Image</h3>
      {imageUrl && (
        <div className="relative mt-3 aspect-video max-w-sm overflow-hidden rounded-surface bg-secondary">
          <Image
            src={imageUrl}
            alt={imageAlt || "Current image"}
            fill
            unoptimized={imageUrl.startsWith("https://")}
            className="object-cover"
          />
        </div>
      )}
      <form
        action={uploadContentImageAction}
        className="mt-3 grid gap-3 sm:grid-cols-2"
      >
        <input type="hidden" name="kind" value={kind} />
        <input type="hidden" name="id" value={id} />
        <label className="grid gap-1 sm:col-span-2">
          Upload or replace
          <input
            type="file"
            name="image"
            accept="image/jpeg,image/png,image/webp"
            required
            className="min-h-11"
          />
        </label>
        <label className="grid gap-1 sm:col-span-2">
          Image alt text
          <input
            name="image_alt"
            required
            maxLength={240}
            defaultValue={imageAlt ?? ""}
            className="min-h-11 rounded-control border border-border px-3"
          />
        </label>
        <button
          type="submit"
          className="min-h-11 rounded-control border border-primary px-4 font-semibold text-primary sm:col-span-2"
        >
          Upload image
        </button>
      </form>
      {imageUrl && (
        <details className="mt-3">
          <summary className="cursor-pointer text-sm text-error">
            Remove image
          </summary>
          <form
            action={removeContentImageAction}
            className="mt-2 flex flex-wrap gap-3"
          >
            <input type="hidden" name="kind" value={kind} />
            <input type="hidden" name="id" value={id} />
            <label className="flex items-center gap-2">
              <input type="checkbox" name="confirm" value="REMOVE" required />{" "}
              Confirm removal
            </label>
            <button type="submit" className="min-h-11 text-error underline">
              Remove image
            </button>
          </form>
        </details>
      )}
    </div>
  );
}
