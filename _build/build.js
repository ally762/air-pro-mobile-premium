/* =========================================================
   AirPro Mobile — static site generator
   Run:  node _build/build.js     (writes HTML into the project root)
   ========================================================= */
const fs = require('fs');
const path = require('path');
const C = require('./content');
const ROOT = path.join(__dirname, '..');
const YEAR = new Date().getFullYear();

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = s => esc(s)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="ilink">$1</a>');
const img = f => `/assets/img/${f}`;

/* ---------- Icons ---------- */
const ICON = {
  engine: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="17"/><circle cx="24" cy="24" r="4"/><path d="M24 20c0-6 3-11 9-12M28 24c6 0 11 3 12 9M24 28c0 6-3 11-9 12M20 24c-6 0-11-3-12-9"/></svg>',
  aog: '<svg viewBox="0 0 48 48"><path d="M6 30 42 14l-4 10-14 4-6 12-4-1 2-9-8 2z"/><path d="M14 40h20"/></svg>',
  avionics: '<svg viewBox="0 0 48 48"><rect x="5" y="9" width="38" height="26" rx="3"/><path d="M11 28l7-9 5 5 6-10 8 14M17 41h14M24 35v6"/></svg>',
  oxygen: '<svg viewBox="0 0 48 48"><rect x="16" y="13" width="16" height="30" rx="8"/><path d="M20 13V7h8v6M28 7h6v5M24 23v10M19 28h10"/></svg>',
  trouble: '<svg viewBox="0 0 48 48"><circle cx="20" cy="20" r="12"/><path d="m29 29 13 13M14 20h12M20 14v12"/></svg>',
  flight: '<svg viewBox="0 0 48 48"><rect x="10" y="6" width="28" height="36" rx="3"/><path d="M17 6v4h14V6M16 20l3 3 6-6M16 32l3 3 6-6M29 21h4M29 33h4"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" class="i-arrow"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  arrowUR: '<svg viewBox="0 0 24 24" class="i-arrow"><path d="M7 17 17 7M9 7h8v8"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
  mail: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
  pin: '<svg viewBox="0 0 24 24"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="m5 12 4.5 4.5L19 7"/></svg>',
  plus: '<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>',
  chev: '<svg viewBox="0 0 24 24"><path d="m6 9 6 6 6-6"/></svg>',
  quote: '<svg viewBox="0 0 48 48"><path d="M8 34c0-10 4-17 13-20l1 4c-5 2-7 6-7 10h6v12H8zm20 0c0-10 4-17 13-20l1 4c-5 2-7 6-7 10h6v12H28z"/></svg>',
  /* aircraft (top / side views) */
  single: '<svg viewBox="0 0 48 48"><path d="M22 9h4l1 9v14l-1 6h-4l-1-6V18z"/><path d="M5 19h38v4H5zM17 38h14M20 6h8"/></svg>',
  twin: '<svg viewBox="0 0 48 48"><path d="M22 8h4l1 10v14l-1 6h-4l-1-6V18z"/><path d="M4 21h40M17 39h14"/><rect x="10" y="15" width="5" height="11" rx="2"/><rect x="33" y="15" width="5" height="11" rx="2"/></svg>',
  turboprop: '<svg viewBox="0 0 48 48"><path d="M22 6h4l1 12v15l-1 5h-4l-1-5V18z"/><path d="M3 22h42M16 41h16M24 38v3"/><rect x="10" y="14" width="5" height="14" rx="2"/><rect x="33" y="14" width="5" height="14" rx="2"/><path d="M8 13h9M31 13h9"/></svg>',
  heli: '<svg viewBox="0 0 48 48"><path d="M6 11h34M23 11v5"/><path d="M10 25c0-5 5-9 11-9h3c6 0 9 4 9 9v3H15c-3 0-5-1-5-3z"/><path d="M33 23h8l2-5M13 36h20M17 28v8M29 28v8"/></svg>',
  jet: '<svg viewBox="0 0 48 48"><path d="M24 4c2 0 3 3 3 7v24l-3 5-3-5V11c0-4 1-7 3-7z"/><path d="M21 19 5 29v3l16-4M27 19l16 10v3l-16-4M21 36l-6 4v2l9-2 9 2v-2l-6-4"/></svg>',
  hangar: '<svg viewBox="0 0 48 48"><path d="M5 40V23C5 14 13 7 24 7s19 7 19 16v17"/><path d="M13 40V27h22v13M13 32h22M13 36h22M2 40h44"/></svg>'
};

/* ---------- Shared bits ---------- */
const btn = (label, href, cls = 'btn--primary', attrs = '') =>
  `<a href="${href}" class="btn ${cls}" data-magnetic ${attrs}><span class="btn__label" data-text="${esc(label)}">${esc(label)}</span><span class="btn__icon">${ICON.arrow}</span></a>`;
const bookBtn = (label = 'Book A Service', cls = 'btn--primary') =>
  `<button type="button" class="btn ${cls} js-book" data-magnetic><span class="btn__label" data-text="${esc(label)}">${esc(label)}</span><span class="btn__icon">${ICON.arrow}</span></button>`;
const callBtn = (cls = 'btn--ghost') =>
  `<a href="${C.TEL}" class="btn ${cls}" data-magnetic><span class="btn__icon btn__icon--l">${ICON.phone}</span><span class="btn__label" data-text="Call ${C.PHONE}">Call ${C.PHONE}</span></a>`;

const eyebrow = t => t ? `<p class="eyebrow" data-reveal>${esc(t)}</p>` : '';
const title = (t, tag = 'h2', cls = 'h-section') => `<${tag} class="${cls}" data-split>${esc(t)}</${tag}>`;
const paras = arr => (arr || []).map(p => `<p data-reveal>${md(p)}</p>`).join('');
const list = arr => arr && arr.length ? `<ul class="ticks" data-reveal-list>${arr.map(i => `<li><span class="ticks__i">${ICON.check}</span>${md(i)}</li>`).join('')}</ul>` : '';
const figure = (f, cls = '', alt = 'AirPro Mobile aircraft maintenance') =>
  `<figure class="media ${cls}" data-media><img src="${img(f)}" alt="${esc(alt)}" loading="lazy" decoding="async"></figure>`;

const counterBadge = () => `
  <div class="counter-badge" data-reveal>
    <span class="counter-badge__num"><span data-count="32">0</span><sup>+</sup></span>
    <span class="counter-badge__label">Years of<br>Aviation Excellence</span>
  </div>`;

const callUs = () => `<a href="${C.TEL}" class="call-chip" data-reveal><span class="call-chip__ring">${ICON.phone}</span><span><small>Call Us</small><b>${C.PHONE}</b></span></a>`;

