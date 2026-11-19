# DEMO_NOTES — Administratiekantoor Karin Kouwenhoven

Vrijblijvende redesign-demo door JUNEStudio. Geen officiële website. Gebouwd en getest op 19 november 2026.

---

## 1. Designconcept

**Concept:** *Rust in je administratie. Ruimte om te ondernemen.*

**Idee:** de open driehoek uit Karins eigen logo wordt het enige motief van de site. Ze komt terug als:

- de grote groene driehoek in de hero, waar losse papiertjes binnenwaaien en neerkomen als één nette stapel. Die stapel is de balk die in het logo door de driehoek loopt;
- een geveltop (driehoek op een rechthoek, zoals de gevels van Gouda) als kader voor elke foto;
- het kleine driehoekje als opsommingsteken, knopicoon en actieve markering;
- het woordmerk dat groot terugkomt in de footer.

**Het interactieve onderdeel:** *"Stel je kennismaking samen"* (homepage en /tarieven). De bezoeker kiest situatie, manier van aanleveren en gewenste hulp, en ziet die keuzes teruggelezen als een bonnetje. Onderaan staat geen bedrag maar **"Totaal: persoonlijk voorstel"**, met uitleg waarom het maatwerk is (bijv. aanleveren in een map = digitaliseren = extra werk). De keuzes gaan mee naar het contactformulier. Er staan bewust geen bedragen of prijsregels in.

**Overige interactie**
- Hero: papiertjes die neerkomen als de balk uit het logo (Motion, staat stil bij reduced motion).
- *Van losse bonnetjes naar overzicht* (werkwijze): scroll-gestuurd op desktop (sticky, geen scrolljacking; de pagina scrollt gewoon door), tikken op mobiel. Negen vellen gaan van los, naar stapeltjes, naar tabbladen, naar een gele ordner (de kleur van Karins ordner op haar eigen foto). Met de vermelding dat het een indicatie is en geen vast proces.
- FAQ als tabbladen in een la (een vraag tegelijk open, met toetsenbord te bedienen).
- Contact als bonnetje om uit te knippen (perforatie en inkepingen).
- Entree-animaties per sectie, hover- en drukstates op alle knoppen, een langzaam inzoomend heroportret.
- `prefers-reduced-motion`: geen beweging over afstand, de werkwijze-sectie is dan niet sticky, de hero staat meteen in eindstand. Content is zonder JavaScript zichtbaar (verborgen tot reveal alleen als `html.js` is gezet).

**Art direction-werkwijze:** taste skill v2 (`design-taste-frontend`), richting *One motif* (seed 1644027095), sectieblauwdrukken: Striped card beside the room (hero), Statement with inline thumbnails, Shape-marked small points, Object on a disc, Inset panel with shaped portrait, Two-column menu, Two plans/two fields, Tabbed index cards, Clip-out coupon form, The mark built large.

Aanpassingen op het voorgestelde ontwerp, met reden:
- **Kleuren**: het voorgestelde palet *Soot and lime* (zwart/limoen) past niet bij de brief (geen kille fintech) en niet bij het merk. De verhoudingen zijn gebleven (donker begin en eind, lichte middenstukken, één actiekleur), de kleuren komen uit de brief en uit Karins logo.
- **Lettertypen**: Libre Franklin en Source Serif 4 zijn gebleven, maar omgedraaid (serif voor koppen, sans voor lopende tekst), zoals de brief vraagt.
- **Signature move**: de voorgestelde *slow crossfade* is vervangen door de papiertjes die op hun plek vallen in de hero, omdat de brief die animatie expliciet vraagt en er maar één portret is.
- **Hero**: de streepjesband uit de blauwdruk is weggelaten. Er mag maar één motief zijn, en dat is de driehoek.

### Palet

