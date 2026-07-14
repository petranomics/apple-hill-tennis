import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import LegalPage, { Section, Bullets } from "@/components/LegalPage";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Terms of Use | Apple Hill Tennis Club",
  description:
    "The terms that govern use of the Apple Hill Tennis Club website, including membership inquiries, content ownership, and disclaimers.",
};

export default async function TermsPage() {
  const { footer } = await getContent();
  const email = footer.email;

  return (
    <LegalPage
      title="Terms of Use"
      intro="These terms govern your use of the Apple Hill Tennis Club website. By using the site, you agree to them. They cover the website itself — membership, guest play, and conduct at the club are governed separately by our club rules."
    >
      <Section heading="1. Use of the Site">
        <p>You may use this site for lawful purposes only. You agree not to:</p>
        <Bullets
          items={[
            "Violate any applicable law or regulation.",
            "Interfere with, disrupt, or attempt to gain unauthorized access to the site or the systems behind it.",
            "Copy, scrape, or systematically extract content from the site without our written permission.",
          ]}
        />
      </Section>

      <Section heading="2. Membership Inquiries">
        <p>
          Information on this site about memberships, guest fees, and the season is provided for
          general information. Emailing us about membership does not create a binding agreement and
          does not guarantee a place at the club. Membership is confirmed only when we confirm it
          directly with you, and is subject to our club rules and availability.
        </p>
        <p>
          We aim to keep prices, dates, and details on this site accurate, but they may change. If
          something here conflicts with what we tell you directly, what we tell you directly governs.
        </p>
      </Section>

      <Section heading="3. Intellectual Property">
        <p>
          The content on this site — text, photographs, the Apple Hill name and painted sign, layout,
          and code — belongs to Apple Hill Tennis Club or its licensors, and is protected by copyright
          and other laws. Please do not reproduce, redistribute, or modify it without our written
          permission. You are welcome to link to the site.
        </p>
      </Section>

      <Section heading="4. Photographs">
        <p>
          Photographs on this site may show members and guests at the club. If you appear in a photo
          and would like it removed, email{" "}
          <a href={`mailto:${email}`} className="text-clay hover:text-clay-hover underline underline-offset-2">
            {email}
          </a>{" "}
          and we will take it down promptly.
        </p>
      </Section>

      <Section heading="5. Tennis Involves Risk">
        <p>
          Nothing on this website is an assurance of safety. Tennis carries an inherent risk of
          injury, and play at Apple Hill — like any club — is at your own risk. The courts are
          member-run and unsupervised; there is no attendant, coach, or medical staff on site.
          Membership and guest play are subject to any waivers and club rules we provide separately.
        </p>
      </Section>

      <Section heading="6. Disclaimer of Warranties">
        <p>
          The site is provided &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without warranties of any kind, express or
          implied. We do not warrant that the site will be uninterrupted, error-free, or free of
          harmful components. To the fullest extent permitted by law, we disclaim all implied
          warranties, including merchantability, fitness for a particular purpose, and
          non-infringement.
        </p>
      </Section>

      <Section heading="7. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, Apple Hill Tennis Club and its members, officers,
          and volunteers are not liable for any indirect, incidental, special, consequential, or
          punitive damages arising from your use of this website, even if we have been advised of the
          possibility of such damages.
        </p>
      </Section>

      <Section heading="8. Links to Other Sites">
        <p>
          This site links to third-party websites, such as a map service for directions. We do not
          control them and are not responsible for their content or practices. Visiting them is at
          your own risk.
        </p>
      </Section>

      <Section heading="9. Governing Law">
        <p>
          These terms are governed by the laws of the State of Vermont, without regard to its
          conflict-of-laws principles. Any dispute arising from these terms or this website will be
          brought exclusively in the state or federal courts located in Vermont.
        </p>
      </Section>

      <Section heading="10. Changes to These Terms">
        <p>
          We may update these terms from time to time. The updated version will be posted on this page
          with a new effective date, and your continued use of the site after that constitutes
          acceptance.
        </p>
      </Section>

      <Section heading="11. Contact">
        <p>
          Questions about these terms? Email{" "}
          <a href={`mailto:${email}`} className="text-clay hover:text-clay-hover underline underline-offset-2">
            {email}
          </a>
          .
        </p>
      </Section>
    </LegalPage>
  );
}
