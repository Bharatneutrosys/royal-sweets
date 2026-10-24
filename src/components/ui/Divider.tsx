import type { ComponentPropsWithRef } from "react";
import { classNames } from "@/lib/classNames";

export type DividerProps = ComponentPropsWithRef<"hr"> & {
  variant?: "standard" | "accent";
  decorative?: boolean;
};

export function Divider({
  variant = "standard",
  decorative = false,
  className,
  ...props
}: DividerProps) {
  return (
    <hr
      {...props}
      aria-hidden={decorative || undefined}
      className={classNames(
        variant === "accent"
          ? "h-px w-12 border-0 bg-antique-gold"
          : "w-full border-0 border-t border-solid border-border",
        className,
      )}
    />
  );
}
