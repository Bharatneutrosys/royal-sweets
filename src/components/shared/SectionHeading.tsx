import { classNames } from "@/lib/classNames";

export type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  level?: 2 | 3 | 4;
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  level = 2,
  id,
  className,
}: SectionHeadingProps) {
  const Heading = level === 3 ? "h3" : level === 4 ? "h4" : "h2";

  return (
    <div
      className={classNames(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 font-body text-label font-semibold tracking-[0.18em] text-primary uppercase">
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className="font-display text-section font-semibold text-foreground"
      >
        {title}
      </Heading>
      {description && (
        <p className="mt-4 font-body text-supporting text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
