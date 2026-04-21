import content from "@/data/content.json";

export default function Footer() {
  const { footer } = content;

  return (
    <footer className="bg-forest text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2">Apple Hill Tennis Club</h3>
            <p className="text-sage-light text-sm">{footer.tagline}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-sage-light">Location</h4>
            <p className="text-sm">{footer.location}</p>
          </div>
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-2 text-sage-light">Contact</h4>
            <a href={`mailto:${footer.email}`} className="text-sm hover:text-sage-light transition-colors">
              {footer.email}
            </a>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-xs text-sage-light">
          &copy; {new Date().getFullYear()} Apple Hill Tennis Club. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
