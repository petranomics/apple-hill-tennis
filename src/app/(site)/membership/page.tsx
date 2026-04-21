import content from "@/data/content.json";

export const metadata = {
  title: "Membership | Apple Hill Tennis Club",
  description: "Join Apple Hill Tennis Club. Single, couples, and monthly memberships available.",
};

export default function MembershipPage() {
  const { membership } = content;

  return (
    <>
      {/* Hero */}
      <section className="bg-forest text-white py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {membership.hero.heading}
          </h1>
          <p className="text-lg text-sage-light max-w-2xl mx-auto">
            {membership.hero.description}
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {membership.plans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-8 ${
                  plan.popular
                    ? "bg-forest text-white shadow-xl scale-105"
                    : "bg-white shadow-md"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-clay text-white text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                <h3
                  className={`text-xl font-bold mb-1 ${
                    plan.popular ? "text-white" : "text-forest"
                  }`}
                >
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span
                    className={`text-4xl font-bold ${
                      plan.popular ? "text-white" : "text-bark"
                    }`}
                  >
                    {plan.price}
                  </span>
                  <span
                    className={`text-sm ml-1 ${
                      plan.popular ? "text-sage-light" : "text-bark-light"
                    }`}
                  >
                    {plan.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <svg
                        className={`w-5 h-5 mt-0.5 flex-shrink-0 ${
                          plan.popular ? "text-sage-light" : "text-sage"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span
                        className={`text-sm ${
                          plan.popular ? "text-white/90" : "text-bark-light"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`block text-center py-3 rounded-md font-semibold transition-colors ${
                    plan.popular
                      ? "bg-clay hover:bg-clay-light text-white"
                      : "bg-forest hover:bg-forest-light text-white"
                  }`}
                >
                  Get Started
                </a>
              </div>
            ))}
          </div>

          {/* Guest Fee */}
          <div className="mt-12 text-center">
            <p className="text-bark-light">
              <span className="font-semibold text-forest">Guest Fee:</span>{" "}
              {membership.guestFee.price} {membership.guestFee.description}
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16 bg-cream-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-forest mb-4">
            {membership.contact.heading}
          </h2>
          <p className="text-lg text-bark-light mb-8">{membership.contact.text}</p>
          <div className="grid sm:grid-cols-2 gap-6">
            {membership.contact.contacts.map((person, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                <p className="font-bold text-forest text-lg">{person.name}</p>
                <p className="text-sm text-bark-light mb-2">{person.role}</p>
                <a
                  href={`mailto:${person.email}`}
                  className="text-clay hover:text-clay-light transition-colors font-medium"
                >
                  {person.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
