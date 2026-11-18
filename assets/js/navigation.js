/* navigation.js — menu lateral mobile e botão de tema. */
(function () {
  "use strict";
  var Sie = (window.Sie = window.Sie || {});
  var UI = (window.SITE_CONTENT && window.SITE_CONTENT.ui) || {};

  Sie.initNav = function () {
    var root = document.documentElement;
    var open = document.getElementById("menu-toggle"), close = document.getElementById("menu-close");
    var drawer = document.getElementById("drawer"), overlay = document.getElementById("overlay");
    var tt = document.getElementById("theme-toggle");
    if (!drawer) return;

    function syncTheme() {
      if (!tt) return;
      var dark = window.SieTheme.get() === "dark";
      tt.setAttribute("aria-label", dark ? UI.themeToLight : UI.themeToDark);
      tt.setAttribute("aria-pressed", dark ? "true" : "false");
    }
    if (tt) { tt.addEventListener("click", function () { window.SieTheme.toggle(); }); syncTheme(); document.addEventListener("sie:theme", syncTheme); }

    function setOpen(v) {
      root.classList.toggle("nav-open", v);
      open.setAttribute("aria-expanded", v ? "true" : "false");
      if (v) { drawer.removeAttribute("inert"); close.focus(); }
      else { drawer.setAttribute("inert", ""); }
    }
    open.addEventListener("click", function () { setOpen(true); });
    close.addEventListener("click", function () { setOpen(false); open.focus(); });
    overlay.addEventListener("click", function () { setOpen(false); });
    drawer.addEventListener("click", function (e) { if (e.target.closest("a")) setOpen(false); });
    document.addEventListener("keydown", function (e) {
      if (!root.classList.contains("nav-open")) return;
      if (e.key === "Escape") { setOpen(false); open.focus(); return; }
      if (e.key === "Tab") {
        var f = drawer.querySelectorAll("a[href],button");
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.addEventListener("resize", function () { if (window.innerWidth > 860 && root.classList.contains("nav-open")) setOpen(false); });
  };
})();
