/* =========================================================
   AirPro Mobile — interactions & motion (GSAP + ScrollTrigger + Lenis)
   ========================================================= */
(function () {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const html = document.documentElement;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  const ss = { get: k => { try { return sessionStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { sessionStorage.setItem(k, v); } catch (e) {} } };

  if (!hasGsap) { html.classList.remove('js'); }
  else gsap.registerPlugin(ScrollTrigger);

  /* ---------- Smooth scroll ---------- */
  let lenis = null;
  if (window.Lenis && !reduce) {
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    if (hasGsap) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
    }
  }
  const scrollTo = (target, opts = {}) => lenis ? lenis.scrollTo(target, { offset: -90, ...opts }) : (typeof target === 'number' ? window.scrollTo({ top: target, behavior: 'smooth' }) : target.scrollIntoView({ behavior: 'smooth' }));
  const lock = on => { document.body.classList.toggle('is-locked', on); if (lenis) on ? lenis.stop() : lenis.start(); };

  /* ---------- Text splitting ---------- */
  function splitWords(el) {
    if (el.dataset.splitDone) return $$('.split-line > span', el);
    const walk = node => {
      Array.from(node.childNodes).forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
            const o = document.createElement('span'); o.className = 'split-line';
            const i = document.createElement('span'); i.textContent = part; o.appendChild(i); frag.appendChild(o);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') walk(n);
      });
    };
    walk(el);
    el.dataset.splitDone = '1';
    $$('.split-line', el).forEach(s => { s.style.display = 'inline-block'; s.style.verticalAlign = 'top'; });
    return $$('.split-line > span', el);
  }

  /* ---------- Loader + page transitions ---------- */
  const loader = $('#loader'), curtain = $('#curtain');
  const firstVisit = !ss.get('ap-visited');
  const cameFromTransition = ss.get('ap-trans') === '1';
  ss.set('ap-trans', '0');

  function ready() {
    if (window.__apReady) return;
    window.__apReady = true;
    window.dispatchEvent(new Event('ap:ready'));
    heroIn();
  }

  if (!hasGsap || reduce) {
    if (loader) loader.remove();
    ready();
  } else if (firstVisit) {
    ss.set('ap-visited', '1');
    const pct = $('#loaderPct');
    const o = { v: 0 };
    let loaded = document.readyState === 'complete';
    window.addEventListener('load', () => { loaded = true; });
    const tl = gsap.timeline();
    tl.to('.loader__logo', { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'power3.out' })
      .to(o, { v: 86, duration: 1.6, ease: 'power2.inOut', onUpdate: () => { pct.textContent = Math.round(o.v); gsap.set('.loader__line span', { scaleX: o.v / 100 }); } }, 0.2)
      .add(() => new Promise(res => { const chk = () => (loaded ? res() : setTimeout(chk, 80)); setTimeout(() => res(), 4000); chk(); }))
      .to(o, { v: 100, duration: .45, ease: 'power2.out', onUpdate: () => { pct.textContent = Math.round(o.v); gsap.set('.loader__line span', { scaleX: o.v / 100 }); } })
      .to('.loader__in', { opacity: 0, y: -30, duration: .6, ease: 'power3.in' })
      .to(loader, { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '-=.15')
      .add(ready, '-=.65')
      .add(() => loader.remove());
  } else {
    loader && loader.remove();
    if (cameFromTransition && curtain) {
      gsap.set(curtain, { visibility: 'visible' });
      gsap.set('.curtain__panel', { scaleY: 1, transformOrigin: '50% 0%' });
      gsap.timeline()
        .to('.curtain__panel', { scaleY: 0, duration: 1, ease: 'expo.inOut', delay: .1 })
        .add(ready, '-=.55')
        .set(curtain, { visibility: 'hidden' });
    } else ready();
  }

  function leave(href) {
    if (!hasGsap || reduce) { location.href = href; return; }
    ss.set('ap-trans', '1');
    gsap.set(curtain, { visibility: 'visible' });
    gsap.timeline({ onComplete: () => { location.href = href; } })
      .fromTo('.curtain__panel', { scaleY: 0, transformOrigin: '50% 100%' }, { scaleY: 1, duration: .8, ease: 'expo.inOut' })
      .fromTo('.curtain__logo', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .4, ease: 'power2.out' }, '-=.25');
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('a');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    const href = a.getAttribute('href') || '';
    if (a.target === '_blank' || a.hasAttribute('download') || /^(tel:|mailto:|#)/.test(href)) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) { e.preventDefault(); const t = $(url.hash); if (t) scrollTo(t); return; }
    if (url.pathname === location.pathname && !url.hash) { e.preventDefault(); scrollTo(0); return; }
    e.preventDefault();
    leave(url.href);
  });
  window.addEventListener('pageshow', e => { if (e.persisted && curtain) { gsap && gsap.set('.curtain__panel', { scaleY: 0 }); curtain.style.visibility = 'hidden'; } });

  /* ---------- Hero intro ---------- */
  function heroIn() {
    if (!hasGsap || reduce) { $$('[data-hero-in]').forEach(el => (el.style.opacity = 1)); return; }
    const title = $('[data-hero-title]');
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
    if (title) {
      const words = splitWords(title);
      tl.from(words, { yPercent: 115, rotate: 4, duration: 1.5, stagger: .07 }, 0);
    }
    tl.fromTo('[data-hero-in]', { opacity: 0, y: 34 }, { opacity: 1, y: 0, duration: 1.3, stagger: .09 }, .25);
    // clearProps: a lingering transform would turn .nav into the mega menu's containing block
    tl.from('.hdr__in > *', { y: -30, opacity: 0, duration: 1.1, stagger: .08, clearProps: 'transform,opacity' }, .1);
  }

  /* ---------- Scroll animations ---------- */
  if (hasGsap && !reduce) {
    // headings: word mask reveal
    $$('[data-split]').forEach(el => {
      const w = splitWords(el);
      gsap.from(w, { yPercent: 110, duration: 1.2, ease: 'expo.out', stagger: .04, scrollTrigger: { trigger: el, start: 'top 88%' } });
    });
    // generic reveal
    $$('[data-reveal]').forEach(el => {
      gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
    $$('[data-reveal-list]').forEach(ul => {
      gsap.from(ul.children, { opacity: 0, x: -24, duration: 1, ease: 'expo.out', stagger: .07, scrollTrigger: { trigger: ul, start: 'top 88%' } });
    });
    // cards (staggered via --d)
    ScrollTrigger.batch('[data-card]', {
      start: 'top 92%',
      onEnter: els => gsap.fromTo(els, { opacity: 0, y: 70 }, { opacity: 1, y: 0, duration: 1.3, ease: 'expo.out', stagger: .1 })
    });
    // media: clip reveal + inner parallax
    $$('[data-media]').forEach(fig => {
      const im = $('img', fig);
      gsap.fromTo(fig, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: fig, start: 'top 85%' } });
      if (im) {
        gsap.fromTo(im, { scale: 1.35 }, { scale: 1.08, duration: 2, ease: 'expo.out', scrollTrigger: { trigger: fig, start: 'top 85%' } });
        gsap.fromTo(im, { yPercent: -5 }, { yPercent: 5, ease: 'none', scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true } });
      }
    });
    $$('[data-parallax]').forEach(el => {
      gsap.fromTo(el, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    // big 24/7
    const big = $('.statement__big');
    if (big) gsap.fromTo(big, { xPercent: -12, opacity: .2 }, { xPercent: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: big, start: 'top bottom', end: 'center center', scrub: true } });
    // hero content drifts on scroll
    $$('.hero__in, .phero__in').forEach(el => gsap.to(el, { yPercent: -18, opacity: .2, ease: 'none', scrollTrigger: { trigger: el.closest('[data-hero]'), start: 'top top', end: 'bottom top', scrub: true } }));
  } else {
    $$('[data-reveal],[data-card]').forEach(el => (el.style.opacity = 1));
  }

  /* ---------- Counters ---------- */
  $$('[data-count]').forEach(el => {
    const to = +el.dataset.count;
    if (!hasGsap || reduce) { el.textContent = to; return; }
    const o = { v: 0 };
    ScrollTrigger.create({ trigger: el, start: 'top 92%', once: true, onEnter: () => gsap.to(o, { v: to, duration: 2, ease: 'power3.out', onUpdate: () => (el.textContent = Math.round(o.v)) }) });
  });

  /* ---------- Horizontal services (home) ---------- */
  const hs = $('[data-hs]');
  if (hs && hasGsap && !reduce) {
    ScrollTrigger.matchMedia({
      '(min-width: 961px)': () => {
        const track = $('[data-hs-track]', hs), bar = $('[data-hs-bar]', hs);
        const dist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const tw = gsap.to(track, { x: () => -dist(), ease: 'none' });
        const st = ScrollTrigger.create({ trigger: hs, start: 'top top', end: () => '+=' + dist(), pin: '.hs__pin', scrub: .8, animation: tw, invalidateOnRefresh: true,
          onUpdate: s => gsap.set(bar, { scaleX: s.progress }) });
        $$('[data-hs-card] img', hs).forEach(im => gsap.fromTo(im, { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: im.closest('[data-hs-card]'), containerAnimation: tw, start: 'left right', end: 'right left', scrub: true } }));
        return () => st.kill();
      }
    });
  }

  /* ---------- Process steps ---------- */
  $$('[data-steps]').forEach(list => {
    const fill = $('.steps__fill', list), steps = $$('[data-step]', list);
    if (!hasGsap) { steps.forEach(s => s.classList.add('is-on')); return; }
    gsap.to(fill, { scaleY: 1, ease: 'none', scrollTrigger: { trigger: list, start: 'top 60%', end: 'bottom 60%', scrub: true } });
    steps.forEach(s => {
      ScrollTrigger.create({ trigger: s, start: 'top 62%', onEnter: () => s.classList.add('is-on'), onLeaveBack: () => s.classList.remove('is-on') });
      if (!reduce) gsap.from(s, { opacity: 0, x: 40, duration: 1.1, ease: 'expo.out', scrollTrigger: { trigger: s, start: 'top 88%' } });
    });
  });

  /* ---------- Marquee (velocity-reactive) ---------- */
  $$('.marquee__track').forEach(tr => {
    if (!hasGsap || reduce) return;
    const loop = gsap.to(tr, { xPercent: -50, duration: 38, ease: 'none', repeat: -1 });
    ScrollTrigger.create({ trigger: tr, start: 'top bottom', end: 'bottom top', onUpdate: s => {
      const v = Math.min(4, 1 + Math.abs(s.getVelocity()) / 600);
      gsap.to(loop, { timeScale: s.direction < 0 ? -v : v, duration: .2, overwrite: true });
      gsap.to(loop, { timeScale: s.direction < 0 ? -1 : 1, duration: 1.2, delay: .2, overwrite: false });
    } });
  });

  /* ---------- Header ---------- */
  const hdr = $('#hdr'), prog = $('#progress');
  let lastY = 0;
  function onScroll() {
    const y = window.scrollY;
    hdr.classList.toggle('is-scrolled', y > 40);
    const megaOpen = !!$('.nav__dd.is-open');
    hdr.classList.toggle('is-hidden', y > 500 && y > lastY + 2 && !megaOpen && !$('#mnav.is-open'));
    if (y < lastY - 2) hdr.classList.remove('is-hidden');
    lastY = y;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (prog) prog.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mega menu */
  $$('[data-dd]').forEach(dd => {
    const trigger = $('.nav__link--dd', dd);
    let t;
    const open = () => { clearTimeout(t); dd.classList.add('is-open'); hdr.classList.add('is-mega'); trigger.setAttribute('aria-expanded', 'true'); };
    const close = () => { t = setTimeout(() => { dd.classList.remove('is-open'); hdr.classList.remove('is-mega'); trigger.setAttribute('aria-expanded', 'false'); }, 160); };
    if (fine) { dd.addEventListener('mouseenter', open); dd.addEventListener('mouseleave', close); }
    dd.addEventListener('focusin', open);
    dd.addEventListener('focusout', e => { if (!dd.contains(e.relatedTarget)) close(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { clearTimeout(t); dd.classList.remove('is-open'); hdr.classList.remove('is-mega'); } });
  });

  /* Mobile nav */
  const burger = $('#burger'), mnav = $('#mnav');
  function toggleNav(force) {
    const on = force ?? !mnav.classList.contains('is-open');
    mnav.classList.toggle('is-open', on); burger.classList.toggle('is-open', on);
    burger.setAttribute('aria-expanded', on); mnav.setAttribute('aria-hidden', !on);
    hdr.classList.toggle('is-scrolled', on || window.scrollY > 40);
    lock(on);
  }
  burger && burger.addEventListener('click', () => toggleNav());
  $$('.mnav__toggle').forEach(b => b.addEventListener('click', () => { const g = b.closest('.mnav__group'); g.classList.toggle('is-open'); b.setAttribute('aria-expanded', g.classList.contains('is-open')); }));

  /* ---------- Accordion ---------- */
  $$('[data-acc]').forEach(item => {
    const q = $('.acc__q', item);
    q.addEventListener('click', () => {
      const on = !item.classList.contains('is-open');
      $$('[data-acc]', item.parentElement).forEach(o => { o.classList.remove('is-open'); $('.acc__q', o).setAttribute('aria-expanded', 'false'); });
      item.classList.toggle('is-open', on); q.setAttribute('aria-expanded', on);
      setTimeout(() => hasGsap && ScrollTrigger.refresh(), 650);
    });
  });

  /* ---------- Reviews slider ---------- */
  const rtrack = $('[data-reviews]');
  if (rtrack) {
    const step = () => { const c = $('.review', rtrack); return c ? c.offsetWidth + 22 : 400; };
    $$('[data-rev]').forEach(b => b.addEventListener('click', () => rtrack.scrollBy({ left: b.dataset.rev === 'next' ? step() : -step(), behavior: 'smooth' })));
    let down = false, sx = 0, sl = 0, moved = false;
    rtrack.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse') return; down = true; moved = false; sx = e.clientX; sl = rtrack.scrollLeft; rtrack.classList.add('is-drag'); });
    window.addEventListener('pointermove', e => { if (!down) return; const dx = e.clientX - sx; if (Math.abs(dx) > 3) moved = true; rtrack.scrollLeft = sl - dx; });
    window.addEventListener('pointerup', () => { if (!down) return; down = false; rtrack.classList.remove('is-drag'); });
    rtrack.addEventListener('click', e => { if (moved) e.preventDefault(); }, true);
    rtrack.addEventListener('wheel', e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) e.stopPropagation(); }, { passive: true });
    rtrack.setAttribute('data-lenis-prevent-horizontal', '');
  }

  /* ---------- Magnetic + cursor ---------- */
  if (fine && !reduce) {
    $$('[data-magnetic]').forEach(el => {
      el.addEventListener('mousemove', e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * .25, y = (e.clientY - r.top - r.height / 2) * .35;
        hasGsap ? gsap.to(el, { x, y, duration: .6, ease: 'power3.out' }) : (el.style.transform = `translate(${x}px,${y}px)`);
      });
      el.addEventListener('mouseleave', () => hasGsap ? gsap.to(el, { x: 0, y: 0, duration: .9, ease: 'elastic.out(1,.4)' }) : (el.style.transform = ''));
    });
    const cur = $('#cursor'), lab = $('.cursor__label', cur);
    if (cur && hasGsap) {
      const xTo = gsap.quickTo(cur, 'x', { duration: .45, ease: 'power3' }), yTo = gsap.quickTo(cur, 'y', { duration: .45, ease: 'power3' });
      window.addEventListener('mousemove', e => { cur.classList.add('is-on'); xTo(e.clientX); yTo(e.clientY); }, { passive: true });
      document.addEventListener('mouseleave', () => cur.classList.remove('is-on'));
      document.addEventListener('mouseover', e => {
        const view = e.target.closest('[data-hs-card], .svc-card, .post, .mega__feature');
        const drag = e.target.closest('[data-reviews]');
        const link = e.target.closest('a, button, input, textarea, select, label');
        cur.classList.toggle('is-view', !!(view || drag));
        cur.classList.toggle('is-link', !view && !drag && !!link);
        lab.textContent = drag ? 'Drag' : 'View';
      });
    }
  }

  /* ---------- Modal ---------- */
  const modal = $('#bookModal');
  let lastFocus = null;
  function openModal() {
    lastFocus = document.activeElement; toggleNav(false);
    modal.classList.add('is-open'); modal.setAttribute('aria-hidden', 'false'); lock(true);
    setTimeout(() => { const f = $('input[name="name"]', modal); f && f.focus(); }, 500);
  }
  function closeModal() { modal.classList.remove('is-open'); modal.setAttribute('aria-hidden', 'true'); lock(false); lastFocus && lastFocus.focus(); }
  $$('.js-book').forEach(b => b.addEventListener('click', openModal));
  $$('[data-close]', modal).forEach(b => b.addEventListener('click', closeModal));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal(); });

  /* ---------- Forms → contact.php ---------- */
  $$('[data-form]').forEach(f => {
    f.addEventListener('submit', async e => {
      e.preventDefault();
      const st = $('.qform__status', f), lbl = $('.btn__label', f);
      st.className = 'qform__status';
      let ok = true;
      $$('[required]', f).forEach(i => {
        const v = i.value.trim() !== '' && (i.type !== 'email' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.value));
        i.closest('.field').classList.toggle('is-bad', !v); if (!v) ok = false;
      });
      if (!ok) { st.textContent = 'Please fill in all fields with valid details.'; st.classList.add('err'); return; }
      f.classList.add('is-sending'); const orig = lbl.textContent; lbl.textContent = 'Sending…';
      try {
        const r = await fetch(f.getAttribute('action'), { method: 'POST', body: new FormData(f), headers: { Accept: 'application/json' } });
        const d = await r.json();
        if (!r.ok || !d.ok) throw new Error(d.message);
        st.textContent = d.message; st.classList.add('ok'); f.reset();
      } catch (err) {
        st.innerHTML = 'Message could not be sent right now. Please call <a href="tel:5612033813">561-203-3813</a> or email <a href="mailto:info@airpro-mobile.com">info@airpro-mobile.com</a>.';
        st.classList.add('err');
      } finally { f.classList.remove('is-sending'); lbl.textContent = orig; }
    });
    $$('input, textarea', f).forEach(i => i.addEventListener('input', () => i.closest('.field') && i.closest('.field').classList.remove('is-bad')));
  });

  /* ---------- Blog TOC ---------- */
  const toc = $$('.toc a');
  if (toc.length && hasGsap) {
    toc.forEach(a => {
      const sec = $(a.getAttribute('href'));
      const on = () => { toc.forEach(x => x.classList.remove('is-on')); a.classList.add('is-on'); };
      if (sec) ScrollTrigger.create({ trigger: sec, start: 'top 45%', onEnter: on, onLeaveBack: () => { const i = toc.indexOf(a); if (i > 0) { toc.forEach(x => x.classList.remove('is-on')); toc[i - 1].classList.add('is-on'); } } });
    });
  }

  /* ---------- Back to top ---------- */
  $$('[data-totop]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); e.stopPropagation(); scrollTo(0); }));

  /* refresh after fonts/images */
  if (hasGsap) {
    window.addEventListener('load', () => ScrollTrigger.refresh());
    document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
  }
})();
