/* ==========================================================================
   Verandawijzer.nl — Bedrijvengids
   --------------------------------------------------------------------------
   ECHTE bedrijven, samengesteld op basis van openbare informatie van hun
   eigen websites (augustus 2026). Uitgangspunten:

   - Alleen feiten die op de eigen site van het bedrijf staan. Velden die
     daar niet te vinden waren, staan op null of zijn leeg.
   - GEEN verzonnen reviews, scores, prijzen, garanties of levertijden.
     rating/reviews staan leeg totdat er echte reviews via Verandawijzer
     binnenkomen; de site toont dan netjes "Nog geen reviews".
   - Elk profiel heeft een bron-URL en een controle-datum. Bedrijven kunnen
     hun vermelding kosteloos laten corrigeren of aanvullen via de
     contactpagina.

   Schema per bedrijf:
   id                unieke slug (URL: bedrijf.html?id=...)
   naam              bedrijfsnaam zoals het bedrijf zich noemt
   plaats/provincie  vestiging (null indien niet op eigen site vermeld)
   adres             bezoek-/showroomadres of -omschrijving indien gepubliceerd
   website           hoofddomein
   werkgebied        provincies of ["Landelijk"], alleen indien de site dat
                     expliciet zegt; null = niet vermeld
   producten         uit PRODUCTEN
   typen             materialen uit MATERIALEN ([] = niet vermeld)
   dakTypen          uit DAKTYPEN ([] = niet vermeld)
   opties            uit OPTIES, alleen indien op de site genoemd
   merken            merken/dealerschappen die de site zelf noemt
   keurmerken        [] (alleen vullen met geverifieerde keurmerken)
   showroom          true/null    zelfbouwMogelijk  true/null
   montageEigenTeam  true/null    opgericht         jaartal/null
   profiel           feitelijke omschrijving op basis van de eigen site
   kenmerken         feitelijke punten van de eigen site
   rating            null tot er echte reviews zijn
   aantalReviews     0             reviews  []
   prijsPerM2        null (alleen vullen met door het bedrijf gepubliceerde
                     prijzen, met bron)
   kleur             weergavekleur voor het monogram-logo
   bron              belangrijkste bron-URL
   gecontroleerd     "JJJJ-MM" laatste controle
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
  fundering: "Fundering & grondwerk",
  elektra: "Elektra & verwarming",
  onderhoud: "Onderhoudsservice"
};

const PRIJSKLASSEN = {
  budget: "Budget",
  midden: "Middensegment",
  premium: "Premium"
};

/* Marktrichtprijzen per m² incl. montage en btw (bron: eigen marktanalyse
   Verandawijzer, aug. 2026 — zie kennisbank). Gebruikt door de prijswijzer;
   NIET afkomstig van individuele bedrijven. */
const RICHTPRIJZEN_M2 = {
  aluminium:   { min: 250, max: 650 },
  hout:        { min: 400, max: 750 },
  staal:       { min: 450, max: 800 },
  kunststof:   { min: 200, max: 400 },
  standaard:   { min: 250, max: 650 },
  lamellendak: { min: 500, max: 900 }
};

