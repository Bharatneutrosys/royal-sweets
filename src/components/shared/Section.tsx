import type { ComponentPropsWithRef } from "react";
import { classNames } from "@/lib/classNames";

export type SectionProps = ComponentPropsWithRef<"section"> & {
  surface?: "default" | "sand" | "light";
};

const surfaceClasses = {
  default: "bg-background",
  sand: "bg-secondary",
  light: "bg-surface",
};

export function Section({
  surface = "default",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      {...props}
      className={classNames(
        "section-space",
        surfaceClasses[surface],
        className,
      )}
    />
  );
}
