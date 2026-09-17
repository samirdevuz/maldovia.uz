import { site } from "@/lib/site";
import { uz } from "@/content/uz";
import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Modes } from "@/components/modes";
import { Videos } from "@/components/videos";
import { DiscordSection } from "@/components/discord-section";
import { ConnectGuide } from "@/components/connect-guide";
import { Faq } from "@/components/faq";
import { SiteFooter } from "@/components/site-footer";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${site.url}/#website`,
      url: site.url,
      name: site.name,
      description: uz.meta.description,
      inLanguage: "uz-UZ",
    },
    {
      "@type": "Organization",
      "@id": `${site.url}/#org`,
      name: site.name,
      url: site.url,
      logo: `${site.url}/art/maldovia-logo.svg`,
      sameAs: [site.discordInvite, site.youtube],
    },
    {
      "@type": "FAQPage",
      mainEntity: uz.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  ],
};

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Modes />
        <Videos />
        <DiscordSection />
        <ConnectGuide />
        <Faq />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
