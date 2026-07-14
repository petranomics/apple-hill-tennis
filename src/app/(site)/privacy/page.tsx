import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import LegalPage, { Section, Bullets } from "@/components/LegalPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Privacy Policy | Apple Hill Tennis Club",
  description:
    "How Apple Hill Tennis Club handles information on our website. We do not run ads, analytics, or tracking cookies, and the site has no forms.",
};

export default async function PrivacyPage() {
  const { footer } = await getContent();
  const email = footer.email;

  return (
    <LegalPage
      title="Privacy Policy"
      intro="Apple Hill Tennis Club is a small, member-run club in West Dover, Vermont. This policy explains what happens to information when you visit our website. The short version: our website has no forms, no accounts, no advertising, and no tracking or analytics cookies, so we do not collect personal information from visitors."
    >
      <Section heading="1. Information We Collect">
        <p>
          <strong>From the website: none.</strong> We do not have contact forms, sign-up forms,
          logins, shopping carts, or comment sections. We do not use advertising networks, tracking
          pixels, or analytics tools such as Google Analytics, and we do not set cookies on visitors&rsquo;
          browsers.
        </p>
        <p>
          <strong>When you email us.</strong> If you contact us at{" "}
          <a href={`mailto:${email}`} className="text-clay hover:text-clay-hover underline underline-offset-2">
            {email}
          </a>
          , we receive whatever you choose to send — typically your name, email address, and your
          message. We use it only to reply to you and to administer membership.
        </p>
        <p>
          <strong>Standard server logs.</strong> Our website is hosted by Vercel, which — like
          essentially every web host — automatically records technical request data such as IP
          address, browser type, and pages requested, in order to serve the site and protect it from
          abuse. We do not use these logs to build profiles of visitors.
        </p>
      </Section>

      <Section heading="2. How We Use Information">
        <Bullets
          items={[
            "To answer questions you email us about membership, guests, or the club.",
            "To administer memberships and communicate with members about club matters.",
            "To keep the website running and secure.",
          ]}
        />
        <p>
          We do not sell, rent, or trade personal information. We do not send marketing email, and we
          do not share your information with advertisers.
        </p>
      </Section>

      <Section heading="3. Who We Share Information With">
        <p>
          We share information only with the services that make the website and our email work — our
          web host (Vercel) and our email provider — and only to the extent needed to operate. We may
          also disclose information if required by law, or to protect the rights, property, or safety
          of the club, our members, or the public.
        </p>
      </Section>

      <Section heading="4. Photographs of Members and Guests">
        <p>
          Our blog sometimes includes photographs taken at the club — round robins, social events, and
          play on the courts — which may show members and guests. We publish these to share club life,
          not to identify individuals, and we do not tag or name people in photographs without their
          agreement.
        </p>
        <p>
          If you appear in a photograph on this site and would like it removed, email us at{" "}
          <a href={`mailto:${email}`} className="text-clay hover:text-clay-hover underline underline-offset-2">
            {email}
          </a>{" "}
          and we will take it down promptly. You do not need to give a reason.
        </p>
      </Section>

      <Section heading="5. Your Rights and Choices">
        <p>
          Depending on where you live, you may have the right to request a copy of the personal
          information we hold about you, ask us to correct or delete it, or object to how we use it.
          Because we collect so little — essentially only what you email us — these requests are
          usually simple to honor.
        </p>
        <p>
          To make a request, email{" "}
          <a href={`mailto:${email}`} className="text-clay hover:text-clay-hover underline underline-offset-2">
            {email}
          </a>
          . We aim to respond within 30 days.
        </p>
      </Section>

      <Section heading="6. Data Security and Retention">
        <p>
          The site is served over HTTPS. We keep email correspondence and membership records only as
          long as needed to run the club and meet any legal obligations, and we delete them when they
          are no longer needed. No method of transmission or storage is completely secure, and we
          cannot guarantee absolute security.
        </p>
      </Section>

      <Section heading="7. Children's Privacy">
        <p>
          The website is not directed at children under 13, and we do not knowingly collect personal
          information from them. Families are welcome at the club; if you believe a child has sent us
          personal information, contact us and we will delete it.
        </p>
      </Section>

      <Section heading="8. Links to Other Sites">
        <p>
          Our site links to third-party websites — for example, a map service for directions. We are
          not responsible for their privacy practices, and we encourage you to read their policies.
        </p>
      </Section>

      <Section heading="9. Changes to This Policy">
        <p>
          We may update this policy from time to time. The updated version will be posted on this page
          with a new effective date. If we ever begin collecting information through the site — for
          example, by adding a contact form or analytics — we will update this policy first.
        </p>
      </Section>

      <Section heading="10. Contact Us">
        <p>
          Questions about this policy? Email{" "}
          <a href={`mailto:${email}`} className="text-clay hover:text-clay-hover underline underline-offset-2">
            {email}
          </a>
          , or write to us: Apple Hill Tennis Club, West Dover, Vermont.
        </p>
      </Section>
    </LegalPage>
  );
}
