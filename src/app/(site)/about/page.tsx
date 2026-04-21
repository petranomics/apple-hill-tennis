import content from "@/data/content.json";

export const metadata = {
  title: "About | Apple Hill Tennis Club",
  description: "Learn about our history, facilities, and location in West Dover, Vermont.",
};

export default function AboutPage() {
  const { about } = content;

  return (
    <>
      {/* Hero */}
      <section className="bg-forest text-white py-16 md:py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {about.hero.heading}
          </h1>
        </div>
      </section>

      {/* History */}
      <section className="py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-forest mb-6">{about.history.heading}</h2>
              <p className="text-lg text-bark-light leading-relaxed">{about.history.text}</p>
            </div>
            <div className="bg-sage/20 rounded-2xl p-2">
              <img
                src="https://lh3.googleusercontent.com/sitesv/AA5AbUAhB_mvAdcaFL7E3tVSVAsAVAIjG_xW5WLx3LishUirg0pvUYyIex6cPC123OJS-qRV-iOHxHbkkexOVOEtJn_CPymgTd74xzyQiE21W-7iq9fMP2egwBQlWvc9u-r5pPc4gNnyTH9TUL6kF_ETESBZrGl4uTyu0-GlGe0sYuAJ6sWAs3L-SRd5Cwvhx2-msOUMYh2PfcKh2enriTRSIKkUNTGIwpsK0AA_h0w=w1280"
                alt="Apple Hill Tennis Club history"
                className="rounded-xl w-full h-72 md:h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-cream-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 bg-sage/20 rounded-2xl p-2">
              <img
                src="https://lh3.googleusercontent.com/sitesv/AA5AbUA2nJNB6rn507Ip0ba2pyFMlIxjUeaGrfReNX2fg5_8YbLjR7yPSoXwIwT6TgIRvDvXPy4jMZwz015D7D166FNfow_gLJ2nM0Ll_Y9RA7H4z-enlMjZPvg_1ivLpi721Q-m2yIQ5XnEKFPTbQTnV0_xVsDowSGcQGGg0Rs1KIW5JLIWOspTOoJRmnN6NhMMYwcoT3zCbmzOzPhVyXJKDfml0ZxfS5ciTA=w1280"
                alt="Apple Hill Tennis Club facilities"
                className="rounded-xl w-full h-72 md:h-96 object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-bold text-forest mb-6">{about.facilities.heading}</h2>
              <p className="text-lg text-bark-light leading-relaxed">{about.facilities.text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Season */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl font-bold text-forest mb-6">{about.season.heading}</h2>
          <p className="text-lg text-bark-light leading-relaxed">{about.season.text}</p>
        </div>
      </section>

      {/* Map & Location */}
      <section className="py-16 bg-cream-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-forest text-center mb-4">
            {about.location.heading}
          </h2>
          <p className="text-center text-bark-light mb-8 max-w-2xl mx-auto">
            {about.location.description}
          </p>
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2900!2d${about.location.coordinates.lng}!3d${about.location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDLCsDU4JzI3LjgiTiA3MsKwNTMnMzIuOSJX!5e0!3m2!1sen!2sus!4v1690000000000`}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Apple Hill Tennis Club location"
            />
          </div>
          <div className="mt-6 text-center">
            <a
              href={about.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-forest font-semibold hover:text-forest-light transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
