/* main.js — ponto de partida: SEO dinâmico, renderização e inicialização. */
(function () {
  "use strict";
  if (!window.SITE_BRAND || !window.SITE_CONTENT || !window.SITE_CONTACT || !window.SITE_THEME || !window.Sie || !window.Sie.render) return;
  var B = window.SITE_BRAND || {}, C = window.SITE_CONTENT || {};
  var page = document.body.getAttribute("data-page") || "home";

  function meta(sel, attr, val) {
    var el = document.querySelector(sel);
    if (el && val) el.setAttribute(attr, val);
  }
  function abs(path) {
    var base = (B.siteUrl || "").replace(/\/+$/, "");
    return base ? base + "/" + String(path || "").replace(/^\/+/, "") : path;
  }

  document.documentElement.lang = B.lang || "pt-BR";

  var seo = (C.seo && C.seo[page]) || {};
  if (seo.title) document.title = seo.title;
  meta('meta[name="description"]', "content", seo.description);
  meta('meta[property="og:title"]', "content", seo.title);
  meta('meta[property="og:description"]', "content", seo.description);
  meta('meta[property="og:site_name"]', "content", B.name);
  meta('meta[property="og:image"]', "content", abs(B.shareImage));
  var file = { home: "index.html", produtos: "produtos.html", contato: "contato.html", sobre: "sobre.html" }[page];
  if (B.siteUrl) {
    meta('meta[property="og:url"]', "content", abs(page === "home" ? "" : file));
    var can = document.querySelector('link[rel="canonical"]');
    if (!can) { can = document.createElement("link"); can.rel = "canonical"; document.head.appendChild(can); }
    can.href = abs(page === "home" ? "" : file);
  }
  if (B.favicon) {
    meta('link[rel="icon"]', "href", B.favicon.icon);
    meta('link[rel="apple-touch-icon"]', "href", B.favicon.apple);
  }

  window.Sie.render(page);
  window.Sie.initNav();
  window.Sie.initCarousel();
  if (window.Sie.initStore) window.Sie.initStore();
  window.Sie.initScroll();
  window.Sie.initReveal();
  document.documentElement.classList.add("is-ready");
})();