| Rol | Kleur | Gebruik |
| --- | --- | --- |
| Ondergrond | `#F7F5F0` warm ivoor | pagina |
| Tekst / donkere vlakken | `#233743` inktblauw | tekst, hero-kaart, Karin-paneel, footer |
| Actie | `#4F6B22` logogroen (donkerder, contrast 6,1:1 met wit) | knoppen, links, actieve staat |
| Motief op donker | `#7FA33A` logogroen | grote driehoek, footer-merk |
| Vlakken | `#DED5C7` zand, `#ECE6DC` licht zand, `#C9D3C0` salie | secties, FAQ-kaarten, formulier |
| Accent (spaarzaam) | `#B78A69` koper | opsommingstekens, focusring |
| Alleen in tekening | `#E9B824` geel | de ordner (Karins eigen gele ordner) |

Lettertypen: **Source Serif 4** (koppen) en **Libre Franklin** (tekst), self-hosted via `@fontsource-variable`, dus geen externe font-requests.

---

## 2. Bestaande versus nieuwe assets

| Asset | Status |
| --- | --- |
| Portret van Karin met ordners (`karin-portret.jpg`, uitsnede `karin-ordners.jpg`) | **Bestaand**, van kouwenhoven-admin.nl (`img_3343-high`). Echt portret van Karin. |
| Foto verfrommeld bonnetje (`bonnetje.jpg`) | **Bestaand** op de huidige site (header-afbeelding), via de Unsplash-integratie van JouwWeb, foto-ID `iJMitgqRaZ8`. |
| Logo (driehoek + "K. Kouwenhoven Administratiekantoor") | **Bestaand** als JPG op de site. **Niet** als bestand gebruikt (alleen een kleine JPG met witte achtergrond en een typemachinelettertype). |
| Woordmerk + driehoek (`Mark.tsx`, `icon.svg`) | **Nieuw, DEMO-concept**: een vectorversie van de driehoek uit het logo met de balk, plus een typografisch woordmerk. Dit is **niet** het officiële logo. |
| Illustraties (papiertjes, stapels, ordner) | **Nieuw**, originele SVG in code. Geen AI-beelden. |
| Archiefbeelden Gouda en kasboek | **Nieuw toegevoegd**, open licenties (zie §4). Alleen als sfeerbeeld, nooit gepresenteerd als Karins kantoor of klanten. |
| Badge "Gecertificeerd Informer Adviseur" | Staat op de huidige site. **Niet** als beeld gebruikt (merk van Informer), wel als tekst op /over-karin (zie §3). |

---

## 3. Feiten, bronnen en onzekere gegevens

Bronnen opgehaald op 19-11-2026:

- https://www.kouwenhoven-admin.nl (home)
- https://www.kouwenhoven-admin.nl/diensten
- https://www.kouwenhoven-admin.nl/tarieven
- https://www.kouwenhoven-admin.nl/contact
- https://www.kouwenhoven-admin.nl/informatieve-websites

### Bevestigd (officiële site) en gebruikt

| Feit | Bron |
| --- | --- |
| Naam: Administratiekantoor Karin Kouwenhoven | alle pagina's |
| Doelgroep: zzp / zelfstandig ondernemer, starters ("Administratieve ondersteuning voor de zzp/zelfstandig ondernemer") | home |
| Diensten: opstartbegeleiding zzp/kleine ondernemer incl. set-up administratie; facturatie; btw-aangifte per maand of kwartaal; inkomstenbelasting; opstellen en deponeren van jaarstukken | home |
| Diensten: helpen opstarten in een digitaal boekhoudprogramma; wekelijks controleren en bijwerken van de digitale boekhouding; op tijd insturen btw-aangiftes; afsluiten financieel boekjaar | /diensten |
| Samenwerking met Ilse Geerts van Administratie & consultancy ("mogelijk ook zo nu en dan contact met haar") | /diensten |
| Tarieven: geen vast tarief; prijs persoonlijk besproken; inschatting per maand of kwartaal na kennismaking | /tarieven |
| Extra service bespreekbaar: facturatie; digitaal invoeren van alle inkoopbonnen en facturen | /tarieven |
| Aanleveren: digitaal of in een map | /tarieven |
| Adres: Achterwillenseweg 54 (bijgebouw achter), 2805 JZ Gouda, **bezoek enkel op afspraak** | /contact (home noemt "bijgebouw" zonder "achter") |
| Tel: 06-34487426 (WhatsApp-link naar hetzelfde nummer) | /contact, header |
| E-mail: Info@kouwenhoven-admin.nl | /contact |
| KvK 85461067, btw NL004098245B21 | /contact |
| Handige links: Belastingdienst, KvK, factuureisen, auto van de zaak | /informatieve-websites |
| Persoonlijke teksten in ik-vorm (eigen tijd aan je vak, administratie even belangrijk, onrust bij achterstand, "ik denk met je mee") | home, herschreven en ingekort |

