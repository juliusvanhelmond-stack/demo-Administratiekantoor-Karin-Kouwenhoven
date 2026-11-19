import type { Metadata } from "next";
import { PageIntro, PricingFields } from "@/components/Sections";
import { IntakeComposer } from "@/components/IntakeComposer";
import { ContactCoupon } from "@/components/ContactCoupon";

export const metadata: Metadata = {
  title: "Tarieven",
  description:
    "Geen standaardprijs, wel een persoonlijk voorstel. De kosten hangen af van je administratie en hoe je aanlevert. Bespreek je situatie met Karin.",
};

export default function TarievenPage() {
  return (
    <>
      <PageIntro title="Tarieven">
        <p className="lead">Geen standaardprijs, wel een persoonlijk voorstel.</p>
        <p style={{ marginTop: 16 }}>
          Elke onderneming heeft een andere boekhouding, dus vooraf een vast tarief noemen is niet eerlijk. In een
          kennismakingsgesprek maken we aan de hand van jouw situatie een inschatting van de kosten per maand of per
          kwartaal.
        </p>
      </PageIntro>
      <PricingFields withHead={false} />
      <IntakeComposer formHref="#formulier" />
      <ContactCoupon />
    </>
  );
}
