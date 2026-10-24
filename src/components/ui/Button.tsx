import type { ComponentProps, ComponentPropsWithRef, ReactNode } from "react";
import Link from "next/link";
import { classNames } from "@/lib/classNames";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

type ButtonVisualProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
};

export type ButtonProps = Omit<ComponentPropsWithRef<"button">, "children"> &
  ButtonVisualProps & {
    children: ReactNode;
    loading?: boolean;
  };

export type ButtonLinkProps = Omit<
  ComponentProps<typeof Link>,
  "children" | "className"
> &
  ButtonVisualProps & {
    children: ReactNode;
    className?: string;
  };

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-primary bg-primary text-on-primary hover:border-primary-hover hover:bg-primary-hover",
  secondary:
    "border-border bg-secondary text-secondary-foreground hover:bg-surface-muted",
  outline: "border-primary bg-transparent text-primary hover:bg-secondary",
  ghost: "border-transparent bg-transparent text-primary hover:bg-secondary",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "min-h-11 px-4 py-2",
  md: "min-h-12 px-5 py-2.5",
  lg: "min-h-14 px-7 py-3 text-base",
};

function buttonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  fullWidth: boolean,
  className?: string,
) {
  return classNames(
    "ui-button inline-flex items-center justify-center gap-2 rounded-control border font-body text-button font-semibold tracking-[0.02em]",
    "focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-focus",
    "disabled:cursor-not-allowed disabled:border-disabled disabled:bg-disabled disabled:text-disabled-foreground disabled:shadow-none",
    variantClasses[variant],
    sizeClasses[size],
    fullWidth && "w-full",
    className,
  );
}

function ButtonIcon({ children }: { children: ReactNode }) {
  return (
    <span aria-hidden="true" className="inline-flex shrink-0 items-center">
      {children}
    </span>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  loading = false,
  disabled,
  className,
  children,
  type = "button",
  ...buttonProps
}: ButtonProps) {
  return (
    <button
      {...buttonProps}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={buttonClasses(variant, size, fullWidth, className)}
    >
      {loading ? (
        <span
          aria-hidden="true"
          className="size-4 shrink-0 animate-spin rounded-full border-2 border-current border-r-transparent"
        />
      ) : (
        leadingIcon && <ButtonIcon>{leadingIcon}</ButtonIcon>
      )}
      {children}
      {trailingIcon && <ButtonIcon>{trailingIcon}</ButtonIcon>}
    </button>
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  fullWidth = false,
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...linkProps
}: ButtonLinkProps) {
  return (
    <Link
      {...linkProps}
      className={classNames(
        "button-link",
        buttonClasses(variant, size, fullWidth, className),
      )}
    >
      {leadingIcon && <ButtonIcon>{leadingIcon}</ButtonIcon>}
      {children}
      {trailingIcon && <ButtonIcon>{trailingIcon}</ButtonIcon>}
    </Link>
  );
}