### Bewust niet gebruikt
- **IBAN** en **Beconnummer** staan op de contactpagina, maar zijn weggelaten: bezoekers hebben ze niet nodig en het is gevoelige informatie.
- **Interne context** (parttime, beperkte investeringsruimte) staat nergens op de site.
- **Geen** aantallen klanten, jaren ervaring, besparingen, garanties, reviews, testimonials, prijzen, "vanaf"-bedragen of rekenhulp.

### Onzeker — laten bevestigen door Karin
1. **"Gecertificeerd Informer Adviseur"**: staat als badge op haar homepage en als tekst op /over-karin. Klopt dit nog?
2. **Inkomstenbelasting en jaarstukken**: staan op de homepage, maar niet op /diensten. Biedt ze dit nog steeds aan?
3. **Samenwerking met Ilse Geerts**: is die nog actueel, en wil Karin dit noemen?
4. Mag haar **portretfoto** in deze nieuwe context gebruikt worden (en wie is de fotograaf, voor de vermelding)?
5. De **werkwijze in vier stappen** (kennismaken, inrichten, samen bijhouden, rust en inzicht) is illustratief en staat op de site ook zo vermeld. Wil Karin dat het zo beschreven wordt?
6. "Vanuit Gouda": er wordt geen werkgebied genoemd. Werkt ze ook voor ondernemers buiten Gouda?
7. Welk **boekhoudprogramma** gebruikt ze? Dat staat niet op de site (wordt nu niet genoemd).
8. Teksten bij "Voor wie" en de FAQ zijn herschreven op basis van bovenstaande feiten. Toon en inhoud graag laten nakijken.

### Google Business
De link https://share.google/O8zvxigPRPjFvZZSC verwijst naar een Google-zoekresultaat (`Karin Kouwenhoven Administratiekantoor in Gouda`) dat alleen met JavaScript laadt. **Reviews en beoordelingen konden niet worden opgehaald.** Daarom staan er **geen reviews** op de site. Er is niets verzonnen.

---

## 4. Afbeeldingsbronnen en rechten

| Bestand | Titel / maker | Licentie | Bron | Vermelding |
| --- | --- | --- | --- | --- |
| `karin-portret.jpg`, `karin-ordners.jpg` | Portret Karin Kouwenhoven | Eigendom van Karin / haar fotograaf; **toestemming nodig** | kouwenhoven-admin.nl | footer |
| `bonnetje.jpg` | Verfrommeld bonnetje, Unsplash `iJMitgqRaZ8` (fotograaf niet te zien: unsplash.com gaf een botcontrole) | Unsplash-licentie (vrij te gebruiken, vermelding niet verplicht) | via JouwWeb-afbeelding op kouwenhoven-admin.nl | footer |
| `gouda-stadhuis.jpg` | "Gouda Stadhuis during sunny day 2017", Samuel Mudrík | CC BY-SA 4.0 | https://commons.wikimedia.org/w/index.php?curid=62698555 | footer + bijschrift /over-karin |
| `gouda-markt-1905.jpg` | "Markt van Gouda ca 1905", Simon Bakker | Publiek domein | https://commons.wikimedia.org/wiki/File:Markt_van_Gouda_ca_1905.jpg | footer + bijschriften |
| `kasboek.jpg` | "Kasboek van Anna Bernardine Baelde-Delprat", Museum Rotterdam | CC BY-SA 3.0 | https://commons.wikimedia.org/w/index.php?curid=89137415 | footer + bijschrift homepage |
| `gouda-oranjekerk-1940.jpg` | "Oranjekerk Gouda, ca. 1940", uitgever J. Sleding | Publiek domein | https://commons.wikimedia.org/wiki/File:Oranjekerk_Gouda,_ca._1940.jpg | footer + bijschrift /contact ("ter sfeer, niet het kantoor") |

