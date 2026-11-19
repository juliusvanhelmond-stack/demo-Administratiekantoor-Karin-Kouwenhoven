import type { Metadata } from "next";
import Image from "next/image";
import { ContactCoupon } from "@/components/ContactCoupon";
import { business } from "@/content/site";
import oranjekerk from "@/assets/img/gouda-oranjekerk-1940.jpg";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met Administratiekantoor Karin Kouwenhoven in Gouda. Bel 06-34487426 of mail Info@kouwenhoven-admin.nl. Bezoek uitsluitend op afspraak.",
};

const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${business.street}, ${business.postalCode} ${business.city}`,
)}`;

export default function ContactPage() {
  return (
    <>
      <ContactCoupon headingLevel={1} />
      <section className="wrap split" aria-labelledby="bezoek-t" style={{ paddingBottom: 0 }}>
        <div data-reveal>
          <h2 id="bezoek-t" className="head">
            Op afspraak in Gouda
          </h2>
          <p className="lead" style={{ marginTop: 24 }}>
            {business.street} ({business.streetNote})
            <br />
            {business.postalCode} {business.city}
          </p>
          <p style={{ marginTop: 16 }}>
            Bezoek is uitsluitend op afspraak. Bel, mail of stuur een WhatsApp-bericht, dan plannen we een moment.
          </p>
          <p style={{ marginTop: 24 }}>
            <a className="link" href={mapsHref} target="_blank" rel="noopener noreferrer">
              Bekijk de route in Google Maps<span className="sr-only"> (opent in nieuw venster)</span>
            </a>
          </p>
          <dl className="small" style={{ marginTop: 40, display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 20px" }}>
            <dt>KvK</dt>
            <dd style={{ margin: 0 }}>{business.kvk}</dd>
            <dt>Btw</dt>
            <dd style={{ margin: 0 }}>{business.btw}</dd>
          </dl>
        </div>
        <figure style={{ margin: 0 }} data-reveal>
          <Image
            src={oranjekerk}
            alt="Ansichtkaart van de Oranjekerk aan de Stationsweg in Gouda, rond 1940"
            sizes="(max-width: 899px) 100vw, 55vw"
            style={{ width: "100%", height: "auto" }}
          />
          <figcaption className="small muted" style={{ marginTop: 10 }}>
            Gouda rond 1940, de Oranjekerk aan de Stationsweg. Ansichtkaart, publiek domein. Ter sfeer, niet het
            kantoor.
          </figcaption>
        </figure>
      </section>
    </>
  );
}
