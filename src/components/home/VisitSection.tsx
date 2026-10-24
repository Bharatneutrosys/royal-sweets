import { Clock3, MapPin, Phone } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ButtonLink } from "@/components/ui/Button";
import { business, mapsDirectionsUrl } from "@/lib/business";

export function VisitSection() {
  return (
    <Section aria-labelledby="visit-heading" surface="default">
      <Container className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-16">
        <div className="max-w-xl">
          <SectionHeading
            id="visit-heading"
            eyebrow="Visit Royal Sweets"
            title="Your Next Stop for Something Delicious"
            description="Visit Royal Sweets & Fast Food on W Belt Line Road in Richardson, Texas."
          />
        </div>

        <div className="min-w-0 rounded-surface border border-border bg-surface p-6 sm:p-8 lg:p-10">
          <p className="font-body text-label font-bold tracking-[0.18em] text-primary uppercase">
            Richardson, Texas
          </p>
          <span
            aria-hidden="true"
            className="mt-4 block h-px w-12 bg-antique-gold"
          />
          <h3 className="mt-6 font-display text-card font-semibold text-primary">
            {business.name}
          </h3>
          <address className="mt-7 space-y-5 not-italic">
            <div className="flex items-start gap-4">
              <MapPin
                aria-hidden="true"
                className="mt-1 size-5 shrink-0 text-primary"
                strokeWidth={1.75}
              />
              <p className="font-body text-supporting text-foreground">
                {business.address.street}
                <br />
                {business.address.city}, {business.address.state}{" "}
                {business.address.postalCode}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Phone
                aria-hidden="true"
                className="size-5 shrink-0 text-primary"
                strokeWidth={1.75}
              />
              <a
                href={business.phone.href}
                className="inline-flex min-h-11 items-center font-body text-supporting font-semibold text-primary"
              >
                {business.phone.display}
              </a>
            </div>
            <div className="flex items-start gap-4">
              <Clock3
                aria-hidden="true"
                className="mt-1 size-5 shrink-0 text-primary"
                strokeWidth={1.75}
              />
              {business.hours.status === "confirmed" ? (
                <dl className="space-y-1 font-body text-supporting text-muted">
                  {business.hours.schedule.map(({ day, hours }) => (
                    <div key={day} className="flex gap-3">
                      <dt className="min-w-20">{day}</dt>
                      <dd>{hours}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="font-body text-supporting text-muted">
                  Call for current hours
                </p>
              )}
            </div>
          </address>
          <ButtonLink
            href={mapsDirectionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            prefetch={false}
            aria-label={`Get directions to ${business.name} in Richardson (opens in a new tab)`}
            className="mt-8 w-full sm:w-auto"
          >
            Get Directions
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