De beelden zijn alleen verkleind (JPEG) en daarnaast via CSS bijgesneden (geveltop). De CC BY-SA-beelden zijn niet inhoudelijk bewerkt. Volledige metadata staat in `src/assets/credits.json`. Afbeeldingen worden door `next/image` geoptimaliseerd (AVIF/WebP, responsive `sizes`, blur-placeholder).

---

## 5. Contactformulier

- Velden: naam*, e-mail*, telefoon (optioneel), vraag*, toestemming*. Er wordt **niet** gevraagd naar BSN, bankgegevens of belastingdocumenten; de site waarschuwt daar ook voor.
- Validatie in de browser met foutmeldingen per veld (`aria-invalid`, `aria-describedby`), en de focus springt naar het eerste veld met een fout.
- **Er is geen backend.** Bij versturen opent het e-mailprogramma van de bezoeker een **`mailto:`** naar Info@kouwenhoven-admin.nl, met onderwerp en tekst al ingevuld (inclusief de keuzes uit "Stel je kennismaking samen"). De site zegt eerlijk *"Je e-mailprogramma wordt geopend… verstuur het daar"* en laat het bericht zien om te kopiëren. **Er is geen nep-succesmelding.**
- **Nodig voor livegang** (één van):
  - een formulierdienst (bijv. Formspree, Basin of Web3Forms) of een Next.js Route Handler met een e-maildienst (Resend, Postmark), met spambescherming (honeypot of Turnstile);
  - een **privacyverklaring**: die bestaat nu niet op de huidige site en is **niet verzonnen**. Karin moet die aanleveren of laten opstellen, en daarna wordt hij gelinkt bij het formulier en in de footer.

---

## 6. Tests die echt zijn uitgevoerd

Alles is uitgevoerd tegen een productiebuild (`next build && next start`) op localhost, in Chromium (Playwright).

| Check | Resultaat |
| --- | --- |
| `npx tsc --noEmit` | geslaagd |
| `npm run lint` (eslint-config-next) | 0 fouten, 0 waarschuwingen |
| `npm run build` | geslaagd, alle 11 routes statisch |
| `node tests/e2e.cjs` (Playwright) | **211/211 checks geslaagd** |
| Taste-skill `lint.mjs` (verboden patronen in de bron) | 0 FAIL, 0 WARN |
| Taste-skill `inspect.mjs` homepage (1440/768/390) | **0 FAIL**, 4 WARN (zie hieronder) |

`tests/e2e.cjs` controleert: 7 routes × 4 breedtes (375, 768, 1280, 1440) op HTTP-status (incl. 404-pagina), console-errors, horizontale overflow, geladen afbeeldingen, precies één h1 en of alle entree-animaties verschijnen; alle interne links (200); tel- en mailto-links; desktopnavigatie en `aria-current`; het mobiele menu (openen, Escape, navigeren en sluiten); de FAQ (muis en toetsenbord); het bonnetje (keuzes, uitleg, geen bedragen, doorgifte aan het formulier); het formulier (lege velden, ongeldig e-mailadres, focus, eerlijke mailto-melding, geen BSN/IBAN-velden); de werkwijze (scroll gaat van stap 1 naar 4, tikken op mobiel); reduced motion; de skiplink en zichtbare focus.

Screenshots: `docs/screenshots/` (verkleind). Volledige PNG's worden lokaal gemaakt in `screenshots/` (staat in .gitignore).

