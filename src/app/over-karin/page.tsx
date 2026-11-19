import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/Sections";
import { business } from "@/content/site";
import portret from "@/assets/img/karin-portret.jpg";
import stadhuis from "@/assets/img/gouda-stadhuis.jpg";
import markt from "@/assets/img/gouda-markt-1905.jpg";

export const metadata: Metadata = {
  title: "Over Karin",
  description:
    "Karin Kouwenhoven helpt zzp'ers, starters en kleine ondernemers vanuit Gouda persoonlijk en laagdrempelig met hun administratie.",
};

export default function OverKarinPage() {
  return (
    <>
      <section className="wrap page-intro" style={{ alignItems: "start" }}>
        <div>
          <h1 data-reveal>Hoi, ik ben Karin</h1>
          <div className="prose" style={{ marginTop: 40 }}>
            <p className="lead" data-reveal style={{ ["--d" as string]: "90ms" }}>
              Ik help zzp&apos;ers, starters en kleine ondernemers met het deel van hun onderneming dat vaak blijft
              liggen: de administratie.
            </p>
            <p data-reveal style={{ ["--d" as string]: "150ms" }}>
              Als ondernemer besteed je je tijd het liefst aan de dingen waar je goed in bent en waar je het meeste
              plezier in hebt. Het administratieve deel van je onderneming is minstens zo belangrijk als het werk dat
              je voor je klanten doet. Niet voor iedereen is dat makkelijk bij te houden, en ben je niet up-to-date,
              dan kan dat voor onrust zorgen.
            </p>
            <p data-reveal>
              Ik denk met je mee en help je orde te krijgen in je administratie. Ben je net gestart? Dan help ik je op
              weg met het opzetten van je (digitale) administratie.
            </p>
            <p data-reveal>
              Ik ben gecertificeerd Informer Adviseur. Mijn kantoor is in Gouda, aan de {business.street} in het
              bijgebouw achter. Je bent welkom, uitsluitend op afspraak.
            </p>
          </div>
        </div>
        <div className="gable" data-reveal style={{ ["--d" as string]: "120ms", background: "var(--sand)" }}>
          <Image
            src={portret}
            alt="Portret van Karin Kouwenhoven met ordners"
            priority
            placeholder="blur"
            sizes="(max-width: 899px) 100vw, 40vw"
            style={{ width: "100%", height: "auto" }}
          />
        </div>
      </section>

      <section className="wrap" aria-labelledby="aanpak-t" style={{ paddingBlock: "var(--section) 0" }}>
        <h2 id="aanpak-t" className="head" data-reveal>
          Zo werk ik
        </h2>
        <ul className="services__grid" style={{ marginTop: 48 }}>
          {[
            ["Persoonlijk", "Je hebt contact met mij, en ik leer jouw onderneming kennen."],
            ["Laagdrempelig", "Ik leg graag uit wat er gebeurt, in gewone taal."],
            ["Op jouw manier", "Digitaal aanleveren of in een map: we spreken af wat voor jou werkt."],
          ].map(([t, x], i) => (
            <li key={t} data-reveal style={{ ["--d" as string]: `${i * 80}ms` }}>
              <h3>
                <span className="tri" aria-hidden="true" />
                {t}
              </h3>
              <p>{x}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="photo-band" aria-label="Gouda" style={{ marginTop: "var(--section)" }}>
        <figure data-reveal>
          <Image src={stadhuis} alt="Het gotische stadhuis van Gouda op een zonnige dag" sizes="50vw" style={{ aspectRatio: "4 / 5" }} />
          <figcaption>Het stadhuis van Gouda. Foto: Samuel Mudrík, CC BY-SA 4.0.</figcaption>
        </figure>
        <figure data-reveal style={{ ["--d" as string]: "100ms" }}>
          <Image src={markt} alt="Ingekleurde ansichtkaart van de Markt en de Waag in Gouda rond 1905" sizes="50vw" style={{ aspectRatio: "4 / 5" }} />
          <figcaption>De Markt en de Waag in Gouda, ca. 1905. Ansichtkaart, publiek domein.</figcaption>
        </figure>
      </section>

      <CtaBand
        title="Zullen we kennismaken?"
        text="Vertel me over je onderneming. Dan kijken we samen hoe ik je kan helpen, zonder verplichtingen."
      />
    </>
  );
}
