/* components.js — monta cabeçalho, rodapé, botões flutuantes e o conteúdo
   de cada página a partir dos arquivos da pasta /config.
   Não precisa ser editado a cada cliente. */
(function () {
  "use strict";
  var B = window.SITE_BRAND || {}, C = window.SITE_CONTENT || {}, K = window.SITE_CONTACT || {};
  var UI = C.ui || {};
  var S = window.SITE_STORE || {}, SU = S.ui || {};
  var Sie = (window.Sie = window.Sie || {});

  /* ---------- ícones (SVG embutido) ---------- */
  var I = {
    heart: '<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    bolt: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',
    star: '<path d="m12 2 3.1 6.3 6.9 1-5 4.8 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.8 6.9-1z"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    chat: '<path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.1A8.4 8.4 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5z"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    pin: '<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    award: '<circle cx="12" cy="8" r="7"/><path d="M8.2 13.9 7 23l5-3 5 3-1.2-9.1"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-6 7-10 16-10 0 9-4 16-9 17z"/><path d="M4 21c0-6 4-9 9-10"/>',
    sparkles: '<path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/><path d="m19 16 .8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z"/>',
    cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.5L22 7H6"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    trash: '<path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M6 6l1 14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-14M10 11v6M14 11v6"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M6 6l12 12M18 6 6 18"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    left: '<path d="M15 6l-6 6 6 6"/>',
    right: '<path d="M9 6l6 6-6 6"/>',
    up: '<path d="M12 19V5M5 12l7-7 7 7"/>',
    phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    tiktok: '<path d="M16 3a5 5 0 0 0 4 4v3a8 8 0 0 1-4-1.2V15a6 6 0 1 1-6-6v3.2A2.8 2.8 0 1 0 13 15V3z"/>',
    youtube: '<path d="M2 6.5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v11a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3z"/><path d="m10 9 5 3-5 3z"/>',
    linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>',
    link: '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="m21 16-5-5-8 8"/>',
    whatsapp: '<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.89 9.89-9.89 2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 7c0 5.45-4.44 9.88-9.88 9.88zM20.46 3.49A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.42z"/>'
  };
  var FILL = { whatsapp: 1, star: 1 };
  var VB = { whatsapp: "0 0 24 24" };

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icon(n, cls) {
    return '<svg class="i' + (FILL[n] ? " i--fill" : "") + (cls ? " " + cls : "") + '" viewBox="' + (VB[n] || "0 0 24 24") +
      '" aria-hidden="true" focusable="false">' + (I[n] || I.image) + "</svg>";
  }
  function digits(s) { return String(s || "").replace(/\D/g, ""); }
  function has(v) { return v != null && String(v).trim() !== ""; }

  /* ---------- links de contato ---------- */
  var waNum = digits(K.whatsapp && K.whatsapp.number);
  function waUrl(msg) {
    if (!waNum) return "";
    var m = msg == null ? (K.whatsapp && K.whatsapp.message) : msg;
    return "https://wa.me/" + waNum + (m ? "?text=" + encodeURIComponent(m) : "");
  }
  function telUrl() {
    var d = digits(K.phone);
    if (!d) return "";
    return "tel:+" + (d.length <= 11 ? "55" + d : d);
  }
  function mailUrl() { return has(K.email) ? "mailto:" + K.email.trim() : ""; }
  function mapsUrl() {
    return K.address && has(K.address.text) ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(K.address.text) : "";
  }
  function resolve(l) {
    if (!has(l)) return "";
    var v = String(l).trim();
    if (v === "whatsapp") return waUrl();
    if (v === "telefone") return telUrl();
    if (v === "email") return mailUrl();
    return v;
  }
  function ext(h) { return /^https?:\/\//i.test(h) ? ' target="_blank" rel="noopener noreferrer"' : ""; }
  function btn(label, link, cls) {
    var href = resolve(link);
    if (!has(label) || !href) return "";
    var isWa = String(link).trim() === "whatsapp";
    return '<a class="btn ' + (isWa ? "btn--wa " : "") + (cls || "") + '" href="' + esc(href) + '"' + ext(href) + ">" +
      (isWa ? icon("whatsapp") : "") + "<span>" + esc(label) + "</span>" + (isWa ? "" : icon("arrow")) + "</a>";
  }

  /* ---------- imagens com espaço reservado ---------- */
  function ph(alt) { return '<span class="ph" role="img" aria-label="' + esc(alt || "Imagem") + '">' + icon("image") + "</span>"; }
  function img(src, alt, w, h, eager) {
    if (!has(src)) return ph(alt);
    return '<img src="' + esc(src) + '" alt="' + esc(alt || "") + '" width="' + w + '" height="' + h + '"' +
      (eager ? ' fetchpriority="high" decoding="async"' : ' loading="lazy" decoding="async"') + " data-ph>";
  }
  document.addEventListener("error", function (e) {
    var t = e.target;
    if (!t || t.tagName !== "IMG" || !t.hasAttribute("data-ph")) return;
    var holder = t.parentNode && t.parentNode.tagName === "PICTURE" ? t.parentNode : t;
    var tmp = document.createElement("div");
    tmp.innerHTML = ph(t.getAttribute("alt"));
    if (holder.parentNode) holder.parentNode.replaceChild(tmp.firstChild, holder);
  }, true);

  function initials(n) {
    var p = String(n || "").trim().split(/\s+/).filter(Boolean);
    return ((p[0] || "?").charAt(0) + (p.length > 1 ? p[p.length - 1].charAt(0) : "")).toUpperCase();
  }
  function paras(a) { return (a || []).filter(has).map(function (t) { return "<p>" + esc(t) + "</p>"; }).join(""); }
  function facts(a) {
    a = (a || []).filter(function (x) { return x && has(x.label) && has(x.value); });
    if (!a.length) return "";
    return '<dl class="facts">' + a.map(function (x) { return "<div><dt>" + esc(x.label) + "</dt><dd>" + esc(x.value) + "</dd></div>"; }).join("") + "</dl>";
  }
  function ticks(a) {
    a = (a || []).filter(has);
    if (!a.length) return "";
    return '<ul class="ticks">' + a.map(function (t) { return "<li>" + icon("check") + "<span>" + esc(t) + "</span></li>"; }).join("") + "</ul>";
  }
  function stars(n) {
    n = Math.max(0, Math.min(5, Math.round(+n || 0)));
    var s = "";
    for (var i = 1; i <= 5; i++) s += icon("star", i <= n ? "star" : "star star--off");
    return '<span class="stars" role="img" aria-label="Nota ' + n + ' de 5">' + s + "</span>";
  }
  function cta(c) {
    if (!c || c.enabled === false || !has(c.title)) return "";
    return '<section class="section"><div class="wrap"><div class="cta" data-reveal><div><h2>' + esc(c.title) + "</h2>" +
      (has(c.text) ? "<p>" + esc(c.text) + "</p>" : "") + "</div>" + btn(c.buttonLabel, c.link, "btn--light") + "</div></div></section>";
  }

  /* ---------- redes sociais ---------- */
  var SOC = [["instagram", "Instagram"], ["facebook", "Facebook"], ["tiktok", "TikTok"], ["youtube", "YouTube"], ["linkedin", "LinkedIn"]];
  function socials() {
    var out = [], s = K.social || {};
    SOC.forEach(function (p) { if (has(s[p[0]])) out.push({ icon: p[0], label: p[1], url: s[p[0]].trim() }); });
    (K.otherLinks || []).forEach(function (o) { if (o && has(o.url)) out.push({ icon: o.icon || "link", label: o.label || "Link", url: o.url.trim() }); });
    return out;
  }

  /* ---------- cabeçalho ---------- */
  function navLinks(cls) {
    var page = document.body.getAttribute("data-page");
    return (C.nav || []).map(function (n) {
      var cur = n.page === page;
      return '<li><a class="' + cls + (cur ? " is-current" : "") + '" href="' + esc(n.href) + '"' + (cur ? ' aria-current="page"' : "") + ">" + esc(n.label) + "</a></li>";
    }).join("");
  }
  function logoHtml() {
    var L = B.logo || {}, alt = L.alt || B.name || "Logo", h = "";
    if (has(L.light)) {
      var same = !has(L.dark) || L.dark === L.light;
      h += '<img class="logo' + (same ? "" : " logo--light") + '" src="' + esc(L.light) + '" alt="' + (L.showName === false ? esc(alt) : "") + '" width="40" height="40" data-ph>';
      if (!same) h += '<img class="logo logo--dark" src="' + esc(L.dark) + '" alt="" width="40" height="40" data-ph>';
    }
    return h;
  }
  function cartBtn() {
    if (S.mode === "direct") return "";
    return '<button class="icon-btn cart-btn" type="button" id="cart-toggle" aria-haspopup="dialog" aria-label="' + esc(SU.openCart) + '">' + icon("cart") + '<span class="cart-count" id="cart-count" hidden>0</span></button>';
  }
  function header() {
    var showName = !(B.logo && B.logo.showName === false);
    var wa = waUrl();
    return '<a class="skip" href="#main">' + esc(UI.skipLink) + "</a>" +
      '<header class="site-header"><div class="hdr">' +
      '<a class="brand" href="index.html"' + (showName ? "" : ' aria-label="' + esc(B.name) + '"') + ">" + logoHtml() +
      (showName ? '<span class="brand-name">' + esc(B.name) + "</span>" : "") + "</a>" +
      '<nav class="nav" aria-label="Principal"><ul>' + navLinks("nav-link") + "</ul></nav>" +
      '<div class="hdr-actions">' + cartBtn() +
      '<button class="icon-btn" type="button" id="theme-toggle" aria-label="' + esc(UI.themeToDark) + '">' + icon("moon", "i-moon") + icon("sun", "i-sun") + "</button>" +
      '<button class="icon-btn menu-btn" type="button" id="menu-toggle" aria-expanded="false" aria-controls="drawer" aria-label="' + esc(UI.menuOpen) + '">' + icon("menu") + "</button>" +
      "</div></div></header>" +
      '<div class="overlay" id="overlay"></div>' +
      '<aside class="drawer" id="drawer" aria-label="Menu" inert><div class="drawer-top"><span class="brand-name">' + esc(B.name) + "</span>" +
      '<button class="icon-btn" type="button" id="menu-close" aria-label="' + esc(UI.menuClose) + '">' + icon("close") + "</button></div>" +
      '<nav aria-label="Menu móvel"><ul class="drawer-list">' + navLinks("drawer-link") + "</ul></nav>" +
      (wa ? '<a class="btn btn--wa drawer-wa" href="' + esc(wa) + '" target="_blank" rel="noopener noreferrer">' + icon("whatsapp") + "<span>" + esc(K.whatsapp.buttonLabel || "WhatsApp") + "</span></a>" : "") +
      "</aside>";
  }

  /* ---------- rodapé ---------- */
  function footer() {
    var soc = socials(), contact = "";
    if (has(K.phone)) contact += '<li><a href="' + esc(telUrl()) + '">' + icon("phone") + "<span>" + esc(K.phone) + "</span></a></li>";
    if (has(K.email)) contact += '<li><a href="' + esc(mailUrl()) + '">' + icon("mail") + "<span>" + esc(K.email) + "</span></a></li>";
    if (K.address && has(K.address.text)) contact += '<li><a href="' + esc(mapsUrl()) + '" target="_blank" rel="noopener noreferrer">' + icon("pin") + "<span>" + esc(K.address.text) + "</span></a></li>";
    var copy = String(B.copyright || "© {ano} {nome}").replace("{ano}", new Date().getFullYear()).replace("{nome}", B.name || "");
    var bc = K.beacons && K.beacons.enabled && has(K.beacons.url);
    return '<footer class="site-footer"><div class="wrap"><div class="foot-grid">' +
      '<div class="foot-brand"><a class="brand" href="index.html">' + logoHtml() + '<span class="brand-name">' + esc(B.name) + "</span></a>" +
      (has(B.slogan) ? "<p>" + esc(B.slogan) + "</p>" : "") + "</div>" +
      '<nav aria-label="' + esc(UI.footerNav) + '"><h2 class="foot-title">' + esc(UI.footerNav) + '</h2><ul class="foot-list">' + navLinks("foot-link") + "</ul></nav>" +
      (contact ? '<div><h2 class="foot-title">' + esc(UI.footerContact) + '</h2><ul class="foot-list foot-contact">' + contact + "</ul></div>" : "") +
      (soc.length ? '<div><h2 class="foot-title">' + esc(UI.footerSocial) + '</h2><ul class="social">' + soc.map(function (s) {
        return '<li><a href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(s.label) + '">' + icon(s.icon) + "</a></li>";
      }).join("") + "</ul></div>" : "") +
      '</div><div class="foot-bottom"><small>' + esc(copy) + "</small>" +
      (bc ? '<a class="beacons" href="' + esc(K.beacons.url) + '" target="_blank" rel="noopener noreferrer">' + esc(K.beacons.label || "Beacons") + "</a>" : "") +
      "</div></div></footer>";
  }

  function floats() {
    var wa = waUrl();
    return '<button class="to-top" type="button" id="to-top" aria-label="' + esc(UI.toTop) + '" hidden>' + icon("up") + "</button>" +
      (wa ? '<a class="wa-fab" href="' + esc(wa) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(UI.whatsappFloat) + '">' + icon("whatsapp") + "</a>" : "");
  }

  /* ---------- HOME ---------- */
  function carousel(c) {
    if (!c) return "";
    var list = (c.banners || []).filter(function (b) { return b && b.enabled !== false && (has(b.desktop) || has(b.mobile)); }).slice(0, 3);
    if (!list.length) return "";
    var slides = list.map(function (b, i) {
      var d = has(b.desktop) ? b.desktop : b.mobile, m = has(b.mobile) ? b.mobile : b.desktop;
      var href = resolve(b.link), hasBtn = has(b.ctaLabel) && href;
      var copy = has(b.title) || has(b.subtitle) || hasBtn;
      var picture = "<picture>" + (m !== d ? '<source media="(max-width: 720px)" srcset="' + esc(m) + '">' : "") +
        '<img src="' + esc(d) + '" alt="' + esc(b.alt || "") + '" width="1920" height="800"' + (i === 0 ? ' fetchpriority="high" decoding="async"' : ' loading="lazy" decoding="async"') + " data-ph></picture>";
      return '<div class="slide" role="group" aria-roledescription="slide" aria-label="' + (i + 1) + " / " + list.length + '">' + picture +
        (copy ? '<div class="slide-scrim"></div><div class="slide-copy">' +
          (has(b.title) ? '<p class="slide-title">' + esc(b.title) + "</p>" : "") +
          (has(b.subtitle) ? '<p class="slide-sub">' + esc(b.subtitle) + "</p>" : "") +
          (hasBtn ? '<a class="btn btn--light" href="' + esc(href) + '"' + ext(href) + "><span>" + esc(b.ctaLabel) + "</span>" + icon("arrow") + "</a>" : "") + "</div>" : "") +
        (href && !hasBtn ? '<a class="slide-link" href="' + esc(href) + '"' + ext(href) + ' aria-label="' + esc(b.title || b.alt || "Saiba mais") + '"></a>' : "") + "</div>";
    }).join("");
    var multi = list.length > 1;
    return '<section class="hero wrap" aria-label="Destaques"><div class="carousel" role="region" aria-roledescription="carousel" aria-label="Banners" data-autoplay="' + (c.autoplay !== false && multi) + '" data-interval="' + (c.intervalMs || 6500) + '">' +
      '<div class="viewport"><div class="track">' + slides + "</div></div>" +
      (multi ? '<div class="car-ui"><div class="dots" role="group" aria-label="Posição">' + list.map(function (_, i) {
        return '<button type="button" class="dot" aria-label="' + esc(UI.goTo) + " " + (i + 1) + '"></button>';
      }).join("") + '</div><div class="arrows"><button type="button" class="arrow" data-dir="-1" aria-label="' + esc(UI.prev) + '">' + icon("left") +
        '</button><button type="button" class="arrow" data-dir="1" aria-label="' + esc(UI.next) + '">' + icon("right") + "</button></div></div>" : "") +
      "</div></section>";
  }
  function diffs(d) {
    if (!d || d.enabled === false) return "";
    var it = (d.items || []).filter(function (x) { return x && has(x.title); }).slice(0, 3);
    if (!it.length) return "";
    return '<section class="section section--tight"><div class="wrap"><div class="diff-grid">' + it.map(function (x, i) {
      return '<article class="card diff" data-reveal style="--d:' + i * 80 + 'ms"><span class="chip">' + icon(x.icon || "sparkles") + "</span><h2 class=\"card-title\">" + esc(x.title) + "</h2>" +
        (has(x.text) ? "<p>" + esc(x.text) + "</p>" : "") + "</article>";
    }).join("") + "</div></div></section>";
  }
  /* ---------- catálogo (produtos) ---------- */
  function money(n) {
    var v = Number(n);
    try { return new Intl.NumberFormat("pt-BR", { style: "currency", currency: S.currency || "BRL" }).format(v).replace(/\u00a0/g, " "); }
    catch (e) { return "R$ " + v.toFixed(2).replace(".", ","); }
  }
  function productList() {
    var seen = {};
    return (S.products || []).filter(function (p) {
      return p && p.enabled !== false && has(p.name) && has(p.price) && isFinite(Number(p.price));
    }).slice(0, S.maxProducts || 30).map(function (p, i) {
      var id = has(p.id) ? String(p.id).trim() : "p" + (i + 1);
      if (seen[id]) id = id + "-" + (i + 1);
      seen[id] = 1;
      return { id: id, name: p.name, image: p.image, imageAlt: p.imageAlt, description: p.description, price: Number(p.price),
        oldPrice: has(p.oldPrice) && isFinite(Number(p.oldPrice)) ? Number(p.oldPrice) : null,
        rating: has(p.rating) && isFinite(Number(p.rating)) ? Math.max(0, Math.min(5, Number(p.rating))) : null,
        reviews: has(p.reviews) ? p.reviews : null, category: has(p.category) ? String(p.category).trim() : "",
        badge: p.badge, featured: p.featured === true, available: p.available !== false };
    });
  }
  function directUrl(p) {
    var m = S.message || {};
    var t = String(m.directText || "Tenho interesse em {produto} ({preco}).").replace("{loja}", B.name || "").replace("{produto}", p.name).replace("{preco}", money(p.price));
    return waUrl(t);
  }
  function card(p) {
    var rate = "";
    if (p.rating !== null) {
      rate = '<div class="prod-rate">' + stars(p.rating) + '<span class="rate-n">' + p.rating.toLocaleString("pt-BR", { maximumFractionDigits: 1 }) + "</span>" +
        (p.reviews ? '<span class="rate-c">(' + esc(p.reviews) + ")</span>" : "") + "</div>";
    }
    var action;
    if (!p.available) action = '<button class="btn btn--sm" type="button" disabled>' + esc(SU.unavailable) + "</button>";
    else if (S.mode === "direct") action = waUrl() ? '<a class="btn btn--wa btn--sm" href="' + esc(directUrl(p)) + '" target="_blank" rel="noopener noreferrer">' + icon("whatsapp") + "<span>" + esc(SU.buyNow) + "</span></a>" : "";
    else action = '<button class="btn btn--sm" type="button" data-add="' + esc(p.id) + '" aria-label="' + esc(SU.addToCart + ": " + p.name) + '">' + icon("cart") + "<span>" + esc(SU.addToCart) + "</span></button>";
    return '<article class="card prod' + (p.available ? "" : " is-off") + '" data-cat="' + esc(p.category) + '"><div class="prod-media">' +
      (has(p.badge) ? '<span class="prod-badge">' + esc(p.badge) + "</span>" : "") + img(p.image, p.imageAlt || p.name, 900, 900) + '</div><div class="prod-body"><h2 class="prod-name">' + esc(p.name) + "</h2>" + rate +
      (has(p.description) ? '<p class="prod-desc">' + esc(p.description) + "</p>" : "") +
      '<div class="prod-foot"><p class="price">' + (p.oldPrice ? "<s>" + money(p.oldPrice) + "</s>" : "") + "<strong>" + money(p.price) + "</strong></p>" + action + "</div></div></article>";
  }
  function featuredProducts(f) {
    if (!f || f.enabled === false) return "";
    var all = productList(), feat = all.filter(function (p) { return p.featured; }).slice(0, f.max || 4);
    if (!feat.length) return "";
    return '<section class="section"><div class="wrap"><div class="sec-head sec-head--row" data-reveal><div><h2>' + esc(f.title || "Destaques") + "</h2>" +
      (has(f.subtitle) ? '<p class="note">' + esc(f.subtitle) + "</p>" : "") + "</div>" +
      '<a class="link-arrow" href="produtos.html"><span>' + esc(f.linkLabel || "Ver todos") + "</span>" + icon("arrow") + "</a></div>" +
      '<div class="prod-grid" data-reveal>' + feat.map(card).join("") + "</div></div></section>";
  }

  function testimonials(t) {
    if (!t || t.enabled === false) return "";
    var it = (t.items || []).filter(function (x) { return x && has(x.text) && has(x.name); });
    if (!it.length) return "";
    var anyDemo = it.some(function (x) { return x.demo; });
    return '<section class="section section--alt"><div class="wrap"><div class="sec-head" data-reveal><h2>' + esc(t.title || "Depoimentos") + "</h2>" +
      (anyDemo && has(t.demoNotice) ? '<p class="note">' + esc(t.demoNotice) + "</p>" : "") + '</div><div class="testi-grid">' + it.map(function (x, i) {
        var av = has(x.photo) ? '<span class="avatar">' + img(x.photo, "", 96, 96) + "</span>" : '<span class="avatar avatar--txt" aria-hidden="true">' + esc(initials(x.name)) + "</span>";
        return '<figure class="card testi" data-reveal style="--d:' + i * 80 + 'ms">' + (has(x.rating) ? stars(x.rating) : "") +
          "<blockquote><p>" + esc(x.text) + "</p></blockquote><figcaption>" + av + "<span><strong>" + esc(x.name) + "</strong>" +
          (x.demo ? '<em class="badge">' + esc(UI.demoBadge) + "</em>" : "") + "</span></figcaption></figure>";
      }).join("") + "</div></div></section>";
  }
  function home() {
    var H = C.home || {};
    return '<h1 class="sr-only">' + esc(B.name + (has(B.slogan) ? " — " + B.slogan : "")) + "</h1>" +
      carousel(H.carousel) + diffs(H.differentials) + featuredProducts(H.featuredProducts) + testimonials(H.testimonials) + cta(H.finalCta);
  }

  /* ---------- PRODUTOS ---------- */
  function productsPage() {
    var P = C.products || {}, h = P.hero || {}, list = productList();
    var out = '<section class="page-hero"><div class="wrap" data-reveal><h1>' + esc(h.title) + "</h1>" + (has(h.subtitle) ? "<p>" + esc(h.subtitle) + "</p>" : "") + "</div></section>";
    var cats = [];
    list.forEach(function (p) { if (p.category && cats.indexOf(p.category) < 0) cats.push(p.category); });
    out += '<section class="section section--tight"><div class="wrap">';
    if (cats.length > 1) {
      out += '<div class="filters" role="group" aria-label="' + esc(SU.filterLabel) + '"><button type="button" class="filter is-on" data-filter="" aria-pressed="true">' + esc(SU.filterAll) + "</button>" +
        cats.map(function (c) { return '<button type="button" class="filter" data-filter="' + esc(c) + '" aria-pressed="false">' + esc(c) + "</button>"; }).join("") + "</div>";
    }
    out += list.length ? '<div class="prod-grid" id="prod-grid">' + list.map(card).join("") + "</div>" : '<p class="empty">Em breve novos produtos por aqui.</p>';
    return out + "</div></section>" + cta(P.finalCta);
  }

  /* ---------- CONTATO ---------- */
  function contact() {
    var P = C.contact || {}, items = "", wa = waUrl();
    var out = '<section class="page-hero"><div class="wrap" data-reveal><h1>' + esc(P.title) + "</h1>" + (has(P.intro) ? "<p>" + esc(P.intro) + "</p>" : "") + "</div></section>";
    out += '<section class="section section--tight"><div class="wrap">';
    if (wa) out += '<a class="wa-card" href="' + esc(wa) + '" target="_blank" rel="noopener noreferrer" data-reveal><span class="wa-card-ic">' + icon("whatsapp") + '</span><span class="wa-card-tx"><strong>' +
      esc(P.whatsappCardTitle || "WhatsApp") + "</strong>" + (has(P.whatsappCardText) ? "<span>" + esc(P.whatsappCardText) + "</span>" : "") + "</span>" +
      '<span class="wa-card-go">' + esc(K.whatsapp.buttonLabel || "WhatsApp") + icon("arrow") + "</span></a>";
    function item(ic, label, value, href, blank) {
      return '<a class="card c-item" href="' + esc(href) + '"' + (blank ? ' target="_blank" rel="noopener noreferrer"' : "") + ' data-reveal><span class="chip">' + icon(ic) + "</span><span><small>" + esc(label) + "</small><strong>" + esc(value) + "</strong></span></a>";
    }
    if (has(K.phone)) items += item("phone", UI.call || "Telefone", K.phone, telUrl());
    if (has(K.email)) items += item("mail", UI.sendEmail || "E-mail", K.email, mailUrl());
    if (K.address && has(K.address.text)) items += item("pin", UI.openMap || "Endereço", K.address.text, mapsUrl(), true);
    var hrs = (K.hours || []).filter(function (x) { return x && has(x.days) && has(x.time); });
    if (hrs.length) items += '<div class="card c-item c-hours" data-reveal><span class="chip">' + icon("clock") + "</span><span><small>" + esc(UI.hours) + "</small>" +
      hrs.map(function (x) { return "<strong>" + esc(x.days) + ' <span class="muted">' + esc(x.time) + "</span></strong>"; }).join("") + "</span></div>";
    if (items) out += '<div class="c-grid">' + items + "</div>";
    var soc = socials();
    if (soc.length) out += '<ul class="soc-row" data-reveal>' + soc.map(function (s) {
      return '<li><a class="soc-pill" href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + icon(s.icon) + "<span>" + esc(s.label) + "</span></a></li>";
    }).join("") + "</ul>";
    if (K.address && K.address.showMap && has(K.address.text)) out += '<div class="map" data-reveal><iframe title="Mapa: ' + esc(K.address.text) + '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=' + encodeURIComponent(K.address.text) + '&amp;output=embed"></iframe></div>';
    return out + "</div></section>";
  }

  /* ---------- SOBRE ---------- */
  function about() {
    var A = C.about || {}, h = A.hero || {}, s = A.story, o = A.owner, out = "";
    out += '<section class="page-hero"><div class="wrap" data-reveal><h1>' + esc(h.title) + "</h1>" + (has(h.subtitle) ? "<p>" + esc(h.subtitle) + "</p>" : "") + "</div></section>";
    if (s && s.enabled !== false && (has(s.title) || (s.paragraphs || []).length)) {
      var im = has(s.image);
      out += '<section class="section section--tight"><div class="wrap split' + (im ? "" : " split--solo") + '" data-reveal>' + (im ? '<div class="media">' + img(s.image, s.imageAlt, 1200, 900) + "</div>" : "") +
        '<div class="copy">' + (has(s.title) ? "<h2>" + esc(s.title) + "</h2>" : "") + paras(s.paragraphs) + "</div></div></section>";
    }
    if (o && o.enabled !== false && has(o.name)) {
      var ph2 = has(o.photo);
      out += '<section class="section section--tight"><div class="wrap split is-flip' + (ph2 ? "" : " split--solo") + '" data-reveal>' + (ph2 ? '<div class="media media--portrait">' + img(o.photo, o.photoAlt, 900, 1100) + "</div>" : "") +
        '<div class="copy">' + (has(o.title) ? "<h2>" + esc(o.title) + "</h2>" : "") + '<p class="owner-name"><strong>' + esc(o.name) + "</strong>" + (has(o.role) ? '<span class="muted"> · ' + esc(o.role) + "</span>" : "") + "</p>" + (has(o.text) ? "<p>" + esc(o.text) + "</p>" : "") + "</div></div></section>";
    }
    var blocks = "";
    [A.mission, A.vision].forEach(function (b, i) {
      if (b && b.enabled !== false && has(b.title) && has(b.text)) blocks += '<article class="card block" data-reveal style="--d:' + i * 80 + 'ms"><h2 class="card-title">' + esc(b.title) + "</h2><p>" + esc(b.text) + "</p></article>";
    });
    var v = A.values;
    if (v && v.enabled !== false && (v.items || []).filter(has).length) blocks += '<article class="card block" data-reveal style="--d:160ms"><h2 class="card-title">' + esc(v.title || "Valores") + "</h2>" + ticks(v.items) + "</article>";
    if (blocks) out += '<section class="section section--tight"><div class="wrap block-grid">' + blocks + "</div></section>";
    var a = A.achievements, ai = a && a.enabled !== false ? (a.items || []).filter(function (x) { return x && has(x.value) && has(x.label); }) : [];
    if (ai.length) out += '<section class="section section--alt"><div class="wrap">' + (has(a.title) ? '<div class="sec-head" data-reveal><h2>' + esc(a.title) + "</h2></div>" : "") + '<ul class="stats">' + ai.map(function (x, i) {
      return '<li data-reveal style="--d:' + i * 80 + 'ms"><strong>' + esc(x.value) + "</strong><span>" + esc(x.label) + "</span></li>";
    }).join("") + "</ul></div></section>";
    return out + cta(A.finalCta);
  }

  Sie.render = function (page) {
    var body = { home: home, produtos: productsPage, contato: contact, sobre: about }[page] || home;
    document.getElementById("app-header").innerHTML = header();
    document.getElementById("main").innerHTML = body();
    document.getElementById("app-footer").innerHTML = footer();
    document.getElementById("app-float").innerHTML = floats();
  };
  Sie.util = { waUrl: waUrl, resolve: resolve, esc: esc, has: has, icon: icon, money: money, products: productList };
})();
