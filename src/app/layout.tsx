import type { Metadata, Viewport } from "next";
import "@fontsource-variable/source-serif-4/index.css";
import "@fontsource-variable/libre-franklin/index.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealRoot } from "@/components/Reveal";
import { IntakeProvider } from "@/components/IntakeContext";
import { business } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: "Administratiekantoor Karin Kouwenhoven, Gouda | Voor zzp'ers en starters",
    template: "%s | Administratiekantoor Karin Kouwenhoven, Gouda",
  },
  description:
    "Persoonlijke administratieve ondersteuning voor zzp'ers, starters en kleine ondernemers in Gouda: digitale administratie, boekhouding, btw-aangifte en jaarafsluiting.",
  openGraph: {
    type: "website",
    locale: "nl_NL",
    siteName: business.name,
  },
  // Demo: keep out of search engines until Karin approves a launch.
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#f7f5f0",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: business.name,
  url: business.url,
  telephone: "+31634487426",
  email: business.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.street,
    postalCode: business.postalCode,
    addressLocality: business.city,
    addressCountry: "NL",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" id="top">
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a href="#inhoud" className="skip-link">
          Naar de inhoud
        </a>
        <IntakeProvider>
          <Header />
          <main id="inhoud">{children}</main>
          <Footer />
        </IntakeProvider>
        <RevealRoot />
      </body>
    </html>
  );
}
