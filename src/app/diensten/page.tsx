import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand, PageIntro } from "@/components/Sections";
import { services, type Service } from "@/content/site";

export const metadata: Metadata = {
  title: "Diensten",
  description:
    "Opstartbegeleiding, digitale administratie, wekelijkse boekhouding, btw-aangifte, jaarafsluiting en facturatie voor zzp'ers en kleine ondernemers in Gouda.",
};

const GROUPS: { id: string; key: Service["group"]; title: string; text: string }[] = [
  {
    id: "opstarten",
    key: "start",
    title: "Goed beginnen",
    text: "Ben je starter? Dan help ik je op weg met het opzetten van je (digitale) administratie.",
  },
  {
    id: "doorlopend",
    key: "doorlopend",
    title: "Samen bijhouden",
    text: "Structurele begeleiding, zodat je administratie het hele jaar door klopt.",
  },
  {
    id: "jaar",
    key: "jaar",
    title: "Het jaar rond",
    text: "Aan het einde van het jaar ronden we samen af wat er afgerond moet worden.",
  },
  {
    id: "extra",
    key: "extra",
    title: "Extra service, bespreekbaar",
    text: "Wil je meer uit handen geven? Deze diensten spreken we samen af.",
  },
];

export default function DienstenPage() {
  return (
    <>
      <PageIntro title="Diensten">
        <p className="lead">
          Van de eerste inschrijving tot de jaarafsluiting. Ik help je met het deel van je onderneming dat je liever
          niet zelf bijhoudt, zodat jij je kunt richten op je werk.
        </p>
      </PageIntro>

      {GROUPS.map((g) => (
        <section key={g.id} id={g.id} className="svc-group wrap" aria-labelledby={`${g.id}-t`}>
          <div className="svc-group__head" data-reveal>
            <h2 id={`${g.id}-t`}>{g.title}</h2>
            <p>{g.text}</p>
          </div>
          <ul className="svc-list">
            {services
              .filter((s) => s.group === g.key)
              .map((s) => (
                <li key={s.key} data-reveal>
                  <h3>
                    <span className="tri" aria-hidden="true" />
                    {s.title}
                  </h3>
                  <div>
                    <p>{s.short}</p>
                    <p className="ex">Bijvoorbeeld: {s.example}</p>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      ))}

      <section className="wrap" style={{ paddingTop: "clamp(56px, 7vw, 112px)" }} aria-label="Samenwerking">
        <div className="split">
          <h2 className="head" data-reveal>
            Samen met Ilse Geerts
          </h2>
          <p className="lead" data-reveal>
            Ik werk prettig samen met Ilse Geerts van Administratie &amp; consultancy. Maak je gebruik van mijn
            diensten, dan heb je mogelijk zo nu en dan ook contact met haar.{" "}
            <Link href="/tarieven" className="link">
              Lees hoe de tarieven werken
            </Link>
            .
          </p>
        </div>
      </section>

      <CtaBand
        title="Bespreek jouw administratie"
        text="Elke onderneming is anders. In een kennismakingsgesprek kijken we samen welke hulp bij jou past."
      />
    </>
  );
}
