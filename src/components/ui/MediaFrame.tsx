import Image, { type ImageProps } from "next/image";
import { classNames } from "@/lib/classNames";

type MediaAspect = "square" | "portrait" | "landscape" | "wide";

type MediaContent =
  | { src: ImageProps["src"]; alt: string; decorative?: false }
  | { src: ImageProps["src"]; decorative: true; alt?: never }
  | { src?: undefined; alt?: never; decorative?: never };

export type MediaFrameProps = MediaContent & {
  aspect?: MediaAspect;
  fit?: "cover" | "contain";
  sizes?: ImageProps["sizes"];
  className?: string;
};

const aspectClasses: Record<MediaAspect, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  wide: "aspect-video",
};

export function MediaFrame({
  src,
  alt,
  decorative,
  aspect = "square",
  fit = "cover",
  sizes = "(max-width: 640px) 100vw, 50vw",
  className,
}: MediaFrameProps) {
  return (
    <div
      className={classNames(
        "media-frame relative w-full border border-border",
        aspectClasses[aspect],
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={decorative ? "" : (alt ?? "")}
          aria-hidden={decorative || undefined}
          fill
          sizes={sizes}
          className={fit === "contain" ? "object-contain" : "object-cover"}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 grid place-items-center"
        >
          <span className="size-12 rotate-45 border border-antique-gold/70" />
        </div>
      )}
    </div>
  );
}
