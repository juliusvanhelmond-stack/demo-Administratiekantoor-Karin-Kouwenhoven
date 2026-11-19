import { AboutPanel, ArchiveBand, Audience, Hero, PricingFields, ServicesSplit, Statement } from "@/components/Sections";
import { Werkwijze } from "@/components/Werkwijze";
import { IntakeComposer } from "@/components/IntakeComposer";
import { Faq } from "@/components/Faq";
import { ContactCoupon } from "@/components/ContactCoupon";

export default function Home() {
  return (
    <>
      <Hero />
      <Statement />
      <ServicesSplit />
      <Werkwijze />
      <AboutPanel />
      <Audience />
      <ArchiveBand />
      <PricingFields />
      <IntakeComposer formHref="#formulier" />
      <Faq />
      <ContactCoupon />
    </>
  );
}
