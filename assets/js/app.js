/* ==========================================================================
   Verandawijzer.nl — Gedeelde applicatielogica
   Header/footer, vergelijken (max 3), favorieten, toasts en render-helpers.
   Vereist: data.js is eerder geladen.
   ========================================================================== */

const VF = (() => {
  const VERGELIJK_KEY = "vf_vergelijk";
  const FAVORIETEN_KEY = "vf_favorieten";
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

  function coverHTML(bedrijf) {
    return `<div class="bedrijf-cover" style="background:${bedrijf.kleur}">
      <svg class="cover-patroon" viewBox="0 0 400 120" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <path d="M0 95 L200 15 L400 95" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="7"/>
        <path d="M35 95 L35 40 M365 95 L365 40" stroke="rgba(255,255,255,.4)" stroke-width="6"/>
        <path d="M0 96 h400" stroke="rgba(255,255,255,.35)" stroke-width="4"/>
        <path d="M110 95 L110 55 M200 95 L200 25 M290 95 L290 55" stroke="rgba(255,255,255,.25)" stroke-width="4"/>
      </svg>
      <span class="bedrijf-logo" style="background:${bedrijf.kleur}">${initialen(bedrijf.naam)}</span>
    </div>`;
  }

  /* Centrale bedrijfskaart — gebruikt op home, overzicht en favorieten */
  function bedrijfKaartHTML(b) {
    const inVergelijk = leesVergelijk().includes(b.id);
    const isFavoriet = leesFavorieten().includes(b.id);
    const tags = [
      PRIJSKLASSEN[b.prijsKlasse],
      ...b.typen.slice(0, 2).map((t) => MATERIALEN[t]),
      ...(b.keurmerken.length ? [b.keurmerken[0]] : [])
    ];
    return `<article class="kaart bedrijf-kaart" data-id="${b.id}">
      ${coverHTML(b)}
      <div class="kaart-inhoud">
        <h3><a href="bedrijf.html?id=${b.id}">${b.naam}</a></h3>
        <span class="bedrijf-plaats"><svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z"/></svg>${b.plaats}, ${b.provincie}</span>
        <div class="score-blok">${sterrenHTML(b.rating)}<span class="score-cijfer">${komma(b.rating)}</span><span class="review-aantal">${b.aantalReviews} reviews</span></div>
        <div class="bedrijf-tags">${tags.map((t) => `<span class="badge">${t}</span>`).join("")}</div>
        <div class="kaart-voet">
          <span class="prijs-vanaf">Vanaf<strong>${euro(b.prijsPerM2.min)} / m²</strong></span>
          <span class="kaart-acties">
            <button type="button" class="icoon-knop fav ${isFavoriet ? "actief" : ""}" data-fav="${b.id}" aria-label="${isFavoriet ? "Verwijder uit favorieten" : "Bewaar als favoriet"}" aria-pressed="${isFavoriet}" title="Favoriet">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="${isFavoriet ? "currentColor" : "none"}" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>
            </button>
            <button type="button" class="icoon-knop vgl ${inVergelijk ? "actief" : ""}" data-vergelijk="${b.id}" aria-label="${inVergelijk ? "Verwijder uit vergelijking" : "Voeg toe aan vergelijking"}" aria-pressed="${inVergelijk}" title="Vergelijken">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 3v18M15 3v18M3 9h18M3 15h18"/></svg>
            </button>
          </span>
        </div>
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
    houder.innerHTML = `<header class="site-header">
      <div class="wrap">
        <a class="logo" href="index.html" aria-label="Verandawijzer home">
          <span class="logo-beeld"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M2 11 12 4l10 7"/><path d="M5 9.5V20M19 9.5V20"/><path d="M3 20h18"/><path d="M9 20v-5h6v5"/></svg></span>
          <span>Veranda<span class="logo-accent">wijzer</span></span>
        </a>
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
            <a class="logo" href="index.html" style="color:#fff"><span class="logo-beeld"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M2 11 12 4l10 7"/><path d="M5 9.5V20M19 9.5V20"/><path d="M3 20h18"/><path d="M9 20v-5h6v5"/></svg></span><span>Veranda<span class="logo-accent">wijzer</span></span></a>
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
      return;
    }
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

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderHeader();
    renderFooter();
    renderVergelijkBalk();
    updateNavBadges();
  });

  return {
    getBedrijf, euro, komma, sterrenHTML, initialen, coverHTML, bedrijfKaartHTML,
    leesVergelijk, toggleVergelijk, verwijderVergelijk,
    leesFavorieten, toggleFavoriet,
    toast, verversUI, bijVerversen
  };
})();