/* ---------- Forms ---------- */
const form = (id, heading, sub, compact = false) => `
  <form class="qform ${compact ? 'qform--compact' : ''}" action="/contact.php" method="post" novalidate data-form id="${id}">
    ${heading ? `<h3 class="qform__title">${esc(heading)}</h3>` : ''}
    ${sub ? `<p class="qform__sub">${esc(sub)}</p>` : ''}
    <div class="qform__grid">
      <label class="field"><input type="text" name="name" required placeholder=" " autocomplete="name"><span>Name</span></label>
      <label class="field"><input type="email" name="email" required placeholder=" " autocomplete="email"><span>Email</span></label>
      <label class="field"><input type="tel" name="phone" required placeholder=" " autocomplete="tel"><span>Phone Number</span></label>
      ${compact ? '' : `<label class="field field--select"><select name="service"><option value="">Select a service</option>${C.services.map(s => `<option>${esc(s.name)}</option>`).join('')}</select><span>Service</span></label>`}
      <label class="field field--full"><textarea name="message" rows="${compact ? 3 : 4}" required placeholder=" "></textarea><span>Message</span></label>
    </div>
    <input type="text" name="website" class="hp" tabindex="-1" autocomplete="off" aria-hidden="true">
    <button type="submit" class="btn btn--primary btn--block"><span class="btn__label" data-text="Book Now">Book Now</span><span class="btn__icon">${ICON.arrow}</span></button>
    <p class="qform__status" role="status" aria-live="polite"></p>
  </form>`;

/* ---------- Header ---------- */
function header(active) {
  const is = k => active === k ? ' is-active' : '';
  const mega = C.services.map((s, i) => `
      <a href="/services/${s.slug}/" class="mega__item" style="--i:${i}">
        <span class="mega__icon">${ICON[s.icon]}</span>
        <span class="mega__txt"><b>${esc(s.name)}</b><small>${esc(s.tagline)}</small></span>
        <span class="mega__go">${ICON.arrowUR}</span>
      </a>`).join('');
  return `
<header class="hdr" id="hdr">
  <div class="hdr__bar">
    <div class="wrap hdr__bar-in">
      <span><span class="live-dot"></span>24/7 On-call AOG Support</span>
      <span class="hdr__bar-r"><a href="mailto:${C.EMAIL}">${C.EMAIL}</a><span class="sep"></span>Stuart, FL, USA<span class="sep"></span>Hangar at ${C.HANGAR.code}</span>
    </div>
  </div>
  <div class="wrap hdr__in">
    <a href="/" class="hdr__logo" aria-label="AirPro Mobile — Home">
      <img src="${img('logo-transparent.png')}" alt="AirPro Mobile LLC" width="1021" height="1180">
    </a>
    <nav class="nav" aria-label="Main">
      <a href="/" class="nav__link${is('home')}">Home</a>
      <a href="/about-us/" class="nav__link${is('about')}">About Us</a>
      <div class="nav__dd${is('services')}" data-dd>
        <a href="/services/" class="nav__link nav__link--dd" aria-haspopup="true" aria-expanded="false">Services <span class="nav__chev">${ICON.chev}</span></a>
        <div class="mega" role="menu">
          <div class="mega__in">
            <div class="mega__intro">
              <p class="eyebrow">Our Services</p>
              <h3>FAA-Focused Aircraft Services with Fast Response</h3>
              <p>Certified mechanics come directly to your hangar or location — from scheduled maintenance to urgent repairs.</p>
              <a href="/services/" class="link-arrow">View all services ${ICON.arrow}</a>
            </div>
            <div class="mega__grid">${mega}</div>
            <a href="/services/aog-maintenance/" class="mega__feature">
              <img src="${img('jet-hangar.jpg')}" alt="" loading="lazy">
              <span class="mega__feature-txt"><span class="live-dot"></span><small>24/7 AOG Support</small><b>Aircraft on ground?</b><span class="mega__phone">${C.PHONE}</span></span>
            </a>
          </div>
        </div>
      </div>
      <a href="/blog/" class="nav__link${is('blog')}">Blog</a>
      <a href="/contact-us/" class="nav__link${is('contact')}">Contact Us</a>
    </nav>
    <div class="hdr__cta">
      <a href="${C.TEL}" class="hdr__phone"><span class="hdr__phone-i">${ICON.phone}</span><span><small>Call Us</small>${C.PHONE}</span></a>
      ${bookBtn('Book a Service', 'btn--primary btn--sm')}
      <button class="burger" id="burger" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>

<div class="mnav" id="mnav" aria-hidden="true">
  <div class="mnav__in">
    <nav class="mnav__links">
      <a href="/" class="mnav__link">Home</a>
      <a href="/about-us/" class="mnav__link">About Us</a>
      <div class="mnav__group">
        <button class="mnav__link mnav__toggle" aria-expanded="false">Services <span>${ICON.plus}</span></button>
        <div class="mnav__sub"><div class="mnav__sub-in">
          <a href="/services/">All Services</a>
          ${C.services.map(s => `<a href="/services/${s.slug}/">${esc(s.name)}</a>`).join('')}
        </div></div>
      </div>
      <a href="/blog/" class="mnav__link">Blog</a>
      <a href="/contact-us/" class="mnav__link">Contact Us</a>
    </nav>
    <div class="mnav__foot">
      <a href="${C.TEL}" class="mnav__phone">${C.PHONE}</a>
      <a href="mailto:${C.EMAIL}">${C.EMAIL}</a>
      ${bookBtn('Book a Service')}
    </div>
  </div>
</div>`;
}

/* ---------- Footer ---------- */
function footer() {
  return `
<section class="prefoot">
  <div class="wrap prefoot__in">
    <p class="eyebrow" data-reveal>Need to get back in the air?</p>
    <h2 class="h-display" data-split>Let’s Plan Your Aircraft<br>Maintenance Today!</h2>
    <div class="prefoot__actions" data-reveal>${bookBtn('Book A Service')}${callBtn('btn--ghost')}</div>
  </div>
  <div class="marquee" aria-hidden="true"><div class="marquee__track">${Array(2).fill(C.services.map(s => `<span>${esc(s.name)}</span><i>✦</i>`).join('')).join('')}</div></div>
</section>
<footer class="foot">
  <div class="wrap foot__grid">
    <div class="foot__brand">
      <img src="${img('logo-transparent.png')}" alt="AirPro Mobile LLC" loading="lazy" width="1021" height="1180">
      <p>AirPro Mobile LLC, based in Stuart, Florida, is a Christian-based, veteran-owned mobile aircraft mechanic business that specializes in providing top-notch aviation services.</p>
    </div>
    <div>
      <h4>Services</h4>
      <ul>${C.services.map(s => `<li><a href="/services/${s.slug}/">${esc(s.name)}</a></li>`).join('')}</ul>
    </div>
    <div>
      <h4>Company</h4>
      <ul><li><a href="/">Home</a></li><li><a href="/about-us/">About Us</a></li><li><a href="/services/">Services</a></li><li><a href="/blog/">Blog</a></li><li><a href="/contact-us/">Contact</a></li></ul>
    </div>
    <div>
      <h4>Contact</h4>
      <ul class="foot__contact">
        <li><span>${ICON.phone}</span><a href="${C.TEL}">${C.PHONE}</a></li>
        <li><span>${ICON.mail}</span><a href="mailto:${C.EMAIL}">Email Us Here</a></li>
        <li><span>${ICON.pin}</span>Stuart, FL, USA</li>
        <li><span>${ICON.hangar}</span><a href="${C.HANGAR.map}" target="_blank" rel="noopener">Hangar at ${C.HANGAR.code} — ${C.HANGAR.name}</a></li>
      </ul>
    </div>
  </div>
  <div class="wrap foot__bottom">
    <span>© ${YEAR} AirPro Mobile LLC. All rights reserved.</span>
    <a href="#top" class="foot__top" data-totop>Back to top ↑</a>
  </div>
</footer>

<a href="${C.TEL}" class="fab" aria-label="Call AirPro Mobile">${ICON.phone}</a>

<div class="modal" id="bookModal" aria-hidden="true">
  <div class="modal__bg" data-close></div>
  <div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="bookTitle">
    <button class="modal__x" data-close aria-label="Close">${ICON.plus}</button>
    <div class="modal__side">
      <img src="${img('jet-stairs.jpg')}" alt="" loading="lazy">
      <div class="modal__side-txt"><span class="live-dot"></span><small>24/7 AOG Support</small><a href="${C.TEL}">${C.PHONE}</a></div>
    </div>
    <div class="modal__body">
      <p class="eyebrow">Get A Quote</p>
      <h3 id="bookTitle" class="qform__title">Book a Service</h3>
      ${form('modalForm', '', 'Contact our team of professional and experienced Aircraft Mechanics Today!')}
    </div>
  </div>
</div>`;
}

