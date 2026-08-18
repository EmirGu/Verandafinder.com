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
