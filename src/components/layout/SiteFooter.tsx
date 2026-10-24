import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { Container } from "@/components/shared/Container";
import { business, mapsDirectionsUrl } from "@/lib/business";
import { menuCategories, siteLinks } from "@/lib/siteNavigation";

const informationLinks = siteLinks
  .filter(
    ({ href }) =>
      href === "/about" || href === "/catering" || href === "/contact",
  )
  .sort((first, second) => first.label.localeCompare(second.label));

const footerLinkClasses =
  "inline-flex min-h-11 items-center rounded-control text-sm leading-snug text-on-primary/85 no-underline transition-colors duration-[var(--duration-fast)] hover:text-on-primary";

export function SiteFooter() {
  return (
    <footer className="site-footer bg-primary text-on-primary">
      <Container>
        <div className="grid gap-x-10 gap-y-10 py-14 md:grid-cols-2 md:gap-y-14 md:py-18 lg:grid-cols-[1.25fr_1.25fr_0.85fr_1.3fr] lg:gap-x-12 lg:py-20">
          <div>
            <BrandLogo inverse />
            <p className="mt-6 max-w-xs text-supporting leading-relaxed text-on-primary/85">
              {business.description}
            </p>
            {business.socialLinks.length > 0 && (
              <nav aria-label="Social media" className="mt-6">
                <ul className="flex flex-wrap gap-x-5 gap-y-1">
                  {business.socialLinks.map(({ platform, label, href }) => (
                    <li key={platform}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={footerLinkClasses}
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          <nav aria-labelledby="footer-explore-heading">
            <h2
              id="footer-explore-heading"
              className="font-display text-xl text-on-primary"
            >
              Explore
            </h2>
            <span
              aria-hidden="true"
              className="mt-3 block h-px w-10 bg-antique-gold"
            />
            <ul className="mt-4">
              <li>
                <Link href={siteLinks[0].href} className={footerLinkClasses}>
                  {siteLinks[0].label}
                </Link>
              </li>
              {menuCategories.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={footerLinkClasses}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-information-heading">
            <h2
              id="footer-information-heading"
              className="font-display text-xl text-on-primary"
            >
              Information
            </h2>
            <span
              aria-hidden="true"
              className="mt-3 block h-px w-10 bg-antique-gold"
            />
            <ul className="mt-4">
              {informationLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={footerLinkClasses}>
                    {href === "/contact" ? "Contact Us" : label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={business.orderingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Order Online (opens in a new tab)"
                  className={footerLinkClasses}
                >
                  Order Online
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <h2 className="font-display text-xl text-on-primary">
              Visit &amp; Contact
            </h2>
            <span
              aria-hidden="true"
              className="mt-3 block h-px w-10 bg-antique-gold"
            />
            <address className="mt-5 not-italic">
              <p className="mb-2 text-sm font-semibold text-on-primary">
                {business.name}
              </p>
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Get directions to ${business.name}, ${business.address.street}, ${business.address.city}, ${business.address.state} ${business.address.postalCode} (opens in a new tab)`}
                className="inline-flex min-h-11 items-start gap-3 rounded-control text-sm leading-relaxed text-on-primary/85 no-underline transition-colors duration-[var(--duration-fast)] hover:text-on-primary"
              >
                <MapPin
                  aria-hidden="true"
                  size={18}
                  strokeWidth={1.75}
                  className="mt-1 shrink-0"
                />
                <span>
                  {business.address.street}
                  <br />
                  {business.address.city}, {business.address.state}{" "}
                  {business.address.postalCode}
                  <br />
                  {business.address.country}
                </span>
              </a>
              <a
                href={business.phone.href}
                aria-label={`Call ${business.name} at ${business.phone.display}`}
                className="mt-3 inline-flex min-h-11 items-center gap-3 rounded-control text-sm text-on-primary/85 no-underline transition-colors duration-[var(--duration-fast)] hover:text-on-primary"
              >
                <Phone aria-hidden="true" size={18} strokeWidth={1.75} />
                {business.phone.display}
              </a>
            </address>
            <div className="mt-7 border-t border-on-primary/20 pt-5">
              <h3 className="font-body text-sm font-semibold text-on-primary">
                Hours
              </h3>
              {business.hours.status === "confirmed" ? (
                <dl className="mt-2 space-y-1 text-sm text-on-primary/85">
                  {business.hours.schedule.map(({ day, hours }) => (
                    <div key={day} className="flex justify-between gap-4">
                      <dt>{day}</dt>
                      <dd>{hours}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="mt-2 text-sm text-on-primary/85">
                  Call for current hours:{" "}
                  <a href={business.phone.href} className={footerLinkClasses}>
                    {business.phone.display}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="border-t border-on-primary/20 py-6 text-sm text-on-primary/80">
          <p>
            © {new Date().getFullYear()} {business.name}. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
