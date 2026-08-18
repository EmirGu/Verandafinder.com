/* ==========================================================================
   Verandafinder.com — Bedrijvendata
   --------------------------------------------------------------------------
   LET OP: dit zijn FICTIEVE VOORBEELDBEDRIJVEN zodat de site direct volledig
   werkt. Vervang ze door echte aangesloten bedrijven vóór livegang.

   Schema per bedrijf:
   id               unieke slug (gebruikt in URL: bedrijf.html?id=...)
   naam             bedrijfsnaam
   plaats/provincie vestigingsplaats
   werkgebied       provincies waar het bedrijf werkt, of ["Landelijk"]
   opgericht        jaartal
   kleur            merkkleur voor logo/omslag (hex)
   rating           gemiddelde score 1–5 (1 decimaal)
   aantalReviews    totaal aantal beoordelingen
   prijsPerM2       { min, max } richtprijs in euro per m², incl. montage
   prijsKlasse      "budget" | "midden" | "premium"
   producten        uit PRODUCTEN (veranda, tuinkamer, carport, lamellendak, terrasoverkapping)
   typen            materialen uit MATERIALEN (aluminium, hout, staal, kunststof)
   dakTypen         uit DAKTYPEN (glas, polycarbonaat, sandwichpaneel, lamellen)
   opties           sleutels uit OPTIES
   keurmerken       lijst met keurmerk-namen
   garantieJaren    garantie op constructie
   levertijdWeken   gemiddelde levertijd
   montageEigenTeam montage door eigen monteurs (bool)
   showroom         eigen showroom (bool)
   gratisOfferte    (bool)
   projectenPerJaar indicatie aantal projecten
   telefoon         fictief nummer
   beschrijving     korte introductie (2–3 zinnen)
   usps             3–4 unieke sterke punten
   reviews          [{ naam, plaats, datum "JJJJ-MM", score 1–5, titel, tekst, project }]
   ========================================================================== */

const PROVINCIES = [
  "Drenthe", "Flevoland", "Friesland", "Gelderland", "Groningen", "Limburg",
  "Noord-Brabant", "Noord-Holland", "Overijssel", "Utrecht", "Zeeland", "Zuid-Holland"
];

const PRODUCTEN = {
  veranda: "Veranda",
  terrasoverkapping: "Terrasoverkapping",
  tuinkamer: "Tuinkamer",
  lamellendak: "Lamellendak / pergola",
  carport: "Carport"
};

const MATERIALEN = {
  aluminium: "Aluminium",
  hout: "Hout",
  staal: "Staal",
  kunststof: "Kunststof"
};

const DAKTYPEN = {
  glas: "Glazen dak",
  polycarbonaat: "Polycarbonaat dak",
  sandwichpaneel: "Sandwichpanelen (dicht dak)",
  lamellen: "Kantelbare lamellen"
};

const OPTIES = {
  led: "LED-verlichting",
  zonwering: "Zonwering (screens)",
  schuifwanden: "Glazen schuifwanden",
  spiewanden: "Spie- en zijwanden",
  maatwerk: "Volledig maatwerk",
  fundering: "Fundering & bestrating",
  elektra: "Elektra & verwarming",
  onderhoud: "Onderhoudsservice"
};

const PRIJSKLASSEN = {
  budget: "Budget",
  midden: "Middensegment",
  premium: "Premium"
};

