/* =========================================================
   AirPro Mobile — WebGL (Three.js r128)
   1) Photo-real hero: real aircraft photos rendered on the GPU with
      depth parallax, light sweep, liquid noise transitions, film grain
      and floating hangar dust particles.
   2) 3D radar for the Service Areas section.
   ========================================================= */
(function () {
  'use strict';
  if (typeof THREE === 'undefined') return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobile = () => window.innerWidth < 768;

  /* ---------------- shared GLSL ---------------- */
  const NOISE = `
    vec3 mod289(vec3 x){return x-floor(x*(1./289.))*289.;}
    vec2 mod289(vec2 x){return x-floor(x*(1./289.))*289.;}
    vec3 permute(vec3 x){return mod289(((x*34.)+1.)*x);}
    float snoise(vec2 v){
      const vec4 C=vec4(.211324865405187,.366025403784439,-.577350269189626,.024390243902439);
      vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
      vec2 i1=(x0.x>x0.y)?vec2(1.,0.):vec2(0.,1.);
      vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1; i=mod289(i);
      vec3 p=permute(permute(i.y+vec3(0.,i1.y,1.))+i.x+vec3(0.,i1.x,1.));
      vec3 m=max(.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.); m=m*m; m=m*m;
      vec3 x=2.*fract(p*C.www)-1.; vec3 h=abs(x)-.5; vec3 ox=floor(x+.5); vec3 a0=x-ox;
      m*=1.79284291400159-.85373472095314*(a0*a0+h*h);
      vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw; return 130.*dot(m,g);
    }`;

  /* =========================================================
     1) PHOTO HERO
     ========================================================= */
  function PhotoHero(canvas) {
    const host = canvas.closest('[data-hero]') || canvas.parentElement;
    const urls = (canvas.dataset.images || '').split(',').filter(Boolean);
    if (!urls.length) return;
    const slideshow = canvas.dataset.slideshow === '1' && urls.length > 1;

    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'high-performance' }); }
    catch (e) { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile() ? 1.5 : 1.75));
    renderer.setClearColor(0x000000, 1);

    /* --- Image plane --- */
    const scene = new THREE.Scene();
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 10);
    const blank = new THREE.DataTexture(new Uint8Array([0, 0, 0, 255]), 1, 1, THREE.RGBAFormat);
    const U = {
      uA: { value: blank }, uB: { value: blank },
      uSizeA: { value: new THREE.Vector2(1, 1) }, uSizeB: { value: new THREE.Vector2(1, 1) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uProg: { value: 0 }, uTime: { value: 0 }, uIntro: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) }, uScroll: { value: 0 }, uZoomA: { value: 0 }
    };
    const mat = new THREE.ShaderMaterial({
      uniforms: U,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0., 1.); }',
      fragmentShader: `
        precision highp float;
        varying vec2 vUv;
        uniform sampler2D uA, uB; uniform vec2 uSizeA, uSizeB, uRes, uMouse;
        uniform float uProg, uTime, uIntro, uScroll, uZoomA;
        ${NOISE}
        vec2 cover(vec2 uv, vec2 img, float zoom){
          float rs = uRes.x/uRes.y, ri = img.x/img.y;
          vec2 s = rs > ri ? vec2(1., ri/rs) : vec2(rs/ri, 1.);
          vec2 st = (uv - .5) * s / zoom + .5;
          return st;
        }
        float luma(vec3 c){ return dot(c, vec3(.299,.587,.114)); }
        vec3 sampleImg(sampler2D t, vec2 size, vec2 uv, float zoom, vec2 disp){
          vec2 st = cover(uv, size, zoom);
          // pseudo depth: brighter / closer areas move more with the pointer (2.5D parallax)
          vec3 base = texture2D(t, st).rgb;
          float depth = .35 + luma(base) * .65;
          vec2 par = uMouse * .018 * depth;
          st += par + disp;
          // subtle chromatic split, stronger at the edges
          float ca = .0004 + length(uv - .5) * .0016;
          vec3 c;
          c.r = texture2D(t, st + vec2(ca, 0.)).r;
          c.g = texture2D(t, st).g;
          c.b = texture2D(t, st - vec2(ca, 0.)).b;
          return c;
        }
        void main(){
          vec2 uv = vUv;
          float n = snoise(uv * 3.2 + uTime * .05) * .5 + .5;
          // liquid noise wipe from right to left
          float p = uProg;
          float edge = p * 1.5 - .25;
          float m = smoothstep(edge - .12, edge + .12, (1. - uv.x) * .75 + n * .5);
          float wave = sin(p * 3.14159);
          vec2 dispA = vec2(-p * .18 * n, (n - .5) * .05 * wave);
          vec2 dispB = vec2((1. - p) * .18 * n, (n - .5) * .05 * wave);
          float zoomBase = 1.04 + uScroll * .18 + (1. - uIntro) * .12;
          vec3 a = sampleImg(uA, uSizeA, uv, zoomBase + uZoomA, dispA);
          vec3 b = sampleImg(uB, uSizeB, uv, zoomBase + .06 * (1. - p), dispB);
          vec3 col = mix(b, a, m);
          // glowing seam on the transition edge (logo orange)
          float seam = (1. - smoothstep(0., .07, abs(m - .5))) * wave;
          col += vec3(1., .48, .16) * seam * .55;
          // warm light sweep
          float sweep = smoothstep(.0, .5, 1. - abs(uv.x - (fract(uTime * .045) * 2.2 - .6) + (uv.y - .5) * .5));
          col += vec3(1., .78, .55) * pow(sweep, 7.) * .07;
          // cinematic grade: lift blacks slightly, cool shadows, warm highlights
          float l = luma(col);
          col = mix(col * vec3(.92, .97, 1.06), col * vec3(1.06, 1.0, .92), smoothstep(.3, .9, l));
          col = (col - .5) * 1.06 + .5;
          // vignette + scroll dim + intro fade
          float vig = smoothstep(1.15, .25, length((uv - .5) * vec2(1.2, 1.)));
          col *= mix(.55, 1., vig);
          col *= (1. - uScroll * .55) * uIntro;
          // film grain
          float g = fract(sin(dot(uv * uRes + uTime * 60., vec2(12.9898, 78.233))) * 43758.5453);
          col += (g - .5) * .045;
          gl_FragColor = vec4(col, 1.);
        }`
    });
    scene.add(new THREE.Mesh(new THREE.PlaneGeometry(2, 2), mat));

    /* --- Dust particles (3D) --- */
    const pScene = new THREE.Scene();
    const pCam = new THREE.PerspectiveCamera(50, 1, .1, 100);
    pCam.position.z = 10;
    const COUNT = mobile() ? 260 : 600;
    const pos = new Float32Array(COUNT * 3), seed = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - .5) * 26; pos[i * 3 + 1] = (Math.random() - .5) * 14; pos[i * 3 + 2] = (Math.random() - .5) * 10;
      seed[i] = Math.random();
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pg.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
    const PU = { uTime: { value: 0 }, uMouse: U.uMouse, uPR: { value: renderer.getPixelRatio() }, uAlpha: { value: 0 } };
    const pts = new THREE.Points(pg, new THREE.ShaderMaterial({
      uniforms: PU, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float aSeed; uniform float uTime, uPR; uniform vec2 uMouse; varying float vA;
        void main(){
          vec3 p = position;
          p.y += mod(uTime * (.12 + aSeed * .25) + aSeed * 14., 14.) - 7.;
          p.x += sin(uTime * .3 + aSeed * 30.) * .6 + uMouse.x * (p.z + 5.) * .08;
          p.y += uMouse.y * (p.z + 5.) * .05;
          vec4 mv = modelViewMatrix * vec4(p, 1.);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (2. + aSeed * 5.) * uPR * (8. / -mv.z);
          vA = (.25 + aSeed * .75) * (.6 + .4 * sin(uTime * 2. + aSeed * 50.));
        }`,
      fragmentShader: `
        uniform float uAlpha; varying float vA;
        void main(){ float d = length(gl_PointCoord - .5); float a = smoothstep(.5, 0., d);
          gl_FragColor = vec4(1., .86, .7, a * vA * .55 * uAlpha); }`
    }));
    pScene.add(pts);

    /* --- Textures --- */
    const loader = new THREE.TextureLoader();
    const tex = [];
    function load(i) {
      return new Promise(res => {
        if (tex[i]) return res(tex[i]);
        loader.load(urls[i], t => {
          t.minFilter = THREE.LinearFilter; t.generateMipmaps = false; t.encoding = THREE.LinearEncoding;
          t.apSize = new THREE.Vector2(t.image.width, t.image.height);
          tex[i] = t; res(t);
        }, undefined, () => res(null));
      });
    }

    let cur = 0, busy = false, started = false;
    load(0).then(t => {
      if (!t) return;
      U.uA.value = t; U.uSizeA.value = t.apSize;
      U.uB.value = t; U.uSizeB.value = t.apSize;
      host.classList.add('gl-ready');
      started = true;
      intro();
      if (slideshow) urls.forEach((_, i) => i && load(i));
    });

    function tween(obj, key, to, dur, ease, done) {
      if (window.gsap) return gsap.to(obj, { [key]: to, duration: dur, ease: ease || 'power3.inOut', onComplete: done });
      const from = obj[key], t0 = performance.now();
      (function step(now) { const k = Math.min(1, (now - t0) / (dur * 1000)); obj[key] = from + (to - from) * (1 - Math.pow(1 - k, 3)); k < 1 ? requestAnimationFrame(step) : done && done(); })(t0);
    }
    function intro() {
      tween(U.uIntro, 'value', 1, reduce ? .01 : 2.4, 'power2.out');
      tween(PU.uAlpha, 'value', 1, 3, 'power2.out');
    }

    /* slideshow */
    const dots = Array.from(host.querySelectorAll('[data-slide]'));
    const DUR = 6.5;
    let timer = null, barTween = null;
    function runBar(i) {
      dots.forEach((d, k) => { d.classList.toggle('is-on', k === i); const b = d.querySelector('i'); if (b && window.gsap) gsap.set(b, { scaleX: k < i ? 1 : 0 }); });
      const bar = dots[i] && dots[i].querySelector('i');
      if (barTween) barTween.kill();
      if (bar && window.gsap) barTween = gsap.fromTo(bar, { scaleX: 0 }, { scaleX: 1, duration: DUR, ease: 'none' });
    }
    function kenBurns() {
      if (!window.gsap || reduce) return;
      gsap.killTweensOf(U.uZoomA); U.uZoomA.value = 0;
      gsap.to(U.uZoomA, { value: .06, duration: DUR + 4, ease: 'none' });
    }
    function go(next) {
      if (busy || next === cur || !started) return;
      busy = true;
      load(next).then(t => {
        if (!t) { busy = false; return; }
        U.uB.value = t; U.uSizeB.value = t.apSize;
        U.uProg.value = 0;
        cur = next; runBar(cur);
        tween(U.uProg, 'value', 1, reduce ? .01 : 2.2, 'power3.inOut', () => {
          U.uA.value = t; U.uSizeA.value = t.apSize; U.uProg.value = 0; kenBurns(); busy = false;
        });
      });
      schedule();
    }
    function schedule() { clearTimeout(timer); if (slideshow) timer = setTimeout(() => go((cur + 1) % urls.length), DUR * 1000); }
    if (slideshow) {
      dots.forEach(d => d.addEventListener('click', () => go(+d.dataset.slide)));
      const startShow = () => { runBar(0); kenBurns(); schedule(); };
      if (window.__apReady) startShow(); else window.addEventListener('ap:ready', startShow, { once: true });
    }

    /* pointer + scroll */
    const m = new THREE.Vector2(), mt = new THREE.Vector2();
    window.addEventListener('pointermove', e => { mt.set((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1)); }, { passive: true });
    if (window.DeviceOrientationEvent && mobile()) window.addEventListener('deviceorientation', e => { if (e.gamma != null) mt.set(Math.max(-1, Math.min(1, e.gamma / 30)), Math.max(-1, Math.min(1, (e.beta - 45) / 30))); }, { passive: true });

    function size() {
      const w = host.clientWidth, h = host.clientHeight;
      renderer.setSize(w, h, false);
      U.uRes.value.set(w, h);
      pCam.aspect = w / h; pCam.updateProjectionMatrix();
    }
    size();
    window.addEventListener('resize', size);

    let visible = true;
    new IntersectionObserver(es => { visible = es[0].isIntersecting; }).observe(host);
    const clock = new THREE.Clock();
    renderer.autoClear = false;
    (function frame() {
      requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), .05);
      if (!visible || !started || document.hidden) return;
      const t = clock.elapsedTime;
      m.lerp(mt, reduce ? 1 : 1 - Math.pow(.02, dt));
      U.uMouse.value.copy(reduce ? new THREE.Vector2() : m);
      U.uTime.value = t; PU.uTime.value = reduce ? 0 : t;
      const r = host.getBoundingClientRect();
      U.uScroll.value = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)));
      renderer.clear();
      renderer.render(scene, cam);
      renderer.render(pScene, pCam);
    })();
  }

  /* =========================================================
     2) 3D RADAR (service areas)
     ========================================================= */
  function Radar(canvas) {
    let renderer;
    try { renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true }); } catch (e) { return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(35, 1, .1, 100);
    cam.position.set(0, 8.2, 9.6); cam.lookAt(0, -.2, 0);

    const group = new THREE.Group(); scene.add(group);
    const RU = { uTime: { value: 0 } };
    const disc = new THREE.Mesh(new THREE.CircleGeometry(4, 128), new THREE.ShaderMaterial({
      uniforms: RU, transparent: true, depthWrite: false,
      vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.); }',
      fragmentShader: `
        varying vec2 vUv; uniform float uTime;
        void main(){
          vec2 p = (vUv - .5) * 2.; float r = length(p);
          if (r > 1.) discard;
          float rings = smoothstep(.012, 0., abs(fract(r * 5.) - .5) - .485) * .35;
          float cross = (smoothstep(.006, 0., abs(p.x)) + smoothstep(.006, 0., abs(p.y))) * .25;
          float ang = atan(p.y, p.x);
          float sw = mod(-uTime * 1.1, 6.28318);
          float d = mod(ang - sw + 6.28318, 6.28318);
          float sweep = smoothstep(1.4, 0., d) * .55 + smoothstep(.03, 0., d) * .9;
          float edge = smoothstep(.985, 1., r) * .9;
          vec3 c = vec3(.93, .48, .16);
          float a = (rings + cross) * (1. - r * .4) + sweep * (1. - r * .3) * .7 + edge * .6;
          vec3 col = mix(vec3(.85), c, clamp(sweep * 1.4 + edge, 0., 1.));
          gl_FragColor = vec4(col, a * .85);
        }`
    }));
    disc.rotation.x = -Math.PI / 2;
    group.add(disc);

    // base beacon at center (Stuart, FL)
    const beacon = new THREE.Mesh(new THREE.CylinderGeometry(.03, .03, 1.6, 12), new THREE.MeshBasicMaterial({ color: 0xec7a2a, transparent: true, opacity: .9 }));
    beacon.position.y = .8; group.add(beacon);
    const core = new THREE.Mesh(new THREE.SphereGeometry(.1, 24, 16), new THREE.MeshBasicMaterial({ color: 0xffffff }));
    core.position.y = 1.6; group.add(core);
    const pulses = [0, 1, 2].map(i => {
      const r = new THREE.Mesh(new THREE.RingGeometry(.18, .21, 64), new THREE.MeshBasicMaterial({ color: 0xec7a2a, transparent: true, side: THREE.DoubleSide }));
      r.rotation.x = -Math.PI / 2; r.position.y = .01; r.userData.o = i / 3; group.add(r); return r;
    });

    // blips (aircraft locations) with arcs from base
    const blips = [];
    const arcMat = new THREE.LineBasicMaterial({ color: 0xec7a2a, transparent: true, opacity: .45 });
    for (let i = 0; i < 9; i++) {
      const a = Math.random() * Math.PI * 2, rr = 1.1 + Math.random() * 2.6;
      const x = Math.cos(a) * rr, z = Math.sin(a) * rr;
      const b = new THREE.Mesh(new THREE.SphereGeometry(.06, 12, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true }));
      b.position.set(x, .03, z); b.userData.ang = a; group.add(b); blips.push(b);
      const mid = new THREE.Vector3(x / 2, .6 + rr * .18, z / 2);
      const curve = new THREE.QuadraticBezierCurve3(new THREE.Vector3(0, .02, 0), mid, new THREE.Vector3(x, .03, z));
      const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(40)), arcMat.clone());
      line.userData.blip = b; group.add(line); b.userData.line = line;
    }

    function size() { const r = canvas.getBoundingClientRect(); renderer.setSize(r.width, r.height, false); cam.aspect = r.width / Math.max(1, r.height); cam.updateProjectionMatrix(); }
    size(); window.addEventListener('resize', size);
    let vis = false, mx = 0, my = 0, tx = 0, ty = 0;
    new IntersectionObserver(es => { vis = es[0].isIntersecting; }).observe(canvas);
    canvas.parentElement.addEventListener('pointermove', e => { const r = canvas.getBoundingClientRect(); tx = ((e.clientX - r.left) / r.width - .5) * 2; ty = ((e.clientY - r.top) / r.height - .5) * 2; });
    canvas.parentElement.addEventListener('pointerleave', () => { tx = 0; ty = 0; });
    const clock = new THREE.Clock();
    (function frame() {
      requestAnimationFrame(frame);
      const dt = Math.min(clock.getDelta(), .05);
      if (!vis) return;
      const t = reduce ? 0 : clock.elapsedTime;
      RU.uTime.value = t;
      mx += (tx - mx) * .06; my += (ty - my) * .06;
      group.rotation.y = t * .05 + mx * .35; group.rotation.x = my * .12;
      pulses.forEach(p => { const k = (t * .45 + p.userData.o) % 1; p.scale.setScalar(1 + k * 18); p.material.opacity = (1 - k) * .55; });
      const sw = ((-t * 1.1) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      blips.forEach(b => {
        // disc is rotated -90° on X, so world angle = -uv angle
        const ang = ((-b.userData.ang) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const d = ((ang - sw) + Math.PI * 2) % (Math.PI * 2);
        const glow = Math.max(0, 1 - d / 2.2);
        b.material.opacity = .25 + glow * .75; b.scale.setScalar(1 + glow * 1.4);
        b.userData.line.material.opacity = .08 + glow * .5;
      });
      core.scale.setScalar(1 + Math.sin(t * 4) * .15);
      renderer.render(scene, cam);
    })();
  }

  function init() {
    document.querySelectorAll('canvas.gl-hero').forEach(PhotoHero);
    const r = document.getElementById('radarGl'); if (r) Radar(r);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
