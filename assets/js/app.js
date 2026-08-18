/* ==========================================================================
   Verandawijzer.nl — Gedeelde applicatielogica
   Header/footer, vergelijken (max 3), favorieten, toasts en render-helpers.
   Vereist: data.js is eerder geladen.
   ========================================================================== */

const VF = (() => {
  const VERGELIJK_KEY = "vf_vergelijk";
  const FAVORIETEN_KEY = "vf_favorieten";
  const RECENT_KEY = "vf_recent";
  const MAX_VERGELIJK = 3;

  /* ---------- Opslag (localStorage met fallback) ---------- */
  const geheugen = {};
  function lees(sleutel) {
    try {
      const raw = localStorage.getItem(sleutel);
      const waarde = raw ? JSON.parse(raw) : [];
      return Array.isArray(waarde) ? waarde : [];
    } catch (e) { return Array.isArray(geheugen[sleutel]) ? geheugen[sleutel] : []; }
  }
  function schrijf(sleutel, waarde) {
    try { localStorage.setItem(sleutel, JSON.stringify(waarde)); }
    catch (e) { geheugen[sleutel] = waarde; }
  }

  /* ---------- Data-helpers ---------- */
  const getBedrijf = (id) => BEDRIJVEN.find((b) => b.id === id) || null;

  const euro = (n) => "€ " + Math.round(n).toLocaleString("nl-NL");

  /* Nederlandse decimale komma voor beoordelingen: 4.8 → "4,8" */
  const komma = (n) => n.toFixed(1).replace(".", ",");

  function sterrenHTML(score) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      const vol = score >= i - 0.25;
      html += `<svg class="${vol ? "" : "ster-leeg"}" width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.5 5.8 21l1.6-7L2 9.3l7.1-.7z"/></svg>`;
    }
    return `<span class="sterren" role="img" aria-label="${komma(score)} van 5 sterren">${html}</span>`;
  }

  const initialen = (naam) => naam.split(/\s+/).filter((w) => /^[A-Za-z&]/.test(w)).slice(0, 2).map((w) => w[0]).join("").toUpperCase();

  /* Logo: echte favicon van de bedrijfswebsite, met monogram als vangnet.
     Laadt de favicon niet of heeft het bedrijf geen website, dan blijft het monogram staan. */
  function avatarHTML(b, extraKlasse = "") {
    const monogram = initialen(b.naam);
    let img = "";
    if (b.website) {
      const domein = b.website.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
      img = `<img src="https://www.google.com/s2/favicons?domain=${domein}&sz=64" alt="" loading="lazy"
        onload="if(this.naturalWidth>16){this.closest('.bedrijf-avatar').classList.add('met-logo')}else{this.remove()}"
        onerror="this.remove()">`;
    }
    return `<span class="bedrijf-avatar ${extraKlasse}" style="background:${b.kleur || "#2c5e46"}" aria-hidden="true">${monogram}${img}</span>`;
  }

  /* Score-weergave: sterren + cijfer, of een nette melding zolang er nog geen reviews zijn */
  function scoreHTML(b) {
    if (!b.rating) return `<span class="geen-reviews">Nog geen reviews via Verandawijzer</span>`;
    return `<span class="score-blok">${sterrenHTML(b.rating)}<span class="score-cijfer">${komma(b.rating)}</span><span class="review-aantal">${b.aantalReviews} reviews</span></span>`;
  }

  /* Actieknoppen (favoriet + vergelijken) — gedeeld door kaart en rij */
  function actieKnoppenHTML(b) {
    const inVergelijk = leesVergelijk().includes(b.id);
    const isFavoriet = leesFavorieten().includes(b.id);
    return `<span class="kaart-acties">
      <button type="button" class="icoon-knop fav ${isFavoriet ? "actief" : ""}" data-fav="${b.id}" aria-label="${isFavoriet ? "Verwijder uit favorieten" : "Bewaar als favoriet"}" aria-pressed="${isFavoriet}" title="Favoriet">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="${isFavoriet ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
      </button>
      <button type="button" class="icoon-knop vgl ${inVergelijk ? "actief" : ""}" data-vergelijk="${b.id}" aria-label="${inVergelijk ? "Verwijder uit vergelijking" : "Voeg toe aan vergelijking"}" aria-pressed="${inVergelijk}" title="Vergelijken">
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>
      </button>
    </span>`;
  }

  const PLAATS_SVG = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>`;

  /* Centrale bedrijfskaart — gebruikt op home en favorieten.
     Toont een korte profielzin en merken zodat de kaart echt iets vertelt;
     sterren verschijnen vanzelf zodra er reviews zijn. */
  function bedrijfKaartHTML(b) {
    const tags = [
      ...b.typen.slice(0, 2).map((t) => MATERIALEN[t]),
      ...(b.merken || []).slice(0, 2),
      ...(b.keurmerken && b.keurmerken.length ? [b.keurmerken[0]] : [])
    ].slice(0, 3);
    const snippet = (b.profiel || "").split(/(?<=\.)\s/)[0] || "";
    const voetLinks = b.prijsPerM2
      ? `<span class="prijs-vanaf">Vanaf<strong>${euro(b.prijsPerM2.min)} / m²</strong></span>`
      : `<span class="prijs-vanaf">${b.producten.length} product${b.producten.length === 1 ? "" : "en"}<strong>${b.showroom ? "Met showroom" : "Bekijk profiel →"}</strong></span>`;
    return `<article class="kaart bedrijf-kaart" data-id="${b.id}">
      <div class="kaart-inhoud" style="padding-top:20px">
        <div style="display:flex;gap:12px;align-items:center">
          ${avatarHTML(b)}
          <div style="min-width:0">
            <h3><a href="bedrijf.html?id=${b.id}">${b.naam}</a></h3>
            <span class="bedrijf-plaats">${PLAATS_SVG}${b.plaats ? `${b.plaats}${b.provincie ? ", " + b.provincie : ""}` : "Landelijk actief"}</span>
          </div>
        </div>
        ${snippet ? `<p class="kaart-profiel">${snippet}</p>` : ""}
        ${b.rating ? scoreHTML(b) : ""}
        ${tags.length ? `<div class="bedrijf-tags">${tags.map((t) => `<span class="badge">${t}</span>`).join("")}</div>` : ""}
        <div class="kaart-voet">
          ${voetLinks}
          ${actieKnoppenHTML(b)}
        </div>
      </div>
    </article>`;
  }

  /* Bedrijfsrij — dichte lijstweergave voor het overzicht */
  function bedrijfRijHTML(b) {
    const feiten = [
      ...(b.plaats ? [`<span>${PLAATS_SVG}${b.plaats}${b.provincie ? ", " + b.provincie : ""}</span>`] : []),
      `<span>${b.producten.map((p) => PRODUCTEN[p]).slice(0, 3).join(" · ")}</span>`,
      ...(b.typen.length ? [`<span>${b.typen.map((t) => MATERIALEN[t]).join(", ")}</span>`] : []),
      ...(b.showroom ? [`<span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 12.5 9.5 18 20 6.5"/></svg>Showroom</span>`] : []),
      ...(b.werkgebied && b.werkgebied[0] === "Landelijk" ? [`<span><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M4 12.5 9.5 18 20 6.5"/></svg>Werkt landelijk</span>`] : [])
    ];
    return `<article class="kaart bedrijf-rij" data-id="${b.id}">
      ${avatarHTML(b)}
      <div class="rij-inhoud">
        <h3><a href="bedrijf.html?id=${b.id}">${b.naam}</a></h3>
        <div class="rij-feiten">${feiten.join("")}</div>
        ${scoreHTML(b)}
        ${b.keurmerken && b.keurmerken.length ? `<div class="bedrijf-tags">${b.keurmerken.map((k) => `<span class="badge">${k}</span>`).join("")}</div>` : ""}
      </div>
      <div class="rij-acties">
        ${actieKnoppenHTML(b)}
        ${b.prijsPerM2 ? `<span class="prijs-vanaf" style="text-align:right">Vanaf<strong>${euro(b.prijsPerM2.min)} / m²</strong></span>` : ""}
      </div>
    </article>`;
  }

  /* ---------- Vergelijken ---------- */
  const leesVergelijk = () => lees(VERGELIJK_KEY).filter((id) => getBedrijf(id));
  function toggleVergelijk(id) {
    let lijst = leesVergelijk();
    if (lijst.includes(id)) {
      lijst = lijst.filter((x) => x !== id);
      toast(`${getBedrijf(id).naam} verwijderd uit vergelijking`);
    } else if (lijst.length >= MAX_VERGELIJK) {
      toast(`Je kunt maximaal ${MAX_VERGELIJK} bedrijven tegelijk vergelijken`);
      return lijst;
    } else {
      lijst.push(id);
      toast(`${getBedrijf(id).naam} toegevoegd aan vergelijking`);
    }
    schrijf(VERGELIJK_KEY, lijst);
    verversUI();
    return lijst;
  }
  function verwijderVergelijk(id) {
    schrijf(VERGELIJK_KEY, leesVergelijk().filter((x) => x !== id));
    verversUI();
  }

  /* ---------- Favorieten ---------- */
  const leesFavorieten = () => lees(FAVORIETEN_KEY).filter((id) => getBedrijf(id));
  function toggleFavoriet(id) {
    let lijst = leesFavorieten();
    if (lijst.includes(id)) {
      lijst = lijst.filter((x) => x !== id);
      toast(`${getBedrijf(id).naam} verwijderd uit favorieten`);
    } else {
      lijst.push(id);
      toast(`${getBedrijf(id).naam} bewaard als favoriet`);
    }
    schrijf(FAVORIETEN_KEY, lijst);
    verversUI();
    return lijst;
  }

  /* ---------- Recent bekeken (profielbezoeken, lokaal) ---------- */
  function registreerBezoek(id) {
    if (!getBedrijf(id)) return;
    const lijst = lees(RECENT_KEY).filter((x) => x !== id);
    lijst.unshift(id);
    schrijf(RECENT_KEY, lijst.slice(0, 8));
  }
  const leesRecent = () => lees(RECENT_KEY).filter((id) => getBedrijf(id));

  /* ---------- Toast ---------- */
  function toast(tekst) {
    let houder = document.querySelector(".toast-houder");
    if (!houder) {
      houder = document.createElement("div");
      houder.className = "toast-houder";
      houder.setAttribute("aria-live", "polite");
      document.body.appendChild(houder);
    }
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = tekst;
    houder.appendChild(el);
    setTimeout(() => el.remove(), 3200);
  }

  /* ---------- Logo: kompas met wordmark ----------
     De "wijzer" (kompasnaald) leidt je naar het juiste bedrijf.
     donker=true geeft de witte variant voor donkere ondergronden. */
  function logoHTML(donker = false) {
    const ring = donker ? "#ffffff" : "#1b3a2d";
    return `<a class="logo" href="index.html" aria-label="Verandawijzer.nl home">
      <svg class="logo-mark" width="34" height="34" viewBox="0 0 48 48" aria-hidden="true">
        <circle cx="24" cy="24" r="20" fill="none" stroke="${ring}" stroke-width="4.5"/>
        <polygon points="35.5,12.5 27.2,27.2 20.8,20.8" fill="${ring}"/>
        <polygon points="12.5,35.5 27.2,27.2 20.8,20.8" fill="#e8a33d"/>
      </svg>
      <span class="logo-tekst">verandawijzer<span class="logo-tld">.nl</span></span>
    </a>`;
  }

  /* ---------- Header & footer ---------- */
  function paginaNaam() {
    const p = location.pathname.split("/").pop() || "index.html";
    return p === "" ? "index.html" : p;
  }

  function renderHeader() {
    const houder = document.getElementById("site-header");
    if (!houder) return;
    /* Artikelpagina's vallen in de navigatie onder Kennisbank */
    const hier = paginaNaam().startsWith("artikel-") ? "kennisbank.html" : paginaNaam();
    const links = [
      ["bedrijven.html", "Bedrijven"],
      ["vergelijken.html", "Vergelijken", "vergelijk"],
      ["prijzen.html", "Prijswijzer"],
      ["kennisbank.html", "Kennisbank"],
      ["favorieten.html", "Favorieten", "favorieten"]
    ];
    houder.innerHTML = `<div class="topstrip">
      <div class="wrap">
        <span><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M4 12.5 9.5 18 20 6.5"/></svg>Onafhankelijke vergelijker</span>
        <span><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" aria-hidden="true"><path d="M4 12.5 9.5 18 20 6.5"/></svg>${BEDRIJVEN.length} bedrijven in heel Nederland</span>
        <span class="ts-rechts"><a href="over-ons.html">Voor bedrijven</a><a href="contact.html">Contact</a></span>
      </div>
    </div>
    <header class="site-header">
      <div class="wrap">
        ${logoHTML(false)}
        <button class="menu-knop" type="button" aria-expanded="false" aria-controls="hoofdnav" aria-label="Menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
        <nav class="hoofdnav" id="hoofdnav" aria-label="Hoofdmenu">
          ${links.map(([href, label, teller]) => `<a href="${href}" class="${hier === href ? "actief" : ""} ${teller ? "nav-teller" : ""}" ${teller ? `data-teller="${teller}"` : ""}>${label}</a>`).join("")}
          <a class="knop knop-accent knop-klein nav-cta" href="offerte.html">Offertes aanvragen</a>
        </nav>
      </div>
    </header>`;
    houder.querySelector(".menu-knop").addEventListener("click", (e) => {
      const nav = houder.querySelector(".hoofdnav");
      const open = nav.classList.toggle("open");
      e.currentTarget.setAttribute("aria-expanded", open);
    });
  }

  function renderFooter() {
    const houder = document.getElementById("site-footer");
    if (!houder) return;
    const jaar = new Date().getFullYear();
    houder.innerHTML = `<footer class="site-footer">
      <div class="wrap">
        <div class="footer-boven">
          <div class="footer-intro">
            ${logoHTML(true)}
            <p class="logo-tagline">Vergelijk verandabedrijven</p>
            <p class="mt-2">Onafhankelijk veranda's, overkappingen en tuinkamers vergelijken. Vind het bedrijf dat bij jouw wensen, regio en budget past.</p>
          </div>
          <div>
            <h4>Vergelijken</h4>
            <ul>
              <li><a href="bedrijven.html">Alle bedrijven</a></li>
              <li><a href="vergelijken.html">Bedrijven vergelijken</a></li>
              <li><a href="prijzen.html">Prijswijzer</a></li>
              <li><a href="offerte.html">Offertes aanvragen</a></li>
              <li><a href="favorieten.html">Mijn favorieten</a></li>
            </ul>
          </div>
          <div>
            <h4>Kennisbank</h4>
            <ul>
              <li><a href="artikel-veranda-kopen-waar-op-letten.html">Veranda kopen: de checklist</a></li>
              <li><a href="artikel-wat-kost-een-veranda.html">Wat kost een veranda?</a></li>
              <li><a href="artikel-vergunning-veranda.html">Vergunning nodig?</a></li>
              <li><a href="artikel-aluminium-of-hout.html">Aluminium of hout</a></li>
              <li><a href="kennisbank.html">Alle artikelen</a></li>
            </ul>
          </div>
          <div>
            <h4>Verandawijzer</h4>
            <ul>
              <li><a href="over-ons.html">Over ons</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="veelgestelde-vragen.html">Veelgestelde vragen</a></li>
              <li><a href="privacy.html">Privacyverklaring</a></li>
              <li><a href="voorwaarden.html">Gebruiksvoorwaarden</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-per-provincie">
          <h4>Verandabedrijven per provincie</h4>
          <p>${PROVINCIES.map((p) => `<a href="bedrijven.html?provincie=${encodeURIComponent(p)}">${p}</a>`).join(" · ")}</p>
        </div>
        <div class="footer-onder">
          <span>© ${jaar} Verandawijzer.nl — Vergelijk zorgeloos, kies bewust.</span>
          <ul>
            <li><a href="privacy.html">Privacy</a></li>
            <li><a href="voorwaarden.html">Voorwaarden</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
      </div>
    </footer>`;
  }

  /* ---------- Vergelijkbalk (sticky onderin) ---------- */
  function renderVergelijkBalk() {
    let balk = document.getElementById("vergelijk-balk");
    if (!balk) {
      balk = document.createElement("div");
      balk.id = "vergelijk-balk";
      balk.className = "vergelijk-balk";
      document.body.appendChild(balk);
    }
    const lijst = leesVergelijk();
    if (!lijst.length || paginaNaam() === "vergelijken.html") {
      balk.classList.remove("zichtbaar");
      document.body.classList.remove("met-vergelijkbalk");
      return;
    }
    document.body.classList.add("met-vergelijkbalk");
    balk.innerHTML = `<div class="wrap">
      <span class="vb-titel">Vergelijken (${lijst.length}/${MAX_VERGELIJK})</span>
      <span class="vb-items">${lijst.map((id) => {
        const b = getBedrijf(id);
        return `<span class="vb-item">${b.naam}<button type="button" data-vb-verwijder="${id}" aria-label="Verwijder ${b.naam} uit vergelijking">✕</button></span>`;
      }).join("")}</span>
      <a class="knop knop-accent knop-klein" href="vergelijken.html">Vergelijk nu →</a>
    </div>`;
    balk.classList.add("zichtbaar");
  }

  /* ---------- Tellers in navigatie ---------- */
  function updateNavBadges() {
    document.querySelectorAll("[data-teller]").forEach((el) => {
      const soort = el.dataset.teller;
      const n = soort === "vergelijk" ? leesVergelijk().length : leesFavorieten().length;
      let badge = el.querySelector(".nav-badge");
      if (n > 0) {
        if (!badge) {
          badge = document.createElement("span");
          badge.className = "nav-badge";
          el.appendChild(badge);
        }
        badge.textContent = n;
      } else if (badge) {
        badge.remove();
      }
    });
  }

  /* ---------- UI verversen na een actie ---------- */
  const verversHooks = [];
  function bijVerversen(fn) { verversHooks.push(fn); }
  function verversUI() {
    renderVergelijkBalk();
    updateNavBadges();
    /* knop-status op alle zichtbare kaarten bijwerken */
    const vgl = leesVergelijk();
    const fav = leesFavorieten();
    document.querySelectorAll("[data-vergelijk]").forEach((kn) => {
      const actief = vgl.includes(kn.dataset.vergelijk);
      kn.classList.toggle("actief", actief);
      kn.setAttribute("aria-pressed", actief);
    });
    document.querySelectorAll("[data-fav]").forEach((kn) => {
      const actief = fav.includes(kn.dataset.fav);
      kn.classList.toggle("actief", actief);
      kn.setAttribute("aria-pressed", actief);
      const svg = kn.querySelector("svg");
      if (svg) svg.setAttribute("fill", actief ? "currentColor" : "none");
    });
    verversHooks.forEach((fn) => fn());
  }

  /* ---------- Globale klik-afhandeling (werkt ook op dynamische kaarten) ---------- */
  document.addEventListener("click", (e) => {
    const vgl = e.target.closest("[data-vergelijk]");
    if (vgl) { e.preventDefault(); toggleVergelijk(vgl.dataset.vergelijk); return; }
    const fav = e.target.closest("[data-fav]");
    if (fav) { e.preventDefault(); toggleFavoriet(fav.dataset.fav); return; }
    const vbVerwijder = e.target.closest("[data-vb-verwijder]");
    if (vbVerwijder) { e.preventDefault(); verwijderVergelijk(vbVerwijder.dataset.vbVerwijder); }
  });

  /* ---------- Paginatransities ----------
     Werkt in elke browser, ook lokaal via file:// waar de native
     view-transitions-API niet beschikbaar is: bij een klik op een interne
     link eerst kort uitfaden (CSS: html.pagina-verlaat), dan navigeren.
     De nieuwe pagina komt binnen via de pagina-in-animatie op <main>. */
  (function () {
    /* bfcache: bij terugnavigeren de uitfade-klasse altijd opruimen */
    window.addEventListener("pageshow", () => document.documentElement.classList.remove("pagina-verlaat"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    document.addEventListener("click", (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.includes("#") || /^(https?:|mailto:|tel:)/.test(href)) return;
      if (link.target && link.target !== "_self") return;
      e.preventDefault();
      document.documentElement.classList.add("pagina-verlaat");
      setTimeout(() => { location.href = href; }, 180);
    });
  })();

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    renderVergelijkBalk();
    updateNavBadges();
  });

  return {
    getBedrijf, euro, komma, sterrenHTML, initialen, avatarHTML, scoreHTML,
    bedrijfKaartHTML, bedrijfRijHTML, actieKnoppenHTML,
    heeftReviews: BEDRIJVEN.some((b) => b.rating),
    heeftPrijzen: BEDRIJVEN.some((b) => b.prijsPerM2),
    leesVergelijk, toggleVergelijk, verwijderVergelijk,
    leesFavorieten, toggleFavoriet,
    registreerBezoek, leesRecent,
    toast, verversUI, bijVerversen
  };
})();
