export default function HomePage() {
  return (
    <main
      id="main-content"
      className="flex min-h-dvh items-center bg-background py-20"
    >
      <div className="page-container">
        <div className="mx-auto max-w-4xl border-y border-border py-16 text-center sm:py-24">
          <span
            aria-hidden="true"
            className="mx-auto mb-8 block h-px w-12 bg-antique-gold"
          />
          <p className="font-body text-label font-semibold tracking-[0.22em] text-primary uppercase">
            A Royal Taste of India
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl font-display text-page font-semibold text-primary">
            Royal Sweets &amp; Fast Food
          </h1>
          <p className="mx-auto mt-7 max-w-xl font-body text-body text-muted sm:text-lg">
            Authentic Indian Sweets, Chaat &amp; Timeless Flavors.
          </p>
        </div>
      </div>
    </main>
  );
}
