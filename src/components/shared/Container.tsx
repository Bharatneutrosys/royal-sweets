import type { ComponentPropsWithRef } from "react";
import { classNames } from "@/lib/classNames";

export type ContainerProps = ComponentPropsWithRef<"div"> & {
  narrow?: boolean;
};

export function Container({
  narrow = false,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      {...props}
      className={classNames("page-container", narrow && "max-w-3xl", className)}
    />
  );
}
