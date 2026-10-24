import { classNames } from "@/lib/classNames";

export function navigationItemClasses(active: boolean) {
  return classNames(
    "inline-flex min-h-11 items-center gap-1.5 border-b font-body text-sm font-semibold no-underline",
    "transition-colors duration-[var(--duration-fast)] ease-[var(--ease-standard)]",
    active
      ? "border-antique-gold text-primary"
      : "border-transparent text-foreground hover:border-antique-gold hover:text-primary",
  );
}
