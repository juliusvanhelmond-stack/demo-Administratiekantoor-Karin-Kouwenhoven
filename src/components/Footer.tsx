import Link from "next/link";
import { business, imageCredits, nav, usefulLinks } from "@/content/site";
import { Mark } from "./Mark";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-mark" data-reveal>
          <Mark color="var(--green-bright)" bar="var(--on-ink)" strokeWidth={10} />
          <p className="footer-mark__name" aria-hidden="true">
            Kouwenhoven
          </p>
        </div>

        <div className="footer-cols">
          <div>
            <h2>Pagina&apos;s</h2>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/handige-links">Handige links</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Diensten</h2>
            <ul>
              <li>
                <Link href="/diensten#opstarten">Opstartbegeleiding</Link>
              </li>
              <li>
                <Link href="/diensten#doorlopend">Boekhouding &amp; btw</Link>
              </li>
              <li>
                <Link href="/diensten#jaar">Jaarafsluiting</Link>
              </li>
              <li>
                <Link href="/diensten#extra">Extra service</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2>Handige links</h2>
            <ul>
              {usefulLinks.slice(0, 2).map((l) => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer">
                    {l.title}
                    <span className="sr-only"> (opent in nieuw venster)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Contact</h2>
            <ul>
              <li>
                <a href={business.phoneHref}>{business.phoneDisplay}</a>
              </li>
              <li>
                <a href={business.emailHref}>{business.email}</a>
              </li>
              <li>
                <a href={business.whatsappHref} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                  <span className="sr-only"> (opent in nieuw venster)</span>
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2>{business.name}</h2>
            <address>
              <span>
                {business.street} ({business.streetNote})
                <br />
                {business.postalCode} {business.city}
              </span>
              <span>{business.visitNote}.</span>
              <span>
                KvK {business.kvk} · Btw {business.btw}
              </span>
            </address>
          </div>
        </div>

        <p className="footer-credits">Beeld: {imageCredits.join(" · ")}.</p>

        <div className="footer-base">
          <span>© {new Date().getFullYear()} {business.name}</span>
          <span>Demo-ontwerp door JUNEStudio, niet de officiële website.</span>
          <a href="#top" className="btn btn--light btn--small">
            Naar boven
          </a>
        </div>
      </div>
    </footer>
  );
}