const BEDRIJVEN = [
  {
    id: "zonneveld-verandas",
    naam: "Zonneveld Veranda's",
    plaats: "Apeldoorn", provincie: "Gelderland",
    werkgebied: ["Gelderland", "Overijssel", "Utrecht", "Flevoland"],
    opgericht: 2004, kleur: "#2c5e46",
    rating: 4.8, aantalReviews: 214,
    prijsPerM2: { min: 380, max: 640 }, prijsKlasse: "midden",
    producten: ["veranda", "terrasoverkapping", "tuinkamer"],
    typen: ["aluminium", "hout"], dakTypen: ["glas", "polycarbonaat"],
    opties: ["led", "zonwering", "schuifwanden", "spiewanden", "maatwerk", "elektra"],
    keurmerken: ["Erkend Verandabouwer", "SGB Garantiefonds"],
    garantieJaren: 10, levertijdWeken: 6,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 420, telefoon: "088 - 204 10 01",
    beschrijving: "Zonneveld Veranda's bouwt al twintig jaar veranda's en tuinkamers op de Veluwe en ver daarbuiten. Het familiebedrijf combineert eigen productie in Apeldoorn met vaste montageteams, waardoor levertijden kort blijven en de kwaliteit constant is.",
    usps: ["Eigen productie in Nederland", "Vaste montageteams in loondienst", "10 jaar garantie op de constructie", "Showroom met 14 opstellingen"],
    reviews: [
      { naam: "Henk B.", plaats: "Deventer", datum: "2026-06", score: 5, titel: "Vakwerk van begin tot eind", tekst: "Strakke planning, nette monteurs en het resultaat is prachtig. De veranda stond er binnen één dag.", project: "Aluminium veranda 6×3,5 m met glazen dak" },
      { naam: "Marieke V.", plaats: "Apeldoorn", datum: "2026-04", score: 5, titel: "Denken echt met je mee", tekst: "In de showroom kregen we eerlijk advies, ook over wat we níet nodig hadden. Dat schept vertrouwen.", project: "Tuinkamer met schuifwanden" },
      { naam: "Jos T.", plaats: "Zutphen", datum: "2026-02", score: 4, titel: "Goede prijs-kwaliteit", tekst: "Kleine vertraging in de levering, maar daar werd netjes over gecommuniceerd. Eindresultaat is dik in orde.", project: "Veranda met polycarbonaat dak" },
      { naam: "Annet D.", plaats: "Epe", datum: "2025-11", score: 5, titel: "Ook de nazorg klopt", tekst: "Na een storm zat er een kraakje in een profiel; binnen een week opgelost, zonder discussie.", project: "Veranda 5×3 m met zonwering" }
    ]
  },
  {
    id: "terrasleven",
    naam: "TerrasLeven",
    plaats: "Utrecht", provincie: "Utrecht",
    werkgebied: ["Utrecht", "Noord-Holland", "Zuid-Holland", "Gelderland"],
    opgericht: 2011, kleur: "#1f4d5c",
    rating: 4.9, aantalReviews: 168,
    prijsPerM2: { min: 520, max: 890 }, prijsKlasse: "premium",
    producten: ["veranda", "tuinkamer", "lamellendak"],
    typen: ["aluminium", "staal"], dakTypen: ["glas", "lamellen"],
    opties: ["led", "zonwering", "schuifwanden", "maatwerk", "elektra", "onderhoud"],
    keurmerken: ["Erkend Verandabouwer", "KOMO-gecertificeerd"],
    garantieJaren: 15, levertijdWeken: 8,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 260, telefoon: "088 - 204 10 02",
    beschrijving: "TerrasLeven ontwerpt architectonische veranda's en tuinkamers in het hogere segment. Elk project wordt op maat getekend door een eigen ontwerper, met minimalistische profielen en hoogwaardige afwerking als handtekening.",
    usps: ["Eigen ontwerpstudio met 3D-visualisatie", "15 jaar constructiegarantie", "Minimalistische, rankste profielen van de markt", "Jaarlijkse onderhoudsservice mogelijk"],
    reviews: [
      { naam: "Sandra K.", plaats: "Zeist", datum: "2026-07", score: 5, titel: "Ontwerp overtrof onze verwachting", tekst: "Het 3D-ontwerp maakte de keuze makkelijk en het eindresultaat is nóg mooier. Echt een verlengstuk van ons huis.", project: "Tuinkamer 7×4 m op maat" },
      { naam: "Pieter en Ellen R.", plaats: "Amersfoort", datum: "2026-05", score: 5, titel: "Premium, en dat voel je", tekst: "Niet de goedkoopste, wel de beste beslissing voor ons huis. Afwerking tot in de kleinste details.", project: "Lamellendak met screens" },
      { naam: "Bas W.", plaats: "Houten", datum: "2026-01", score: 5, titel: "Perfecte communicatie", tekst: "Eén vast aanspreekpunt van offerte tot oplevering. Alles wat is beloofd, is nagekomen.", project: "Veranda met glazen schuifwanden" },
      { naam: "Carola M.", plaats: "Utrecht", datum: "2025-09", score: 4, titel: "Prachtig, wel geduld nodig", tekst: "De levertijd was met tien weken langer dan gehoopt, maar de kwaliteit maakt veel goed.", project: "Stalen veranda met glasdak" }
    ]
  },
  {
    id: "alutuin-overkappingen",
    naam: "AluTuin Overkappingen",
    plaats: "Rotterdam", provincie: "Zuid-Holland",
    werkgebied: ["Zuid-Holland", "Zeeland", "Noord-Brabant"],
    opgericht: 2015, kleur: "#4a6fa5",
    rating: 4.3, aantalReviews: 342,
    prijsPerM2: { min: 240, max: 420 }, prijsKlasse: "budget",
    producten: ["veranda", "terrasoverkapping", "carport"],
    typen: ["aluminium"], dakTypen: ["polycarbonaat", "glas"],
    opties: ["led", "spiewanden", "fundering"],
    keurmerken: ["Thuiswinkel Waarborg"],
    garantieJaren: 5, levertijdWeken: 3,
    montageEigenTeam: false, showroom: true, gratisOfferte: true,
    projectenPerJaar: 900, telefoon: "088 - 204 10 03",
    beschrijving: "AluTuin levert degelijke aluminium overkappingen tegen scherpe prijzen. Door standaardmaten slim te combineren met een efficiënte planning is een overkapping vaak al binnen drie weken geplaatst.",
    usps: ["Scherpste prijzen in de regio", "Levering binnen 3 weken", "Grote voorraad standaardmaten", "Ook zelfbouwpakketten leverbaar"],
    reviews: [
      { naam: "Mo E.", plaats: "Schiedam", datum: "2026-06", score: 4, titel: "Prima voor deze prijs", tekst: "Geen luxe merk, wel gewoon een degelijke overkapping voor een eerlijk bedrag. Montageploeg werkte snel.", project: "Terrasoverkapping 5×3 m polycarbonaat" },
      { naam: "Linda J.", plaats: "Spijkenisse", datum: "2026-03", score: 5, titel: "Snel geregeld", tekst: "Binnen twee weken van offerte naar plaatsing. Voor onze huurwoning-verbouwing precies wat we zochten.", project: "Carport aluminium" },
      { naam: "Ruud V.", plaats: "Dordrecht", datum: "2025-12", score: 3, titel: "Let op de planning", tekst: "De montage werd twee keer verzet omdat ze met externe ploegen werken. Resultaat uiteindelijk netjes.", project: "Veranda 4×3 m" },
      { naam: "Fatima A.", plaats: "Rotterdam", datum: "2025-10", score: 5, titel: "Goede service in de showroom", tekst: "Duidelijke uitleg over de verschillen tussen dakplaten. Niks aangesmeerd, wel goed geholpen.", project: "Veranda met heldere dakplaten" }
    ]
  },
  {
    id: "van-bergen-buitenleven",
    naam: "Van Bergen Buitenleven",
    plaats: "Eindhoven", provincie: "Noord-Brabant",
    werkgebied: ["Noord-Brabant", "Limburg", "Gelderland"],
    opgericht: 1998, kleur: "#7a4a2b",
    rating: 4.7, aantalReviews: 189,
    prijsPerM2: { min: 460, max: 780 }, prijsKlasse: "premium",
    producten: ["veranda", "tuinkamer", "terrasoverkapping"],
    typen: ["hout", "aluminium"], dakTypen: ["glas", "sandwichpaneel"],
    opties: ["led", "zonwering", "schuifwanden", "spiewanden", "maatwerk", "fundering", "elektra"],
    keurmerken: ["Erkend Verandabouwer", "FSC-gecertificeerd hout"],
    garantieJaren: 12, levertijdWeken: 9,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 180, telefoon: "088 - 204 10 04",
    beschrijving: "Van Bergen Buitenleven is sinds 1998 specialist in houten en hybride veranda's met een klassieke of landelijke uitstraling. De eigen timmerwerkplaats in Eindhoven maakt vrijwel alles op maat, inclusief complete tuinkamers met elektra en verwarming.",
    usps: ["Eigen timmerwerkplaats sinds 1998", "Specialist in landelijke stijl", "FSC-hout en duurzame lakken", "Complete projecten incl. fundering"],
    reviews: [
      { naam: "Theo en Ria S.", plaats: "Veldhoven", datum: "2026-05", score: 5, titel: "Ambacht bestaat nog", tekst: "Onze houten veranda past perfect bij de jaren-30-woning. Je ziet en voelt het vakmanschap.", project: "Houten veranda 6×3 m met glasdak" },
      { naam: "Jeroen D.", plaats: "Helmond", datum: "2026-02", score: 5, titel: "Alles uit één hand", tekst: "Van fundering tot elektra: één partij, één planning. Dat werkte fantastisch.", project: "Tuinkamer met verwarming" },
      { naam: "Karin L.", plaats: "Best", datum: "2025-12", score: 4, titel: "Mooi maar plan ruim", tekst: "Maatwerk kost tijd; negen weken levertijd werd elf. Het resultaat mag er absoluut zijn.", project: "Veranda landelijke stijl" },
      { naam: "Willem H.", plaats: "Eindhoven", datum: "2025-08", score: 5, titel: "Na 8 jaar nog steeds blij", tekst: "Tweede project met dit bedrijf. Onze eerste veranda staat er na acht jaar nog perfect bij.", project: "Terrasoverkapping hout/aluminium" }
    ]
  },
  {
    id: "verandadirect-nederland",
    naam: "VerandaDirect Nederland",
    plaats: "Zwolle", provincie: "Overijssel",
    werkgebied: ["Landelijk"],
    opgericht: 2017, kleur: "#b3542e",
    rating: 4.1, aantalReviews: 780,
    prijsPerM2: { min: 210, max: 380 }, prijsKlasse: "budget",
    producten: ["veranda", "terrasoverkapping", "carport"],
    typen: ["aluminium", "kunststof"], dakTypen: ["polycarbonaat", "glas"],
    opties: ["led", "spiewanden"],
    keurmerken: ["Thuiswinkel Waarborg"],
    garantieJaren: 5, levertijdWeken: 2,
    montageEigenTeam: false, showroom: false, gratisOfferte: true,
    projectenPerJaar: 2100, telefoon: "088 - 204 10 05",
    beschrijving: "VerandaDirect is de grootste online aanbieder van standaard veranda's van Nederland. Bestellen gaat volledig online met vaste pakketprijzen; montage kan door een regionale partner of als zelfbouw.",
    usps: ["Laagste-prijsgarantie op standaardmaten", "Levering door heel Nederland binnen 2 weken", "Online configurator met directe prijs", "Zelfbouw of montage door partner"],
    reviews: [
      { naam: "Dennis K.", plaats: "Emmen", datum: "2026-07", score: 4, titel: "Zelfbouw prima te doen", tekst: "Met twee man in een weekend gebouwd. Handleiding was duidelijk, alle onderdelen compleet.", project: "Zelfbouw veranda 4×2,5 m" },
      { naam: "Priya N.", plaats: "Almere", datum: "2026-04", score: 4, titel: "Je krijgt wat je bestelt", tekst: "Standaardmaat, standaardkwaliteit, scherpe prijs. Precies wat de website belooft, niet meer en niet minder.", project: "Terrasoverkapping 5×3 m" },
      { naam: "Gerard B.", plaats: "Venlo", datum: "2026-01", score: 3, titel: "Klantenservice traag", tekst: "Eén beschadigde dakplaat; vervanging duurde drie weken en veel mailtjes. Product zelf is prima.", project: "Veranda met polycarbonaat" },
      { naam: "Sylvia R.", plaats: "Goes", datum: "2025-11", score: 5, titel: "Verrassend goed", tekst: "Voor deze prijs had ik minder verwacht. De montagepartner werkte netjes en snel.", project: "Carport 6×3 m" }
    ]
  },
  {
    id: "groenendael-tuinkamers",
    naam: "Groenendael Tuinkamers",
    plaats: "Haarlem", provincie: "Noord-Holland",
    werkgebied: ["Noord-Holland", "Zuid-Holland", "Utrecht"],
    opgericht: 2008, kleur: "#3d5a3a",
    rating: 4.9, aantalReviews: 121,
    prijsPerM2: { min: 580, max: 950 }, prijsKlasse: "premium",
    producten: ["tuinkamer", "veranda"],
    typen: ["aluminium", "hout"], dakTypen: ["glas", "sandwichpaneel"],
    opties: ["led", "zonwering", "schuifwanden", "maatwerk", "elektra", "fundering", "onderhoud"],
    keurmerken: ["Erkend Verandabouwer", "KOMO-gecertificeerd", "SGB Garantiefonds"],
    garantieJaren: 15, levertijdWeken: 10,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 110, telefoon: "088 - 204 10 06",
    beschrijving: "Groenendael bouwt geïsoleerde tuinkamers die het hele jaar bruikbaar zijn: van lichte veranda-uitbouw tot volwaardige leefruimte met verwarming, elektra en dubbel glas. Ieder project start met een ontwerpgesprek aan huis.",
    usps: ["Specialist in geïsoleerde, jaarrond tuinkamers", "Ontwerpgesprek en inmeting aan huis", "15 jaar garantie, eigen servicedienst", "Vergunningsaanvraag wordt verzorgd"],
    reviews: [
      { naam: "Esther en Mark V.", plaats: "Heemstede", datum: "2026-06", score: 5, titel: "Onze favoriete kamer van het huis", tekst: "De tuinkamer is 's winters warm en 's zomers koel. Groenendael regelde zelfs de vergunning.", project: "Geïsoleerde tuinkamer 5×4 m" },
      { naam: "Hans P.", plaats: "Haarlem", datum: "2026-03", score: 5, titel: "Topkwaliteit, top team", tekst: "Monteurs die om 8:00 beginnen en om 17:00 de tuin bezemschoon achterlaten. Zeldzaam tegenwoordig.", project: "Tuinkamer met schuifpui" },
      { naam: "Ingrid Z.", plaats: "Leiden", datum: "2025-12", score: 5, titel: "Vergunning volledig ontzorgd", tekst: "Wij hoefden alleen te tekenen. Alle gemeentelijke rompslomp werd uit handen genomen.", project: "Tuinkamer aan monumentaal pand" },
      { naam: "Frank O.", plaats: "Hoofddorp", datum: "2025-09", score: 4, titel: "Prijzig maar het waard", tekst: "Fors bedrag, maar kwaliteit en service rechtvaardigen het. Tien weken wachten was het lastigste.", project: "Veranda met vast zijpaneel" }
    ]
  },
  {
    id: "de-haan-veranda-kozijn",
    naam: "De Haan Veranda & Kozijn",
    plaats: "Groningen", provincie: "Groningen",
    werkgebied: ["Groningen", "Friesland", "Drenthe"],
    opgericht: 2006, kleur: "#33566e",
    rating: 4.5, aantalReviews: 203,
    prijsPerM2: { min: 330, max: 560 }, prijsKlasse: "midden",
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "carport"],
    typen: ["aluminium", "kunststof"], dakTypen: ["glas", "polycarbonaat", "sandwichpaneel"],
    opties: ["led", "zonwering", "schuifwanden", "spiewanden", "elektra"],
    keurmerken: ["Erkend Verandabouwer"],
    garantieJaren: 10, levertijdWeken: 5,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 350, telefoon: "088 - 204 10 07",
    beschrijving: "De Haan is dé veranda- en kozijnenspecialist van Noord-Nederland. Doordat kozijnen en schuifwanden uit dezelfde fabriek komen, sluiten veranda en woning naadloos op elkaar aan — praktisch én in stijl.",
    usps: ["Grootste aanbieder van Noord-Nederland", "Veranda én kozijnen uit één hand", "Eigen monteurs, geen onderaannemers", "Ook 's winters gewoon montage"],
    reviews: [
      { naam: "Tjeerd V.", plaats: "Assen", datum: "2026-05", score: 5, titel: "Noordelijke nuchterheid", tekst: "Geen gladde verkooppraat, gewoon een eerlijk advies en strak werk. Zo hoort het.", project: "Veranda 5×3 m met zonwering" },
      { naam: "Anneke D.", plaats: "Groningen", datum: "2026-02", score: 4, titel: "Mooi geheel met nieuwe pui", tekst: "Veranda en nieuwe schuifpui in één project. Scheelde gedoe met twee partijen en het kleurt perfect.", project: "Veranda + schuifpui" },
      { naam: "Rink H.", plaats: "Winsum", datum: "2025-11", score: 5, titel: "Montage in december, geen punt", tekst: "Andere bedrijven wilden pas in maart komen. De Haan stond er gewoon in de winter, netjes op tijd.", project: "Terrasoverkapping sandwichdak" },
      { naam: "Petra K.", plaats: "Leek", datum: "2025-07", score: 4, titel: "Degelijk en betrouwbaar", tekst: "Alles verliep volgens afspraak. De offerte was tot op de euro wat we uiteindelijk betaalden.", project: "Carport met berging" }
    ]
  },
  {
    id: "buitenzicht-overkappingen",
    naam: "Buitenzicht Overkappingen",
    plaats: "Amersfoort", provincie: "Utrecht",
    werkgebied: ["Utrecht", "Gelderland", "Flevoland", "Noord-Holland"],
    opgericht: 2013, kleur: "#5b7c4f",
    rating: 4.6, aantalReviews: 257,
    prijsPerM2: { min: 350, max: 590 }, prijsKlasse: "midden",
    producten: ["veranda", "terrasoverkapping", "lamellendak"],
    typen: ["aluminium"], dakTypen: ["glas", "polycarbonaat", "lamellen"],
    opties: ["led", "zonwering", "schuifwanden", "spiewanden", "maatwerk"],
    keurmerken: ["Erkend Verandabouwer", "SGB Garantiefonds"],
    garantieJaren: 10, levertijdWeken: 5,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 480, telefoon: "088 - 204 10 08",
    beschrijving: "Buitenzicht is een allround verandabouwer in het midden van het land met een breed aanbod: van klassieke glazen veranda tot modern lamellendak. Bekend om snelle, flexibele planning en transparante vaste prijzen.",
    usps: ["Vaste all-in prijzen, geen verrassingen", "Breed aanbod incl. lamellendaken", "Gemiddeld 5 weken levertijd", "9,2 voor montagebeleving"],
    reviews: [
      { naam: "Rob en Sanne T.", plaats: "Nijkerk", datum: "2026-07", score: 5, titel: "All-in prijs klopte exact", tekst: "Wat op de offerte stond, was wat we betaalden — inclusief alles. Erg prettig vergeleken met andere offertes vol kleine lettertjes.", project: "Veranda 6×3 m glazen dak" },
      { naam: "Miriam F.", plaats: "Soest", datum: "2026-04", score: 5, titel: "Lamellendak is een aanrader", tekst: "Perfect advies over lamellen versus vast dak. We gebruiken het terras nu drie keer zo vaak.", project: "Lamellendak 4×4 m" },
      { naam: "Kees J.", plaats: "Barneveld", datum: "2026-01", score: 4, titel: "Nette afhandeling", tekst: "Kleine schade aan een goot bij montage, maar zonder discussie dezelfde week hersteld.", project: "Terrasoverkapping polycarbonaat" },
      { naam: "Dilek A.", plaats: "Amersfoort", datum: "2025-10", score: 4, titel: "Goede middenklasse keus", tekst: "Prijs en kwaliteit netjes in balans. De showroom hielp enorm bij het kiezen van de kleur.", project: "Veranda antraciet met spiewanden" }
    ]
  },
  {
    id: "fries-veranda-huis",
    naam: "Fries Veranda Huis",
    plaats: "Leeuwarden", provincie: "Friesland",
    werkgebied: ["Friesland", "Groningen", "Flevoland", "Overijssel"],
    opgericht: 2009, kleur: "#2e5f8a",
    rating: 4.7, aantalReviews: 146,
    prijsPerM2: { min: 340, max: 570 }, prijsKlasse: "midden",
    producten: ["veranda", "terrasoverkapping", "tuinkamer"],
    typen: ["aluminium", "hout"], dakTypen: ["glas", "polycarbonaat"],
    opties: ["led", "zonwering", "schuifwanden", "spiewanden", "maatwerk", "onderhoud"],
    keurmerken: ["Erkend Verandabouwer"],
    garantieJaren: 10, levertijdWeken: 6,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 240, telefoon: "088 - 204 10 09",
    beschrijving: "Fries Veranda Huis bouwt veranda's die bestand zijn tegen het noordelijke klimaat: extra windbelasting, zeewaterbestendige coatings en versterkte goten zijn standaard. Persoonlijk contact staat voorop bij dit familiebedrijf.",
    usps: ["Constructies berekend op kustklimaat", "Zeewaterbestendige coating standaard", "Familiebedrijf met vaste monteurs", "Gratis jaarlijkse controlebeurt (eerste 3 jaar)"],
    reviews: [
      { naam: "Sjoerd W.", plaats: "Harlingen", datum: "2026-06", score: 5, titel: "Stormvast aan de kust", tekst: "Wij wonen pal achter de dijk. Na twee najaarsstormen staat alles er nog exact bij zoals opgeleverd.", project: "Veranda 5×3 m kustuitvoering" },
      { naam: "Baukje H.", plaats: "Sneek", datum: "2026-03", score: 5, titel: "Persoonlijk en betrokken", tekst: "De eigenaar kwam zelf inmeten en dacht mee over de beste positie ten opzichte van de zon.", project: "Tuinkamer op het zuiden" },
      { naam: "Douwe K.", plaats: "Drachten", datum: "2025-12", score: 4, titel: "Prima ervaring", tekst: "Duidelijke offerte, vlotte montage. De controlebeurt na een jaar is een mooie extra service.", project: "Terrasoverkapping met LED" },
      { naam: "Janke S.", plaats: "Heerenveen", datum: "2025-08", score: 5, titel: "Hout op zijn mooist", tekst: "Onze houten veranda is met zoveel zorg afgewerkt. Buren vragen steeds wie hem gebouwd heeft.", project: "Houten veranda 4×3 m" }
    ]
  },
  {
    id: "sunside-lamellendaken",
    naam: "SunSide Lamellendaken",
    plaats: "Breda", provincie: "Noord-Brabant",
    werkgebied: ["Noord-Brabant", "Zuid-Holland", "Zeeland", "Limburg"],
    opgericht: 2016, kleur: "#c77d1b",
    rating: 4.6, aantalReviews: 134,
    prijsPerM2: { min: 540, max: 920 }, prijsKlasse: "premium",
    producten: ["lamellendak", "veranda", "terrasoverkapping"],
    typen: ["aluminium"], dakTypen: ["lamellen", "glas"],
    opties: ["led", "zonwering", "schuifwanden", "elektra", "maatwerk"],
    keurmerken: ["Erkend Verandabouwer", "KOMO-gecertificeerd"],
    garantieJaren: 10, levertijdWeken: 7,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 190, telefoon: "088 - 204 10 10",
    beschrijving: "SunSide is dé specialist in elektrisch kantelbare lamellendaken: open als de zon schijnt, dicht als het regent. Inclusief slimme bediening via app, regensensoren en geïntegreerde LED en heaters.",
    usps: ["Pure specialist in lamellendaken", "App-bediening en regensensor standaard", "Geïntegreerde verlichting en verwarming", "Waterdicht getest tot slagregen"],
    reviews: [
      { naam: "Stefan de G.", plaats: "Breda", datum: "2026-07", score: 5, titel: "Techniek die gewoon werkt", tekst: "De regensensor sluit de lamellen automatisch. We hebben nog nooit nat gezeten, ook niet bij plotselinge buien.", project: "Lamellendak 5×4 m met sensoren" },
      { naam: "Nicole B.", plaats: "Roosendaal", datum: "2026-04", score: 5, titel: "Ons terras is een kamer geworden", tekst: "Met de heaters en screens zitten we van maart tot november buiten. Beste investering in jaren.", project: "Lamellendak met screens en heaters" },
      { naam: "Ad V.", plaats: "Tilburg", datum: "2026-01", score: 4, titel: "Even wennen aan de app", tekst: "De bediening had wat kinderziektes, maar na een software-update werkt alles vlekkeloos.", project: "Lamellendak 4×3,5 m" },
      { naam: "Chantal P.", plaats: "Etten-Leur", datum: "2025-10", score: 4, titel: "Mooi product, nette montage", tekst: "Twee dagen montage, keurig opgeruimd. De meerprijs ten opzichte van een vast dak is het ons waard.", project: "Lamellendak met LED" }
    ]
  },
  {
    id: "hout-en-zo-verandas",
    naam: "Hout & Zo Veranda's",
    plaats: "Arnhem", provincie: "Gelderland",
    werkgebied: ["Gelderland", "Utrecht", "Overijssel", "Noord-Brabant"],
    opgericht: 2001, kleur: "#8a5a2b",
    rating: 4.8, aantalReviews: 167,
    prijsPerM2: { min: 420, max: 720 }, prijsKlasse: "midden",
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "carport"],
    typen: ["hout"], dakTypen: ["glas", "polycarbonaat", "sandwichpaneel"],
    opties: ["led", "spiewanden", "maatwerk", "fundering", "onderhoud"],
    keurmerken: ["FSC-gecertificeerd hout", "Erkend Verandabouwer"],
    garantieJaren: 12, levertijdWeken: 8,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 150, telefoon: "088 - 204 10 11",
    beschrijving: "Hout & Zo bouwt uitsluitend houten veranda's — van douglas tot eiken — en dat al meer dan twintig jaar. Alle constructies komen uit de eigen werkplaats in Arnhem en worden traditioneel pen-gat verbonden.",
    usps: ["100% houtspecialist (douglas, lariks, eiken)", "Traditionele pen-gatverbindingen", "FSC-hout uit Europese bossen", "Onderhoudsabonnement met beitsservice"],
    reviews: [
      { naam: "Maarten R.", plaats: "Oosterbeek", datum: "2026-06", score: 5, titel: "Eiken veranda als meubelstuk", tekst: "Dit is geen bouwpakket maar timmermanswerk. De pen-gatverbindingen zijn prachtig om te zien.", project: "Eiken veranda 6×3,5 m" },
      { naam: "Sofie L.", plaats: "Ede", datum: "2026-03", score: 5, titel: "Warme uitstraling", tekst: "Douglas hout geeft zoveel meer sfeer dan aluminium. Het advies over beits en onderhoud was eerlijk en compleet.", project: "Douglas veranda met glasdak" },
      { naam: "Erik B.", plaats: "Wageningen", datum: "2025-12", score: 4, titel: "Kwaliteit heeft een wachttijd", tekst: "Acht weken levertijd werd tien, maar het maatwerk is fantastisch. Plan er ruim voor.", project: "Houten tuinkamer" },
      { naam: "Joke v.d. B.", plaats: "Arnhem", datum: "2025-09", score: 5, titel: "Beitsservice is goud waard", tekst: "Elke twee jaar komen ze langs voor onderhoud. De veranda ziet er na vier jaar als nieuw uit.", project: "Veranda lariks met carport" }
    ]
  },
  {
    id: "polyterras",
    naam: "PolyTerras",
    plaats: "Almere", provincie: "Flevoland",
    werkgebied: ["Flevoland", "Noord-Holland", "Utrecht", "Overijssel"],
    opgericht: 2019, kleur: "#607a86",
    rating: 3.9, aantalReviews: 226,
    prijsPerM2: { min: 200, max: 350 }, prijsKlasse: "budget",
    producten: ["terrasoverkapping", "veranda", "carport"],
    typen: ["aluminium", "kunststof"], dakTypen: ["polycarbonaat"],
    opties: ["led", "spiewanden"],
    keurmerken: [],
    garantieJaren: 3, levertijdWeken: 2,
    montageEigenTeam: false, showroom: false, gratisOfferte: true,
    projectenPerJaar: 1200, telefoon: "088 - 204 10 12",
    beschrijving: "PolyTerras richt zich op de scherpste prijs voor een polycarbonaat overkapping. Bestel online in vaste maten en kies voor bezorging, zelfbouw of montage door een aangesloten klusbedrijf.",
    usps: ["Vaste pakketprijzen vanaf € 1.495", "Levering binnen 2 weken", "Zelfbouwvriendelijke pakketten", "Grootste voorraad van de Randstad"],
    reviews: [
      { naam: "Kevin M.", plaats: "Almere", datum: "2026-05", score: 4, titel: "Budget, maar functioneel", tekst: "Voor nog geen twee mille een droog terras. Profielen zijn dunner dan bij dure merken, maar het staat stevig.", project: "Overkapping 4×2,5 m zelfbouw" },
      { naam: "Aisha B.", plaats: "Lelystad", datum: "2026-02", score: 3, titel: "Montagepartner wisselend", tekst: "Het pakket zelf is prima; de ingehuurde monteur kwam te laat en liet afval achter. Volgende keer zelfbouwen.", project: "Veranda 5×3 m" },
      { naam: "John V.", plaats: "Hilversum", datum: "2025-12", score: 4, titel: "Doet wat het moet doen", tekst: "Geen showroomkwaliteit, wel gewoon droog zitten voor weinig geld. Verwachtingsmanagement is alles.", project: "Carport polycarbonaat" },
      { naam: "Monique T.", plaats: "Huizen", datum: "2025-10", score: 4, titel: "Snel en simpel", tekst: "Online besteld op maandag, vrijdag geleverd. Bouwtekening was helder, in een dag gemonteerd.", project: "Overkapping 3×2,5 m" }
    ]
  },
  {
    id: "limburg-veranda-specialist",
    naam: "Limburg Veranda Specialist",
    plaats: "Maastricht", provincie: "Limburg",
    werkgebied: ["Limburg", "Noord-Brabant"],
    opgericht: 2010, kleur: "#7d3b53",
    rating: 4.6, aantalReviews: 158,
    prijsPerM2: { min: 360, max: 600 }, prijsKlasse: "midden",
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "lamellendak"],
    typen: ["aluminium", "hout"], dakTypen: ["glas", "polycarbonaat", "lamellen"],
    opties: ["led", "zonwering", "schuifwanden", "spiewanden", "maatwerk", "elektra"],
    keurmerken: ["Erkend Verandabouwer", "SGB Garantiefonds"],
    garantieJaren: 10, levertijdWeken: 6,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 290, telefoon: "088 - 204 10 13",
    beschrijving: "Limburg Veranda Specialist combineert Bourgondisch buitenleven met degelijke techniek. De grote showtuin in Maastricht toont twaalf opstellingen in echte tuinsettings, inclusief lamellendaken en tuinkamers.",
    usps: ["Showtuin met 12 opstellingen in echte tuinen", "Ook heuvellandschap: schuine percelen geen probleem", "Tweetalige service (NL/DE)", "Gratis ontwerpservice aan huis"],
    reviews: [
      { naam: "Raymond H.", plaats: "Heerlen", datum: "2026-06", score: 5, titel: "Ook op ons schuine perceel", tekst: "Drie bedrijven durfden ons aflopende terras niet aan. Hier hadden ze er een passende oplossing voor.", project: "Veranda op talud met maatwerkfundering" },
      { naam: "Marij C.", plaats: "Maastricht", datum: "2026-03", score: 5, titel: "De showtuin overtuigde ons", tekst: "Je ziet de overkappingen in echte tuinen staan in plaats van een steriele hal. Dat maakte kiezen zoveel makkelijker.", project: "Lamellendak 4×4 m" },
      { naam: "Guido S.", plaats: "Sittard", datum: "2025-11", score: 4, titel: "Nette middenklasser", tekst: "Solide product en vriendelijke monteurs. De LED-spots zaten in eerste instantie verkeerd, snel omgezet.", project: "Veranda met LED en screens" },
      { naam: "Bianca W.", plaats: "Roermond", datum: "2025-08", score: 4, titel: "Goede begeleiding", tekst: "Van kleurkeuze tot vergunningcheck: overal werd aan gedacht. Aanrader voor Limburg.", project: "Tuinkamer 5×3 m" }
    ]
  },
  {
    id: "zeeuwse-overkappingen",
    naam: "Zeeuwse Overkappingen",
    plaats: "Middelburg", provincie: "Zeeland",
    werkgebied: ["Zeeland", "Zuid-Holland", "Noord-Brabant"],
    opgericht: 2012, kleur: "#2b6777",
    rating: 4.4, aantalReviews: 112,
    prijsPerM2: { min: 320, max: 540 }, prijsKlasse: "midden",
    producten: ["veranda", "terrasoverkapping", "carport"],
    typen: ["aluminium"], dakTypen: ["glas", "polycarbonaat"],
    opties: ["led", "zonwering", "spiewanden", "fundering"],
    keurmerken: ["Erkend Verandabouwer"],
    garantieJaren: 10, levertijdWeken: 5,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 210, telefoon: "088 - 204 10 14",
    beschrijving: "Zeeuwse Overkappingen bouwt zoutbestendige aluminium overkappingen speciaal voor het kustklimaat. Alle profielen krijgen een extra zeewaterbestendige poedercoating en verzwaarde verankering tegen de Zeeuwse wind.",
    usps: ["Zoutbestendige coating standaard", "Verzwaarde windverankering", "Specialist in vakantiewoningen en recreatieparken", "Korte lijnen: eigenaar op elke bouwplaats"],
    reviews: [
      { naam: "Cor B.", plaats: "Vlissingen", datum: "2026-05", score: 5, titel: "Bestand tegen de kustwind", tekst: "Op 500 meter van het strand en geen enkel probleem met roest of trillingen. Degelijk Zeeuws werk.", project: "Veranda 5×3 m kustuitvoering" },
      { naam: "Jacqueline M.", plaats: "Goes", datum: "2026-01", score: 4, titel: "Prima voor onze vakantiewoning", tekst: "Ze kennen de eisen van recreatieparken goed en regelden alles met de parkbeheerder.", project: "Overkapping recreatiewoning" },
      { naam: "Rien de V.", plaats: "Terneuzen", datum: "2025-11", score: 4, titel: "Betrouwbare partij", tekst: "De eigenaar kwam zelf de oplevering controleren. Klein puntje met een goot direct verholpen.", project: "Carport dubbele breedte" },
      { naam: "Karin O.", plaats: "Middelburg", datum: "2025-07", score: 4, titel: "Goede ervaring", tekst: "Vlotte communicatie via WhatsApp, montage in één dag. De screens werken perfect tegen de laagstaande zon.", project: "Veranda met zonwering" }
    ]
  },
  {
    id: "drentse-veranda-bouwers",
    naam: "Drentse Veranda Bouwers",
    plaats: "Assen", provincie: "Drenthe",
    werkgebied: ["Drenthe", "Groningen", "Overijssel", "Friesland"],
    opgericht: 2014, kleur: "#5d6b3c",
    rating: 4.2, aantalReviews: 174,
    prijsPerM2: { min: 260, max: 440 }, prijsKlasse: "budget",
    producten: ["veranda", "terrasoverkapping", "carport"],
    typen: ["aluminium", "hout"], dakTypen: ["polycarbonaat", "glas"],
    opties: ["led", "spiewanden", "fundering"],
    keurmerken: ["Erkend Verandabouwer"],
    garantieJaren: 7, levertijdWeken: 4,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 380, telefoon: "088 - 204 10 15",
    beschrijving: "Drentse Veranda Bouwers levert no-nonsense veranda's voor een eerlijke prijs. Geen dure showroom aan de snelweg maar een loods vol voorraad, eigen monteurs en korte lijnen — dat scheelt in de prijs.",
    usps: ["Eerlijke noordelijke prijzen", "Eigen monteurs, geen onderaannemers", "Uit voorraad leverbaar in 4 weken", "Ook houten maatwerk mogelijk"],
    reviews: [
      { naam: "Bert K.", plaats: "Hoogeveen", datum: "2026-04", score: 4, titel: "Gewoon goed geregeld", tekst: "Geen poespas, wel een strakke veranda voor honderden euro's minder dan elders geoffreerd.", project: "Veranda 5×2,5 m polycarbonaat" },
      { naam: "Hilda J.", plaats: "Assen", datum: "2026-02", score: 4, titel: "Snelle levering", tekst: "Binnen een maand geplaatst terwijl anderen het over een kwartaal hadden. Kwaliteit prima voor de prijs.", project: "Terrasoverkapping met LED" },
      { naam: "Jan-Willem P.", plaats: "Meppel", datum: "2025-12", score: 4, titel: "Doen wat ze beloven", tekst: "Offerte, planning, montage: alles klopte. De afwerking is netjes, geen premium maar dat verwacht je ook niet.", project: "Carport 6×3 m" },
      { naam: "Geesje V.", plaats: "Emmen", datum: "2025-09", score: 5, titel: "Verrassend veel keus", tekst: "Dachten aan standaard aluminium, werden goed geadviseerd over een houten variant die bij de boerderij past.", project: "Houten veranda 6×3 m" }
    ]
  },
  {
    id: "elegant-glas-veranda",
    naam: "Elegant Glas & Veranda",
    plaats: "Den Haag", provincie: "Zuid-Holland",
    werkgebied: ["Zuid-Holland", "Noord-Holland", "Utrecht"],
    opgericht: 2007, kleur: "#3f4d63",
    rating: 4.8, aantalReviews: 143,
    prijsPerM2: { min: 490, max: 850 }, prijsKlasse: "premium",
    producten: ["veranda", "tuinkamer"],
    typen: ["aluminium", "staal"], dakTypen: ["glas"],
    opties: ["led", "zonwering", "schuifwanden", "maatwerk", "elektra", "onderhoud"],
    keurmerken: ["Erkend Verandabouwer", "KOMO-gecertificeerd"],
    garantieJaren: 12, levertijdWeken: 8,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 160, telefoon: "088 - 204 10 16",
    beschrijving: "Elegant Glas & Veranda is gespecialiseerd in volledig glazen veranda's en tuinkamers met een luxe, stadse uitstraling. Denk aan rimpelloos glas van goot tot vloer, geïntegreerde LED-lijnen en elektrische zonwering.",
    usps: ["Specialist in volglas-concepten", "Glazen schuifwanden zonder zichtbare profielen", "Eigen glaszettersteam", "Design-advies aan huis inbegrepen"],
    reviews: [
      { naam: "Alexander V.", plaats: "Wassenaar", datum: "2026-06", score: 5, titel: "Strak, strakker, strakst", tekst: "De schuifwanden lopen naadloos in elkaar over. Gasten denken dat de veranda bij de architectuur van het huis hoort.", project: "Volglas veranda 7×3,5 m" },
      { naam: "Charlotte D.", plaats: "Den Haag", datum: "2026-03", score: 5, titel: "Stijlvol resultaat", tekst: "Het design-advies maakte het verschil: de LED-lijnen en antracieten profielen passen perfect bij ons interieur.", project: "Glazen tuinkamer met LED-lijnen" },
      { naam: "Menno K.", plaats: "Voorburg", datum: "2025-12", score: 5, titel: "Vakmensen", tekst: "Het glaszettersteam werkte millimeterprecies. Na een jaar nog geen enkel kiertje of lekje.", project: "Veranda met elektrische screens" },
      { naam: "Yvonne R.", plaats: "Delft", datum: "2025-09", score: 4, titel: "Premium prijs, premium werk", tekst: "Fors duurder dan de gemiddelde offerte, maar het eindresultaat is van een ander niveau.", project: "Glazen veranda 5×3 m" }
    ]
  },
  {
    id: "tuinkamer-atelier",
    naam: "TuinKamer Atelier",
    plaats: "Amsterdam", provincie: "Noord-Holland",
    werkgebied: ["Noord-Holland", "Utrecht", "Flevoland"],
    opgericht: 2012, kleur: "#4b3d5c",
    rating: 4.7, aantalReviews: 98,
    prijsPerM2: { min: 550, max: 940 }, prijsKlasse: "premium",
    producten: ["tuinkamer", "veranda"],
    typen: ["hout", "aluminium", "staal"], dakTypen: ["glas", "sandwichpaneel"],
    opties: ["led", "zonwering", "schuifwanden", "maatwerk", "elektra", "fundering"],
    keurmerken: ["Erkend Verandabouwer", "FSC-gecertificeerd hout"],
    garantieJaren: 12, levertijdWeken: 11,
    montageEigenTeam: true, showroom: false, gratisOfferte: true,
    projectenPerJaar: 70, telefoon: "088 - 204 10 17",
    beschrijving: "TuinKamer Atelier ontwerpt en bouwt unieke tuinkamers voor stadstuinen: compact, slim en met veel oog voor licht. Elk ontwerp is één keer gemaakt — van thuiswerkstudio tot glazen leefkeukenuitbouw.",
    usps: ["Elk project een uniek ontwerp", "Specialist in kleine stadstuinen", "Architect in het team", "Ervaring met vergunningen in Amsterdam"],
    reviews: [
      { naam: "Floor B.", plaats: "Amsterdam", datum: "2026-05", score: 5, titel: "Klein terras, groots resultaat", tekst: "In onze tuin van 5 bij 6 meter is een tuinkamer verrezen die groter voelt dan de woonkamer. Kunst.", project: "Tuinkamer-studio 3×4 m" },
      { naam: "Daan V.", plaats: "Amstelveen", datum: "2026-02", score: 5, titel: "Van vergunning tot lamp", tekst: "In Amsterdam is een vergunning krijgen een vak apart. Zij kennen de weg en regelden alles.", project: "Uitbouw-veranda grachtenpand" },
      { naam: "Sara L.", plaats: "Haarlem", datum: "2025-11", score: 4, titel: "Maatwerk vergt geduld", tekst: "Elf weken wachten is lang, maar je krijgt dan ook geen catalogusproduct. Elk detail is doordacht.", project: "Thuiswerkstudio met sedumdak" },
      { naam: "Tim en Roos J.", plaats: "Zaandam", datum: "2025-08", score: 5, titel: "Denken in oplossingen", tekst: "Schuine erfgrens, oude fundering, lastige buren: voor alles kwam een oplossing. Topteam.", project: "Tuinkamer 4×3 m maatwerk" }
    ]
  },
  {
    id: "achterhoek-verandas",
    naam: "Achterhoek Veranda's",
    plaats: "Doetinchem", provincie: "Gelderland",
    werkgebied: ["Gelderland", "Overijssel"],
    opgericht: 2005, kleur: "#456545",
    rating: 4.7, aantalReviews: 187,
    prijsPerM2: { min: 310, max: 520 }, prijsKlasse: "midden",
    producten: ["veranda", "terrasoverkapping", "carport", "tuinkamer"],
    typen: ["aluminium", "hout"], dakTypen: ["glas", "polycarbonaat", "sandwichpaneel"],
    opties: ["led", "zonwering", "schuifwanden", "spiewanden", "fundering", "maatwerk"],
    keurmerken: ["Erkend Verandabouwer", "SGB Garantiefonds"],
    garantieJaren: 10, levertijdWeken: 5,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 330, telefoon: "088 - 204 10 18",
    beschrijving: "Achterhoek Veranda's is een nuchter familiebedrijf met een grote schare vaste klanten in Oost-Nederland. Vader en twee zoons runnen de zaak: één offerte, één aanspreekpunt en altijd iemand die je terugbelt.",
    usps: ["Familiebedrijf: korte lijnen, snelle service", "Altijd binnen 24 uur reactie", "Scherpe middenklasse prijzen", "Grote showroom aan de A18"],
    reviews: [
      { naam: "Gerrit H.", plaats: "Doetinchem", datum: "2026-06", score: 5, titel: "Zo hoort een familiebedrijf te werken", tekst: "Zaterdagochtend gebeld met een vraag, maandagmiddag stond er iemand op de stoep. Ongekend.", project: "Veranda 6×3 m met schuifwanden" },
      { naam: "Wilma T.", plaats: "Winterswijk", datum: "2026-03", score: 5, titel: "Eerlijke prijs, eerlijk verhaal", tekst: "Kregen elders een offerte die duizenden euro's hoger lag voor hetzelfde. Hier geen borrelpraat maar gewoon een goede prijs.", project: "Terrasoverkapping 5×3 m" },
      { naam: "Harold B.", plaats: "Zutphen", datum: "2025-12", score: 4, titel: "Degelijk werk", tekst: "Montage duurde iets langer door vorst, maar er werd netjes gecommuniceerd. Resultaat is keurig.", project: "Carport met sandwichdak" },
      { naam: "Ans K.", plaats: "Lochem", datum: "2025-10", score: 5, titel: "Al de derde uit de familie", tekst: "Mijn broer en zus gingen ons voor. Alle drie tevreden, dat zegt genoeg.", project: "Veranda met spiewanden" }
    ]
  },
  {
    id: "twentse-veranda-fabriek",
    naam: "Twentse Veranda Fabriek",
    plaats: "Enschede", provincie: "Overijssel",
    werkgebied: ["Overijssel", "Gelderland", "Drenthe"],
    opgericht: 2010, kleur: "#8f4a3d",
    rating: 4.4, aantalReviews: 265,
    prijsPerM2: { min: 270, max: 460 }, prijsKlasse: "budget",
    producten: ["veranda", "terrasoverkapping", "carport"],
    typen: ["aluminium"], dakTypen: ["polycarbonaat", "glas"],
    opties: ["led", "zonwering", "spiewanden"],
    keurmerken: ["Erkend Verandabouwer"],
    garantieJaren: 8, levertijdWeken: 3,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 620, telefoon: "088 - 204 10 19",
    beschrijving: "De Twentse Veranda Fabriek produceert aluminium veranda's in eigen fabriek in Enschede en levert rechtstreeks aan de consument — zonder tussenhandel. Fabrieksprijzen met de zekerheid van eigen montageteams.",
    usps: ["Rechtstreeks van de fabriek, geen tussenhandel", "Levertijd slechts 3 weken", "Eigen fabriek in Twente bezoeken kan", "Eigen montagedienst"],
    reviews: [
      { naam: "Herman W.", plaats: "Hengelo", datum: "2026-07", score: 5, titel: "Fabrieksprijs, nette kwaliteit", tekst: "We bezochten de fabriek en zagen onze veranda gemaakt worden. Transparanter kan niet.", project: "Veranda 5×3 m antraciet" },
      { naam: "Ilse G.", plaats: "Almelo", datum: "2026-04", score: 4, titel: "Vlot en voordelig", tekst: "Drie weken na de offerte stond alles. Prijs was honderden euro's onder vergelijkbare aanbiedingen.", project: "Terrasoverkapping met screens" },
      { naam: "Bennie H.", plaats: "Oldenzaal", datum: "2026-01", score: 4, titel: "Goede standaardkwaliteit", tekst: "Niet het meest luxe profiel, wel strak gemonteerd en waterdicht. Voor deze prijs niks op aan te merken.", project: "Veranda 4×3 m" },
      { naam: "Trudy S.", plaats: "Enschede", datum: "2025-11", score: 4, titel: "Aanrader voor Twente", tekst: "Regionaal bedrijf dat gewoon doet wat is afgesproken. De LED-verlichting is een mooie toevoeging.", project: "Veranda met LED-spots" }
    ]
  },
  {
    id: "carport-veranda-centrum",
    naam: "Carport & Veranda Centrum",
    plaats: "Tilburg", provincie: "Noord-Brabant",
    werkgebied: ["Noord-Brabant", "Zuid-Holland", "Gelderland", "Limburg"],
    opgericht: 2013, kleur: "#556270",
    rating: 4.0, aantalReviews: 298,
    prijsPerM2: { min: 230, max: 400 }, prijsKlasse: "budget",
    producten: ["carport", "veranda", "terrasoverkapping"],
    typen: ["aluminium", "staal"], dakTypen: ["polycarbonaat", "sandwichpaneel"],
    opties: ["led", "fundering"],
    keurmerken: ["Thuiswinkel Waarborg"],
    garantieJaren: 5, levertijdWeken: 4,
    montageEigenTeam: false, showroom: true, gratisOfferte: true,
    projectenPerJaar: 750, telefoon: "088 - 204 10 20",
    beschrijving: "Het Carport & Veranda Centrum is de grootste carportspecialist van Zuid-Nederland, met een megashowroom langs de A58. Stalen en aluminium constructies voor auto, camper of caravan — en dezelfde degelijkheid als veranda.",
    usps: ["Grootste carport-assortiment van Nederland", "Ook XXL: camper- en caravanstallingen", "Megashowroom langs de A58", "Staalconstructies met 5 jaar garantie"],
    reviews: [
      { naam: "Peter D.", plaats: "Tilburg", datum: "2026-05", score: 4, titel: "Camperstalling naar wens", tekst: "Weinig bedrijven bouwen 3,5 meter hoog. Hier gewoon uit voorraad, inclusief verstevigde fundering.", project: "Camperport 8×4 m staal" },
      { naam: "Simone V.", plaats: "Waalwijk", datum: "2026-02", score: 4, titel: "Veel keus, scherpe prijs", tekst: "In de showroom staan tientallen opstellingen. De keuze was snel gemaakt en de prijs was marktconform.", project: "Dubbele carport aluminium" },
      { naam: "Richard B.", plaats: "Oss", datum: "2025-12", score: 3, titel: "Montage kan beter", tekst: "De externe montageploeg maakte een fout met de afwatering; na een klacht keurig hersteld, maar het kostte wel drie afspraken.", project: "Carport met sandwichdak" },
      { naam: "Angela M.", plaats: "Breda", datum: "2025-09", score: 5, titel: "Prima combi-deal", tekst: "Carport en veranda tegelijk laten plaatsen met combikorting. Alles in één dag gezet.", project: "Carport + veranda combinatie" }
    ]
  },
  {
    id: "noorderlicht-buitenverblijven",
    naam: "Noorderlicht Buitenverblijven",
    plaats: "Alkmaar", provincie: "Noord-Holland",
    werkgebied: ["Noord-Holland", "Flevoland", "Friesland"],
    opgericht: 2009, kleur: "#2f6d68",
    rating: 4.5, aantalReviews: 176,
    prijsPerM2: { min: 340, max: 580 }, prijsKlasse: "midden",
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "lamellendak"],
    typen: ["aluminium", "hout"], dakTypen: ["glas", "polycarbonaat", "lamellen"],
    opties: ["led", "zonwering", "schuifwanden", "spiewanden", "onderhoud"],
    keurmerken: ["Erkend Verandabouwer"],
    garantieJaren: 10, levertijdWeken: 6,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 310, telefoon: "088 - 204 10 21",
    beschrijving: "Noorderlicht bouwt buitenverblijven boven het Noordzeekanaal: van veranda tot compleet ingerichte tuinkamer. Bekend om het brede middensegment-aanbod en de servicedienst die ook ándere merken onderhoudt en repareert.",
    usps: ["Breed aanbod in het middensegment", "Servicedienst voor álle merken veranda's", "Windvaste uitvoeringen voor Noord-Holland", "Financiering in termijnen mogelijk"],
    reviews: [
      { naam: "Joop N.", plaats: "Alkmaar", datum: "2026-06", score: 5, titel: "Ook onze oude veranda gered", tekst: "Ze repareerden eerst de oude overkapping van een ander merk en bouwden een jaar later onze nieuwe veranda. Service!", project: "Veranda 5×3,5 m met screens" },
      { naam: "Nel B.", plaats: "Hoorn", datum: "2026-03", score: 4, titel: "Netjes en punctueel", tekst: "Afspraken werden tot op het uur nagekomen. De veranda staat kaarsrecht, ook op onze verzakte bestrating.", project: "Veranda met nieuw straatwerk" },
      { naam: "Ferry K.", plaats: "Den Helder", datum: "2025-12", score: 4, titel: "Windvast aan zee", tekst: "Bij ons waait het altijd. De verzwaarde uitvoering houdt zich al twee stormseizoenen prima.", project: "Overkapping kustuitvoering" },
      { naam: "Astrid J.", plaats: "Purmerend", datum: "2025-10", score: 5, titel: "Betalen in termijnen hielp ons", tekst: "Door de financieringsoptie konden we meteen voor de grotere maat gaan. Geen moment spijt van gehad.", project: "Tuinkamer 5×3 m" }
    ]
  },
  {
    id: "merwede-overkappingen",
    naam: "Merwede Overkappingen",
    plaats: "Dordrecht", provincie: "Zuid-Holland",
    werkgebied: ["Zuid-Holland", "Noord-Brabant", "Utrecht", "Zeeland"],
    opgericht: 2011, kleur: "#39668c",
    rating: 4.5, aantalReviews: 221,
    prijsPerM2: { min: 330, max: 550 }, prijsKlasse: "midden",
    producten: ["veranda", "terrasoverkapping", "carport", "tuinkamer"],
    typen: ["aluminium", "kunststof"], dakTypen: ["glas", "polycarbonaat", "sandwichpaneel"],
    opties: ["led", "zonwering", "schuifwanden", "spiewanden", "elektra", "fundering"],
    keurmerken: ["Erkend Verandabouwer", "SGB Garantiefonds"],
    garantieJaren: 10, levertijdWeken: 5,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 430, telefoon: "088 - 204 10 22",
    beschrijving: "Merwede Overkappingen is een allrounder uit Dordrecht die het complete traject verzorgt: advies aan huis, eigen productie, montage en nazorg. Het bedrijf groeide uit tot een van de grotere spelers in de Randstad-Zuid.",
    usps: ["Compleet traject in eigen beheer", "Advies en inmeting aan huis, ook 's avonds", "Grote kleurcollectie (35 RAL-kleuren)", "Nazorg binnen 48 uur"],
    reviews: [
      { naam: "Arie S.", plaats: "Dordrecht", datum: "2026-07", score: 5, titel: "Avondafspraak was ideaal", tekst: "Door de avondinmeting hoefden we geen vrij te nemen. De hele afhandeling was even flexibel.", project: "Veranda 6×3 m met elektra" },
      { naam: "Brigit H.", plaats: "Gorinchem", datum: "2026-04", score: 4, titel: "Mooie kleurmatch", tekst: "Onze kozijnen hebben een aparte groentint; die konden ze exact matchen. Dat maakte het verschil.", project: "Veranda in RAL-kleur op maat" },
      { naam: "Marco V.", plaats: "Zwijndrecht", datum: "2026-01", score: 4, titel: "Nazorg werkt echt", tekst: "Piepende schuifwand gemeld op maandag, woensdag verholpen. Ze nemen de 48-uursbelofte serieus.", project: "Veranda met schuifwanden" },
      { naam: "Louise T.", plaats: "Papendrecht", datum: "2025-11", score: 5, titel: "Van begin tot eind ontzorgd", tekst: "Inclusief fundering en afvoer van de oude overkapping. Wij hebben er niets aan hoeven doen.", project: "Vervanging oude overkapping" }
    ]
  },
  {
    id: "staalstijl-verandas",
    naam: "StaalStijl Veranda's",
    plaats: "Nieuwegein", provincie: "Utrecht",
    werkgebied: ["Utrecht", "Zuid-Holland", "Gelderland", "Noord-Brabant"],
    opgericht: 2015, kleur: "#41454d",
    rating: 4.6, aantalReviews: 89,
    prijsPerM2: { min: 470, max: 800 }, prijsKlasse: "premium",
    producten: ["veranda", "terrasoverkapping", "carport"],
    typen: ["staal"], dakTypen: ["glas", "polycarbonaat"],
    opties: ["led", "maatwerk", "schuifwanden", "elektra"],
    keurmerken: ["Erkend Verandabouwer"],
    garantieJaren: 12, levertijdWeken: 9,
    montageEigenTeam: true, showroom: false, gratisOfferte: true,
    projectenPerJaar: 90, telefoon: "088 - 204 10 23",
    beschrijving: "StaalStijl smeedt stalen veranda's met een industriële, tijdloze uitstraling: slanke stalen profielen, klassieke sierspanten en zwart of gepoedercoat staal gecombineerd met veel glas. Elk frame komt uit de eigen smederij.",
    usps: ["Eigen smederij en lasafdeling", "Industriële en klassieke stijlen", "Slankere profielen dan aluminium", "Gepoedercoat en verzinkt: 12 jaar garantie"],
    reviews: [
      { naam: "Vincent R.", plaats: "Utrecht", datum: "2026-05", score: 5, titel: "Stoer én verfijnd", tekst: "Het stalen frame met sierspanten geeft onze jaren-20-woning precies de uitstraling die aluminium mist.", project: "Stalen veranda 5×3 m met glasdak" },
      { naam: "Heleen B.", plaats: "Vianen", datum: "2026-02", score: 5, titel: "Echt smeedwerk", tekst: "Je ziet het verschil met massaproductie. De lasnaden zijn onzichtbaar weggewerkt, prachtig afgewerkt.", project: "Veranda industriële stijl" },
      { naam: "Olaf D.", plaats: "Gouda", datum: "2025-12", score: 4, titel: "Kwaliteit kost tijd", tekst: "Negen weken levertijd is fors, maar smeedwerk op maat laat zich niet opjagen. Resultaat is super.", project: "Stalen carport met glasdak" },
      { naam: "Renske V.", plaats: "Houten", datum: "2025-08", score: 4, titel: "Uniek in zijn soort", tekst: "Weinig bedrijven bouwen nog in staal. Blij dat we doorgezocht hebben — dit is echt anders dan anders.", project: "Veranda met stalen schuifdeuren" }
    ]
  },
  {
    id: "kustlijn-verandas",
    naam: "Kustlijn Veranda's",
    plaats: "Katwijk", provincie: "Zuid-Holland",
    werkgebied: ["Zuid-Holland", "Noord-Holland"],
    opgericht: 2014, kleur: "#3a7ca5",
    rating: 4.5, aantalReviews: 132,
    prijsPerM2: { min: 350, max: 600 }, prijsKlasse: "midden",
    producten: ["veranda", "terrasoverkapping", "tuinkamer"],
    typen: ["aluminium"], dakTypen: ["glas", "polycarbonaat"],
    opties: ["led", "zonwering", "schuifwanden", "spiewanden", "onderhoud"],
    keurmerken: ["Erkend Verandabouwer"],
    garantieJaren: 10, levertijdWeken: 6,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 230, telefoon: "088 - 204 10 24",
    beschrijving: "Kustlijn Veranda's bouwt aluminium veranda's voor de Hollandse kuststreek, van Hoek van Holland tot Den Helder. Zoutbestendige coatings, verzwaarde verankering en heldere adviezen over wind en zon zijn de specialiteit.",
    usps: ["Kustspecialist: zoutbestendig en windvast", "Gratis wind- en zonadvies bij inmeting", "Onderhoudsservice aan zee", "Eigen montageteams uit de regio"],
    reviews: [
      { naam: "Leen v.d. P.", plaats: "Katwijk", datum: "2026-06", score: 5, titel: "Gebouwd voor de kust", tekst: "Derde herfststorm doorstaan zonder één losse schroef. Het zonadvies zorgde bovendien voor de perfecte overstek.", project: "Veranda 5×3 m kustuitvoering" },
      { naam: "Corine B.", plaats: "Noordwijk", datum: "2026-03", score: 4, titel: "Fijn lokaal bedrijf", tekst: "Monteurs uit het dorp, korte lijntjes, eerlijke prijs. De screens houden de zeewind mooi tegen.", project: "Overkapping met windschermen" },
      { naam: "Gijs H.", plaats: "Scheveningen", datum: "2025-11", score: 4, titel: "Degelijk werk", tekst: "Na een jaar intensief kustweer nog geen spoortje corrosie. De coating doet wat beloofd is.", project: "Veranda antraciet zoutbestendig" },
      { naam: "Marja K.", plaats: "Wassenaar", datum: "2025-09", score: 5, titel: "Advies maakte het verschil", tekst: "Dankzij het windadvies gekozen voor vaste zijwanden op het westen. Daardoor zitten we nu écht beschut.", project: "Tuinkamer met vaste wanden" }
    ]
  },
  {
    id: "gooise-veranda-compagnie",
    naam: "Gooise Veranda Compagnie",
    plaats: "Hilversum", provincie: "Noord-Holland",
    werkgebied: ["Noord-Holland", "Utrecht", "Flevoland"],
    opgericht: 2003, kleur: "#6b4f36",
    rating: 4.6, aantalReviews: 154,
    prijsPerM2: { min: 430, max: 740 }, prijsKlasse: "premium",
    producten: ["veranda", "tuinkamer", "terrasoverkapping"],
    typen: ["hout", "aluminium"], dakTypen: ["glas", "sandwichpaneel"],
    opties: ["led", "zonwering", "schuifwanden", "spiewanden", "maatwerk", "elektra", "fundering"],
    keurmerken: ["Erkend Verandabouwer", "SGB Garantiefonds", "FSC-gecertificeerd hout"],
    garantieJaren: 12, levertijdWeken: 8,
    montageEigenTeam: true, showroom: true, gratisOfferte: true,
    projectenPerJaar: 140, telefoon: "088 - 204 10 25",
    beschrijving: "De Gooise Veranda Compagnie bedient sinds 2003 het Gooi en omstreken met klassieke veranda's in Engelse en landelijke stijl. Riant houtwerk, roedeverdeling in het glas en handgemaakte details zijn het handelsmerk.",
    usps: ["Klassieke Engelse en landelijke stijlen", "Handgemaakte details en roedeverdeling", "Ervaring met villa's en monumenten", "Vast projectteam per klant"],
    reviews: [
      { naam: "Robert-Jan W.", plaats: "Laren", datum: "2026-05", score: 5, titel: "Past perfect bij onze villa", tekst: "De roedeverdeling en het houtsnijwerk sluiten naadloos aan op de bouwstijl uit 1915. Monumentenzorg was zelfs complimenteus.", project: "Klassieke veranda 7×4 m" },
      { naam: "Machteld D.", plaats: "Blaricum", datum: "2026-02", score: 5, titel: "Oog voor detail", tekst: "Tot en met de smeedijzeren regenpijpen klopt alles. Dit is geen veranda maar een verlengstuk van het huis.", project: "Veranda Engelse stijl" },
      { naam: "Eduard K.", plaats: "Hilversum", datum: "2025-11", score: 4, titel: "Traditioneel vakwerk", tekst: "Prijzig, maar je krijgt er ambachtelijke kwaliteit voor terug. Het vaste projectteam werkte zeer prettig.", project: "Tuinkamer landelijke stijl" },
      { naam: "Jacoba S.", plaats: "Bussum", datum: "2025-07", score: 4, titel: "Mooi eindresultaat", tekst: "Het ontwerptraject duurde even, maar daardoor staat er nu precies wat we voor ogen hadden.", project: "Veranda met serre-uitbouw" }
    ]
  }
];

