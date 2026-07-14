import Link from "next/link";
import { getContent } from "@/lib/content";

export default async function Footer() {
  const content = await getContent();
  const { footer } = content;

  return (
    <footer className="bg-forest text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h2 className="font-bold text-lg mb-2">Apple Hill Tennis Club</h2>
            <p className="text-sage-light text-sm">{footer.tagline}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-2 text-sage-light">Location</h3>
            <p className="text-sm">{footer.location}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider mb-2 text-sage-light">Contact</h3>
            <a href={`mailto:${footer.email}`} className="text-sm hover:text-sage-light transition-colors">
              {footer.email}
            </a>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-6 text-center text-xs text-sage-light space-y-3">
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="underline underline-offset-2 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="underline underline-offset-2 hover:text-white transition-colors">
              Terms of Use
            </Link>
            <Link href="/accessibility" className="underline underline-offset-2 hover:text-white transition-colors">
              Accessibility
            </Link>
          </nav>
          <p>&copy; {new Date().getFullYear()} Apple Hill Tennis Club. All rights reserved.</p>
          <p>
            Built by{" "}
            <a
              href="https://polarispoint.io"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-white transition-colors"
            >
              Polaris Point
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
