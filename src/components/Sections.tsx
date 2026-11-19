import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { audiences, business, services } from "@/content/site";
import { HeroPapers } from "./HeroPapers";
import portret from "@/assets/img/karin-portret.jpg";
import ordners from "@/assets/img/karin-ordners.jpg";
import bonnetje from "@/assets/img/bonnetje.jpg";
import kasboek from "@/assets/img/kasboek.jpg";
import stadhuis from "@/assets/img/gouda-stadhuis.jpg";
import markt from "@/assets/img/gouda-markt-1905.jpg";

const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as CSSProperties;

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-titel">
      <div className="hero__card">
        <h1 id="hero-titel" className="hero__title" data-reveal>
          <span>Rust in je administratie.</span> <span>Ruimte om te ondernemen.</span>
        </h1>
        <p className="hero__intro" data-reveal style={d(90)}>
          Persoonlijke administratieve ondersteuning voor zzp&apos;ers, starters en kleine ondernemers, vanuit Gouda.
        </p>
        <div className="hero__actions" data-reveal style={d(180)}>
          <Link href="/contact#formulier" className="btn">
            Plan een kennismaking <span className="tri" aria-hidden="true" />
          </Link>
          <Link href="/diensten" className="link">
            Bekijk de diensten
          </Link>
        </div>
        <div className="hero__contact" data-reveal style={d(260)}>
          <a href={business.phoneHref}>{business.phoneDisplay}</a>
          <a href={business.emailHref}>{business.email}</a>
          <span>{business.visitNote}</span>
        </div>
        <HeroPapers />
      </div>
      <div className="hero__photo">
        <Image
          src={portret}
          alt="Karin Kouwenhoven met een stapel ordners in haar armen"
          priority
          placeholder="blur"
          sizes="(max-width: 899px) 100vw, 44vw"
        />
      </div>
    </section>
  );
}

function Thumb({ src, alt }: { src: typeof portret; alt: string }) {
  return (
    <span className="inline-thumb">
      <Image src={src} alt={alt} sizes="64px" />
    </span>
  );
}

export function Statement() {
  return (
    <section className="wrap statement" aria-label="Introductie">
      <p data-reveal>
        Jij onderneemt <Thumb src={bonnetje} alt="een verfrommeld kassabonnetje" />. Samen houden we je administratie{" "}
        <Thumb src={kasboek} alt="een oud handgeschreven kasboek" /> overzichtelijk, vanuit een rustig kantoor in Gouda{" "}
        <Thumb src={stadhuis} alt="het stadhuis van Gouda" />.
      </p>
    </section>
  );
}

export function ServicesSplit() {
  return (
    <section className="services" id="diensten" aria-labelledby="diensten-titel">
      <div className="services__photo gable" data-reveal>
        <Image src={bonnetje} alt="Een verfrommeld bonnetje op een witte ondergrond" sizes="(max-width: 799px) 90vw, 45vw" placeholder="blur" />
      </div>
      <div className="services__body">
        <h2 id="diensten-titel" className="head" data-reveal>
          Waar ik je mee help
        </h2>
        <ul className="services__grid">
          {services.map((s, i) => (
            <li key={s.key} data-reveal style={d(60 + (i % 3) * 70)}>
              <h3>
                <span className="tri" aria-hidden="true" />
                {s.title}
              </h3>
              <p>{s.short}</p>
            </li>
          ))}
        </ul>
        <p className="services__more" data-reveal>
          <Link href="/diensten" className="link">
            Bekijk alle diensten met voorbeelden
          </Link>
        </p>
      </div>
    </section>
  );
}

