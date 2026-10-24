import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { ButtonLink } from "@/components/ui/Button";

export function PlaceholderPage({ title }: { title: string }) {
  return (
    <main id="main-content" tabIndex={-1} className="min-h-[60vh]">
      <Section>
        <Container narrow>
          <p className="font-body text-label font-semibold tracking-[0.18em] text-primary uppercase">
            Page in development
          </p>
          <h1 className="mt-4 font-display text-page font-semibold text-primary">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-body text-muted">
            This page is being developed.
          </p>
          <ButtonLink href="/" variant="outline" size="sm" className="mt-8">
            Return home
          </ButtonLink>
        </Container>
      </Section>
    </main>
  );
}
