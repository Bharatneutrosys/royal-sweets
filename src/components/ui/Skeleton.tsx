import { classNames } from "@/lib/classNames";

export type SkeletonProps = {
  variant?: "text" | "image" | "card";
  lines?: number;
  className?: string;
};

export function Skeleton({
  variant = "text",
  lines = 3,
  className,
}: SkeletonProps) {
  const visibleLines = Math.max(1, Math.min(lines, 6));

  if (variant === "image") {
    return (
      <div
        aria-hidden="true"
        className={classNames(
          "aspect-[4/5] w-full animate-pulse rounded-surface bg-surface-muted",
          className,
        )}
      />
    );
  }

  if (variant === "card") {
    return (
      <div
        aria-hidden="true"
        className={classNames(
          "animate-pulse space-y-4 rounded-surface border border-border bg-surface p-5",
          className,
        )}
      >
        <div className="aspect-[3/2] rounded-control bg-surface-muted" />
        <div className="h-4 w-2/3 rounded-control bg-surface-muted" />
        <div className="h-4 w-full rounded-control bg-surface-muted" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={classNames("space-y-2", className)}>
      {Array.from({ length: visibleLines }, (_, index) => (
        <div
          key={index}
          className={classNames(
            "h-4 animate-pulse rounded-control bg-surface-muted",
            index === visibleLines - 1 ? "w-3/4" : "w-full",
          )}
        />
      ))}
    </div>
  );
}
