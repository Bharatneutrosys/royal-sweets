import Link from "next/link";

export function BrandLogo() {
  return (
    <Link
      id="site-brand-link"
      href="/"
      aria-label="Royal Sweets & Fast Food, home"
      className="inline-flex min-w-0 items-center gap-2 no-underline sm:gap-3"
    >
      <span aria-hidden="true" className="h-10 w-px shrink-0 bg-antique-gold" />
      <span className="flex min-w-0 flex-col">
        <span className="font-display text-lg leading-none font-semibold whitespace-nowrap text-primary sm:text-xl lg:text-2xl">
          Royal Sweets
        </span>
        <span className="mt-1 font-body text-[0.625rem] leading-none font-bold tracking-[0.2em] whitespace-nowrap text-primary uppercase">
          &amp; Fast Food
        </span>
      </span>
    </Link>
  );
}
