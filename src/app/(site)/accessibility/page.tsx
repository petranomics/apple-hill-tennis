import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import LegalPage, { Section, Bullets } from "@/components/LegalPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Accessibility Statement | Apple Hill Tennis Club",
  description:
    "Apple Hill Tennis Club aims to meet WCAG 2.1 Level AA. How to report an accessibility barrier on our website, and how to get information another way.",
};

export default async function AccessibilityPage() {
  const { footer } = await getContent();
  const email = footer.email;

  return (
    <LegalPage
      title="Accessibility Statement"
      intro="Apple Hill Tennis Club wants our website to be usable by everyone, including people who use screen readers, navigate by keyboard, or need larger text and higher contrast. This page explains what we have done, what we know still falls short, and how to reach us if something on the site does not work for you."
    >
      <Section heading="Our Target">
        <p>
          We aim to meet the{" "}
          <a
            href="https://www.w3.org/WAI/WCAG21/quickref/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-clay hover:text-clay-hover underline underline-offset-2"
          >
            Web Content Accessibility Guidelines (WCAG) 2.1, Level AA
          </a>
          . That is the standard commonly used to judge whether a website is accessible, including
          under the Americans with Disabilities Act.
        </p>
      </Section>

      <Section heading="What We've Done">
        <Bullets
          items={[
            "Tested every page with axe, an automated accessibility checker, and fixed the issues it found.",
            "Raised the contrast of our buttons and links so text meets the 4.5:1 minimum against its background.",
            "Structured pages with real headings in order, so screen reader users can navigate by heading.",
            "Added a “Skip to main content” link so keyboard users can jump past the navigation.",
            "Written descriptive alt text for images, so people who cannot see a photo are told what it shows.",
            "Made the photo galleries fully keyboard operable — photos open, move, and close with the keyboard, and the lightbox can always be dismissed with the Escape key.",
            "Kept the site responsive, so it stays usable when zoomed or viewed on a small screen.",
            "Avoided auto-playing media and flashing content.",
          ]}
        />
      </Section>

      <Section heading="Known Limitations">
        <p>
          We are honest about where we fall short, and we are working on these:
        </p>
        <Bullets
          items={[
            "Photographs posted to our blog by club volunteers may not always have a caption or description. When a photo has no caption, screen reader users are told only that it is a photo from that post.",
            "The map on our About page is embedded from a third-party map service, whose accessibility we do not control. Our address is also written out in text next to it, so you never need the map to find us.",
          ]}
        />
      </Section>

      <Section heading="Tell Us About a Barrier">
        <p>
          If any part of this site is difficult or impossible for you to use, please tell us. You do
          not need to explain why, and you do not need to use any particular technical language —
          &ldquo;I can&rsquo;t read the membership prices&rdquo; is a perfectly good report.
        </p>
        <p>
          Email{" "}
          <a href={`mailto:${email}`} className="text-clay hover:text-clay-hover underline underline-offset-2">
            {email}
          </a>
          . We aim to respond within five business days and to fix genuine barriers as quickly as we
          reasonably can.
        </p>
      </Section>

      <Section heading="Getting Information Another Way">
        <p>
          If something on this website is not accessible to you and you need the information it
          contains — membership prices, the season dates, directions to the courts — email us and we
          will simply send it to you in whatever format works for you, or tell you over the phone or in
          person at the club.
        </p>
      </Section>

      <Section heading="Reviewing This Statement">
        <p>
          We review this statement as the site changes. If we add new features, we test them for
          accessibility before publishing.
        </p>
      </Section>
    </LegalPage>
  );
}
