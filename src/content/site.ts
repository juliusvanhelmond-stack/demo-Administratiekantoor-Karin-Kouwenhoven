/**
 * All facts on this site come from the official website kouwenhoven-admin.nl
 * (checked 19 November 2026). See DEMO_NOTES.md before changing anything here:
 * no prices, numbers, reviews or claims that Karin has not confirmed.
 */

export const business = {
  name: "Administratiekantoor Karin Kouwenhoven",
  shortName: "Karin Kouwenhoven",
  street: "Achterwillenseweg 54",
  streetNote: "bijgebouw achter",
  postalCode: "2805 JZ",
  city: "Gouda",
  visitNote: "Bezoek uitsluitend op afspraak",
  phoneDisplay: "06-34487426",
  phoneHref: "tel:+31634487426",
  whatsappHref: "https://api.whatsapp.com/send?phone=%2B31634487426",
  email: "Info@kouwenhoven-admin.nl",
  emailHref: "mailto:Info@kouwenhoven-admin.nl",
  kvk: "85461067",
  btw: "NL004098245B21",
  url: "https://www.kouwenhoven-admin.nl",
} as const;

export const nav = [
  { href: "/diensten", label: "Diensten" },
  { href: "/over-karin", label: "Over Karin" },
  { href: "/tarieven", label: "Tarieven" },
  { href: "/contact", label: "Contact" },
] as const;

export type ServiceKey =
  | "opstart"
  | "inrichten"
  | "bijwerken"
  | "btw"
  | "facturatie"
  | "invoeren"
  | "ib"
  | "jaarafsluiting"
  | "jaarstukken";

export type Service = {
  key: ServiceKey;
  title: string;
  short: string;
  example: string;
  group: "start" | "doorlopend" | "jaar" | "extra";
};

export const services: Service[] = [
  {
    key: "opstart",
    title: "Opstartbegeleiding",
    short: "Net begonnen? Ik help je op weg en zet je administratie vanaf het begin goed neer.",
    example:
      "Je hebt je net ingeschreven en wilt weten hoe je bonnen, facturen en betalingen vanaf de eerste dag overzichtelijk bijhoudt.",
    group: "start",
  },
  {
    key: "inrichten",
    title: "Digitale administratie inrichten",
    short: "Samen zetten we je administratie op in een digitaal boekhoudprogramma.",
    example:
      "Je werkt nu met losse mappen of een spreadsheet en wilt over naar een digitale boekhouding die je zelf ook kunt inzien.",
    group: "start",
  },
  {
    key: "bijwerken",
    title: "Wekelijks bijwerken",
    short: "Ik controleer en werk je digitale boekhouding elke week bij, zodat er niets blijft liggen.",
    example:
      "Je wilt niet elk kwartaal een stapel bonnen inhalen, maar een boekhouding die doorlopend klopt.",
    group: "doorlopend",
  },
  {
    key: "btw",
    title: "Btw-aangifte",
    short: "Per maand of per kwartaal, op tijd ingestuurd.",
    example:
      "De btw-aangifte komt steeds terug. Ik zorg dat hij op basis van je bijgewerkte administratie op tijd wordt ingestuurd.",
    group: "doorlopend",
  },
  {
    key: "facturatie",
    title: "Facturatie",
    short: "Het opmaken en versturen van je facturen kan ik voor je overnemen.",
    example:
      "Je spreekt met je klant af wat je levert; ik maak de factuur op en verstuur hem. Dit is extra service, in overleg.",
    group: "extra",
  },
  {
    key: "invoeren",
    title: "Bonnen en facturen invoeren",
    short: "Lever je liever een map aan? Dan digitaliseer en verwerk ik je inkoopbonnen en facturen.",
    example:
      "Je bewaart je bonnetjes liever op papier. Je levert ze aan in een map en ik voer ze digitaal in. Ook dit is extra service, in overleg.",
    group: "extra",
  },
  {
    key: "ib",
    title: "Inkomstenbelasting",
    short: "Hulp bij je aangifte inkomstenbelasting.",
    example:
      "Na het jaar volgt je aangifte inkomstenbelasting. Met een bijgewerkte administratie ligt de basis daarvoor al klaar.",
    group: "jaar",
  },
  {
    key: "jaarafsluiting",
    title: "Jaarafsluiting",
    short: "Het financiële boekjaar netjes afsluiten.",
    example: "Aan het einde van het jaar sluiten we samen je boekjaar af, zodat je met een schone lei begint.",
    group: "jaar",
  },
  {
    key: "jaarstukken",
    title: "Jaarstukken",
    short: "Het opstellen en deponeren van je jaarstukken.",
    example:
      "Moet je onderneming jaarstukken opstellen en deponeren? Dan neem ik dat voor je uit handen.",
    group: "jaar",
  },
];

export const steps = [
  {
    name: "Kennismaken",
    text: "We praten over je onderneming en hoe je administratie er nu bij ligt: digitaal, in een map of nog nergens.",
  },
  {
    name: "Inrichten",
    text: "We zetten je administratie op in een digitaal boekhoudprogramma en spreken af hoe je aanlevert.",
  },
  {
    name: "Samen bijhouden",
    text: "Ik controleer en werk je boekhouding wekelijks bij en zorg dat je btw-aangifte op tijd de deur uit gaat.",
  },
  {
    name: "Rust en inzicht",
    text: "Je administratie is bij en overzichtelijk. Jij houdt je hoofd bij je werk, en het boekjaar sluiten we samen af.",
  },
] as const;

