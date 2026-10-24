import type { ComponentPropsWithRef, ReactNode } from "react";
import { classNames } from "@/lib/classNames";

type BadgeVariant =
  | "default"
  | "featured"
  | "bestseller"
  | "success"
  | "warning"
  | "unavailable"
  | "neutral";

export type BadgeProps = Omit<ComponentPropsWithRef<"span">, "children"> & {
  variant?: BadgeVariant;
  size?: "sm" | "md";
  shape?: "soft" | "pill";
  icon?: ReactNode;
  children: ReactNode;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "border-border bg-secondary text-secondary-foreground",
  featured: "border-primary bg-primary text-on-primary",
  bestseller: "border-antique-gold bg-surface text-primary",
  success: "border-success/25 bg-surface-muted text-success",
  warning: "border-warning/25 bg-surface-muted text-warning",
  unavailable: "border-disabled bg-disabled text-disabled-foreground",
  neutral: "border-border bg-surface-muted text-muted",
};

export function Badge({
  variant = "default",
  size = "md",
  shape = "soft",
  icon,
  className,
  children,
  ...badgeProps
}: BadgeProps) {
  return (
    <span
      {...badgeProps}
      className={classNames(
        "inline-flex items-center gap-1.5 border font-body font-semibold whitespace-nowrap",
        size === "sm" ? "px-2 py-0.5 text-caption" : "px-2.5 py-1 text-label",
        shape === "pill" ? "rounded-full" : "rounded-control",
        variantClasses[variant],
        className,
      )}
    >
      {icon && (
        <span aria-hidden="true" className="inline-flex shrink-0 items-center">
          {icon}
        </span>
      )}
      {children}
    </span>
  );
}