/* Kennisbank-artikelen (metadata; de artikelpagina's zelf zijn losse HTML-bestanden) */
const ARTIKELEN = [
  { id: "veranda-kopen-waar-op-letten", titel: "Veranda kopen: waar moet je op letten?", samenvatting: "De complete checklist: van materiaalkeuze en fundering tot garantie en de valkuilen in offertes.", leestijd: 8, kleur: "#2c5e46", icoon: "checklist" },
  { id: "wat-kost-een-veranda", titel: "Wat kost een veranda in 2026?", samenvatting: "Actuele richtprijzen per type, formaat en materiaal — plus waar je op kunt besparen zonder in te leveren.", leestijd: 7, kleur: "#c77d1b", icoon: "euro" },
  { id: "vergunning-veranda", titel: "Heb je een vergunning nodig voor een veranda?", samenvatting: "Wanneer je vergunningsvrij mag bouwen, hoe je het checkt en wat een aanvraag kost en duurt.", leestijd: 6, kleur: "#33566e", icoon: "document" },
  { id: "aluminium-of-hout", titel: "Aluminium of hout: welk materiaal past bij jou?", samenvatting: "Uitstraling, onderhoud, levensduur en prijs eerlijk naast elkaar gezet.", leestijd: 6, kleur: "#8a5a2b", icoon: "materiaal" },
  { id: "dakbedekking-kiezen", titel: "Glas, polycarbonaat of lamellen: het juiste dak kiezen", samenvatting: "De voor- en nadelen van elk daktype, met advies per situatie en budget.", leestijd: 7, kleur: "#2b6777", icoon: "dak" },
  { id: "veranda-onderhoud", titel: "Zo houd je je veranda in topconditie", samenvatting: "Onderhoudskalender per seizoen en per materiaal, met veelgemaakte fouten.", leestijd: 5, kleur: "#456545", icoon: "onderhoud" }
];
