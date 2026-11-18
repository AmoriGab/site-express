/* theme.js — aplica as paletas de config/theme.js e controla claro/escuro.
   Carregado no <head> (antes da pintura) para evitar "piscar" de cor. */
(function () {
  "use strict";
  var T = window.SITE_THEME || {};
  var KEY = "sie-theme";
  var root = document.documentElement;

  function kebab(s) { return s.replace(/([A-Z])/g, function (m) { return "-" + m.toLowerCase(); }); }
  function block(sel, obj) {
    var out = sel + "{";
    for (var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) out += "--" + kebab(k) + ":" + obj[k] + ";"; }
    return out + "}";
  }

  var css = "";
  if (T.shape) css += block(":root", T.shape);
  if (T.fonts) css += ":root{--font-display:" + T.fonts.display + ";--font-body:" + T.fonts.body + ";}";
  if (T.light) css += block('html[data-theme="light"]', T.light);
  if (T.dark) css += block('html[data-theme="dark"]', T.dark);
  var st = document.createElement("style");
  st.id = "sie-theme-vars";
  st.textContent = css;
  document.head.appendChild(st);

  if (T.fonts && T.fonts.googleFontsUrl) {
    var l = document.createElement("link");
    l.rel = "stylesheet"; l.href = T.fonts.googleFontsUrl;
    document.head.appendChild(l);
  }

  function stored() { try { var v = localStorage.getItem(KEY); return v === "light" || v === "dark" ? v : null; } catch (e) { return null; } }
  function system() {
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  function initial() {
    return stored() || (T.followSystem !== false ? system() : (T.defaultTheme || "light"));
  }
  function apply(t) {
    root.setAttribute("data-theme", t);
    root.style.colorScheme = t;
    var m = document.querySelector('meta[name="theme-color"]');
    if (m && T[t] && T[t].bg) m.setAttribute("content", T[t].bg);
  }

  apply(initial());

  window.SieTheme = {
    get: function () { return root.getAttribute("data-theme"); },
    set: function (t) {
      root.classList.add("theme-anim");
      apply(t);
      try { localStorage.setItem(KEY, t); } catch (e) {}
      window.setTimeout(function () { root.classList.remove("theme-anim"); }, 450);
      document.dispatchEvent(new CustomEvent("sie:theme", { detail: t }));
    },
    toggle: function () { this.set(this.get() === "dark" ? "light" : "dark"); }
  };

  // Sem escolha manual, acompanha mudanças do sistema operacional.
  if (window.matchMedia) {
    var mq = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function () { if (!stored() && T.followSystem !== false) apply(system()); };
    if (mq.addEventListener) mq.addEventListener("change", onChange); else if (mq.addListener) mq.addListener(onChange);
  }
})();