**Verbeterrondes na het bekijken van de screenshots**
1. Hero-kop liep over 3 tot 4 regels: opnieuw doorgemeten en geschaald zodat hij op elke breedte op 2 regels past. De driehoek overlapte de knoppen: verplaatst.
2. Werkwijze: de kop schoof over de tekening en de uitleg viel weg achter de vorm. Vorm kleiner gemaakt en verplaatst, kop over twee regels, minder lange sticky-sectie (260vh), actieve stap in groen, op mobiel een 2×2-raster in plaats van een zijwaarts scrollende rij.
3. FAQ-tabbladen gaven horizontale overflow op 768 px: posities zijn nu relatief aan de breedte.
4. Te weinig echte beelden: band met een kasboek en een ansichtkaart van Gouda toegevoegd, de inline-miniaturen vergroot.
5. Mobiel: woordmerk brak af, footer-merk werd afgesneden, e-mailadres brak in de coupon: allemaal opgelost.
6. De h1 op /contact was klein (de selector pakte alleen h2): opgelost.
7. Lopende tekst stond in grijs: nu in de volle inktkleur. Formulier- en footertekst minimaal 16 px.

**Overgebleven waarschuwingen (bewust)**
- *palette-cream*: het warme ivoor `#F7F5F0` komt letterlijk uit de brief.
- *no-footage*: er is geen eerlijke video van Karin of haar kantoor. Stockvideo zou nep aanvoelen.
- *size-count*: de tekstgroottes vloeien mee met de schermbreedte, daardoor meet de inspector meer losse waarden.
- *mixed-font-headline*: het driehoekje in de kopjes is een vorm, geen ander lettertype.

**Beperkingen**
- Alleen getest in Chromium (geen Safari of Firefox, geen echte mobiele toestellen).
- Geen Lighthouse-meting en geen schermlezertest. Toegankelijkheid is gecontroleerd via semantiek, labels, focus en contrast (berekend).
- De skill `web-design-guidelines` (Vercel) was **niet beschikbaar** in deze omgeving. De bijbehorende punten (semantiek, formulieren, focus, contrast, reduced motion, overflow, links) zijn met de hand en via de testsuite afgevinkt.
- Google Business was niet uit te lezen (zie §3).

---

## 7. Te bevestigen vóór livegang

- [ ] Akkoord van Karin op alle teksten, vooral §3 punten 1 t/m 8.
- [ ] Toestemming en fotografenvermelding voor het portret.
- [ ] Officieel logo als vectorbestand, of akkoord op het nieuwe woordmerk.
- [ ] Formulier-backend kiezen en instellen (§5) of bewust bij `mailto:` blijven.
- [ ] Privacyverklaring aanleveren en linken.
- [ ] Indexeren aanzetten: `robots` in `src/app/layout.tsx` (`index: true`) en `src/app/robots.ts` (`allow: "/"`). Staat nu bewust op noindex, omdat dit een demo is.
- [ ] Domein en `metadataBase` controleren (nu `https://www.kouwenhoven-admin.nl`).
- [ ] Eventueel echte Google-reviews tonen, alleen met toestemming en via een officiële bron.
- [ ] Eventueel een Open Graph-afbeelding toevoegen.
- [ ] Testen in Safari en op echte telefoons.

---

## 8. Techniek

- Next.js 15 (App Router, statische export van alle routes), React 19, TypeScript, Tailwind CSS 4 (tokens via `@theme`), Motion 12 (`motion/react`).
- Structuur: `src/content/site.ts` (alle feiten en teksten op één plek), `src/components/*` (secties), `src/app/*` (routes: `/`, `/diensten`, `/over-karin`, `/tarieven`, `/contact`, `/handige-links`, 404, sitemap, robots, icon).
- SEO: Nederlandse title en description per pagina, `lang="nl"`, JSON-LD `AccountingService` met alleen geverifieerde gegevens (naam, adres, telefoon, e-mail, url).
- Zelfstandige repository (`demo-Administratiekantoor-Karin-Kouwenhoven`); te deployen als gewoon Next.js-project (bijv. Vercel, framework preset Next.js).
