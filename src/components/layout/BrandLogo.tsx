import Link from "next/link";
import { business } from "@/lib/business";
import { classNames } from "@/lib/classNames";

export function BrandLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link
      id={inverse ? undefined : "site-brand-link"}
      href="/"
      aria-label={`${business.name}, home`}
      className="inline-flex min-w-0 items-center gap-2 no-underline sm:gap-3"
    >
      <span aria-hidden="true" className="h-10 w-px shrink-0 bg-antique-gold" />
      <span className="flex min-w-0 flex-col">
        <span
          className={classNames(
            "font-display text-lg leading-none font-semibold whitespace-nowrap sm:text-xl lg:text-2xl",
            inverse ? "text-on-primary" : "text-primary",
          )}
        >
          Royal Sweets
        </span>
        <span
          className={classNames(
            "mt-1 font-body text-[0.625rem] leading-none font-bold tracking-[0.2em] whitespace-nowrap uppercase",
            inverse ? "text-on-primary" : "text-primary",
          )}
        >
          &amp; Fast Food
        </span>
      </span>
    </Link>
  );
}
