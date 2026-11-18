/* carousel.js — carrossel de banners (setas, indicadores, swipe, autoplay). */
(function () {
  "use strict";
  var Sie = (window.Sie = window.Sie || {});

  Sie.initCarousel = function () {
    var root = document.querySelector(".carousel");
    if (!root) return;
    var track = root.querySelector(".track"), slides = [].slice.call(root.querySelectorAll(".slide"));
    var dots = [].slice.call(root.querySelectorAll(".dot"));
    var n = slides.length, cur = 0, timer = null, paused = false;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var auto = root.getAttribute("data-autoplay") === "true" && n > 1 && !reduce;
    var every = parseInt(root.getAttribute("data-interval"), 10) || 6500;

    function go(i) {
      cur = (i + n) % n;
      track.style.transform = "translateX(" + -cur * 100 + "%)";
      slides.forEach(function (s, k) {
        var on = k === cur;
        s.setAttribute("aria-hidden", on ? "false" : "true");
        if (on) s.removeAttribute("inert"); else s.setAttribute("inert", "");
      });
      dots.forEach(function (d, k) { d.setAttribute("aria-current", k === cur ? "true" : "false"); });
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function start() { stop(); if (auto && !paused) timer = setInterval(function () { go(cur + 1); }, every); }

    root.addEventListener("click", function (e) {
      var a = e.target.closest(".arrow");
      if (a) { go(cur + parseInt(a.getAttribute("data-dir"), 10)); start(); }
    });
    dots.forEach(function (d, k) { d.addEventListener("click", function () { go(k); start(); }); });

    // pausa ao interagir
    function pause() { paused = true; stop(); }
    function resume() { paused = false; start(); }
    root.addEventListener("mouseenter", pause);
    root.addEventListener("mouseleave", resume);
    root.addEventListener("focusin", pause);
    root.addEventListener("focusout", resume);
    document.addEventListener("visibilitychange", function () { if (document.hidden) stop(); else start(); });

    // arrastar / deslizar
    var x0 = null, dx = 0;
    var vp = root.querySelector(".viewport");
    vp.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; dx = 0; pause(); }, { passive: true });
    vp.addEventListener("touchmove", function (e) { if (x0 !== null) dx = e.touches[0].clientX - x0; }, { passive: true });
    vp.addEventListener("touchend", function () {
      if (x0 !== null && Math.abs(dx) > 50) go(cur + (dx < 0 ? 1 : -1));
      x0 = null; resume();
    });
    root.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { go(cur - 1); start(); }
      if (e.key === "ArrowRight") { go(cur + 1); start(); }
    });

    go(0);
    start();
  };
})();