export const audiences = [
  {
    name: "Starters",
    items: [
      {
        title: "Je bent net ingeschreven",
        text: "Ik help je op weg met het opzetten van je (digitale) administratie, zodat je vanaf het begin overzicht hebt.",
      },
      {
        title: "Je weet nog niet waar je moet beginnen",
        text: "In een kennismakingsgesprek lopen we samen door wat er bij jouw onderneming komt kijken.",
      },
    ],
  },
  {
    name: "Zzp'ers",
    items: [
      {
        title: "Je besteedt je tijd liever aan je vak",
        text: "Ik werk je boekhouding wekelijks bij, zodat jij je kunt richten op het werk waar je goed in bent.",
      },
      {
        title: "De btw-aangifte komt steeds terug",
        text: "Per maand of per kwartaal: ik zorg dat hij op tijd wordt ingestuurd.",
      },
    ],
  },
  {
    name: "Kleine ondernemers",
    items: [
      {
        title: "Je administratie is achtergelopen",
        text: "Ik denk met je mee en help je weer orde te krijgen, stap voor stap.",
      },
      {
        title: "Het boekjaar moet worden afgesloten",
        text: "Jaarafsluiting en het opstellen en deponeren van jaarstukken neem ik voor je uit handen.",
      },
    ],
  },
] as const;

export const faqs = [
  {
    tab: "Tarieven",
    q: "Wat kost het?",
    a: "Elke onderneming heeft een andere boekhouding, dus er is geen standaardprijs. In een kennismakingsgesprek maken we aan de hand van jouw situatie een inschatting van de kosten per maand of per kwartaal.",
  },
  {
    tab: "Bezoek",
    q: "Kan ik bij je langskomen?",
    a: "Ja, uitsluitend op afspraak. Mijn kantoor is aan de Achterwillenseweg 54 in Gouda, in het bijgebouw achter.",
  },
  {
    tab: "Starters",
    q: "Ik ben net gestart. Kun je me helpen?",
    a: "Graag. Ik begeleid je bij de opstart, inclusief het opzetten van je administratie in een digitaal boekhoudprogramma.",
  },
  {
    tab: "Aanleveren",
    q: "Ik bewaar alles in een map. Is dat een probleem?",
    a: "Nee. De ene ondernemer levert alles digitaal aan, de andere liever in een map. Het digitaal invoeren van je bonnen en facturen kan ik als extra service doen; dat bespreken we samen.",
  },
  {
    tab: "Btw",
    q: "Doe je de btw-aangifte per maand of per kwartaal?",
    a: "Allebei. Ik zorg dat je btw-aangifte op tijd wordt ingestuurd, op basis van je bijgewerkte administratie.",
  },
  {
    tab: "Samenwerking",
    q: "Heb ik alleen contact met jou?",
    a: "Meestal wel. Ik werk prettig samen met Ilse Geerts van Administratie & consultancy, dus het kan zijn dat je zo nu en dan ook contact met haar hebt.",
  },
] as const;

export const usefulLinks = [
  {
    title: "Belastingdienst",
    text: "Alles over het Nederlandse belastingstelsel en de Belastingdienst.",
    href: "https://www.belastingdienst.nl/",
  },
  {
    title: "Kamer van Koophandel",
    text: "Tips en adviezen voor ondernemers, van inschrijven tot groeien.",
    href: "https://www.kvk.nl/",
  },
  {
    title: "Factuureisen",
    text: "Aan welke eisen moet een factuur voldoen voor je btw-aangifte?",
    href: "https://www.belastingdienst.nl/wps/wcm/connect/bldcontentnl/belastingdienst/zakelijk/btw/administratie_bijhouden/facturen_maken/factuureisen/factuureisen",
  },
  {
    title: "Auto van de zaak",
    text: "Hoe zit het met de bijtelling als je de auto van de zaak ook privé gebruikt?",
    href: "https://www.belastingdienst.nl/wps/wcm/connect/nl/auto-en-vervoer/content/ik-ben-ondernemer-en-rij-in-een-auto-van-de-zaak-hoe-zit-het-met-privegebruik",
  },
] as const;

export const imageCredits = [
  "Portret: Karin Kouwenhoven, van kouwenhoven-admin.nl",
  "Bonnetje: Unsplash (iJMitgqRaZ8), Unsplash-licentie",
  "Gouda Stadhuis: Samuel Mudrík, CC BY-SA 4.0, via Wikimedia Commons",
  "Markt van Gouda ca. 1905: Simon Bakker, publiek domein, via Wikimedia Commons",
  "Kasboek van Anna Bernardine Baelde-Delprat: Museum Rotterdam, CC BY-SA 3.0, via Wikimedia Commons",
  "Oranjekerk Gouda ca. 1940: publiek domein, via Wikimedia Commons",
] as const;