/* ---------- Page shell ---------- */
function layout({ route, active, title: t, desc, body, bodyClass = '' }) {
  const url = 'https://airpro-mobile.com' + route;
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(t)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#0b0c0e">
<meta property="og:type" content="website">
<meta property="og:site_name" content="AirPro Mobile LLC">
<meta property="og:title" content="${esc(t)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="https://airpro-mobile.com/assets/img/jet-hangar.jpg">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/img/logo.webp" type="image/webp">
<script>document.documentElement.classList.add('js');</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@100..125,300..800&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/css/main.css">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"LocalBusiness","name":"AirPro Mobile LLC","description":"Mobile aircraft mechanic services in Florida — on-site maintenance, inspections, engine repair, avionics, oxygen servicing and 24/7 AOG support.","telephone":"+1-561-203-3813","email":"info@airpro-mobile.com","url":"https://airpro-mobile.com/","image":"https://airpro-mobile.com/assets/img/logo.webp","address":{"@type":"PostalAddress","addressLocality":"Stuart","addressRegion":"FL","addressCountry":"US"},"areaServed":"Florida","openingHours":"Mo-Su 00:00-23:59"}</script>
</head>
<body class="${bodyClass}">
<div class="loader" id="loader" aria-hidden="true">
  <div class="loader__in">
    <img src="${img('logo-transparent.png')}" alt="" class="loader__logo">
    <div class="loader__line"><span></span></div>
    <span class="loader__pct"><span id="loaderPct">0</span>%</span>
  </div>
</div>
<div class="curtain" id="curtain" aria-hidden="true"><div class="curtain__panel"></div><img src="${img('logo-transparent.png')}" alt="" class="curtain__logo"></div>
<div class="cursor" id="cursor" aria-hidden="true"><span class="cursor__label"></span></div>
<div class="progress" id="progress"></div>
${header(active)}
<main id="top">
${body}
</main>
${footer()}
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
<script src="/assets/js/hero-gl.js"></script>
<script src="/assets/js/app.js"></script>
</body>
</html>`;
}

/* ---------- Inner page hero ---------- */
const pageHero = ({ h1, crumbs, image, kicker }) => `
<section class="phero" data-hero>
  <div class="phero__media">
    <canvas class="gl-hero" data-images="${img(image)}" aria-hidden="true"></canvas>
    <img class="phero__fallback" src="${img(image)}" alt="">
  </div>
  <div class="phero__shade"></div>
  <div class="wrap phero__in">
    <nav class="crumbs" aria-label="Breadcrumb" data-hero-in>${crumbs.map((c, i) => i < crumbs.length - 1 ? `<a href="${c[1]}">${esc(c[0])}</a><span>/</span>` : `<span aria-current="page">${esc(c[0])}</span>`).join('')}</nav>
    ${kicker ? `<p class="eyebrow" data-hero-in>${esc(kicker)}</p>` : ''}
    <h1 class="h-hero" data-hero-title>${esc(h1)}</h1>
  </div>
  <div class="phero__foot wrap" data-hero-in>
    <span class="phero__scroll"><i></i>Scroll</span>
    <span class="phero__meta">AirPro Mobile LLC — Stuart, FL</span>
  </div>
</section>`;

/* ---------- Sections ---------- */
const sectionHead = ({ eb, t, intro, center }) => `
  <div class="shead ${center ? 'shead--c' : ''}">
    ${eyebrow(eb)}${title(t)}
    ${intro ? `<p class="shead__intro" data-reveal>${md(intro)}</p>` : ''}
  </div>`;

/* Aircraft we service (replaces the old hourly-rate cards) */
const aircraftSec = (head = {}) => `
<section class="sec sec--dark aircraft">
  <div class="wrap">
    ${sectionHead({ eb: head.eb || 'Aircraft We Service', t: head.t || 'From General Aviation to Business Class Jets', intro: head.intro || 'We service anything from General Aviation to Business Class Jets — on-site, at your hangar or location.' })}
    <div class="fleet">
      ${C.aircraft.map((a, i) => `
      <article class="plane" data-card style="--d:${(i % 3) * 0.1}s">
        <div class="plane__top"><span class="plane__n">0${i + 1}</span><span class="plane__icon">${ICON[a.icon]}</span></div>
        <h3>${esc(a.name)}</h3>
        <p>${esc(a.note)}</p>
      </article>`).join('')}
    </div>
    <div class="fleet-foot" data-reveal>
      <p>Don’t see your aircraft? Call us — experience across different aircraft types allows for efficient problem-solving and reliable service delivery.</p>
      <div class="intro__actions">${bookBtn('Book A Service')}${callBtn('btn--ghost')}</div>
    </div>
  </div>
</section>`;

/* Full list of services we offer */
const serviceListSec = (head = {}) => `
<section class="sec svc-list">
  <div class="wrap">
    ${sectionHead({ eb: head.eb || 'Services We Offer', t: head.t || 'Complete Mobile Aircraft Services', intro: head.intro || 'On-site maintenance, aircraft inspections, emergency repairs and AOG support — brought directly to your hangar or location.' })}
    <div class="svclist">
      ${C.serviceList.map((g, i) => { const s = C.services.find(x => x.slug === g.slug); return `
      <div class="sgroup" data-card style="--d:${(i % 3) * 0.1}s">
        <a href="/services/${s.slug}/" class="sgroup__head"><span class="sgroup__icon">${ICON[s.icon]}</span><b>${esc(s.name)}</b><span class="sgroup__go">${ICON.arrowUR}</span></a>
        <ul>${g.items.map(it => `<li>${ICON.check}<span>${esc(it)}</span></li>`).join('')}</ul>
      </div>`; }).join('')}
    </div>
  </div>
</section>`;

/* Hangar at KVRB */
const hangarBand = () => `
<section class="hangar">
  <div class="wrap hangar__in" data-reveal>
    <span class="hangar__code" aria-hidden="true">${C.HANGAR.code}</span>
    <div class="hangar__txt">
      <small>Our Hangar</small>
      <b>Hangar at ${esc(C.HANGAR.name)} (${C.HANGAR.code})</b>
      <span>${esc(C.HANGAR.city)} — plus mobile service directly to your location across Florida.</span>
    </div>
    <div class="hangar__actions">${btn('Get Directions', C.HANGAR.map, 'btn--ghost', 'target="_blank" rel="noopener"')}${bookBtn('Book A Service')}</div>
  </div>
</section>`;
const hangarInfo = (light) => `<a class="info info--hangar" href="${C.HANGAR.map}" target="_blank" rel="noopener" data-reveal><span class="info__i">${ICON.hangar}</span><span><small>Our Hangar</small><b>${C.HANGAR.code} — ${esc(C.HANGAR.name)}</b></span></a>`;

const faq = (items, eb = 'FAQs', t = 'Frequently Asked Questions') => `
<section class="sec faq">
  <div class="wrap faq__grid">
    <div class="faq__side">
      ${eyebrow(eb)}${title(t)}
      <div class="assist" data-reveal>
        <h3>Still Need Assistance?</h3>
        <p>Contact Center</p>
        <a href="${C.TEL}" class="assist__num">${C.PHONE}</a>
        <img src="${img('mechanic-hangar.jpg')}" alt="" loading="lazy">
      </div>
    </div>
    <div class="acc">
      ${items.map((q, i) => `
      <div class="acc__item ${i === 0 ? 'is-open' : ''}" data-acc data-reveal>
        <button class="acc__q" aria-expanded="${i === 0}"><span class="acc__n">0${i + 1}</span><span class="acc__qt">${esc(q[0])}</span><span class="acc__i">${ICON.plus}</span></button>
        <div class="acc__a"><div><p>${md(q[1])}</p></div></div>
      </div>`).join('')}
    </div>
  </div>
</section>`;

const ctaBand = (c, image = 'jet-ramp.jpg') => !c ? '' : `
<section class="ctaband">
  <div class="ctaband__media" data-parallax><img src="${img(image)}" alt="" loading="lazy"></div>
  <div class="ctaband__shade"></div>
  <div class="wrap ctaband__in">
    ${title(c.title, 'h2', 'h-display')}
    ${paras(c.paras)}
    <div class="ctaband__actions" data-reveal>${bookBtn('Book A Service')}${callBtn('btn--ghost')}</div>
  </div>
</section>`;

function block(b, i) {
  const dark = b.dark ? 'sec--dark' : '';
  if (b.t === 'text') {
    const flip = i % 2 ? 'feature--flip' : '';
    const subs = (b.sub || []).map(s => `<h3 class="h-sub" data-reveal>${esc(s.h)}</h3>${paras(s.paras)}${list(s.list)}`).join('');
    return `
<section class="sec ${dark}">
  <div class="wrap feature ${flip}">
    <div class="feature__media">${figure(b.img, 'media--tall')}</div>
    <div class="feature__txt">
      ${eyebrow(b.eyebrow)}${title(b.title)}
      <div class="prose">${paras(b.paras)}${list(b.list)}${subs}${paras(b.after)}</div>
    </div>
  </div>
</section>`;
  }
  if (b.t === 'split') {
    const col = c => `<div class="col">${title(c.title, 'h3', 'h-col')}<div class="prose">${paras(c.paras)}${list(c.list)}${paras(c.after)}</div></div>`;
    return `
<section class="sec ${dark}">
  <div class="wrap cols2">${col(b.left)}<span class="cols2__rule"></span>${col(b.right)}</div>
</section>`;
  }
  if (b.t === 'triple') {
    return `
<section class="sec ${dark}">
  <div class="wrap">
    ${eyebrow(b.eyebrow)}
    <div class="cols3">${b.cols.map((c, k) => `<div class="col3" data-card style="--d:${k * 0.1}s"><span class="col3__n">0${k + 1}</span>${title(c.title, 'h3', 'h-col')}<div class="prose">${paras(c.paras)}${list(c.list)}${paras(c.after)}</div></div>`).join('')}</div>
  </div>
</section>`;
  }
  if (b.t === 'cards') {
    return `
<section class="sec ${dark}">
  <div class="wrap">
    ${sectionHead({ eb: b.eyebrow, t: b.title, intro: b.intro })}
    <div class="tiles">${b.items.map((it, k) => `
      <article class="tile" data-card style="--d:${(k % 3) * 0.1}s">
        <span class="tile__n">0${k + 1}</span>
        <h3>${esc(it[0])}</h3>
        <p>${md(it[1])}</p>
      </article>`).join('')}</div>
  </div>
</section>`;
  }
  if (b.t === 'steps') {
    return `
<section class="sec sec--dark steps">
  <div class="wrap steps__grid">
    <div class="steps__head">${sectionHead({ eb: b.eyebrow, t: b.title, intro: b.intro })}</div>
    <ol class="steps__list" data-steps>
      <span class="steps__rail"><span class="steps__fill"></span></span>
      ${b.items.map((s, k) => `
      <li class="step" data-step>
        <span class="step__n">${String(k + 1).padStart(2, '0')}</span>
        <div><h3>${esc(s[0])}</h3><p>${md(s[1])}</p></div>
      </li>`).join('')}
    </ol>
  </div>
</section>`;
  }
  return '';
}

const intro = (it, opts = {}) => `
<section class="sec intro">
  <div class="wrap intro__grid">
    <div class="intro__media">
      ${figure(it.img, 'media--main')}
      ${it.img2 ? figure(it.img2, 'media--inset') : ''}
      ${counterBadge()}
    </div>
    <div class="intro__txt">
      ${eyebrow(it.eyebrow)}${title(it.title)}
      <p class="lead" data-reveal>${md(it.lead)}</p>
      ${it.after ? `<p data-reveal>${md(it.after)}</p>` : ''}
      ${opts.extra || ''}
      <div class="intro__actions" data-reveal>${bookBtn('Book A Service')}${callUs()}</div>
    </div>
  </div>
</section>`;

/* =========================================================
   PAGES
   ========================================================= */
const pages = [];

/* ---------- HOME ---------- */
{
  const heroImgs = ['jet-hangar.jpg', 'jet-ramp.jpg', 'citation-nose.jpg', 'engine-open.jpg'].map(img).join(',');
  const svcCards = C.services.slice(0, 4).map((s, i) => `
      <a href="/services/${s.slug}/" class="hs-card" data-hs-card>
        <figure class="hs-card__img"><img src="${img(s.img)}" alt="${esc(s.name)}" loading="lazy"></figure>
        <div class="hs-card__body">
          <span class="hs-card__n">0${i + 1}</span>
          <span class="hs-card__icon">${ICON[s.icon]}</span>
          <h3>${esc(s.name)}</h3>
          <p>${esc(s.tagline)}</p>
          <span class="link-arrow">Learn more ${ICON.arrow}</span>
        </div>
      </a>`).join('');

  const body = `
<section class="hero" data-hero>
  <div class="hero__media">
    <canvas class="gl-hero" data-images="${heroImgs}" data-slideshow="1" aria-hidden="true"></canvas>
    <img class="phero__fallback" src="${img('jet-hangar.jpg')}" alt="">
  </div>
  <div class="hero__shade"></div>
  <div class="wrap hero__in">
    <div class="hero__txt">
      <p class="eyebrow" data-hero-in>Welcome to AirPro Mobile LLC</p>
      <h1 class="h-hero" data-hero-title>Aircraft Mechanic Services</h1>
      <p class="hero__kicker" data-hero-in>Mobile Aircraft Mechanic Florida</p>
      <p class="hero__lead" data-hero-in>AirPro Mobile LLC delivers reliable aircraft mechanic services directly to your location. If you’ve searched for an aircraft mechanic near you, you’re likely looking for fast, certified support without delays.</p>
      <div class="hero__actions" data-hero-in>${bookBtn('Book A Service')}${callBtn('btn--ghost')}</div>
    </div>
    <div class="hero__form" data-hero-in>
      ${form('heroForm', 'Get A Quote', '', true)}
    </div>
  </div>
  <div class="wrap hero__foot">
    <div class="hero__slides" data-hero-in>
      ${['In the hangar', 'On the ramp', 'Every detail', 'Engine experts'].map((l, i) => `<button class="hero__dot ${i === 0 ? 'is-on' : ''}" data-slide="${i}"><span class="hero__dot-n">0${i + 1}</span><span class="hero__dot-l">${l}</span><span class="hero__dot-bar"><i></i></span></button>`).join('')}
    </div>
    <span class="phero__scroll" data-hero-in><i></i>Scroll</span>
  </div>
</section>

<section class="sec svc-strip">
  <div class="wrap svc-strip__grid">
    ${C.services.slice(0, 3).map((s, i) => `
    <a href="/services/${s.slug}/" class="svc-mini" data-card style="--d:${i * 0.1}s">
      <span class="svc-mini__icon">${ICON[s.icon]}</span>
      <span class="svc-mini__name">${esc(s.name)}</span>
      <span class="svc-mini__go">${ICON.arrowUR}</span>
    </a>`).join('')}
    <div class="svc-strip__txt">
      <p data-reveal>As a mobile aircraft mechanic near Florida, our team provides on-site maintenance, inspections, and repairs across Florida, helping reduce downtime and keep your aircraft ready for operation. Contact us to book today.</p>
      <div data-reveal>${bookBtn('Book A Service', 'btn--dark')}</div>
    </div>
  </div>
</section>

${intro({ eyebrow: 'AirPro Mobile LLC', title: 'Mobile Aircraft Mechanic Near Florida', img: 'mechanic-hangar.jpg', img2: 'tail-work.jpg',
  lead: 'AirPro Mobile LLC operates across the state as a trusted aircraft mechanic Florida service provider. Instead of moving your aircraft to a shop, certified mechanics come directly to your hangar or location. This approach saves time and keeps operations running smoothly.',
  after: 'Services include:' }, { extra: list(['On-site maintenance', 'Aircraft inspections', 'Emergency repairs', 'AOG support']) + '<p data-reveal>Every service is structured to minimize downtime and maintain compliance with aviation standards.</p>' })}

<section class="hs" data-hs>
  <div class="hs__pin">
    <div class="wrap hs__head">
      <div>
        ${eyebrow('Trusted Support for Aircraft Owners and Operators')}
        ${title('FAA-Focused Aircraft Services with Fast Response')}
      </div>
      <div class="hs__intro">
        <p data-reveal>AirPro Mobile LLC provides dependable aircraft services for private owners, charter operators, flight schools, and aviation businesses across the United States. Our team focuses on quick response, FAA-conscious service, and practical on-site support that helps reduce downtime. Whether you are searching for an aircraft maintenance company near you or require on-site aviation support, AirPro Mobile LLC delivers reliable maintenance solutions tailored to your aircraft needs.</p>
        <div data-reveal>${btn('More Service', '/services/', 'btn--ghost')}</div>
      </div>
    </div>
    <div class="hs__track" data-hs-track>
      ${svcCards}
      <div class="hs-end">
        <p class="eyebrow">Plus</p>
        <a href="/services/trouble-shooting/">Troubleshooting ${ICON.arrowUR}</a>
        <a href="/services/pre-post-flights/">Pre/Post Flights ${ICON.arrowUR}</a>
        ${bookBtn('Book A Service')}
      </div>
    </div>
    <div class="wrap hs__progress"><span><i data-hs-bar></i></span></div>
  </div>
</section>

${serviceListSec()}
${aircraftSec()}

<section class="statement">
  <div class="statement__media" data-parallax><img src="${img('jet-wing.jpg')}" alt="" loading="lazy"></div>
  <div class="statement__shade"></div>
  <div class="wrap statement__in">
    <div class="statement__big" aria-hidden="true"><span>24</span><small>/7</small></div>
    <div class="statement__txt">
      ${title('Aircraft Mechanic Near You – Fast Response', 'h2', 'h-display')}
      <p class="lead" data-reveal>When an issue arises, response time matters. Searching for an aircraft mechanic near you usually means you need immediate assistance, not a long wait.</p>
      <p data-reveal>AirPro Mobile LLC offers quick deployment. Whether it’s a scheduled visit or an urgent situation, our team is available to respond when needed. With 24/7 availability, support is accessible at any time, including after-hours and weekends. We keep your aircraft moving without unnecessary delays.</p>
      <div data-reveal>${bookBtn('Book A Service')}</div>
    </div>
  </div>
</section>

<section class="sec reviews">
  <div class="wrap reviews__head">
    ${sectionHead({ eb: 'Testimonials', t: 'What Aircraft Owners Say' })}
    <div class="reviews__nav" data-reveal>
      <button class="rbtn" data-rev="prev" aria-label="Previous review"><span>${ICON.arrow}</span></button>
      <button class="rbtn" data-rev="next" aria-label="Next review"><span>${ICON.arrow}</span></button>
    </div>
  </div>
  <div class="reviews__track" data-reviews>
    ${C.reviews.map((r, i) => `
    <figure class="review" data-card style="--d:${(i % 3) * 0.08}s">
      <span class="review__q">${ICON.quote}</span>
      <blockquote>${esc(r[1])}</blockquote>
      <figcaption><span class="review__av">${esc(r[0].split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2))}</span><span><b>${esc(r[0].replace(/\b\w/g, c => c.toUpperCase()))}</b><small>AirPro Mobile client</small></span></figcaption>
    </figure>`).join('')}
  </div>
</section>

<section class="sec sec--dark contact-home">
  <div class="wrap contact-home__grid">
    <div>
      ${eyebrow('Get in Touch')}
      ${title('Need to get back in the air?')}
      <p class="lead" data-reveal>Our team offers 24/7 On-call AOG (Aircraft on Ground) support and line maintenance. Contact our Maintenance Control Center immediately for technical inquiries and rapid logistics support.</p>
      <div class="infos">
        <div class="info" data-reveal><span class="info__i">${ICON.pin}</span><span><small>Our Location</small><b>Stuart, FL, USA</b></span></div>
        ${hangarInfo()}
        <a class="info" href="${C.TEL}" data-reveal><span class="info__i">${ICON.phone}</span><span><small>Phone Number</small><b>${C.PHONE}</b></span></a>
        <a class="info" href="mailto:${C.EMAIL}" data-reveal><span class="info__i">${ICON.mail}</span><span><small>Our Email</small><b>${C.EMAIL}</b></span></a>
      </div>
    </div>
    <div class="panel" data-reveal>
      <p class="eyebrow">Contact Us</p>
      ${form('homeForm', 'Let’s Plan Your Aircraft Maintenance Today!', 'Contact our team of professional and experienced Aircraft Mechanics Today!')}
    </div>
  </div>
</section>

<section class="sec turbine">
  <div class="wrap turbine__grid">
    <div class="turbine__sticky">
      ${figure('turbine-core.jpg', 'media--tall')}
    </div>
    <div class="turbine__txt">
      <div class="turbine__block">
        ${eyebrow('AirPro Mobile LLC')}
        ${title('Turbine Mechanic Near You')}
        <p class="lead" data-reveal>AirPro Mobile LLC also supports turbine aircraft, providing specialized service for more complex systems. If you’re searching for a turbine mechanic near you, our experienced technicians provide reliable on-site support to keep your aircraft operating efficiently.</p>
        <p data-reveal>Our team handles turbine inspections, troubleshooting, and maintenance with a focus on precision and safety. Experience across different aircraft types allows for efficient problem-solving and reliable service delivery. Book now.</p>
        <div class="intro__actions" data-reveal>${bookBtn('Book A Service')}${btn('View Services', '/services/', 'btn--ghost-dark')}</div>
      </div>
      <div class="turbine__block">
        ${eyebrow('airpro mobile')}
        ${title('On-Site Turbine Mechanic Services')}
        <p data-reveal>AirPro Mobile also supports turbine aircraft, providing specialized service for more complex systems. If you’re searching for a turbine mechanic near you, having experienced technicians on-site makes a difference.</p>
        <p data-reveal>Our team handles turbine inspections, troubleshooting, and maintenance with a focus on precision and safety. Experience across different aircraft types allows for efficient problem-solving and reliable service delivery. Book now.</p>
        <div data-reveal>${bookBtn('Book A Service', 'btn--dark')}</div>
      </div>
    </div>
  </div>
</section>

<section class="sec sec--dark how">
  <div class="wrap how__grid">
    <div>
      ${title('Mobile Aircraft Mechanic Services')}
      <p class="lead" data-reveal>Mobile service works through a simple process. You request support, a technician is dispatched, and the work is completed on-site. This model is designed to make aircraft maintenance more efficient.</p>
      <p data-reveal>This approach keeps maintenance practical and aligned with real-world aviation needs.</p>
      <div data-reveal>${bookBtn('Book A Service')}</div>
    </div>
    <div>
      <div class="flow" data-reveal>
        ${['You request support', 'A technician is dispatched', 'The work is completed on-site'].map((s, k) => `<div class="flow__step"><span>0${k + 1}</span><b>${s}</b></div>`).join('<span class="flow__line"></span>')}
      </div>
      <p class="mini-label" data-reveal>Benefits include:</p>
      <div class="benefits">
        ${['Saves time by avoiding relocation', 'Reduces operational disruption', 'Cost-effective compared to transport and downtime', 'Direct, on-site problem resolution'].map((b, k) => `<div class="benefit" data-card style="--d:${k * 0.08}s"><span>${ICON.check}</span>${b}</div>`).join('')}
      </div>
    </div>
  </div>
</section>

<section class="sec why">
  <div class="wrap why__grid">
    <div class="why__media">${figure('hangar-walk.jpg', 'media--tall')}</div>
    <div>
      ${eyebrow('airpro mobile')}
      ${title('Why Choose AirPro Mobile')}
      <p class="lead" data-reveal>AirPro Mobile focuses on delivering consistent and reliable aircraft support as one of the trusted aircraft maintenance companies in Florida.</p>
      <ol class="why__list">
        ${['Certified aircraft mechanics with hands-on experience', 'Fast response time for urgent and scheduled services', 'Coverage across Florida for flexible support', 'Strong focus on safety and compliance', 'Experience working on general aviation and turbine aircraft'].map((w, k) => `<li data-reveal><span>0${k + 1}</span>${w}</li>`).join('')}
      </ol>
      <p data-reveal>As a veteran-owned business based in Florida, the company is built on accountability, precision, and service reliability.</p>
      <div data-reveal>${bookBtn('Book A Service', 'btn--dark')}</div>
    </div>
  </div>
</section>

<section class="sec sec--dark areas">
  <div class="wrap areas__grid">
    <div>
      ${eyebrow('Coverage')}
      ${title('Service Areas')}
      <p class="lead" data-reveal>AirPro Mobile provides aircraft maintenance services throughout Florida. From private hangars to regional airports, support is available wherever it’s needed. Coverage includes major aviation areas as well as smaller locations, ensuring flexibility for different operations.</p>
      <p data-reveal>We also have a hangar at ${C.HANGAR.name} (${C.HANGAR.code}) in ${C.HANGAR.city}.</p>
      <p data-reveal>If you need a dependable mobile aircraft mechanic near Florida, AirPro Mobile is ready to assist. Whether it’s routine maintenance or an urgent issue, support is available when you need it. Call now or book your service to get started. For emergency situations, immediate assistance is available 24/7.</p>
      <div class="intro__actions" data-reveal>${bookBtn('Book A Service')}${callBtn('btn--ghost')}</div>
    </div>
    <div class="radar" data-reveal aria-hidden="true">
      <canvas class="radar__gl" id="radarGl"></canvas>
      <div class="radar__label"><span class="live-dot"></span>Stuart, FL — Base · Hangar ${C.HANGAR.code}</div>
    </div>
  </div>
</section>

${faq(C.homeFaq, 'FAQS', 'Frequently Asked Questions')}
`;
  pages.push({ file: 'index.html', route: '/', active: 'home', bodyClass: 'is-home',
    title: 'Mobile Aircraft Mechanic Florida | Aircraft Services AirPro',
    desc: 'AirPro Mobile LLC delivers reliable aircraft mechanic services directly to your location — on-site maintenance, inspections, repairs and 24/7 AOG support across Florida.',
    body });
}

/* ---------- ABOUT ---------- */
pages.push({ file: 'about-us/index.html', route: '/about-us/', active: 'about',
  title: 'About AirPro Mobile | Mobile Aircraft Maintenance Experts',
  desc: 'Learn about AirPro Mobile, a trusted provider of mobile aircraft maintenance, inspections, and aviation support services across Florida.',
  body: `
${pageHero({ h1: 'About Us', crumbs: [['Home', '/'], ['About Us']], image: 'jet-hangar.jpg', kicker: 'About AirPro Mobile LLC' })}
${intro({ eyebrow: 'About AirPro Mobile LLC', title: 'Discover Our Company Story', img: 'mechanic-hangar.jpg', img2: 'jet-stairs.jpg',
  lead: 'AirPro Mobile LLC, based in Stuart, Florida, is a Christian-based, veteran-owned mobile aircraft mechanic business that specializes in providing top-notch aviation services.',
  after: 'Our team is committed to excellence, ensuring your aircraft is safe and ready for the skies. We service anything from General Aviation to Business Class Jets. Contact us today to see how we can help you fly with confidence!' })}
<section class="sec sec--dark values">
  <div class="wrap">
    ${sectionHead({ eb: 'Why Choose AirPro Mobile', t: 'Built on accountability, precision, and service reliability.', intro: 'AirPro Mobile focuses on delivering consistent and reliable aircraft support as one of the trusted aircraft maintenance companies in Florida.' })}
    <div class="tiles">
      ${['Certified aircraft mechanics with hands-on experience', 'Fast response time for urgent and scheduled services', 'Coverage across Florida for flexible support', 'Strong focus on safety and compliance', 'Experience working on general aviation and turbine aircraft', 'Veteran owned and operated small business'].map((v, k) => `<article class="tile" data-card style="--d:${(k % 3) * 0.1}s"><span class="tile__n">0${k + 1}</span><h3>${v}</h3></article>`).join('')}
    </div>
  </div>
</section>
<section class="sec gallery">
  <div class="wrap">
    ${sectionHead({ eb: 'In the field', t: 'From General Aviation to Business Class Jets' })}
    <div class="gal">
      ${['jet-ramp.jpg', 'engine-open.jpg', 'avionics-panel.jpg', 'tail-work.jpg', 'twin-ramp.jpg', 'citation-nose.jpg'].map((f, k) => `<figure class="gal__item gal__item--${k}" data-media><img src="${img(f)}" alt="AirPro Mobile aircraft service" loading="lazy"></figure>`).join('')}
    </div>
  </div>
</section>
${aircraftSec({ t: 'Aircraft We Service' })}
${hangarBand()}
${ctaBand({ title: 'Fly With Confidence', paras: ['Contact us today to see how we can help you fly with confidence!'] }, 'jet-wing.jpg')}
` });

/* ---------- SERVICES OVERVIEW ---------- */
pages.push({ file: 'services/index.html', route: '/services/', active: 'services',
  title: 'Aircraft Services Florida | Mobile Maintenance by AirPro Mobile LLC',
  desc: 'AirPro Mobile provides aircraft services in Florida, including mobile maintenance, inspections, repairs, and reliable aviation support from certified technicians.',
  body: `
${pageHero({ h1: 'Services', crumbs: [['Home', '/'], ['Services']], image: 'citation-nose.jpg', kicker: 'Trusted Support for Aircraft Owners and Operators' })}
<section class="sec">
  <div class="wrap svc-intro">
    <div>
      ${eyebrow('Trusted Support for Aircraft Owners and Operators')}
      ${title('FAA-Focused Aircraft Services with Fast Response')}
    </div>
    <div>
      <p class="lead" data-reveal>AirPro Mobile LLC provides dependable aircraft services for private owners, charter operators, flight schools, and aviation businesses across the United States. Our team focuses on quick response, FAA-conscious service, and practical on-site support that helps reduce downtime. From scheduled maintenance to urgent repairs, we bring experienced aircraft service directly to your location.</p>
      <div class="intro__actions" data-reveal>${bookBtn('Book A Service')}${callUs()}</div>
    </div>
  </div>
  <div class="wrap svc-grid">
    ${C.services.map((s, i) => `
    <a href="/services/${s.slug}/" class="svc-card" data-card style="--d:${(i % 3) * 0.1}s">
      <figure class="svc-card__img"><img src="${img(s.img)}" alt="${esc(s.name)}" loading="lazy"></figure>
      <div class="svc-card__body">
        <span class="svc-card__icon">${ICON[s.icon]}</span>
        <span class="svc-card__n">0${i + 1}</span>
        <h3>${esc(s.name)}</h3>
        <p>${esc(s.tagline)}</p>
        <span class="link-arrow">Explore service ${ICON.arrow}</span>
      </div>
    </a>`).join('')}
  </div>
</section>
${serviceListSec()}
${aircraftSec()}
${hangarBand()}
<section class="sec">
  <div class="wrap quote-split">
    <div>${eyebrow('Get A Quote')}${title('Get A Quote')}<p class="lead" data-reveal>Contact our team of professional and experienced Aircraft Mechanics Today!</p>${callUs()}</div>
    <div class="panel panel--light" data-reveal>${form('svcForm', '', '')}</div>
  </div>
</section>
` });

/* ---------- SERVICE DETAIL PAGES ---------- */
for (const s of C.services) {
  const p = C.servicePages[s.slug];
  const others = C.services.filter(o => o.slug !== s.slug);
  pages.push({ file: `services/${s.slug}/index.html`, route: `/services/${s.slug}/`, active: 'services', title: p.title, desc: p.desc,
    body: `
${pageHero({ h1: p.h1, crumbs: [['Home', '/'], ['Services', '/services/'], [p.h1]], image: p.hero, kicker: s.tagline })}
${intro(p.intro)}
${aircraftSec({ t: 'Aircraft We Service' })}
${p.blocks.map(block).join('')}
${faq(p.faq)}
${ctaBand(p.cta, s.img)}
<section class="sec more">
  <div class="wrap">
    <div class="more__head">${eyebrow('More Services')}${title('Explore Other Services', 'h2', 'h-section')}</div>
    <div class="more__list">
      ${others.map(o => `<a href="/services/${o.slug}/" class="more__item" data-reveal><span class="more__icon">${ICON[o.icon]}</span><b>${esc(o.name)}</b><small>${esc(o.tagline)}</small><span class="more__go">${ICON.arrowUR}</span><img src="${img(o.img)}" alt="" loading="lazy"></a>`).join('')}
    </div>
  </div>
</section>
` });
}

/* ---------- CONTACT ---------- */
pages.push({ file: 'contact-us/index.html', route: '/contact-us/', active: 'contact',
  title: 'Contact AirPro Mobile | Aircraft Maintenance Florida',
  desc: 'Contact AirPro Mobile for mobile aircraft maintenance, inspections, and aviation support services in Florida. Get reliable assistance from our team today.',
  body: `
${pageHero({ h1: 'Contact', crumbs: [['Home', '/'], ['Contact']], image: 'jet-ramp.jpg', kicker: 'Get in Touch' })}
<section class="sec">
  <div class="wrap contact__grid">
    <div>
      ${eyebrow('Get in Touch')}
      ${title('Need to get back in the air?')}
      <p class="lead" data-reveal>Our team offers 24/7 On-call AOG (Aircraft on Ground) support and line maintenance. Contact our Maintenance Control Center immediately for technical inquiries and rapid logistics support.</p>
      <div class="infos infos--light">
        <div class="info" data-reveal><span class="info__i">${ICON.pin}</span><span><small>Our Location</small><b>Stuart, FL, USA</b></span></div>
        ${hangarInfo()}
        <a class="info" href="${C.TEL}" data-reveal><span class="info__i">${ICON.phone}</span><span><small>Phone Number</small><b>${C.PHONE}</b></span></a>
        <a class="info" href="mailto:${C.EMAIL}" data-reveal><span class="info__i">${ICON.mail}</span><span><small>Our Email</small><b>${C.EMAIL}</b></span></a>
      </div>
    </div>
    <div class="panel panel--light" data-reveal>
      <p class="eyebrow">Contact Us</p>
      ${form('contactForm', 'Let’s Plan Your Aircraft Maintenance Today!', 'Contact our team of professional and experienced Aircraft Mechanics Today!')}
    </div>
  </div>
</section>
${hangarBand()}
<section class="map" data-reveal>
  <iframe title="AirPro Mobile — Stuart, FL" src="https://www.google.com/maps?q=Stuart,+FL,+USA&z=11&output=embed" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
</section>
` });

/* ---------- BLOG ---------- */
const postCard = (p, i, big) => `
  <a href="/${p.slug}/" class="post ${big ? 'post--big' : ''}" data-card style="--d:${(i % 3) * 0.1}s">
    <figure class="post__img"><img src="${img('blog/' + p.img)}" alt="${esc(p.title)}" loading="lazy"></figure>
    <div class="post__body">
      <span class="post__date">${esc(p.date)}</span>
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.body.split('\n')[0].slice(0, 170))}…</p>
      <span class="link-arrow">Read more ${ICON.arrow}</span>
    </div>
  </a>`;
pages.push({ file: 'blog/index.html', route: '/blog/', active: 'blog',
  title: 'AirPro Mobile Blog | Aircraft Maintenance & Aviation Tips',
  desc: "Explore aircraft maintenance insights, aviation tips, safety information, and expert guidance from AirPro Mobile's experienced aviation professionals.",
  body: `
