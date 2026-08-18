# Verandawijzer.nl

**Dé onafhankelijke vergelijkingssite voor veranda's, overkappingen en tuinkamers in Nederland.**

Bezoekers vergelijken verandabedrijven op prijs, reviews, werkgebied en specialisaties, berekenen een richtprijs en vragen gericht offertes aan.

## Wat zit erin?

| Pagina | Bestand | Functie |
|---|---|---|
| Homepage | `index.html` | Hero met zoekfunctie, uitleg, topbedrijven, reviews, FAQ |
| Bedrijvenoverzicht | `bedrijven.html` | Alle bedrijven met live filters (provincie, type, prijsklasse, beoordeling, opties), sorteren en zoeken |
| Bedrijfsprofiel | `bedrijf.html?id=…` | Volledig profiel: specificaties, prijsindicatie, reviews met scoreverdeling, keurmerken |
| Vergelijken | `vergelijken.html` | Tot 3 bedrijven naast elkaar, beste waarden uitgelicht |
| Offerte aanvragen | `offerte.html` | Meerstaps-wizard die op basis van wensen passende bedrijven matcht |
| Prijswijzer | `prijzen.html` | Interactieve calculator: type + afmetingen + opties → richtprijs |
| Favorieten | `favorieten.html` | Opgeslagen bedrijven (localStorage) |
| Kennisbank | `kennisbank.html` + artikelen | Gidsen over typen, prijzen, vergunningen, onderhoud, zonwering |
| Overig | `over-ons.html`, `contact.html`, `veelgestelde-vragen.html`, `privacy.html`, `voorwaarden.html` | |

## Techniek

- **Geen build-stap, geen dependencies.** Puur HTML + CSS + vanilla JavaScript. Werkt op elke hosting en zelfs lokaal door `index.html` te openen.
- Alle bedrijfsdata staat in **`assets/js/data.js`** — één bestand, eenvoudig aan te passen.
- Gedeelde componenten (header, footer, vergelijkbalk, favorieten, toasts) in `assets/js/app.js`.
- Design system in `assets/css/style.css` (CSS custom properties, licht/donker-neutraal, volledig responsive).
- Vergelijken en favorieten werken via `localStorage`; de offertewizard matcht bedrijven client-side.

## ⚠️ Voorbeelddata

De bedrijven in `assets/js/data.js` zijn **fictieve voorbeeldbedrijven** zodat de site direct volledig werkt en te demonstreren is. Vervang ze door echte aangesloten bedrijven vóór livegang: elk bedrijf is één object in de lijst — kopieer een bestaand object en pas de velden aan. Het schema staat bovenaan het bestand gedocumenteerd.

## Lokaal bekijken

```bash
# optie 1: gewoon openen
open index.html

# optie 2: met een lokale server (aanbevolen)
python3 -m http.server 8000
# → http://localhost:8000
```

## Publiceren

De site is statisch en kan overal gehost worden:

- **GitHub Pages:** Settings → Pages → deploy vanaf de hoofdbranch (map `/`). Gratis.
- **Netlify / Vercel / Cloudflare Pages:** repository koppelen, geen build-instellingen nodig.
- **Eigen hosting:** upload alle bestanden naar de webroot.

Vergeet niet `sitemap.xml` en `robots.txt` aan te passen aan het definitieve domein.
