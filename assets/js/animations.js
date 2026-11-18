/* animations.js — entrada suave dos blocos, botão "voltar ao topo", sombra do header.
   Respeita prefers-reduced-motion (sem animação nesse caso). */
(function () {
  "use strict";
  var Sie = (window.Sie = window.Sie || {});
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  Sie.initReveal = function () {
    var els = [].slice.call(document.querySelectorAll("[data-reveal]"));
    if (reduce || !("IntersectionObserver" in window)) return; // sem a classe js-anim tudo fica visível
    document.documentElement.classList.add("js-anim");
    var io = new IntersectionObserver(function (list) {
      list.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    els.forEach(function (el) { io.observe(el); });
  };

  Sie.initScroll = function () {
    var top = document.getElementById("to-top"), hdr = document.querySelector(".hdr");
    function onScroll() {
      var y = window.pageYOffset || document.documentElement.scrollTop;
      if (top) top.hidden = y < 600;
      if (hdr) hdr.classList.toggle("is-scrolled", y > 8);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    if (top) top.addEventListener("click", function () { window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" }); });
  };
})();
