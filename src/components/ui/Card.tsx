import type { ComponentPropsWithRef } from "react";
import { classNames } from "@/lib/classNames";

type CardVariant = "default" | "elevated" | "outlined";

export type CardProps = ComponentPropsWithRef<"div"> & {
  variant?: CardVariant;
  hoverable?: boolean;
};

export function Card({
  variant = "default",
  hoverable = false,
  className,
  ...cardProps
}: CardProps) {
  return (
    <div
      {...cardProps}
      className={classNames(
        "surface-panel",
        variant === "elevated" && "shadow-surface",
        variant === "outlined" && "border-primary/30 bg-transparent",
        hoverable && "interactive-surface hover:-translate-y-0.5",
        className,
      )}
    />
  );
}

export function CardHeader({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div {...props} className={classNames("space-y-2 px-6 pt-6", className)} />
  );
}

export function CardContent({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return <div {...props} className={classNames("px-6 py-5", className)} />;
}

export function CardFooter({
  className,
  ...props
}: ComponentPropsWithRef<"div">) {
  return (
    <div
      {...props}
      className={classNames(
        "flex flex-wrap items-center gap-3 px-6 pb-6",
        className,
      )}
    />
  );
}
