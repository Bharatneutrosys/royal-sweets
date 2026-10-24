import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Gift, Sparkles } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Section } from "@/components/shared/Section";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/Card";
import { Divider } from "@/components/ui/Divider";
import { MediaFrame } from "@/components/ui/MediaFrame";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata: Metadata = {
  title: "UI Preview | Royal Sweets & Fast Food",
  robots: { index: false, follow: false },
};

export default function UiPreviewPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return (
    <main>
      <Section aria-labelledby="preview-heading">
        <Container narrow>
          <p className="font-body text-label font-semibold tracking-[0.18em] text-primary uppercase">
            Internal design preview
          </p>
          <h1
            id="preview-heading"
            className="mt-4 font-display text-page text-primary"
          >
            Royal Sweets UI
          </h1>
          <p className="mt-5 max-w-2xl text-body text-muted">
            Reusable interface elements for upcoming customer-facing pages. Use
            Tab to inspect keyboard focus.
          </p>
          <Divider variant="accent" decorative className="mt-8" />
        </Container>
      </Section>

      <Section surface="sand" aria-labelledby="type-heading">
        <Container>
          <SectionHeading
            id="type-heading"
            eyebrow="01 / Typography"
            title="An editorial rhythm"
            description="Playfair Display sets the tone; Manrope keeps every interface detail clear."
          />
          <div className="mt-10 grid gap-6 border-t border-border pt-8 md:grid-cols-2">
            <p className="font-display text-hero text-primary">
              Royal heritage
            </p>
            <div className="space-y-3">
              <h3 className="font-display text-card text-foreground">
                Card heading
              </h3>
              <p className="text-body">
                Body copy stays generous and readable.
              </p>
              <p className="text-supporting text-muted">
                Supporting descriptions use a quieter tone.
              </p>
              <p className="text-caption text-muted">CAPTION / SMALL DETAIL</p>
              <p className="text-price font-semibold text-primary">$00.00</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="buttons-heading">
        <Container>
          <SectionHeading
            id="buttons-heading"
            eyebrow="02 / Controls"
            title="Buttons and links"
            description="Native buttons handle actions; link buttons navigate without nested controls."
          />
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button leadingIcon={<Gift size={18} strokeWidth={1.75} />}>
              Primary
            </Button>
            <Button variant="secondary">Secondary</Button>
            <Button
              variant="outline"
              trailingIcon={<ArrowRight size={18} strokeWidth={1.75} />}
            >
              Outline
            </Button>
            <Button variant="ghost">Ghost</Button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
            <Button loading>Loading</Button>
            <ButtonLink
              href="/"
              variant="outline"
              trailingIcon={<ArrowRight size={18} strokeWidth={1.75} />}
            >
              View starter page
            </ButtonLink>
          </div>
          <div className="mt-6 max-w-xs">
            <Button variant="secondary" fullWidth>
              Full-width option
            </Button>
          </div>
        </Container>
      </Section>

      <Section surface="light" aria-labelledby="cards-heading">
        <Container>
          <SectionHeading
            id="cards-heading"
            eyebrow="03 / Surfaces"
            title="Quiet, flexible cards"
          />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <h3 className="font-display text-card">Default</h3>
              </CardHeader>
              <CardContent>
                <p className="text-supporting text-muted">
                  A clean base for future content.
                </p>
              </CardContent>
              <CardFooter>
                <Badge size="sm">Flexible</Badge>
              </CardFooter>
            </Card>
            <Card variant="elevated">
              <CardHeader>
                <h3 className="font-display text-card">Elevated</h3>
              </CardHeader>
              <CardContent>
                <p className="text-supporting text-muted">
                  A restrained soft shadow.
                </p>
              </CardContent>
            </Card>
            <Card variant="outlined" hoverable>
              <CardHeader>
                <h3 className="font-display text-card">Outlined</h3>
              </CardHeader>
              <CardContent>
                <p className="text-supporting text-muted">
                  Subtle border emphasis on hover.
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="badges-heading">
        <Container>
          <SectionHeading
            id="badges-heading"
            eyebrow="04 / Labels"
            title="Badges and states"
            description="Samples demonstrate styling only; no product claims are implied."
          />
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Badge>Default</Badge>
            <Badge
              variant="featured"
              icon={<Sparkles size={14} strokeWidth={1.75} />}
            >
              Featured
            </Badge>
            <Badge variant="bestseller" shape="pill">
              Bestseller
            </Badge>
            <Badge
              variant="success"
              icon={<Check size={14} strokeWidth={1.75} />}
            >
              Available
            </Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="unavailable">Unavailable</Badge>
            <Badge variant="neutral" size="sm">
              Muted
            </Badge>
          </div>
          <Divider className="mt-12" />
          <Divider variant="accent" decorative className="mt-8" />
        </Container>
      </Section>

      <Section surface="sand" aria-labelledby="media-heading">
        <Container>
          <SectionHeading
            id="media-heading"
            eyebrow="05 / Media"
            title="Frames before photography"
            description="Stable proportions reserve space until approved imagery is available."
          />
          <div className="mt-10 grid grid-cols-2 items-start gap-5 lg:grid-cols-4">
            <div>
              <MediaFrame aspect="square" />
              <p className="mt-3 text-caption">1:1</p>
            </div>
            <div>
              <MediaFrame aspect="portrait" />
              <p className="mt-3 text-caption">4:5</p>
            </div>
            <div>
              <MediaFrame aspect="landscape" />
              <p className="mt-3 text-caption">3:2</p>
            </div>
            <div>
              <MediaFrame aspect="wide" />
              <p className="mt-3 text-caption">16:9</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section aria-labelledby="skeleton-heading">
        <Container>
          <SectionHeading
            id="skeleton-heading"
            eyebrow="06 / Loading"
            title="Lightweight skeletons"
          />
          <div className="mt-10 grid items-start gap-8 md:grid-cols-3">
            <Skeleton variant="text" lines={3} />
            <Skeleton variant="image" className="max-w-48" />
            <Skeleton variant="card" />
          </div>
        </Container>
      </Section>
    </main>
  );
}