const BEDRIJVEN = [
  /* ---------- Groningen ---------- */
  {
    id: "verandapoint", naam: "VerandaPoint",
    plaats: "Groningen", provincie: "Groningen",
    adres: "Stavangerweg 3, 9723 JC Groningen",
    website: "https://verandapoint.nl", werkgebied: null,
    producten: ["veranda", "tuinkamer", "carport"],
    typen: ["aluminium"], dakTypen: [], opties: ["schuifwanden", "maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "VerandaPoint maakt aluminium overkappingen, tuinkamers en carports op maat in de eigen productielocatie in Groningen. Naast overkappingen levert het bedrijf ook glazen schuifwanden en schuifpuien.",
    kenmerken: ["Eigen productielocatie in Groningen", "Maatwerk overkappingen, carports en schuifwanden", "Showroom aan de Stavangerweg (ma–vr en za open)"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#33566e", bron: "https://verandapoint.nl", gecontroleerd: "2026-08"
  },
  {
    id: "fraai-buiten", naam: "Fraai Buiten",
    plaats: "Groningen", provincie: "Groningen",
    adres: "Hoendiep 97D, 9718 TE Groningen",
    website: "https://overkapping-groningen.nl", werkgebied: null,
    producten: ["terrasoverkapping", "veranda", "lamellendak"],
    typen: [], dakTypen: ["polycarbonaat"], opties: ["led", "zonwering", "schuifwanden"],
    merken: ["Verano", "Pallazzo", "Weinor"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Fraai Buiten is dealer van Verano, Pallazzo en Weinor voor de regio Groningen. Het bedrijf levert terrasoverkappingen met polycarbonaat dak in drie varianten en daarnaast zonwering, rolluiken, markiezen en glazen schuifwanden.",
    kenmerken: ["Dealer van Verano, Pallazzo en Weinor", "Polycarbonaat dak in helder, opaal of zonwerend", "Opties zoals LED-verlichting en verandazonwering", "Showroom aan het Hoendiep in Groningen"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#456545", bron: "https://overkapping-groningen.nl", gecontroleerd: "2026-08"
  },
  {
    id: "in-t-hout-sierconstructies", naam: "In 't Hout Sierconstructies",
    plaats: "Nieuwe Pekela", provincie: "Groningen",
    adres: "Holland Marsh 4, 9663 AV Nieuwe Pekela",
    website: "https://www.sierconstructies.nl", werkgebied: null,
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "lamellendak", "carport"],
    typen: ["aluminium", "hout"], dakTypen: ["glas", "polycarbonaat", "lamellen"],
    opties: ["schuifwanden", "zonwering", "maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "In 't Hout Sierconstructies ontwerpt, produceert en monteert al ruim 25 jaar overkappingen in aluminium en hout: van veranda en carport tot vrijstaande overkapping met glasdak, polycarbonaat of lamellendak.",
    kenmerken: ["Ruim 25 jaar ervaring, alles in eigen beheer", "Aluminium én hout, ook vrijstaand", "Glas-, polycarbonaat- en lamellendaken", "Ruime showroom, binnen en buiten"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#8a5a2b", bron: "https://www.sierconstructies.nl", gecontroleerd: "2026-08"
  },

  /* ---------- Friesland ---------- */
  {
    id: "booi-gevel-huis", naam: "Booi Gevel & Huis",
    plaats: "Drachten", provincie: "Friesland",
    adres: "Noorderdwarsvaart 169A, 9201 KK Drachten",
    website: "https://www.gevelenhuis.nl", werkgebied: ["Friesland", "Groningen", "Drenthe"],
    producten: ["terrasoverkapping", "veranda", "tuinkamer"],
    typen: ["aluminium"], dakTypen: ["glas", "polycarbonaat"], opties: ["maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Booi Gevel & Huis uit Drachten levert en monteert vaste en schuifbare terrasoverkappingen op maat, met slanke aluminium profielen die ook met hout te combineren zijn. Het polycarbonaat dak is leverbaar in helder, opaal of zonwerend.",
    kenmerken: ["Vaste én schuifbare terrasoverkappingen", "Levert en monteert zelf", "Actief in Friesland, Groningen en Drenthe", "Showroom in Drachten"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2e5f8a", bron: "https://www.gevelenhuis.nl", gecontroleerd: "2026-08"
  },
  {
    id: "overkappingentotaal", naam: "Overkappingentotaal",
    plaats: "Oldeholtpade", provincie: "Friesland",
    adres: "Oldeholtpade (showroom op afspraak)",
    website: "https://www.overkappingentotaal.nl",
    werkgebied: ["Friesland", "Groningen", "Drenthe", "Overijssel", "Flevoland"],
    producten: ["terrasoverkapping", "veranda", "carport"],
    typen: ["aluminium", "hout"], dakTypen: ["glas", "polycarbonaat"],
    opties: ["schuifwanden", "zonwering", "maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Overkappingentotaal levert en monteert aluminium en houten overkappingen op maat in Noord- en Oost-Nederland, met vaste prijzen en gratis advies en inmeting aan huis. Het glazen dak wordt uitgevoerd in veiligheidsglas.",
    kenmerken: ["Werkt in vijf noordelijke provincies", "Vaste prijzen, gratis inmeting aan huis", "Montage door eigen vakmensen", "Ook glazen schuifwanden, zonwering en kozijnen"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2f6d68", bron: "https://www.overkappingentotaal.nl", gecontroleerd: "2026-08"
  },

  /* ---------- Drenthe ---------- */
  {
    id: "scs-zonwering", naam: "ScS Zonwering & Veranda's",
    plaats: "Hoogeveen", provincie: "Drenthe",
    adres: null,
    website: "https://scszonwering.nl", werkgebied: ["Drenthe", "Overijssel"],
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "carport"],
    typen: ["aluminium"], dakTypen: [], opties: ["zonwering"],
    merken: ["Verasol"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "ScS is een familiebedrijf uit Hoogeveen dat Verasol-veranda's plaatst en daarnaast zonwering, rolluiken en schuttingen levert. Het bedrijf richt zich op Drenthe en Overijssel.",
    kenmerken: ["Familiebedrijf uit Hoogeveen", "Plaatst Verasol-veranda's", "Ook zonwering, rolluiken en schuttingen"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#5d6b3c", bron: "https://scszonwering.nl", gecontroleerd: "2026-08"
  },

  /* ---------- Overijssel ---------- */
  {
    id: "madozon", naam: "Madozon Zonwering",
    plaats: "Rijssen", provincie: "Overijssel",
    adres: "Wattstraat 20C, 7461 AB Rijssen",
    website: "https://madozon.nl", werkgebied: ["Overijssel", "Gelderland"],
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "lamellendak"],
    typen: ["aluminium"], dakTypen: ["lamellen"], opties: ["schuifwanden", "zonwering"],
    merken: ["Verasol", "Weinor"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: 2016,
    profiel: "Madozon uit Rijssen levert sinds 2016 veranda's, tuinkamers en lamellendaken door heel Overijssel en Gelderland, met merken als Verasol en Weinor. Inmeten en montage gebeuren door eigen geschoold personeel.",
    kenmerken: ["Levert door heel Overijssel en Gelderland", "Tuinkamers van Verasol en Weinor", "Lamellendak met verstelbare lamellen", "Eigen inmeet- en montageteam"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#8f4a3d", bron: "https://madozon.nl", gecontroleerd: "2026-08"
  },

  /* ---------- Flevoland ---------- */
  {
    id: "willem-wierda", naam: "Willem Wierda Buitenleven",
    plaats: "Emmeloord", provincie: "Flevoland",
    adres: "Showrooms in Emmeloord, Zwolle en Joure",
    website: "https://www.willemwierda.nl", werkgebied: null,
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "carport"],
    typen: ["aluminium"], dakTypen: [], opties: [],
    merken: ["Verasol", "Exterior Living", "Sunparadise"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: 2001,
    profiel: "Willem Wierda begon in 2001 in het Friese Balk en heeft inmiddels showrooms in Emmeloord, Zwolle en Joure. Het bedrijf is Verasol Selected Dealer en plaatst met een eigen montageteam veranda's, tuinkamers en serres.",
    kenmerken: ["Sinds 2001, drie showrooms", "Verasol Selected Dealer", "Ook serres (Sunparadise) en schuttingen", "Eigen ervaren montageteam"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2c5e46", bron: "https://www.willemwierda.nl", gecontroleerd: "2026-08"
  },
  {
    id: "dm-verandas", naam: "DM Veranda's",
    plaats: "Almere", provincie: "Flevoland",
    adres: null,
    website: "https://www.dmverandas.nl", werkgebied: null,
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "carport"],
    typen: ["aluminium"], dakTypen: [], opties: ["maatwerk"],
    merken: [], keurmerken: [],
    showroom: null, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "DM Veranda's uit Almere verkoopt en monteert aluminium veranda's, tuinkamers en carports op maat, met vrije overspanningen tot 7 meter zonder middenstaander. Ook aluminium schuttingen behoren tot het assortiment.",
    kenmerken: ["Maatwerk als standaard", "Vrije overspanning tot 7 meter", "Verkoop én montage", "Ook aluminium schuttingen"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#41454d", bron: "https://www.dmverandas.nl", gecontroleerd: "2026-08"
  },
  {
    id: "almere-buitenleven", naam: "Almere Buitenleven",
    plaats: "Almere", provincie: "Flevoland",
    adres: "Dukdalfweg 23, Almere Buiten",
    website: "https://almerebuitenleven.nl", werkgebied: null,
    producten: ["veranda", "terrasoverkapping"],
    typen: ["hout"], dakTypen: [], opties: [],
    merken: ["Lugarde", "Hillhout", "Trendhout"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Almere Buitenleven levert houten overkappingen van Lugarde, Hillhout en Trendhout, inclusief montage en afwerking. In de showroom en showtuin aan de Dukdalfweg zijn opstellingen te bekijken; het bedrijf doet daarnaast tuinontwerp en -aanleg.",
    kenmerken: ["Houtspecialist: Lugarde, Hillhout en Trendhout", "Levering inclusief montage en afwerking", "Showroom én showtuin in Almere Buiten", "Ook complete buitenverblijven en tuinaanleg"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#7a4a2b", bron: "https://almerebuitenleven.nl", gecontroleerd: "2026-08"
  },

  /* ---------- Gelderland ---------- */
  {
    id: "lazize-verandabouw", naam: "Lazize Verandabouw",
    plaats: "Doetinchem", provincie: "Gelderland",
    adres: "Havenstraat 13a, 7005 AG Doetinchem",
    website: "https://www.lazize.nl", werkgebied: ["Gelderland", "Overijssel"],
    producten: ["veranda", "terrasoverkapping", "tuinkamer"],
    typen: ["aluminium"], dakTypen: ["glas", "polycarbonaat"], opties: ["schuifwanden", "maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Lazize Verandabouw uit Doetinchem zaagt maatwerk-veranda's op maat in de eigen werkplaats en monteert vaak binnen een dag. Overkappingen zijn uit te breiden met glazen schuifwanden tot een complete tuinkamer.",
    kenmerken: ["Maatwerk uit eigen werkplaats", "Dak in gelaagd veiligheidsglas of 16 mm polycarbonaat", "Montage vaak binnen een dag", "Showroom van 1.500 m² (op afspraak)"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2c5e46", bron: "https://www.lazize.nl", gecontroleerd: "2026-08"
  },
  {
    id: "verandaland", naam: "Verandaland",
    plaats: "Elst", provincie: "Gelderland",
    adres: "Industrieweg Oost 3, 6662 NE Elst",
    website: "https://www.verandaland.nl", werkgebied: null,
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "lamellendak"],
    typen: ["aluminium"], dakTypen: ["lamellen"], opties: ["schuifwanden", "zonwering"],
    merken: ["Weinor"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Verandaland in Elst is al ruim twintig jaar leverancier van overkappingen, zonwering en glazen schuifwanden voor de regio Arnhem–Nijmegen, met een showroom van ruim 1.000 m². Het bedrijf is merkdealer van Weinor en levert ook serres.",
    kenmerken: ["Ruim 20 jaar actief", "Showroom van ruim 1.000 m² in Elst", "Weinor-merkdealer", "Ook serres en zonwering"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#456545", bron: "https://www.verandaland.nl", gecontroleerd: "2026-08"
  },
  {
    id: "ce-verandas", naam: "CE-Veranda's",
    plaats: "Apeldoorn", provincie: "Gelderland",
    adres: "Landmetersveld 9, Apeldoorn",
    website: "https://www.ce-verandas.nl", werkgebied: null,
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "lamellendak", "carport"],
    typen: ["aluminium"], dakTypen: ["glas", "lamellen"], opties: ["schuifwanden", "zonwering", "maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "CE-Veranda's uit Apeldoorn laat zijn producten volledig in Nederland produceren, in eigen beheer met vaste productiepartners. Het assortiment loopt van veranda's met glazen dak tot lamellenoverkappingen, serres en glazen schuifwanden.",
    kenmerken: ["Volledig in Nederland geproduceerd", "Breed aanbod incl. lamellendaken en serres", "Demo- en adviesruimte met werkende opstellingen", "Maatwerk"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#35755a", bron: "https://www.ce-verandas.nl", gecontroleerd: "2026-08"
  },

  /* ---------- Utrecht ---------- */
  {
    id: "style-garden", naam: "Style Garden",
    plaats: "Doorn", provincie: "Utrecht",
    adres: "Langbroekerweg 1, 3941 MS Doorn",
    website: "https://www.stylegarden.nl", werkgebied: ["Utrecht"],
    producten: ["veranda", "terrasoverkapping", "tuinkamer"],
    typen: ["aluminium"], dakTypen: ["glas"], opties: ["schuifwanden", "zonwering", "maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Style Garden in Doorn toont overkappingen op ware grootte in de eigen showroom en levert maatwerk in de regio Utrecht — van glazen overkapping aan huis tot complete tuinkamer. Ook serres, zonwering en tuinmeubelen behoren tot het aanbod.",
    kenmerken: ["Showroom met opstellingen op ware grootte", "Maatwerk glazen overkappingen", "Actief in Utrecht en omliggende plaatsen", "Ook serres en tuinmeubelen"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#3d5a3a", bron: "https://www.stylegarden.nl", gecontroleerd: "2026-08"
  },
  {
    id: "luxeveranda", naam: "LuxeVeranda.nl",
    plaats: "Kockengen", provincie: "Utrecht",
    adres: "Portengen 51, 3628 EC Kockengen (showroom op afspraak)",
    website: "https://www.luxeveranda.nl", werkgebied: null,
    producten: ["veranda", "terrasoverkapping", "lamellendak"],
    typen: ["aluminium", "hout"], dakTypen: ["lamellen"], opties: ["schuifwanden", "maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "LuxeVeranda.nl levert houten en aluminium veranda's, vouwdakoverkappingen en lamellendaken op maat. De showroom in Kockengen is op afspraak te bezoeken.",
    kenmerken: ["Houten én aluminium veranda's", "Ook vouwdak- en lamellenoverkappingen", "Glazen schuifwanden", "Showroom op afspraak in Kockengen"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#6b4f36", bron: "https://www.luxeveranda.nl", gecontroleerd: "2026-08"
  },
  {
    id: "tuinmarqt", naam: "Tuinmarqt",
    plaats: "Amersfoort", provincie: "Utrecht",
    adres: null,
    website: "https://tuinmarqt.nl", werkgebied: null,
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "lamellendak"],
    typen: ["aluminium"], dakTypen: ["lamellen"], opties: ["maatwerk"],
    merken: ["Verano"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Tuinmarqt in Amersfoort laat overkappingen volledig op bestelling in de fabriek produceren en is merkdealer van Verano. De showroom met opstellingen op ware grootte is zes dagen per week open, met of zonder afspraak.",
    kenmerken: ["Showroom 6 dagen per week open", "Systemen op bestelling geproduceerd", "Verano-merkdealer", "Ook pergola's en lamellendaken"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#c77d1b", bron: "https://tuinmarqt.nl", gecontroleerd: "2026-08"
  },

  /* ---------- Noord-Brabant ---------- */
  {
    id: "tuinmaximaal", naam: "Tuinmaximaal",
    plaats: "Gemert", provincie: "Noord-Brabant",
    adres: "Showrooms in Eindhoven en Venlo",
    website: "https://www.tuinmaximaal.nl", werkgebied: ["Landelijk"],
    producten: ["veranda", "terrasoverkapping", "carport"],
    typen: ["aluminium"], dakTypen: ["glas", "polycarbonaat"], opties: ["schuifwanden"],
    merken: ["Gumax"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: true, montageEigenTeam: null, opgericht: null,
    profiel: "Tuinmaximaal uit Gemert is de exclusieve Europese leverancier van Gumax-overkappingen en levert uit eigen voorraad als compleet zelfbouwpakket, met montagevideo's en stappenplannen. Er zijn showrooms in Eindhoven en Venlo.",
    kenmerken: ["Exclusieve leverancier van Gumax in Europa", "Levering uit voorraad als zelfbouwpakket", "Productlijnen met polycarbonaat of glazen dak", "Showrooms in Eindhoven en Venlo"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#b3542e", bron: "https://www.tuinmaximaal.nl", gecontroleerd: "2026-08"
  },
  {
    id: "mb-veranda", naam: "MB Veranda",
    plaats: "Eindhoven", provincie: "Noord-Brabant",
    adres: "Adriaan Mulderweg 4, Eindhoven (ook showroom in Deventer)",
    website: "https://mbveranda.nl", werkgebied: null,
    producten: ["veranda", "terrasoverkapping", "tuinkamer"],
    typen: ["aluminium"], dakTypen: [], opties: ["schuifwanden", "maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "MB Veranda maakt maatwerk aluminium veranda's en tuinkamers en is specialist in glazen schuifwanden, die in de eigen fabriek worden geproduceerd. Het bedrijf heeft showrooms in Eindhoven en Deventer en levert inclusief montage.",
    kenmerken: ["Specialist in glazen schuifwanden", "Eigen productie en distributiecentrum", "Showrooms in Eindhoven en Deventer", "Levering en vakkundige montage"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#3f4d63", bron: "https://mbveranda.nl", gecontroleerd: "2026-08"
  },
  {
    id: "aga-terras", naam: "AGA Terras",
    plaats: "Asten", provincie: "Noord-Brabant",
    adres: "Showroom van 300 m² in Asten",
    website: "https://agaterras.nl", werkgebied: null,
    producten: ["terrasoverkapping", "tuinkamer", "lamellendak", "carport"],
    typen: ["aluminium"], dakTypen: ["lamellen"], opties: ["schuifwanden", "zonwering", "maatwerk"],
    merken: ["Levanto"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "AGA Terras levert en monteert aluminium overkappingen op maat met een eigen montageteam vanuit Asten. Naast vaste overkappingen levert het bedrijf Levanto-lamellendaken met elektrisch kantelbare lamellen, glazen wanden en zonwering.",
    kenmerken: ["Eigen montageteam vanuit Asten", "Levanto-lamellendak met motor", "Aanbouw of vrijstaand", "Showroom van 300 m², ook zaterdag open"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#c77d1b", bron: "https://agaterras.nl", gecontroleerd: "2026-08"
  },
  {
    id: "verandahome", naam: "Verandahome",
    plaats: "Tilburg", provincie: "Noord-Brabant",
    adres: "Showrooms in Hapert (ruim 1.000 m²) en Tilburg (ruim 400 m²)",
    website: "https://www.verandahome.nl", werkgebied: null,
    producten: ["veranda", "terrasoverkapping", "tuinkamer"],
    typen: ["aluminium"], dakTypen: ["glas", "polycarbonaat"],
    opties: ["schuifwanden", "fundering", "elektra"],
    merken: ["Verasol"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Verandahome werkt uitsluitend met een eigen montageteam en voert onder meer Verasol-overkappingen in polycarbonaat en glas. Het bedrijf coördineert desgewenst ook fundering, metselwerk, elektra en afwerking, en heeft showrooms in Hapert en Tilburg.",
    kenmerken: ["Uitsluitend eigen montageteam", "Twee showrooms (Hapert en Tilburg)", "Coördineert ook fundering en elektra", "Glasschuifwanden en glazen tuinkamers"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#7d3b53", bron: "https://www.verandahome.nl", gecontroleerd: "2026-08"
  },

  /* ---------- Limburg ---------- */
  {
    id: "renoco", naam: "Renoco",
    plaats: "Sittard", provincie: "Limburg",
    adres: "Showroom van 1.500 m² in Sittard",
    website: "https://renoco.nl", werkgebied: ["Limburg"],
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "lamellendak"],
    typen: ["aluminium"], dakTypen: ["lamellen"], opties: ["schuifwanden", "spiewanden"],
    merken: ["Verano"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Renoco uit Sittard is Verano-partner voor Limburg en bedient ook aangrenzende delen van België en Duitsland. De showroom van 1.500 m² is zes dagen per week open; montage gebeurt door eigen monteurs.",
    kenmerken: ["Verano-partner in Limburg", "Showroom van 1.500 m², 6 dagen per week open", "Elektrisch kantelbare lamellendaken", "Montage door eigen monteurs"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2b6777", bron: "https://renoco.nl", gecontroleerd: "2026-08"
  },
  {
    id: "overkapping33", naam: "Overkapping33",
    plaats: "Venlo", provincie: "Limburg",
    adres: "De Gruisdonk 43, 5928 RT Venlo",
    website: "https://www.overkapping33.nl", werkgebied: null,
    producten: ["terrasoverkapping", "carport"],
    typen: ["aluminium"], dakTypen: [], opties: ["schuifwanden"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: true, montageEigenTeam: null, opgericht: null,
    profiel: "Overkapping33 in Venlo combineert een webshop met een vrij toegankelijke showroom die zes dagen per week open is. Zelfmontage kan met de montage-instructies van de site; ook glazen schuifwanden zijn leverbaar.",
    kenmerken: ["Online bestellen mogelijk", "Showroom zonder afspraak, 6 dagen per week", "Zelfmontage met instructies", "Ook glazen schuifwanden"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#556270", bron: "https://www.overkapping33.nl", gecontroleerd: "2026-08"
  },

  /* ---------- Zuid-Holland ---------- */
  {
    id: "westland-verandas", naam: "Westland Veranda's en Zonwering",
    plaats: "Wateringen", provincie: "Zuid-Holland",
    adres: "Hoofdvestiging en showroom in Wateringen",
    website: "https://westlandverandas.nl", werkgebied: null,
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "lamellendak"],
    typen: ["aluminium"], dakTypen: ["lamellen"], opties: ["schuifwanden", "zonwering", "maatwerk"],
    merken: ["Corradi", "Gibus", "Verano"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Westland Veranda's en Zonwering uit Wateringen is dealer van de premium merken Corradi, Gibus en Verano. Montage gebeurt door eigen monteurs met een vast aanspreekpunt; ook zakelijke en horeca-overkappingen behoren tot het werk.",
    kenmerken: ["Dealer van Corradi, Gibus en Verano", "Eigen monteurs, vast aanspreekpunt", "Ook bioklimatische pergola's", "Zakelijke en horeca-overkappingen"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#1f4d5c", bron: "https://westlandverandas.nl", gecontroleerd: "2026-08"
  },
  {
    id: "gemro", naam: "Gemro",
    plaats: "Noordwijkerhout", provincie: "Zuid-Holland",
    adres: "Pletterij 35M, 2211 JT Noordwijkerhout",
    website: "https://www.gemro.nl", werkgebied: null,
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "lamellendak"],
    typen: ["aluminium"], dakTypen: ["glas", "polycarbonaat", "lamellen"], opties: ["zonwering", "schuifwanden"],
    merken: ["STOBAG"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: true, montageEigenTeam: true, opgericht: null,
    profiel: "Gemro in Noordwijkerhout levert veranda's met glas-, polycarbonaat- of lamellendak, met keuze tussen zelfmontage (met instructievideo's) of montage door eigen specialisten. Het bedrijf voert onder meer het STOBAG Terrado-glasdaksysteem.",
    kenmerken: ["Zelfmontage óf montage door eigen specialisten", "STOBAG Terrado-glasdaksysteem", "Polycarbonaat in opaal en helder", "Ook zonwering, screens en rolluiken"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#39668c", bron: "https://www.gemro.nl", gecontroleerd: "2026-08"
  },

  /* ---------- Noord-Holland ---------- */
  {
    id: "buitenhuis-holland", naam: "Buitenhuis Holland",
    plaats: "Wormerveer", provincie: "Noord-Holland",
    adres: "Industrieweg 13C, 1521 NC Wormerveer",
    website: "https://buitenhuisholland.nl", werkgebied: ["Noord-Holland"],
    producten: ["veranda", "terrasoverkapping", "tuinkamer"],
    typen: [], dakTypen: ["glas"], opties: ["zonwering", "fundering"],
    merken: ["Weinor", "Aliplast", "Solarlux"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Buitenhuis Holland uit Wormerveer levert al ruim twintig jaar terrasoverkappingen en serres van Weinor, Aliplast en Solarlux in heel Noord-Holland en op Texel — compleet, inclusief constructiewerk en vergunningaanvraag.",
    kenmerken: ["Werkt in heel Noord-Holland en op Texel", "Merken: Weinor, Aliplast, Solarlux", "Compleet incl. constructie en vergunning", "Ruim 20 jaar ervaring"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2f6d68", bron: "https://buitenhuisholland.nl", gecontroleerd: "2026-08"
  },
  {
    id: "tuincentrum-de-boet", naam: "Tuincentrum De Boet",
    plaats: "Hoogwoud", provincie: "Noord-Holland",
    adres: "Veranda-Showplein bij het tuincentrum in Hoogwoud",
    website: "https://www.deboet.nl", werkgebied: null,
    producten: ["veranda", "terrasoverkapping"],
    typen: ["aluminium", "hout"], dakTypen: [], opties: [],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: true, montageEigenTeam: null, opgericht: null,
    profiel: "Tuincentrum De Boet in Hoogwoud heeft een Veranda-Showplein met ruim vijftien showmodellen, van aluminium veranda tot douglas houten overkapping. Veranda's worden geleverd als zelfbouwpakket.",
    kenmerken: ["Veranda-Showplein met 15+ showmodellen", "Aluminium en douglas hout", "Levering als zelfbouwpakket"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#5b7c4f", bron: "https://www.deboet.nl", gecontroleerd: "2026-08"
  },
  {
    id: "verandaterras", naam: "VerandaTerras.nl",
    plaats: "Beverwijk", provincie: "Noord-Holland",
    adres: "Levert en monteert vanuit Beverwijk en Amsterdam",
    website: "https://www.verandaterras.nl", werkgebied: ["Landelijk"],
    producten: ["veranda", "terrasoverkapping", "tuinkamer"],
    typen: ["aluminium"], dakTypen: ["polycarbonaat", "glas"], opties: [],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: 2006,
    profiel: "VerandaTerras.nl levert sinds 2006 aluminium veranda's in twee modellen (standaard en deluxe), standaard met polycarbonaat dak en ook leverbaar met glasdak. Het eigen montageteam werkt vanuit Beverwijk en Amsterdam door de hele Benelux.",
    kenmerken: ["Actief sinds 2006, hele Benelux", "Aluminium 6063-T6 profielen", "Twee modellen: standaard en deluxe", "Montage door eigen team"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#3a7ca5", bron: "https://www.verandaterras.nl", gecontroleerd: "2026-08"
  },
  {
    id: "verandam", naam: "Verandam.nl",
    plaats: "Amsterdam", provincie: "Noord-Holland",
    adres: "Sierenborch 4A, 1043 BA Amsterdam",
    website: "https://www.verandam.nl", werkgebied: ["Landelijk"],
    producten: ["veranda", "terrasoverkapping", "carport"],
    typen: ["aluminium"], dakTypen: ["glas"], opties: ["schuifwanden", "maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Verandam.nl levert aluminium veranda's met gelaagd of gehard veiligheidsglas door heel Nederland, met eigen monteurs die vanuit Badhoevedorp vertrekken. De showroom zit in Amsterdam; glazen schuifwanden worden op maat gemaakt.",
    kenmerken: ["Levering door heel Nederland", "Dak van gelaagd of gehard veiligheidsglas", "Frames in drie kleuren", "Eigen monteurs"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#4b3d5c", bron: "https://www.verandam.nl", gecontroleerd: "2026-08"
  },

  /* ---------- Zeeland ---------- */
  {
    id: "veranda-zeeland", naam: "Veranda Zeeland",
    plaats: "Serooskerke", provincie: "Zeeland",
    adres: "De Stekelweie 2, 4353 RX Serooskerke",
    website: "https://www.verandazeeland.nl", werkgebied: null,
    producten: ["veranda", "terrasoverkapping", "tuinkamer", "carport"],
    typen: ["aluminium", "hout"], dakTypen: ["glas", "polycarbonaat"], opties: ["schuifwanden", "maatwerk"],
    merken: ["Verasol", "Pallazzo", "Pext"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Veranda Zeeland in Serooskerke heeft een showroom van 800 m² en levert de merken Verasol, Pallazzo en Pext. Houten veranda's worden uitgevoerd in Douglas Duplo of lariks; eigen monteurs verzorgen inmeting en plaatsing.",
    kenmerken: ["Showroom van 800 m² op Walcheren", "Merken: Verasol, Pallazzo en Pext", "Hout in Douglas Duplo of lariks", "Eigen inmeet- en montageservice"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2b6777", bron: "https://www.verandazeeland.nl", gecontroleerd: "2026-08"
  },
  {
    id: "wesdijk-homestyle", naam: "Wesdijk Homestyle",
    plaats: "Nieuwerkerk", provincie: "Zeeland",
    adres: "Showroom in Nieuwerkerk (Schouwen-Duiveland)",
    website: "https://www.wesdijkhomestyle.nl",
    werkgebied: ["Zeeland", "Zuid-Holland", "Noord-Brabant"],
    producten: ["veranda", "terrasoverkapping", "tuinkamer"],
    typen: ["aluminium"], dakTypen: ["glas", "polycarbonaat"],
    opties: ["schuifwanden", "maatwerk", "fundering", "zonwering"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Wesdijk Homestyle is een familiebedrijf op Schouwen-Duiveland met tien opgestelde overkappingen en tuinkamers in de showroom. Het levert vaste en schuifbare terrasoverkappingen als volledig maatwerk, inclusief complete montage met graafwerk en betonfundering.",
    kenmerken: ["Familiebedrijf met showroom in Nieuwerkerk", "Vaste én schuifbare overkappingen", "Poedercoating in elke RAL-kleur", "Complete montage incl. fundering"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#33566e", bron: "https://www.wesdijkhomestyle.nl", gecontroleerd: "2026-08"
  },

  /* ---------- Landelijk ---------- */
  {
    id: "verasol", naam: "Verasol",
    plaats: null, provincie: null,
    adres: "Ruim 60 winkels en showrooms door heel Nederland",
    website: "https://www.verasol.nl", werkgebied: ["Landelijk"],
    producten: ["veranda", "terrasoverkapping", "tuinkamer"],
    typen: ["aluminium"], dakTypen: [], opties: ["schuifwanden"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Verasol is al 25 jaar specialist in aluminium veranda's en tuinkamers, met een eigen fabriek in Duitsland en ruim 60 winkels en showrooms door heel Nederland. Verkoop loopt mede via erkende dealers; productlijnen zijn onder meer Greenline, Profiline, Cube en Linea.",
    kenmerken: ["Ruim 60 showrooms door heel Nederland", "Eigen fabriek in Duitsland", "Productlijnen: Greenline, Profiline, Cube, Linea", "Ook verkoop via erkende dealers"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2c5e46", bron: "https://www.verasol.nl", gecontroleerd: "2026-08"
  },

  /* ---------- Gidsuitbreiding golf 2 (aug. 2026) ---------- */
  {
    id: "vitrona-naaldwijk", naam: "Vitrona",
    plaats: "Naaldwijk", provincie: "Zuid-Holland",
    adres: null,
    website: "https://www.vitrona.nl", werkgebied: ["Zuid-Holland"],
    producten: ["terrasoverkapping","lamellendak","tuinkamer"],
    typen: [], dakTypen: ["glas","polycarbonaat","lamellen"], opties: ["zonwering","maatwerk"],
    merken: ["Weinor","Renson"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: 1979,
    profiel: "Familiebedrijf uit Naaldwijk, opgericht op 17 oktober 1979, gespecialiseerd in terrasoverkappingen en zonwering. Klanten kunnen terecht in de showrooms in Naaldwijk en Berkel en Rodenrijs (Nobelsingel 4).",
    kenmerken: ["Opgericht in 1979, sinds 2018 geleid door de derde generatie","Showrooms in Naaldwijk en Berkel en Rodenrijs","Aanbod van glazen, lamellen-, schuifdak- en doekdakoverkappingen","Eigen monteurs met VCA- en NEN-3140-certificering"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#34566B", bron: "https://www.vitrona.nl/over-ons", gecontroleerd: "2026-08"
  },
  {
    id: "garden-lux-veranda", naam: "Garden Lux Veranda",
    plaats: "Berkel en Rodenrijs", provincie: "Zuid-Holland",
    adres: "Edisonstraat 5c, Berkel en Rodenrijs",
    website: "https://gardenluxveranda.nl", werkgebied: ["Landelijk"],
    producten: ["veranda","terrasoverkapping","lamellendak","carport"],
    typen: ["aluminium"], dakTypen: ["glas","polycarbonaat","lamellen"], opties: ["led","zonwering","schuifwanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Specialist in aluminium veranda's en overkappingen op maat, geproduceerd in eigen Nederlandse fabriek. Vanuit de showroom in Berkel en Rodenrijs levert het bedrijf onder meer lamellendak-, cabrio- en cube-veranda's.",
    kenmerken: ["Eigen fabriek in Nederland voor maatwerkproductie","Meer dan 10 dakvarianten, waaronder polycarbonaat, glas en lamellendak","Kaderloze glazen schuifwanden leverbaar","Montage door eigen ervaren montageteam"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#3F5D45", bron: "https://gardenluxveranda.nl/", gecontroleerd: "2026-08"
  },
  {
    id: "verandacentrum", naam: "VerandaCentrum.nl",
    plaats: "Bodegraven", provincie: "Zuid-Holland",
    adres: "Tjalk 27, 2411 NZ Bodegraven",
    website: "https://www.verandacentrum.nl", werkgebied: ["Zuid-Holland"],
    producten: ["veranda","terrasoverkapping","tuinkamer","carport"],
    typen: ["aluminium","hout"], dakTypen: [], opties: ["schuifwanden"],
    merken: ["Verasol","Sunmaster","Aluxe","Leiner","Pallazzo","Sunflex","Palmiye","Deponti"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Dealer van aluminium veranda's, tuinkamers, houten overkappingen en carports van merken als Verasol, Leiner, Aluxe en Palmiye. Levert en monteert vanuit twee showrooms, in Bodegraven en Zoetermeer.",
    kenmerken: ["Twee showrooms: Bodegraven (Tjalk 27) en Zoetermeer (Cobaltstraat 31)","Geselecteerd dealer van o.a. Verasol, Leiner, Palmiye en Aluxe","Ook glastuinkamers en glasschuifwanden in het assortiment","Veel showroommodellen van diverse overkappingen te bekijken"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2F5D50", bron: "https://www.verandacentrum.nl/over-verandacentrum/", gecontroleerd: "2026-08"
  },
  {
    id: "happy-outdoor-living", naam: "Happy Outdoor Living",
    plaats: "Alphen aan den Rijn", provincie: "Zuid-Holland",
    adres: "Maatschapslaan 41, Alphen aan den Rijn",
    website: "https://www.happyoutdoorliving.nl", werkgebied: null,
    producten: ["veranda","terrasoverkapping","tuinkamer"],
    typen: ["aluminium"], dakTypen: ["glas"], opties: ["led","zonwering","schuifwanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Gespecialiseerd in het ontwerpen, leveren en plaatsen van veranda's en terrasoverkappingen op maat, met daarnaast tuinmeubelen in het assortiment. De showroom in Alphen aan den Rijn is ook op zondag geopend.",
    kenmerken: ["Showroom aan de Maatschapslaan 41 in Alphen aan den Rijn","Veranda's van aluminium en veiligheidsglas","Uitbreidbaar met glazen schuifwanden, verlichting en zonwering","Begeleiding van advies en ontwerp tot montage door eigen vakmensen"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#A9633E", bron: "https://www.happyoutdoorliving.nl/", gecontroleerd: "2026-08"
  },
  {
    id: "houtbouw-hoeksche-waard", naam: "Houtbouw Hoeksche Waard",
    plaats: "Nieuw-Beijerland", provincie: "Zuid-Holland",
    adres: null,
    website: "https://www.houtbouwhoekschewaard.nl", werkgebied: null,
    producten: ["veranda","terrasoverkapping","carport"],
    typen: ["hout"], dakTypen: [], opties: ["maatwerk"],
    merken: [], keurmerken: [],
    showroom: null, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Houtbouwbedrijf van eigenaar Jos Wander uit Nieuw-Beijerland, gespecialiseerd in houten overkappingen, veranda's en carports op maat. Na de offerte komt het bedrijf persoonlijk langs om de mogelijkheden ter plekke te bespreken.",
    kenmerken: ["Gevestigd in Nieuw-Beijerland in de Hoeksche Waard","Houten overkappingen, o.a. van douglashout","Ook tuinhuizen met overkapping en carports","Geen vaste showroom; werkt met demonstratiemodellen bij klanten in de tuin"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#6E4F33", bron: "https://www.houtbouwhoekschewaard.nl/", gecontroleerd: "2026-08"
  },
  {
    id: "wullems-zonwering", naam: "Zonwering Specialist Wullems",
    plaats: "Hoogvliet (Rotterdam)", provincie: "Zuid-Holland",
    adres: "Hoefsmidstraat 46a, 3194 AA Hoogvliet",
    website: "https://wullems.com", werkgebied: null,
    producten: ["veranda","terrasoverkapping"],
    typen: [], dakTypen: [], opties: ["led","zonwering","fundering","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Zonweringspecialist met drie winkels in Hoogvliet, Hellevoetsluis en Dirksland die naast zonwering ook terrasoverkappingen op maat levert. Overkappingen zijn uit te voeren met opties als verlichting, betonfundering, dakpanelen en verandazonwering.",
    kenmerken: ["Drie showrooms: Hoogvliet, Hellevoetsluis en Dirksland","Terrasoverkappingen op maat met keuze in afmeting en kleur","Opties zoals verlichting, betonfundering en glaswanden","Ook verandazonwering, screens en pergolazonwering"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#4A5E74", bron: "https://wullems.com/terrasoverkappingen/", gecontroleerd: "2026-08"
  },
  {
    id: "ohverkapping", naam: "OH!verkapping",
    plaats: "Westland", provincie: "Zuid-Holland",
    adres: null,
    website: "https://ohverkapping.nl", werkgebied: null,
    producten: ["veranda","terrasoverkapping","tuinkamer"],
    typen: [], dakTypen: [], opties: ["zonwering","schuifwanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: null, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: 2016,
    profiel: "In 2016 opgericht bedrijf van Bart van der Helm dat overkappingen, veranda's, pergola's, tuinkamers en serres op maat bouwt in het Westland en omgeving. Ondersteunt klanten van ontwerp tot en met de bouw.",
    kenmerken: ["Opgericht in 2016 door Bart van der Helm","Actief in het Westland en omgeving, o.a. Den Haag, Delft en Zoetermeer","Bouwt ook serres, pergola's en tuinkamers op maat","Glazen schuifwanden voor veranda's en overkappingen leverbaar"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#5C6B45", bron: "https://ohverkapping.nl/over-ons/", gecontroleerd: "2026-08"
  },
  {
    id: "decosun-zwijndrecht", naam: "Decosun",
    plaats: "Zwijndrecht", provincie: "Zuid-Holland",
    adres: "De Were 30, 3332 KE Zwijndrecht",
    website: "https://www.deco-sun.nl", werkgebied: null,
    producten: ["veranda","terrasoverkapping","carport"],
    typen: ["aluminium"], dakTypen: [], opties: ["zonwering","schuifwanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Overkappingsspecialist uit Zwijndrecht met een aanbod van aluminium overkappingen, tuinkassen en carports op maat. Daarnaast levert het bedrijf zonwering zoals ritsscreens en sky screens en glazen schuifwanden.",
    kenmerken: ["Gevestigd aan De Were 30 in Zwijndrecht","Aluminium overkappingen en carports op maat","Ook ritsscreens, sky screens en glazen schuifwanden","Webshop met overkappingen en zonwering"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#3E6E68", bron: "https://www.deco-sun.nl/", gecontroleerd: "2026-08"
  },
  {
    id: "paul-en-paul", naam: "Paul & Paul",
    plaats: "Bergschenhoek", provincie: "Zuid-Holland",
    adres: null,
    website: "https://www.paulenpaul.nl", werkgebied: ["Zuid-Holland"],
    producten: ["veranda","terrasoverkapping"],
    typen: [], dakTypen: [], opties: ["zonwering","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: 2002,
    profiel: "In 2002 opgericht bedrijf dat naast kozijnen en zonwering ook veranda's en pergola's levert, met hoofdkantoor en magazijn in Bergschenhoek. Beschikt over showrooms in Bergschenhoek, Krimpen aan den IJssel en Nieuwerbrug aan den Rijn.",
    kenmerken: ["Opgericht in 2002","Showroom van ruim 700 m2 in Bergschenhoek, zes dagen per week geopend","Drie vestigingen: Bergschenhoek, Krimpen aan den IJssel en Nieuwerbrug aan den Rijn","Montage door eigen vakmensen"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#37485C", bron: "https://www.paulenpaul.nl/showroom/", gecontroleerd: "2026-08"
  },
  {
    id: "mijnveranda", naam: "MijnVeranda",
    plaats: "Noordwijkerhout", provincie: "Zuid-Holland",
    adres: "Delfweg 36 A, 2211 VM Noordwijkerhout",
    website: "https://www.mijnveranda.nu", werkgebied: null,
    producten: ["veranda","terrasoverkapping","tuinkamer","carport"],
    typen: [], dakTypen: [], opties: ["zonwering","schuifwanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Aanbieder van veranda's, tuinkamers, glasschuifwanden, carports en zonwering op maat, met daarnaast tuinmeubelen in het assortiment. Klanten kunnen terecht in de showrooms in Noordwijkerhout en Cruquius.",
    kenmerken: ["Showroom aan de Delfweg 36 A in Noordwijkerhout","Tweede showroom in Cruquius (Crommelinbaan 16)","Assortiment met o.a. Greenline-veranda's, tuinkamers en glasschuifwanden","Online afspraak voor persoonlijk advies mogelijk"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#7A5C48", bron: "https://www.mijnveranda.nu/", gecontroleerd: "2026-08"
  },
  {
    id: "veranda-plaza", naam: "Veranda Plaza",
    plaats: "Amstelveen", provincie: "Noord-Holland",
    adres: "Loods 87N1, 1187 ZS Amstelveen",
    website: "https://verandaplaza.nl", werkgebied: null,
    producten: ["veranda","terrasoverkapping","tuinkamer","carport"],
    typen: [], dakTypen: [], opties: ["schuifwanden"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Veranda Plaza in Amstelveen levert veranda's, terrasoverkappingen, tuinkamers, carports, balustrades, glazen schuifwanden en glazen lichtstraten. Op de site staan gerealiseerde projecten in onder meer Amstelveen, Aalsmeer, Nieuw-Vennep en Alkmaar.",
    kenmerken: ["Gevestigd in Amstelveen","Ook balustrades en hekwerk","Glazen schuifwanden en glazen lichtstraten","Projecten in de regio Amstelveen en omstreken"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#33566b", bron: "https://verandaplaza.nl/contact/", gecontroleerd: "2026-08"
  },
  {
    id: "techosol", naam: "Techosol",
    plaats: "Alkmaar", provincie: "Noord-Holland",
    adres: "Marterkoog 9, 1822 BK Alkmaar",
    website: "https://www.techosol.nl", werkgebied: null,
    producten: ["terrasoverkapping","lamellendak"],
    typen: ["aluminium"], dakTypen: ["glas","polycarbonaat","lamellen"], opties: ["schuifwanden","zonwering","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Techosol in Alkmaar levert op maat gemaakte terras- en tuinoverkappingen met aluminium frame, naast zonwering, rolluiken en horren. Overkappingen zijn uit te breiden met een glazen of polycarbonaat dak, glazen schuifwanden en glazen zijwanden; ook lamellendaken behoren tot het assortiment.",
    kenmerken: ["Showroom aan de Marterkoog in Alkmaar","Terrasoverkappingen op maat inclusief montage","Glazen schuifwanden en vaste wanden leverbaar","Ook zonwering, rolluiken en horren"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2f5d50", bron: "https://www.techosol.nl/terrasoverkappingen-veranda-tuin/", gecontroleerd: "2026-08"
  },
  {
    id: "uw-veranda-specialist", naam: "Uw Veranda Specialist",
    plaats: "Obdam", provincie: "Noord-Holland",
    adres: "Braken 37, 1713 GC Obdam",
    website: "https://www.uwverandaspecialist.nl", werkgebied: null,
    producten: ["veranda","terrasoverkapping","tuinkamer"],
    typen: [], dakTypen: [], opties: ["maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Uw Veranda Specialist in Obdam (bij Heerhugowaard) bouwt op maat gemaakte veranda's, overkappingen, tuinkamers en tuinkantoren. De showroom met showtuin aan de Braken in Obdam is van maandag tot en met zaterdag geopend.",
    kenmerken: ["Showroom en showtuin in Obdam","Maatwerk veranda's en overkappingen","Ook tuinkamers en tuinkantoren","Persoonlijk adviesgesprek op afspraak"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#5a4632", bron: "https://www.uwverandaspecialist.nl/contact/", gecontroleerd: "2026-08"
  },
  {
    id: "kroon-veranda", naam: "Kroon Veranda",
    plaats: "Haarlem", provincie: "Noord-Holland",
    adres: null,
    website: "https://kroonveranda.nl", werkgebied: ["Landelijk"],
    producten: ["veranda","terrasoverkapping","tuinkamer","carport"],
    typen: [], dakTypen: [], opties: ["schuifwanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: true, montageEigenTeam: null, opgericht: null,
    profiel: "Kroon Veranda is een verandaspecialist gevestigd in Haarlem en Beverwijk en levert veranda's, overkappingen, carports, tuinkamers, kassen, glazen schuifwanden, vlonders en schermen op maat. Het bedrijf heeft een eigen showroom en eigen productie en werkt door heel Nederland, met naast levering en plaatsing ook complete bouwpakketten voor zelfmontage.",
    kenmerken: ["Gevestigd in Haarlem en Beverwijk","Eigen productie en maatwerk","Ook glazen schuifwanden, kassen en vlonders","Bouwpakketten voor zelfmontage mogelijk"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#8a6d3b", bron: "https://kroonveranda.nl/", gecontroleerd: "2026-08"
  },
  {
    id: "douglaz", naam: "DouGlaz",
    plaats: "Velsen-Noord", provincie: "Noord-Holland",
    adres: "Harmoniestraat 16, 1951 AV Velsen-Noord",
    website: "https://www.douglaz.nl", werkgebied: ["Noord-Holland"],
    producten: ["veranda","terrasoverkapping"],
    typen: ["hout"], dakTypen: [], opties: ["maatwerk"],
    merken: [], keurmerken: [],
    showroom: null, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "DouGlaz ontwerpt, produceert en plaatst houten veranda's, overkappingen, tuinhuizen, bergingen en garages, volledig op maat gemaakt in de eigen timmerfabriek in Velsen-Noord. Het bedrijf van Lieme Glazema werkt in heel Noord-Holland en verzorgt ook renovatie van bestaande tuinhuizen en overkappingen.",
    kenmerken: ["Eigen timmerfabriek in Velsen-Noord","Houten maatwerkconstructies","Werkzaam in heel Noord-Holland","Ook renovatie van tuinhuizen en overkappingen"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#6b4f3a", bron: "https://www.douglaz.nl/producten/veranda-overkapping", gecontroleerd: "2026-08"
  },
  {
    id: "veranda-medemblik", naam: "Veranda Medemblik",
    plaats: "Medemblik", provincie: "Noord-Holland",
    adres: null,
    website: "https://www.verandamedemblik.nl", werkgebied: null,
    producten: ["veranda","tuinkamer"],
    typen: ["aluminium"], dakTypen: ["glas","polycarbonaat"], opties: ["zonwering","maatwerk"],
    merken: ["Verasol"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Veranda Medemblik is een veranda- en zonweringspecialist in West-Friesland en dealer van Verasol-terrasoverkappingen en tuinkamers van aluminium, gecombineerd met glas of polycarbonaat. De modellen, waaronder Greenline, Profiline en Cube, staan opgesteld in de showrooms in Medemblik en Middenmeer; eigen vakmensen meten in en monteren aan huis.",
    kenmerken: ["Showrooms in Medemblik en Middenmeer","Dealer van Verasol","Aluminium veranda's en tuinkamers op maat","Inmeten en montage door eigen vakmensen"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#34605e", bron: "https://www.verandamedemblik.nl/", gecontroleerd: "2026-08"
  },
  {
    id: "schuurman-en-schuurman", naam: "Schuurman & Schuurman",
    plaats: "Naarden", provincie: "Noord-Holland",
    adres: "van Ostadelaan 53, 1412 JH Naarden",
    website: "https://schuurmanenschuurman.nl", werkgebied: null,
    producten: ["veranda","terrasoverkapping"],
    typen: ["hout"], dakTypen: [], opties: ["maatwerk"],
    merken: [], keurmerken: [],
    showroom: null, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Schuurman & Schuurman in Naarden maakt en plaatst overkappingen, veranda's, kapschuren, tuinhuizen en hekwerk op maat. Op de site staan gerealiseerde houten projecten in 't Gooi, onder meer in Laren en Muiden.",
    kenmerken: ["Gevestigd in Naarden ('t Gooi)","Overkappingen en kapschuren op maat","Houten maatwerkprojecten, o.a. in Ayous-hout","Levering inclusief plaatsing en montage"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#4f5a3d", bron: "https://schuurmanenschuurman.nl/", gecontroleerd: "2026-08"
  },
  {
    id: "verandaliving", naam: "Verandaliving",
    plaats: "Everdingen", provincie: "Utrecht",
    adres: "Tienhovenseweg 43, Everdingen",
    website: "https://verandaliving.nl", werkgebied: null,
    producten: ["veranda","terrasoverkapping","tuinkamer"],
    typen: ["aluminium"], dakTypen: [], opties: ["maatwerk"],
    merken: ["Verasol","Pallazzo","Weinor","Sunparadise"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Verandaliving in Everdingen, direct aan de A2, levert aluminium veranda's, overkappingen en tuinkamers op maat van merken als Verasol, Pallazzo, Weinor en Sunparadise. De showroom met showtuin van circa 2000 m2 (3500 m2 totaal) toont een uitgebreide collectie verandamodellen; de meeste klanten komen uit de regio Utrecht, Nieuwegein, IJsselstein, Montfoort en Woerden.",
    kenmerken: ["Showroom met showtuin van ca. 2000 m2 in Everdingen","Merken: Verasol, Pallazzo, Weinor en Sunparadise","Aluminium veranda's en tuinkamers op maat","Direct aan de A2, bezoek op afspraak mogelijk"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#3e5c47", bron: "https://verandaliving.nl/veranda-showroom", gecontroleerd: "2026-08"
  },
  {
    id: "van-kooten-tuin-en-buitenleven", naam: "Van Kooten Tuin & Buiten Leven",
    plaats: "Woerden", provincie: "Utrecht",
    adres: "Barwoutswaarder 13E, 3449 HE Woerden",
    website: "https://www.vankootentuinenbuitenleven.nl", werkgebied: null,
    producten: ["veranda","terrasoverkapping","tuinkamer","carport"],
    typen: ["aluminium","hout"], dakTypen: [], opties: ["maatwerk"],
    merken: ["Lugarde","Tuindeco","Interflex","Outdoor Life"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: true, montageEigenTeam: null, opgericht: null,
    profiel: "Van Kooten Tuin & Buiten Leven verkoopt houten veranda's, aluminium overkappingen, tuinkamers, blokhutten, tuinhuizen, chalets en carports, met in Woerden een overdekte showroom op twee verdiepingen. Producten zijn leverbaar als bouwpakket en montage is mogelijk; het assortiment omvat ruim 470 veranda's van merken als Lugarde en Tuindeco.",
    kenmerken: ["Overdekte showroom op twee verdiepingen in Woerden","Ruim 470 veranda's in het assortiment","Houten veranda's en aluminium overkappingen","Bouwpakketten en montage mogelijk"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2e5939", bron: "https://www.vankootentuinenbuitenleven.nl/showrooms/woerden", gecontroleerd: "2026-08"
  },
  {
    id: "de-veranda-store", naam: "De Veranda Store",
    plaats: "Amersfoort", provincie: "Utrecht",
    adres: null,
    website: "https://www.deverandastore.nl", werkgebied: null,
    producten: ["veranda","terrasoverkapping","tuinkamer","carport"],
    typen: ["aluminium","hout"], dakTypen: [], opties: ["maatwerk","zonwering"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "De Veranda Store in Amersfoort (onderdeel van 4Life Comfort) is specialist in maatwerk veranda's, terrasoverkappingen, tuinkamers en carports, in zowel hout als aluminium. In de showroom in Amersfoort is een gratis adviesgesprek met een verkoopadviseur mogelijk.",
    kenmerken: ["Showroom in Amersfoort","Houten veranda's en aluminium tuinkamers","Maatwerk, o.a. douglas overkappingen","Referentieprojecten met onderliggende zonwering"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#7a4a36", bron: "https://www.deverandastore.nl/contact", gecontroleerd: "2026-08"
  },
  {
    id: "poppelaars-overkappingen", naam: "Poppelaars Overkappingen",
    plaats: "Breda", provincie: "Noord-Brabant",
    adres: null,
    website: "https://www.poppelaarsoverkappingen.nl", werkgebied: null,
    producten: ["veranda","terrasoverkapping","tuinkamer"],
    typen: ["hout"], dakTypen: ["glas"], opties: ["schuifwanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: true, montageEigenTeam: true, opgericht: 1988,
    profiel: "Houtspecialist uit Breda die volledig op maat geproduceerde douglas overkappingen, veranda's, tuinkamers en poolhouses levert. Het bedrijf ontstond in 1988 uit een handel in tuinmaterialen en heeft een showroom in Breda die op afspraak te bezoeken is.",
    kenmerken: ["Gespecialiseerd in douglas hout","Overkappingen volledig op maat geproduceerd","Zelfbouwpakketten leverbaar naast montage door eigen medewerkers","Ontstaan in 1988, showroom in Breda"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#6b4f35", bron: "https://www.poppelaarsoverkappingen.nl/geschiedenis", gecontroleerd: "2026-08"
  },
  {
    id: "outdoor-pleasure", naam: "Outdoor Pleasure",
    plaats: "Goirle", provincie: "Noord-Brabant",
    adres: "Nobelstraat 5, 5051 DV Goirle",
    website: "https://www.outdoorpleasure.nl", werkgebied: null,
    producten: ["veranda","terrasoverkapping","tuinkamer","carport"],
    typen: ["aluminium"], dakTypen: ["glas"], opties: ["led","zonwering","schuifwanden","maatwerk"],
    merken: ["Verasol","Sunmaster","Sunrooms"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Specialist in aluminium veranda's, tuinkamers, glazen schuifwanden, carports en zonwering met showrooms in Goirle en Breda. Dealer van Verasol, Sunmaster en Sunrooms, actief in de regio Tilburg en Breda.",
    kenmerken: ["Twee showrooms: Goirle (Nobelstraat 5) en Breda (Gijzenveld 3)","Dealer van Verasol, Sunmaster en Sunrooms","Glazen schuifwanden van 10 mm veiligheidsglas op maat","Ruim tien jaar ervaring in levering en montage"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2f5d46", bron: "https://www.outdoorpleasure.nl/over-ons/", gecontroleerd: "2026-08"
  },
  {
    id: "de-goedkoopste-veranda", naam: "De Goedkoopste Veranda",
    plaats: "'s-Hertogenbosch", provincie: "Noord-Brabant",
    adres: "Guldengaarde 3, 5234 GG 's-Hertogenbosch",
    website: "https://degoedkoopsteveranda.nl", werkgebied: ["Landelijk"],
    producten: ["veranda","terrasoverkapping","lamellendak","tuinkamer"],
    typen: ["aluminium"], dakTypen: ["glas","polycarbonaat","lamellen"], opties: ["led","schuifwanden","maatwerk"],
    merken: ["Deponti"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: true, montageEigenTeam: true, opgericht: null,
    profiel: "Verandaspecialist met showroom in 's-Hertogenbosch waar veranda's, terrasoverkappingen, schuifwanden en accessoires te bekijken zijn. Levert aluminium overkappingen op maat met glas- of polycarbonaatdak en lamelveranda's, met montage door eigen montagespecialisten of als zelfbouwpakket.",
    kenmerken: ["Showroom aan de Guldengaarde 3 in Den Bosch","Aluminium overkappingen op maat met glas, polycarbonaat of lamellendak","Zelfbouwpakket af te halen of thuisbezorgd","Voert Deponti terrasoverkappingen"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2c5977", bron: "https://degoedkoopsteveranda.nl/", gecontroleerd: "2026-08"
  },
  {
    id: "jada-veranda", naam: "JaDa Veranda",
    plaats: "Vught", provincie: "Noord-Brabant",
    adres: "de Ketting 16B, 5261 LJ Vught",
    website: "https://jadaveranda.com", werkgebied: null,
    producten: ["veranda","terrasoverkapping","tuinkamer"],
    typen: ["aluminium"], dakTypen: [], opties: ["led","zonwering","schuifwanden","spiewanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: 2010,
    profiel: "Sinds 2010 specialist in complete tuinkamers, terrasoverkappingen en zonwering, gevestigd in Vught bij 's-Hertogenbosch. Klein team waarbij de eigenaar zelf adviseert en de montage op locatie verzorgt; terrasoverkappingen leverbaar met vlak of schuin aflopend dak, aan de muur gemonteerd of vrijstaand.",
    kenmerken: ["Showroom aan de Ketting 16B in Vught","Tuinkamers met vaste of beweegbare wanden, verlichting en zonwering","Wanden en spieën uit aluminium delen, glazen schuifwanden en screens","Persoonlijke montage op locatie door klein team"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#33556e", bron: "https://jadaveranda.com/over-ons/", gecontroleerd: "2026-08"
  },
  {
    id: "van-den-bosch-tuin-terras", naam: "Van den Bosch Tuin & Terras",
    plaats: "Uden", provincie: "Noord-Brabant",
    adres: "Kromstraat 6, 5405 BC Uden",
    website: "https://www.vandenboschtuinenterras.nl", werkgebied: null,
    producten: ["veranda","terrasoverkapping"],
    typen: ["aluminium"], dakTypen: [], opties: ["led","zonwering","maatwerk"],
    merken: ["Verasol"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Tuin- en terrasbedrijf in Uden met een overdekte en buitenshowroom van 4000 m2, sinds 2015 gevestigd aan de Kromstraat. Levert Verasol maatwerkveranda's (o.a. Cube, Profiline en Greenline) van onderhoudsvrij aluminium, van inmeten thuis tot plaatsing en montage van zonwering en verlichting in eigen hand.",
    kenmerken: ["Binnen- en buitenshowroom van 4000 m2 in Uden","Dealer van Verasol veranda's (Cube, Profiline, Greenline)","Traject van inmeten tot plaatsing in eigen hand","Opties zoals led-verlichting en zonwering"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#3a5f3f", bron: "https://www.vandenboschtuinenterras.nl/veranda", gecontroleerd: "2026-08"
  },
  {
    id: "wagemans-outdoor-experience", naam: "Wagemans Outdoor Experience",
    plaats: "Roermond", provincie: "Limburg",
    adres: "Randweg 5, 6045 JK Roermond",
    website: "https://www.wagemansoutdoor.nl", werkgebied: null,
    producten: ["veranda","terrasoverkapping","tuinkamer"],
    typen: ["aluminium"], dakTypen: [], opties: ["zonwering","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Familiebedrijf uit Roermond met ruim 45 jaar ervaring, producent en specialist in aluminium veranda's op maat. In het experience center aan de Randweg staan meer dan vijftien volledig ingerichte terrasoverkappingen, tuinkamers en pergola's plus een assortiment buitenzonwering.",
    kenmerken: ["Familiebedrijf met ruim 45 jaar ervaring","Producent van aluminium veranda's","Experience center met 15+ ingerichte terrasoverkappingen en tuinkamers","Terrasoverkappingen ontworpen door Marcel en Michel Wagemans"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#9c5a38", bron: "https://www.wagemansoutdoor.nl/showroom/", gecontroleerd: "2026-08"
  },
  {
    id: "movaka", naam: "Movaka",
    plaats: "Gronsveld", provincie: "Limburg",
    adres: "Schutteboendersweg 3, Gronsveld",
    website: "https://movaka.nl", werkgebied: null,
    producten: ["terrasoverkapping","veranda","lamellendak"],
    typen: ["aluminium"], dakTypen: ["glas","polycarbonaat","lamellen"], opties: ["zonwering","maatwerk"],
    merken: ["Verano","Harol","Sunmaster","Brustor","Hörmann","Zonnelux"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Specialist in rolluiken, zonwering en terrasoverkappingen uit de regio Maastricht met ruim 30 jaar ervaring, sinds 2021 gevestigd in een vernieuwd en uitgebreid pand in Gronsveld. Levert aluminium terrasoverkappingen op maat met polycarbonaat- of glasdak, lamellendaken, glaswanden en verandazonwering, geplaatst door het eigen team.",
    kenmerken: ["Ruim 30 jaar ervaring in de regio Maastricht","Terrasoverkappingen met polycarbonaat- of glasdak en lamellendaken","Partner van o.a. Verano, Harol, Sunmaster en Brustor","Sinds 2022 Somfy Expert, vernieuwde showroom sinds 2021"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#46607a", bron: "https://movaka.nl/over-movaka/", gecontroleerd: "2026-08"
  },
  {
    id: "korsten-zonwering", naam: "Korsten Zonwering",
    plaats: "Weert", provincie: "Limburg",
    adres: null,
    website: "https://www.korstenzonwering.nl", werkgebied: null,
    producten: ["terrasoverkapping","veranda","tuinkamer","carport"],
    typen: ["aluminium"], dakTypen: [], opties: ["zonwering","schuifwanden","onderhoud","maatwerk"],
    merken: [], keurmerken: [],
    showroom: null, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Bedrijf uit Weert dat aluminium veranda's, terrasoverkappingen, tuinkamers en carports op maat levert naast zonwering, screens en rolluiken. Verzorgt de complete installatie van overkappingen en glazen schuifwanden en biedt daarnaast servicebeurten en reparaties.",
    kenmerken: ["Aluminium veranda's, overkappingen, tuinkamers en carports op maat","Werkgebied binnen circa een uur rijafstand rond Weert","Complete installatie van overkappingen en glazen schuifwanden","Ook servicebeurten en reparaties"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#7a4a2b", bron: "https://www.korstenzonwering.nl/overkappingen/", gecontroleerd: "2026-08"
  },
  {
    id: "meloveranda", naam: "MeloVeranda",
    plaats: "Heerlen", provincie: "Limburg",
    adres: "Jan Campertstraat 13, Heerlen",
    website: "https://meloveranda.nl", werkgebied: ["Limburg"],
    producten: ["veranda","terrasoverkapping"],
    typen: [], dakTypen: [], opties: ["maatwerk"],
    merken: [], keurmerken: [],
    showroom: null, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Verandaspecialist gevestigd aan de Jan Campertstraat in Heerlen, gericht op luxe overkappingen en veranda's. Vooral actief in Limburg, maar plaatst producten ook elders in Nederland en in België.",
    kenmerken: ["Gevestigd in Heerlen","Vooral actief in Limburg, plaatst ook door heel Nederland en Belgie","Luxe overkappingen en veranda's","Gratis advies"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#44584a", bron: "https://meloveranda.nl/", gecontroleerd: "2026-08"
  },
  {
    id: "sfeervol-buitenleven", naam: "Sfeervol Buitenleven",
    plaats: "Vianen (Land van Cuijk)", provincie: "Noord-Brabant",
    adres: "Berkenkamp 49, 5434 PC Vianen",
    website: "https://www.sfeervolbuitenleven.nl", werkgebied: null,
    producten: ["terrasoverkapping","veranda","tuinkamer"],
    typen: ["hout"], dakTypen: [], opties: ["zonwering","schuifwanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: 2008,
    profiel: "Sinds 2008 leverancier van maatwerk overkappingen, veranda's, tuinhuizen en bijgebouwen, met showroom en showtuin in Vianen bij Cuijk op de grens van Noord-Brabant en Limburg. Profileert zich op de eigen site als specialist voor onder meer Venray en Venlo en levert daarnaast glazen schuifdeuren, screens en pergola's met zonwering.",
    kenmerken: ["Showroom en showtuin in Vianen (bij Cuijk)","Sinds 2008 actief in overkappingen, veranda's en tuinhuizen","Regiopagina's voor Venray en Venlo (Noord-Limburg)","Ook glazen schuifdeuren, screens en pergola's met zonwering"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#6d5a3f", bron: "https://www.sfeervolbuitenleven.nl/", gecontroleerd: "2026-08"
  },
  {
    id: "verandas-aan-huis", naam: "VerandasAanHuis",
    plaats: "Hernen", provincie: "Gelderland",
    adres: null,
    website: "https://www.verandasaanhuis.nl", werkgebied: ["Landelijk"],
    producten: ["veranda","terrasoverkapping"],
    typen: ["hout"], dakTypen: ["polycarbonaat"], opties: ["led","schuifwanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: null, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "VerandasAanHuis uit Hernen (regio Wijchen/Nijmegen) produceert en monteert houten veranda's en terrasoverkappingen op maat, met ruim 20 jaar ervaring. Het bedrijf bouwt met douglas balklagen en eiken staanders en plaatst door heel Nederland, onder meer in de Randstad, provincie Utrecht en de regio Nijmegen.",
    kenmerken: ["Gevestigd in Hernen, regio Wijchen/Nijmegen","Houten veranda's met douglas balklagen en eiken staanders","Iedere veranda op maat gemaakt, eigen montagemedewerkers","Opties zoals glazen schuifwanden, lichtstraten en inbouwspots"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#5c4633", bron: "https://www.verandasaanhuis.nl/", gecontroleerd: "2026-08"
  },
  {
    id: "huis-en-tuin-arnhem", naam: "Huis & Tuin Arnhem",
    plaats: "Duiven", provincie: "Gelderland",
    adres: "Fotograaf 18, 6921 RR Duiven",
    website: "https://huisentuinarnhem.nl", werkgebied: ["Landelijk"],
    producten: ["veranda","terrasoverkapping","tuinkamer","lamellendak"],
    typen: [], dakTypen: ["lamellen"], opties: ["led","zonwering","schuifwanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Huis & Tuin Arnhem levert veranda's, kozijnen, deuren en glazen schuifwanden op maat vanuit Duiven bij Arnhem. Een veranda kan worden uitgebreid tot een complete tuinkamer met glazen zijwanden, zonwering of schuifwanden; daarnaast zijn er pergolasystemen met zonwerende lamellen.",
    kenmerken: ["Showroom in Duiven bij Arnhem","Veranda uitbreidbaar tot tuinkamer met glazen zijwanden","Accessoires zoals LED-verlichting en screens","Ook kozijnen, deuren en glazen schuifwanden op maat"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#3f5d45", bron: "https://huisentuinarnhem.nl/", gecontroleerd: "2026-08"
  },
  {
    id: "aluzon-ede", naam: "Aluzon",
    plaats: "Ede", provincie: "Gelderland",
    adres: "Nieuwe Maanderbuurtweg 10, Ede",
    website: "https://www.aluzon.nl", werkgebied: null,
    producten: ["terrasoverkapping","lamellendak"],
    typen: [], dakTypen: ["glas","lamellen"], opties: ["zonwering","maatwerk"],
    merken: ["Weinor","Verano"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Aluzon uit Ede is al ruim 30 jaar specialist in zonwering, rolluiken en terrasoverkappingen en levert overkappingen van de merken Weinor en Verano. Het assortiment omvat onder meer terrasoverkappingen met glasdak en het Weinor Artares lamellendak, geleverd en geplaatst in Ede en omgeving (o.a. Bennekom, Veenendaal en Wageningen).",
    kenmerken: ["Ruim 30 jaar actief in Ede en omgeving","Showroom aan de Nieuwe Maanderbuurtweg in Ede","Terrasoverkappingen van Weinor en Verano","Ook lamellendaken, zonwering en rolluiken"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#9c5a38", bron: "https://www.aluzon.nl/terrasoverkapping/", gecontroleerd: "2026-08"
  },
  {
    id: "gerve-verandas", naam: "Gervé Veranda's",
    plaats: "Buren", provincie: "Gelderland",
    adres: null,
    website: "https://www.gerve-verandas.nl", werkgebied: null,
    producten: ["veranda","terrasoverkapping","tuinkamer","lamellendak","carport"],
    typen: ["aluminium","hout"], dakTypen: ["lamellen"], opties: ["zonwering","schuifwanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Gervé Veranda's uit Buren (Rivierenland) is totaalspecialist in aluminium en houten veranda's, buitenverblijven op maat, carports, tuinkamers, glazen wandsystemen en zonwering. Het bedrijf heeft een showroom met showtuin van 1500 m2 waar ruim vijftien volledig ingerichte overkappingen staan opgesteld.",
    kenmerken: ["Showroom en showtuin van 1500 m2 in Buren","Aluminium en houten veranda's en maatwerk buitenverblijven","Ook lamellendaken, tuinkamers en carports","Glazen schuif- en vouwwanden en zonwering"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2f5233", bron: "https://www.gerve-verandas.nl/over-ons/", gecontroleerd: "2026-08"
  },
  {
    id: "trendhout", naam: "Trendhout",
    plaats: "Hattemerbroek", provincie: "Gelderland",
    adres: "Warmtekrachtstraat 1, 8094 SE Hattemerbroek",
    website: "https://www.trendhout.nl", werkgebied: ["Landelijk"],
    producten: ["veranda","terrasoverkapping"],
    typen: ["hout"], dakTypen: [], opties: ["schuifwanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: true, montageEigenTeam: null, opgericht: null,
    profiel: "Trendhout uit Hattemerbroek (bij Zwolle) is leverancier van houten buitenverblijven en constructiehout, met veranda's en kapschuur-overkappingen in douglas en eiken als bouwpakket. Naast het hoofdkantoor met showroom in Hattemerbroek heeft het bedrijf een productielocatie in Oldebroek en een landelijk dealernetwerk met showrooms.",
    kenmerken: ["Hoofdkantoor en showroom in Hattemerbroek, productie in Oldebroek","Douglas en eiken veranda's en kapschuren als bouwpakket","Constructiehout online te bestellen, levering op ieder adres","Toebehoren zoals glazen schuifwanden en buitenkeukens"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#6b4f2f", bron: "https://www.trendhout.nl/over-ons/", gecontroleerd: "2026-08"
  },
  {
    id: "lugo", naam: "Lugo",
    plaats: "Deventer", provincie: "Overijssel",
    adres: "Hannoverstraat 5a, 7418 BL Deventer",
    website: "https://www.lugo.nl", werkgebied: null,
    producten: ["terrasoverkapping","tuinkamer","lamellendak"],
    typen: ["aluminium"], dakTypen: ["glas","polycarbonaat","lamellen"], opties: ["zonwering","schuifwanden","maatwerk"],
    merken: ["Pallazzo"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Lugo is een familiebedrijf dat al ruim 40 jaar oplossingen levert op het gebied van zonwering, terrasoverkappingen, raamdecoratie en garagedeuren, met vestigingen in Deventer, Enschede en Rijssen. Het assortiment omvat aluminium Pallazzo-terrasoverkappingen met glas- of polycarbonaatdak, terraskamers, lamellendaken en glazen schuifwanden.",
    kenmerken: ["Familiebedrijf, ruim 40 jaar actief","Showrooms in Deventer, Enschede en Rijssen","Pallazzo aluminium terrasoverkappingen met glas- of polycarbonaatdak","Ook lamellendaken, terraskamers en glazen schuifwanden"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#33566b", bron: "https://www.lugo.nl/over-ons/", gecontroleerd: "2026-08"
  },
  {
    id: "roossink-houtbouw", naam: "Roossink Houtbouw",
    plaats: "Hengelo", provincie: "Overijssel",
    adres: "Havenkade 68, 7553 GN Hengelo",
    website: "https://roossinkhoutbouw.nl", werkgebied: ["Overijssel"],
    producten: ["veranda","terrasoverkapping","carport"],
    typen: ["hout"], dakTypen: [], opties: ["schuifwanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: null, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Roossink Houtbouw uit Hengelo is specialist in 100% op maat gemaakte houten constructies, zoals overkappingen, kapschuren, carports, bergingen en glazen schuifwanden, uitgevoerd in eiken en douglas. Het meeste maatwerk wordt vooraf in de eigen werkplaats gemaakt, waardoor de montage meestal in een dag klaar is.",
    kenmerken: ["Maatwerk houtbouw in eiken en douglas","Overkappingen, kapschuren, carports en glazen schuifwanden","Voorbereiding in eigen werkplaats, montage meestal in een dag","Werkzaam in heel Overijssel en Twente"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#7a5230", bron: "https://roossinkhoutbouw.nl/", gecontroleerd: "2026-08"
  },
  {
    id: "verandaxl", naam: "VerandaXL",
    plaats: "Kampen", provincie: "Overijssel",
    adres: null,
    website: "https://www.verandaxl.eu", werkgebied: null,
    producten: ["veranda","terrasoverkapping","lamellendak"],
    typen: ["aluminium"], dakTypen: ["glas","polycarbonaat","lamellen"], opties: ["led","zonwering","schuifwanden","maatwerk"],
    merken: ["HOWQ"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: true, montageEigenTeam: true, opgericht: null,
    profiel: "VerandaXL levert aluminium HOWQ-terrasoverkappingen en veranda's op maat, met een showroom in Kampen, zowel voor zelfbouwers als met professionele montage. De modulaire systemen zijn leverbaar met glas- of polycarbonaatdak en uit te breiden met automatische zonwering, screens, glazen schuifwanden, aluminium wanden, inbouw-ledverlichting en het Pinela lamellendak.",
    kenmerken: ["Showroom in Kampen","Aluminium HOWQ-systemen met glas- of polycarbonaatdak","Voor zelfbouwers en met professionele montage","Modulair uitbreidbaar met zonwering, schuifwanden en led"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2c5d63", bron: "https://www.verandaxl.eu/", gecontroleerd: "2026-08"
  },
  {
    id: "flevo-overkapping", naam: "Flevo Overkapping",
    plaats: "Lelystad", provincie: "Flevoland",
    adres: null,
    website: "https://flevo-overkapping.nl", werkgebied: ["Flevoland"],
    producten: ["veranda","terrasoverkapping"],
    typen: ["hout","aluminium"], dakTypen: [], opties: ["schuifwanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: null, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Flevo Overkapping is een gespecialiseerd timmerbedrijf uit Lelystad dat maatwerk overkappingen, veranda's, glazen schuifwanden en complete buitenruimtes ontwerpt en realiseert. De overkappingen worden uitgevoerd in duurzaam douglas hout of aluminium en door eigen timmerlieden gemonteerd in heel Flevoland, waaronder Almere, Lelystad, Dronten, Zeewolde en Emmeloord.",
    kenmerken: ["Timmerbedrijf uit Lelystad, werkzaam in heel Flevoland","Maatwerk overkappingen met plat dak of zadeldak","Uitvoering in douglas hout of aluminium","Eigen timmerlieden verzorgen de montage"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#4a6741", bron: "https://flevo-overkapping.nl/over-ons/", gecontroleerd: "2026-08"
  },
  {
    id: "terrascompleet", naam: "Terrascompleet",
    plaats: "Biddinghuizen", provincie: "Flevoland",
    adres: "Korenmaaier 13, 8256 SK Biddinghuizen",
    website: "https://terrascompleet.nl", werkgebied: ["Flevoland"],
    producten: ["veranda","terrasoverkapping","tuinkamer","carport"],
    typen: [], dakTypen: ["glas"], opties: ["zonwering","schuifwanden","maatwerk"],
    merken: ["Weinor","Cornels","Pallazzo","Verano","Gardendreams","Somfy"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Terrascompleet uit Biddinghuizen (gemeente Dronten) is specialist in terrasoverkappingen, tuinkamers, carports, balkonbeglazing en binnen- en buitenzonwering, met een ruime showroom met overkappingen van onder meer Weinor, Cornels, Pallazzo, Verano en Gardendreams. Het bedrijf biedt een aanpak met een aanspreekpunt voor overkapping en terrasinrichting en werkt in Flevoland en omliggende plaatsen zoals Kampen, Harderwijk en Elburg.",
    kenmerken: ["Ruime showroom in Biddinghuizen (gemeente Dronten)","Overkappingen van Weinor, Cornels, Pallazzo, Verano en Gardendreams","Ook tuinkamers, balkonbeglazing en glazen schuifwanden","Werkzaam in Flevoland en omgeving, o.a. Kampen, Harderwijk en Elburg"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#8a5a33", bron: "https://terrascompleet.nl/over-ons/", gecontroleerd: "2026-08"
  },
  {
    id: "van-der-zalm-zonwering", naam: "Van der Zalm Zonwering",
    plaats: "Joure", provincie: "Friesland",
    adres: "Marconiweg 18, 8501 XM Joure",
    website: "https://vanderzalmzonwering.nl", werkgebied: ["Friesland"],
    producten: ["terrasoverkapping"],
    typen: [], dakTypen: ["glas","polycarbonaat","lamellen"], opties: ["zonwering","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Zonwering- en terrasoverkappingsbedrijf in Joure met een showroom waarin negen terrasoverkappingen op ware grootte staan opgesteld. Levert op maat gemaakte terrasoverkappingen met onder meer glazen daken, polycarbonaat, doekdaken en lamellendaken in Joure, Leeuwarden en de rest van Friesland.",
    kenmerken: ["Showroom met negen terrasoverkappingen op ware grootte","Terrasoverkappingen op maat met glas-, polycarbonaat-, doek- en lamellendaken","Ruim 20 jaar ervaring in rolluiken, screens en zonwering","Adviseert in de showroom of bij de klant thuis"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2C4A6E", bron: "https://vanderzalmzonwering.nl/producten/terrasoverkapping/", gecontroleerd: "2026-08"
  },
  {
    id: "veldman-zonwering-buitenleven", naam: "Veldman Zonwering en Buitenleven",
    plaats: "Heerenveen", provincie: "Friesland",
    adres: "Burgemeester Falkenaweg 91, 8442 LB Heerenveen",
    website: "https://veldmanzonwering.nl", werkgebied: ["Friesland","Groningen","Drenthe","Overijssel","Flevoland","Gelderland","Noord-Holland"],
    producten: ["terrasoverkapping","tuinkamer"],
    typen: [], dakTypen: [], opties: ["zonwering","maatwerk"],
    merken: ["Weinor","Leiner","Gibus","Somfy"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: 1899,
    profiel: "Familiebedrijf uit Heerenveen dat in 1899 begon en is uitgegroeid tot specialist in luxe terrasoverkappingen, buitenkamers en zonwering. Officieel dealer van merken als Weinor, Leiner, Gibus en Somfy, met ondersteuning van maatwerkontwerp tot service en garantieafhandeling.",
    kenmerken: ["Familiebedrijf, opgericht in 1899","Specialist in luxe terrasoverkappingen, buitenkamers en zonwering","Officieel dealer van o.a. Weinor, Leiner, Gibus en Somfy","Werkzaam in Noord- en Oost-Nederland tot en met Noord-Holland"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2F5233", bron: "https://veldmanzonwering.nl/over-ons", gecontroleerd: "2026-08"
  },
  {
    id: "buitenbart", naam: "BuitenBart",
    plaats: "Heerenveen", provincie: "Friesland",
    adres: "Innovatielaan 25, 8447 SN Heerenveen",
    website: "https://www.buitenbart.nl", werkgebied: ["Friesland"],
    producten: ["veranda","terrasoverkapping"],
    typen: ["hout"], dakTypen: [], opties: ["schuifwanden","maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: true, montageEigenTeam: true, opgericht: null,
    profiel: "Maatwerkbedrijf uit Heerenveen voor houten veranda's, kapschuren en moderne overkappingen met glazen schuifwanden, naast schuttingen en dakterrassen. Levert zowel standaardmodellen als volledig maatwerk, als compleet bouwpakket of geplaatst door eigen vakmensen, in Heerenveen, Leeuwarden, Drachten en de rest van Friesland.",
    kenmerken: ["Houten veranda's, kapschuren en moderne overkappingen op maat","Leverbaar als compleet bouwpakket of inclusief montage","Glazen schuifwanden mogelijk","Showroom in Heerenveen"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#6B4F35", bron: "https://www.buitenbart.nl/overkapping-heerenveen", gecontroleerd: "2026-08"
  },
  {
    id: "vida-libre", naam: "Vida Libre",
    plaats: "Roden", provincie: "Drenthe",
    adres: null,
    website: "https://www.vidalibre.nl", werkgebied: ["Drenthe","Groningen"],
    producten: ["veranda","terrasoverkapping","tuinkamer","carport"],
    typen: [], dakTypen: [], opties: ["zonwering"],
    merken: ["Verasol","Libre","Pext","Verano"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Specialist in veranda's en zonwering met showrooms in Roden en Assen; de vestiging in Roden telt 2.600 m2 met 21 volledig ingerichte overkappingen. Voert overkappingen van meerdere merken zoals Verasol, Libre en Pext, naast tuinkamers, carports, zonwering, schuttingen en rolluiken, en is officieel Verano-dealer.",
    kenmerken: ["Showrooms in Roden (2.600 m2) en Assen","21 volledig ingerichte overkappingen in de showroom","Meerdere merken: Verasol, Libre en Pext","Officieel dealer van Verano-zonwering"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#9C5B3F", bron: "https://www.vidalibre.nl/", gecontroleerd: "2026-08"
  },
  {
    id: "kroezon-zonwering", naam: "Kroezon Zonwering & Terrasoverkappingen",
    plaats: "Hoogeveen", provincie: "Drenthe",
    adres: "Lindberghstraat 5, 7903 BM Hoogeveen",
    website: "https://www.kroezon.nl", werkgebied: ["Drenthe","Groningen"],
    producten: ["terrasoverkapping"],
    typen: [], dakTypen: ["glas"], opties: ["zonwering","maatwerk"],
    merken: ["Brustor"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Zonweringspecialist uit Hoogeveen met meer dan 25 jaar ervaring in zonwering en terrasoverkappingen, waaronder pergola's en glazen overkappingen. Adviseert in de eigen showroom aan de Lindberghstraat of bij de klant thuis en bedient onder meer Hoogeveen, Assen, Emmen en Groningen.",
    kenmerken: ["Meer dan 25 jaar zonweringspecialist","Pergola's en glazen terrasoverkappingen","Voert o.a. het merk Brustor","Showroom in Hoogeveen, advies ook aan huis"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#3A5A80", bron: "https://www.kroezon.nl/showroom/", gecontroleerd: "2026-08"
  },
  {
    id: "kamst-roofs", naam: "Kamst Roofs",
    plaats: "Veenoord (gemeente Emmen)", provincie: "Drenthe",
    adres: "Middenweg 107, 7844 KV Veenoord",
    website: "https://kamstroofs.nl", werkgebied: null,
    producten: ["terrasoverkapping","carport"],
    typen: [], dakTypen: [], opties: ["maatwerk"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Specialist in membraanarchitectuur uit Veenoord (gemeente Emmen) die doekoverkappingen op maat ontwerpt, produceert en monteert voor terrassen, tuinen, carports, dakterrassen, horeca en openbare ruimten. Heeft een showroom aan de Middenweg in Veenoord, een eigen productielocatie aan de Boerdijk en een bezoeklocatie in Utrecht op afspraak.",
    kenmerken: ["Specialist in doekoverkappingen en membraanarchitectuur","Ontwerp, productie en montage in eigen beheer","Showroom en productielocatie in Veenoord bij Emmen","Ook overkappingen voor horeca en openbare ruimte, zoals zwevende carports"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#44586B", bron: "https://kamstroofs.nl/over-ons/", gecontroleerd: "2026-08"
  },
  {
    id: "a5-patmar", naam: "A5 Patmar",
    plaats: "Meppel", provincie: "Drenthe",
    adres: "Johan van Oldenbarneveltstraat 3, 7942 GZ Meppel",
    website: "https://www.patmar.nl", werkgebied: ["Drenthe","Flevoland"],
    producten: ["veranda","terrasoverkapping","tuinkamer"],
    typen: [], dakTypen: [], opties: ["schuifwanden","zonwering"],
    merken: ["Tibelly"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: true, opgericht: null,
    profiel: "Specialist in zonwering, terrasoverkappingen, veranda's, tuinkamers, kunststof kozijnen, garagedeuren en glazen schuifwanden voor particulieren en bedrijven. Levert en monteert met een eigen montageteam in Drenthe en Flevoland en heeft showrooms in Marknesse en (op afspraak) in Meppel.",
    kenmerken: ["Veranda's, terrasoverkappingen en tuinkamers voor particulier en zakelijk","Montage door eigen montageteam","Showroom in Marknesse, bezoeklocatie in Meppel op afspraak","Ook zonwering, kunststof kozijnen, garagedeuren en glazen schuifwanden"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#7A4E42", bron: "https://www.patmar.nl/overkappingen-veranda-terrasoverkapping-emmeloord-meppel/", gecontroleerd: "2026-08"
  },
  {
    id: "postmus-nuis", naam: "Postmus Nuis",
    plaats: "Nuis", provincie: "Groningen",
    adres: null,
    website: "https://postmus-nuis.nl", werkgebied: ["Groningen","Drenthe","Friesland"],
    producten: ["veranda","terrasoverkapping"],
    typen: ["aluminium","hout"], dakTypen: [], opties: [],
    merken: ["Aluxe","Lugarde"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Vakwinkel in Nuis, op circa een half uur rijden van de stad Groningen, met een showroom van 3.500 m2 waarin compleet ingerichte veranda's en overkappingen staan opgesteld. Voert aluminium veranda's van het merk Aluxe naast houten overkappingen, blokhutten en tuinhuizen, en levert daarnaast bouwmaterialen en tuininrichting.",
    kenmerken: ["Showroom van 3.500 m2 met opgestelde veranda's en overkappingen","Aluminium veranda's van het merk Aluxe","Ook houten overkappingen, blokhutten en tuinhuizen (o.a. Lugarde)","Richt zich op Groningen, Drenthe en Friesland"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#3E5E45", bron: "https://postmus-nuis.nl/assortiment/tuin/verandas/", gecontroleerd: "2026-08"
  },
  {
    id: "pac-zonweringen", naam: "PAC Zonweringen",
    plaats: null, provincie: "Zeeland",
    adres: null,
    website: "https://www.paczonweringen.nl", werkgebied: ["Zeeland"],
    producten: ["veranda","tuinkamer"],
    typen: [], dakTypen: [], opties: ["zonwering","maatwerk"],
    merken: ["Weinor","Sunmaster"], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "PAC Polderdijk Zonweringen is een Zeeuwse specialist in maatwerk zonweringen, rolluiken, veranda's en tuinkamers, actief in de regio's Middelburg, Vlissingen, Terneuzen en Goes. Naar eigen zeggen het grootste assortiment veranda's van Zeeland, met acht veranda's op ware grootte in de showroom; Weinor Top Partner en Premium Partner van Sunmaster.",
    kenmerken: ["Acht veranda's op ware grootte in de showroom","Grootste assortiment veranda's van Zeeland volgens de eigen site","Weinor Top Partner en Premium Partner Sunmaster","Actief in de regio's Middelburg, Vlissingen, Terneuzen en Goes"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#2E5E6E", bron: "https://www.paczonweringen.nl/over-pac/", gecontroleerd: "2026-08"
  },
  {
    id: "ramero", naam: "Ramero",
    plaats: "Oostburg", provincie: "Zeeland",
    adres: "Transportweg 9, 4501 PS Oostburg",
    website: "https://ramero.nl", werkgebied: ["Zeeland"],
    producten: ["veranda","terrasoverkapping"],
    typen: ["aluminium","hout","kunststof"], dakTypen: [], opties: ["zonwering"],
    merken: [], keurmerken: [],
    showroom: true, zelfbouwMogelijk: null, montageEigenTeam: null, opgericht: null,
    profiel: "Bedrijf uit Oostburg dat vanuit de eigen showroom terrasoverkappingen, veranda's, zonwering, rolluiken, ramen en deuren levert in heel Zeeuws-Vlaanderen, waaronder Terneuzen, Hulst en Sluis. Begeleidt klanten van advies en ontwerp tot professionele montage, met producten in kunststof, aluminium en hout voor nieuwbouw en renovatie.",
    kenmerken: ["Showroom in Oostburg, Zeeuws-Vlaanderen","Terrasoverkappingen zoals de Ambiance Overkapping XL","Werkgebied regio Terneuzen, Hulst en Sluis","Begeleiding van advies en ontwerp tot montage"],
    rating: null, aantalReviews: 0, reviews: [], prijsPerM2: null, prijsKlasse: null,
    kleur: "#6E5844", bron: "https://ramero.nl/overkappingen/terrasoverkapping/", gecontroleerd: "2026-08"
  }
];

/* Kennisbank-artikelen (metadata; de artikelpagina's zijn losse HTML-bestanden) */
const ARTIKELEN = [
  { id: "veranda-kopen-waar-op-letten", titel: "Veranda kopen: waar moet je op letten?", samenvatting: "De complete checklist: van materiaalkeuze en fundering tot garantie en de valkuilen in offertes.", leestijd: 8, kleur: "#2c5e46", icoon: "checklist" },
  { id: "wat-kost-een-veranda", titel: "Wat kost een veranda in 2026?", samenvatting: "Actuele richtprijzen per type, formaat en materiaal — plus waar je op kunt besparen zonder in te leveren.", leestijd: 7, kleur: "#c77d1b", icoon: "euro" },
  { id: "vergunning-veranda", titel: "Heb je een vergunning nodig voor een veranda?", samenvatting: "Wanneer je vergunningsvrij mag bouwen, hoe je het checkt en wat een aanvraag kost en duurt.", leestijd: 6, kleur: "#33566e", icoon: "document" },
  { id: "aluminium-of-hout", titel: "Aluminium of hout: welk materiaal past bij jou?", samenvatting: "Uitstraling, onderhoud, levensduur en prijs eerlijk naast elkaar gezet.", leestijd: 6, kleur: "#8a5a2b", icoon: "materiaal" },
  { id: "dakbedekking-kiezen", titel: "Glas, polycarbonaat of lamellen: het juiste dak kiezen", samenvatting: "De voor- en nadelen van elk daktype, met advies per situatie en budget.", leestijd: 7, kleur: "#2b6777", icoon: "dak" },
  { id: "veranda-onderhoud", titel: "Zo houd je je veranda in topconditie", samenvatting: "Onderhoudskalender per seizoen en per materiaal, met veelgemaakte fouten.", leestijd: 5, kleur: "#456545", icoon: "onderhoud" }
];