${pageHero({ h1: 'Blog', crumbs: [['Home', '/'], ['Blog']], image: 'cockpit-pilots.jpg', kicker: 'Aircraft Maintenance & Aviation Tips' })}
<section class="sec">
  <div class="wrap">
    <div class="posts">
      ${C.posts.map((p, i) => postCard(p, i, i === 0)).join('')}
    </div>
  </div>
</section>
${ctaBand({ title: 'Book a Service', paras: ['Need to get back in the air? Our team offers 24/7 On-call AOG (Aircraft on Ground) support and line maintenance.'] }, 'jet-hangar.jpg')}
` });

function article(body) {
  const out = []; let ul = null; let faqOpen = false;
  const flush = () => { if (ul) { out.push(`<ul class="ticks">${ul.join('')}</ul>`); ul = null; } };
  const lines = body.split('\n').map(l => l.trim()).filter(Boolean);
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (l.startsWith('li ')) { ul = ul || []; ul.push(`<li><span class="ticks__i">${ICON.check}</span><span>${md(l.slice(3))}</span></li>`); continue; }
    flush();
    if (l.startsWith('h2 ')) { const t = l.slice(3); out.push(`<h2 id="${t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">${md(t)}</h2>`); }
    else if (l.startsWith('h3 ')) out.push(`<h3>${md(l.slice(3))}</h3>`);
    else if (l.startsWith('q ')) { out.push(`<div class="afaq"><h3>${md(l.slice(2))}</h3><p>${md(lines[i + 1] || '')}</p></div>`); i++; }
    else out.push(`<p>${md(l)}</p>`);
  }
  flush();
  return out.join('\n');
}

C.posts.forEach((p, idx) => {
  const toc = p.body.split('\n').filter(l => l.startsWith('h2 ')).map(l => l.slice(3));
  const related = C.posts.filter(o => o.slug !== p.slug).slice(0, 3);
  pages.push({ file: `${p.slug}/index.html`, route: `/${p.slug}/`, active: 'blog', title: p.seoTitle, desc: p.desc, bodyClass: 'is-post',
    body: `