export function AboutPanel() {
  return (
    <section className="about-panel" aria-labelledby="karin-titel">
      <div className="about-panel__left">
        <h2 id="karin-titel" data-reveal>
          Ik denk met je mee.
        </h2>
        <div className="about-panel__photo gable" data-reveal style={d(150)}>
          <Image
            src={ordners}
            alt="Karin houdt een gele en een blauwe ordner vast"
            sizes="(max-width: 899px) 86vw, 38vw"
            placeholder="blur"
          />
        </div>
      </div>
      <div className="about-panel__right">
        <div data-reveal style={d(80)}>
          <h3>Maak kennis met Karin</h3>
          <p>
            Als ondernemer besteed je je tijd het liefst aan de dingen waar je goed in bent. Het administratieve deel
            is minstens zo belangrijk, maar niet voor iedereen makkelijk bij te houden. Loop je achter, dan geeft dat
            onrust. Daar help ik je graag bij.
          </p>
        </div>
        <div data-reveal style={d(160)}>
          <h3>Op afspraak in Gouda</h3>
          <p>
            Je bent welkom op mijn kantoor aan de {business.street}, in het bijgebouw achter. Bezoek is uitsluitend op
            afspraak, zo heb ik echt tijd voor je.
          </p>
        </div>
        <div data-reveal style={d(220)}>
          <Link href="/over-karin" className="btn">
            Meer over Karin <span className="tri" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const BULLET = ["var(--green)", "var(--ink)", "var(--copper)"];

export function Audience() {
  return (
    <section className="wrap audience" aria-labelledby="voorwie-titel">
      <h2 id="voorwie-titel" data-reveal>
        Voor ondernemers die overzicht willen
      </h2>
      <p className="audience__intro" data-reveal style={d(80)}>
        Ik werk vooral met starters, zzp&apos;ers en kleine ondernemers. Herken je jezelf niet helemaal? Vraag het
        gerust, dan kijken we samen wat er mogelijk is.
      </p>
      {audiences.map((cat, ci) => (
        <div key={cat.name}>
          <div className="audience__cat" data-reveal>
            <h3>{cat.name}</h3>
            <span>{cat.items.length} situaties</span>
          </div>
          <ul className="audience__items">
            {cat.items.map((it, i) => (
              <li key={it.title} data-reveal style={d(i * 80)}>
                <span className="bullet" style={{ background: BULLET[ci] }} aria-hidden="true" />
                <div>
                  <h4>{it.title}</h4>
                  <p>{it.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}

export function PricingFields({ withHead = true, headingLevel = 2 }: { withHead?: boolean; headingLevel?: 1 | 2 }) {
  const H = headingLevel === 1 ? "h1" : "h2";
  return (
    <section id="tarieven" aria-labelledby="tarieven-titel">
      {withHead ? (
        <div className="wrap pricing-head">
          <div>
            <H id="tarieven-titel" data-reveal>
              Geen standaardprijs
            </H>
            <p className="lead" data-reveal style={{ ...d(60), marginTop: 16 }}>
              Wel een persoonlijk voorstel.
            </p>
          </div>
          <p data-reveal style={d(120)}>
            Elke onderneming heeft een andere boekhouding. De één levert alles digitaal aan, de ander liever in een
            map. Daarom bespreek ik de prijs graag persoonlijk, en maken we samen een inschatting van wat je per maand
            of per kwartaal kwijt bent.
          </p>
        </div>
      ) : (
        <h2 id="tarieven-titel" className="sr-only">
          Twee manieren van aanleveren
        </h2>
      )}
      <div className="pricing-fields">
        <div className="field field--green">
          <h3 data-reveal>Liever in een map</h3>
          <p className="field__who" data-reveal style={d(80)}>
            Voor wie bonnen en facturen het liefst op papier bewaart.
          </p>
          <p className="field__incl" data-reveal style={d(140)}>
            Je levert je administratie aan in een map en ik neem het digitaliseren van je over. Het digitaal invoeren
            van inkoopbonnen en facturen is extra service, en dat nemen we mee in het voorstel.
          </p>
          <div className="field__foot">
            <p className="field__price">
              Op maat<small>per maand of per kwartaal</small>
            </p>
            <Link href="/contact#formulier" className="btn btn--light">
              Bespreek jouw situatie
            </Link>
          </div>
        </div>
        <div className="field field--sand">
          <h3 data-reveal>Alles digitaal</h3>
          <p className="field__who" data-reveal style={d(80)}>
            Voor wie bonnen en facturen al digitaal bewaart.
          </p>
          <p className="field__incl" data-reveal style={d(140)}>
            Je levert alles digitaal aan en ik controleer en werk je boekhouding wekelijks bij, inclusief je
            btw-aangifte per maand of kwartaal.
          </p>
          <div className="field__foot">
            <p className="field__price">
              Op maat<small>per maand of per kwartaal</small>
            </p>
            <Link href="/contact#formulier" className="btn btn--ink">
              Bespreek jouw situatie
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function PageIntro({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="wrap page-intro">
      <h1 data-reveal>{title}</h1>
      <div data-reveal style={d(90)}>
        {children}
      </div>
    </section>
  );
}

export function CtaBand({ title, text }: { title: string; text: string }) {
  return (
    <section className="cta-band" aria-labelledby="cta-titel">
      <div className="wrap">
        <h2 id="cta-titel" data-reveal>
          {title}
        </h2>
        <p data-reveal style={d(80)}>
          {text}
        </p>
        <div className="actions" data-reveal style={d(160)}>
          <Link href="/contact#formulier" className="btn btn--light">
            Plan een kennismaking <span className="tri" aria-hidden="true" />
          </Link>
          <a href={business.phoneHref} className="link">
            Bel {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}

export function ArchiveBand() {
  return (
    <section className="archive" aria-label="Administratie is van alle tijden">
      <figure data-reveal>
        <Image
          src={kasboek}
          alt="Opengeslagen handgeschreven kasboek uit de negentiende eeuw met kolommen bedragen"
          sizes="(max-width: 899px) 100vw, 58vw"
          placeholder="blur"
        />
        <figcaption>
          Kasboek van Anna Bernardine Baelde-Delprat, negentiende eeuw. Museum Rotterdam, CC BY-SA 3.0.
        </figcaption>
      </figure>
      <div className="archive__text">
        <p className="lead" data-reveal style={d(90)}>
          Administratie is van alle tijden. Alleen het gereedschap verandert.
        </p>
        <figure data-reveal style={d(160)}>
          <Image
            src={markt}
            alt="Ingekleurde ansichtkaart van de Markt en de Waag in Gouda rond 1905"
            sizes="(max-width: 899px) 100vw, 40vw"
            placeholder="blur"
          />
          <figcaption>De Markt en de Waag in Gouda, ca. 1905. Ansichtkaart, publiek domein.</figcaption>
        </figure>
      </div>
    </section>
  );
}
