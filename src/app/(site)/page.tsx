import Link from "next/link";
import content from "@/data/content.json";

function CourtIcon() {
  return (
    <svg className="w-10 h-10 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="4" width="20" height="16" rx="1" />
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <rect x="8" y="7" width="8" height="10" rx="0.5" fill="none" />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg className="w-10 h-10 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
      <circle cx="12" cy="15" r="1.5" fill="currentColor" />
    </svg>
  );
}

function CommunityIcon() {
  return (
    <svg className="w-10 h-10 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="7" r="2.5" />
      <path d="M3 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      <path d="M17 13a3 3 0 013 3v2" />
    </svg>
  );
}

const iconMap: Record<string, () => React.JSX.Element> = {
  court: CourtIcon,
  calendar: CalendarIcon,
  community: CommunityIcon,
};

export default function Home() {
  const { home } = content;

  return (
    <>
      {/* Hero */}
      <section className="relative bg-forest text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/sitesv/AA5AbUAhB_mvAdcaFL7E3tVSVAsAVAIjG_xW5WLx3LishUirg0pvUYyIex6cPC123OJS-qRV-iOHxHbkkexOVOEtJn_CPymgTd74xzyQiE21W-7iq9fMP2egwBQlWvc9u-r5pPc4gNnyTH9TUL6kF_ETESBZrGl4uTyu0-GlGe0sYuAJ6sWAs3L-SRd5Cwvhx2-msOUMYh2PfcKh2enriTRSIKkUNTGIwpsK0AA_h0w=w1280')`,
          }}
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 md:py-36 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            {home.hero.heading}
          </h1>
          <p className="text-lg md:text-xl text-sage-light mb-4 max-w-2xl mx-auto">
            {home.hero.subheading}
          </p>
          <p className="text-base md:text-lg text-white/80 mb-8 max-w-xl mx-auto">
            {home.hero.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/membership"
              className="bg-clay hover:bg-clay-light text-white px-8 py-3 rounded-md font-semibold transition-colors"
            >
              Become a Member
            </Link>
            <Link
              href="/about"
              className="border border-white/40 hover:bg-white/10 text-white px-8 py-3 rounded-md font-semibold transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Welcome */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-forest mb-6">
                {home.welcome.heading}
              </h2>
              <p className="text-lg text-bark-light leading-relaxed">
                {home.welcome.text}
              </p>
              <Link
                href="/about"
                className="inline-block mt-6 text-forest font-semibold hover:text-forest-light transition-colors underline underline-offset-4"
              >
                Read our story &rarr;
              </Link>
            </div>
            <div className="relative">
              <div className="bg-sage/20 rounded-2xl p-2">
                <img
                  src="https://lh3.googleusercontent.com/sitesv/AA5AbUA2nJNB6rn507Ip0ba2pyFMlIxjUeaGrfReNX2fg5_8YbLjR7yPSoXwIwT6TgIRvDvXPy4jMZwz015D7D166FNfow_gLJ2nM0Ll_Y9RA7H4z-enlMjZPvg_1ivLpi721Q-m2yIQ5XnEKFPTbQTnV0_xVsDowSGcQGGg0Rs1KIW5JLIWOspTOoJRmnN6NhMMYwcoT3zCbmzOzPhVyXJKDfml0ZxfS5ciTA=w1280"
                  alt="Apple Hill Tennis Club courts"
                  className="rounded-xl w-full h-72 md:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-cream-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-forest text-center mb-12">
            Why Apple Hill?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {home.highlights.map((item, i) => {
              const Icon = iconMap[item.icon] || CourtIcon;
              return (
                <div
                  key={i}
                  className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="flex justify-center mb-4">
                    <Icon />
                  </div>
                  <h3 className="text-xl font-bold text-forest mb-3">{item.title}</h3>
                  <p className="text-bark-light">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-mountain text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Play?</h2>
          <p className="text-lg text-sage-light mb-8">
            Join our welcoming community of tennis lovers in the beautiful Green Mountains.
          </p>
          <Link
            href="/membership"
            className="inline-block bg-clay hover:bg-clay-light text-white px-10 py-4 rounded-md font-semibold text-lg transition-colors"
          >
            View Membership Options
          </Link>
        </div>
      </section>
    </>
  );
}