<section class="post-hero">
  <div class="wrap post-hero__in">
    <nav class="crumbs" aria-label="Breadcrumb" data-hero-in><a href="/">Home</a><span>/</span><a href="/blog/">Blog</a><span>/</span><span aria-current="page">Article</span></nav>
    <p class="post-hero__date" data-hero-in>${esc(p.date)} · AirPro Mobile</p>
    <h1 class="h-post" data-hero-title>${esc(p.title)}</h1>
  </div>
  <div class="wrap"><figure class="post-hero__img" data-media><img src="${img('blog/' + p.img)}" alt="${esc(p.title)}"></figure></div>
</section>
<section class="sec sec--tight">
  <div class="wrap art">
    <aside class="art__side">
      <div class="art__sticky">
        <p class="eyebrow">On this page</p>
        <ol class="toc">${toc.map(t => `<li><a href="#${t.toLowerCase().replace(/[^a-z0-9]+/g, '-')}">${esc(t)}</a></li>`).join('')}</ol>
        <div class="art__cta">
          <span class="live-dot"></span><small>24/7 AOG Support</small>
          <a href="${C.TEL}">${C.PHONE}</a>
          ${bookBtn('Book A Service', 'btn--primary btn--sm')}
        </div>
      </div>
    </aside>
    <article class="art__body">
${article(p.body)}
    </article>
  </div>
</section>
<section class="sec sec--dark">
  <div class="wrap">
    ${sectionHead({ eb: 'Keep reading', t: 'More from the Blog' })}
    <div class="posts posts--3">${related.map((r, i) => postCard(r, i)).join('')}</div>
  </div>
</section>
` });
});

/* ---------- Write ---------- */
for (const p of pages) {
  const out = path.join(ROOT, p.file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, relativize(layout(p), p.file));
}
// Turn root paths ("/assets/..", "/services/..") into relative ones so the site
// works from any sub-folder — e.g. GitHub Pages: https://user.github.io/repo/
function relativize(html, file) {
  const depth = file.split('/').length - 1;
  const pre = depth ? '../'.repeat(depth) : './';
  return html
    .replace(/(href|src|action|data-images)="\/(?!\/)/g, `$1="${pre}`)
    .replace(/,\/assets\//g, `,${pre}assets/`);
}
fs.writeFileSync(path.join(ROOT, '.nojekyll'), '');
console.log(`Built ${pages.length} pages:`);
pages.forEach(p => console.log('  ' + p.route));
