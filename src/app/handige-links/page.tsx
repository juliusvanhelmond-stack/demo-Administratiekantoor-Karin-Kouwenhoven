import type { Metadata } from "next";
import { PageIntro } from "@/components/Sections";
import { usefulLinks } from "@/content/site";

export const metadata: Metadata = {
  title: "Handige links",
  description: "Betrouwbare bronnen voor ondernemers: Belastingdienst, KvK, factuureisen en de auto van de zaak.",
};

export default function HandigeLinksPage() {
  return (
    <>
      <PageIntro title="Handige links">
        <p className="lead">Betrouwbare bronnen voor als je zelf iets wilt nazoeken.</p>
        <p style={{ marginTop: 16 }}>Twijfel je wat het voor jouw onderneming betekent? Vraag het gerust.</p>
      </PageIntro>
      <ul className="links-list">
        {usefulLinks.map((l) => (
          <li key={l.href} data-reveal>
            <a href={l.href} target="_blank" rel="noopener noreferrer">
              <span>
                <h2>{l.title}</h2>
                <p>{l.text}</p>
              </span>
              <span className="tri" aria-hidden="true" />
              <span className="sr-only">(opent in nieuw venster)</span>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
}
