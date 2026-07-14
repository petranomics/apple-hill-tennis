import Link from "next/link";

export const LEGAL_EFFECTIVE = "July 14, 2026";

/**
 * Shared shell for the privacy / terms / accessibility pages so they read as
 * part of the site rather than bolted-on boilerplate.
 */
export default function LegalPage({
  title,
  intro,
  children,
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="relative bg-forest text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{ backgroundImage: `url('/images/green-mountains-2.jpg')` }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{title}</h1>
          <p className="mt-4 text-sage-light text-sm">
            Effective {LEGAL_EFFECTIVE} · Last updated {LEGAL_EFFECTIVE}
          </p>
        </div>
      </section>

      <article className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <p className="text-lg text-bark-light leading-relaxed mb-10">{intro}</p>
          <div className="space-y-10">{children}</div>

          <div className="mt-14 pt-8 border-t border-sage/20 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link href="/privacy" className="text-clay hover:text-clay-hover font-semibold">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-clay hover:text-clay-hover font-semibold">
              Terms of Use
            </Link>
            <Link href="/accessibility" className="text-clay hover:text-clay-hover font-semibold">
              Accessibility Statement
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}

export function Section({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-2xl font-bold text-forest mb-4">{heading}</h2>
      <div className="space-y-4 text-bark-light leading-relaxed">{children}</div>
    </section>
  );
}

export function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc pl-6 space-y-2 text-bark-light">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
