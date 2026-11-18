/* cart.js — filtro por categoria, carrinho e envio do pedido para o WhatsApp.
   O carrinho fica salvo no navegador do visitante (localStorage). Nada é enviado
   para servidor algum: o pedido só sai quando o visitante toca em "Enviar pedido". */
(function () {
  "use strict";
  var Sie = (window.Sie = window.Sie || {});
  var S = window.SITE_STORE || {}, SU = S.ui || {}, M = S.message || {};
  var B = window.SITE_BRAND || {};
  var KEY = "sie-cart";
  var root = document.documentElement;

  function el(sel, ctx) { return (ctx || document).querySelector(sel); }
  function esc(s) { return Sie.util.esc(s); }
  function money(n) { return Sie.util.money(n); }

  /* ---------- filtro por categoria ---------- */
  function initFilters() {
    var bar = el(".filters"), grid = el("#prod-grid");
    if (!bar || !grid) return;
    bar.addEventListener("click", function (e) {
      var b = e.target.closest(".filter");
      if (!b) return;
      var f = b.getAttribute("data-filter");
      [].forEach.call(bar.querySelectorAll(".filter"), function (x) {
        var on = x === b; x.classList.toggle("is-on", on); x.setAttribute("aria-pressed", on ? "true" : "false");
      });
      [].forEach.call(grid.querySelectorAll(".prod"), function (c) { c.hidden = !!f && c.getAttribute("data-cat") !== f; });
    });
  }

  /* ---------- estado do carrinho ---------- */
  var items = [];            // [{id, qty}]
  var form = { payment: "", delivery: "", name: "", note: "" };

  function load() {
    try { var v = JSON.parse(localStorage.getItem(KEY) || "[]"); items = Array.isArray(v) ? v : []; } catch (e) { items = []; }
    var byId = lookup();
    items = items.filter(function (i) { return i && byId[i.id] && byId[i.id].available && i.qty > 0; })
      .map(function (i) { return { id: i.id, qty: Math.min(99, Math.floor(i.qty)) }; });
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(items)); } catch (e) {} }
  function lookup() { var m = {}; Sie.util.products().forEach(function (p) { m[p.id] = p; }); return m; }
  function count() { return items.reduce(function (a, i) { return a + i.qty; }, 0); }
  function totalCents() {
    var by = lookup();
    return items.reduce(function (a, i) { return a + Math.round(by[i.id].price * 100) * i.qty; }, 0);
  }

  /* ---------- interface ---------- */
  var pixCode = "";
  function pixActive() {
    var P = S.pix || {};
    return !!(P.enabled && String(P.key || "").trim() && Sie.pix && form.payment === (P.paymentName || "Pix") && items.length);
  }
  // Detalhe técnico para o operador (aparece só no console do navegador, F12). O visitante vê apenas a mensagem pixDisabled.
  function pixDiag() {
    var P = S.pix || {};
    if (!P.enabled || !/pix/i.test(form.payment || "")) return "";
    if (!String(P.key || "").trim()) return "Pix está ativado, mas a chave está vazia. Preencha pix.key em config/products.js.";
    if (form.payment !== (P.paymentName || "Pix")) return "pix.paymentName (\"" + (P.paymentName || "Pix") + "\") precisa ser igual ao texto \"" + form.payment + "\" da lista payments.";
    return "";
  }
  function renderPix() {
    var box = el("#pix-box"); if (!box) return;
    if (!pixActive()) {
      var d = pixDiag(); pixCode = "";
      if (d) { try { console.warn("[Pix] " + d); } catch (e) {} }
      if (d) { box.hidden = false; box.className = "pix pix--warn"; box.innerHTML = "<p>" + esc(SU.pixDisabled) + "</p>"; }
      else { box.hidden = true; box.innerHTML = ""; }
      return;
    }
    box.className = "pix";
    var P = S.pix, total = totalCents() / 100;
    pixCode = Sie.pix.payload(P, total);
    box.hidden = false;
    box.innerHTML = "<h3>" + esc(SU.pixTitle) + "</h3>" +
      (P.showQr !== false ? '<div class="pix-qr" role="img" aria-label="QR Code Pix de ' + esc(money(total)) + '">' + Sie.pix.qrSvg(pixCode, 4) + "</div>" : "") +
      '<p class="pix-amount">' + esc(money(total)) + '</p><p class="pix-to">' + esc(SU.pixReceiver) + " <strong>" + esc(P.name) + "</strong></p>" +
      '<button type="button" class="btn btn--sm" id="pix-copy">' + esc(SU.pixCopy) + '</button><p class="pix-help">' + esc(SU.pixHelp) + "</p>";
  }
  function copyPix() {
    if (!pixCode) return;
    function done() { var b = el("#pix-copy"); if (b) { b.textContent = SU.pixCopied; setTimeout(function () { var x = el("#pix-copy"); if (x) x.textContent = SU.pixCopy; }, 2200); } }
    function fallback() {
      var t = document.createElement("textarea"); t.value = pixCode; t.setAttribute("readonly", ""); t.style.cssText = "position:fixed;opacity:0";
      document.body.appendChild(t); t.select(); try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(t); done();
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(pixCode).then(done, fallback); else fallback();
  }
  var drawer, listBox, totalBox, errBox, lastFocus = null, toastTimer = null;

  function build() {
    var host = document.getElementById("app-float") || document.body;
    var pay = (S.payments || []).filter(Boolean), del = (S.delivery || []).filter(Boolean);
    function radios(name, arr, legend) {
      return '<fieldset class="opt"><legend>' + esc(legend) + "</legend>" + arr.map(function (v, i) {
        return '<label class="radio"><input type="radio" name="' + name + '" value="' + esc(v) + '"' + (name === "delivery" && i === 0 ? " checked" : "") + "><span>" + esc(v) + "</span></label>";
      }).join("") + "</fieldset>";
    }
    var html = '<aside class="drawer cart" id="cart-drawer" role="dialog" aria-modal="true" aria-label="' + esc(SU.cartTitle) + '" inert>' +
      '<div class="drawer-top"><h2 class="cart-title">' + esc(SU.cartTitle) + '</h2><button class="icon-btn" type="button" id="cart-close" aria-label="' + esc(SU.closeCart) + '">' + Sie.util.icon("close") + "</button></div>" +
      '<div class="cart-scroll"><div id="cart-items"></div><form id="cart-form" novalidate>' +
      (del.length ? radios("delivery", del, SU.deliveryLegend) : "") +
      (pay.length ? radios("payment", pay, SU.paymentLegend) : "") + '<div class="pix" id="pix-box" hidden></div>' +
      (S.askName ? '<label class="field"><span>' + esc(SU.nameLabel) + '</span><input type="text" name="name" maxlength="60" autocomplete="name"></label>' : "") +
      (S.askNote ? '<label class="field"><span>' + esc(SU.noteLabel) + '</span><textarea name="note" rows="2" maxlength="300"></textarea></label>' : "") +
      '</form></div><div class="cart-foot"><div id="cart-total"></div><p class="cart-error" id="cart-error" role="alert" hidden></p>' +
      '<button class="btn btn--wa cart-send" type="button" id="cart-send">' + Sie.util.icon("whatsapp") + "<span>" + esc(SU.checkout) + "</span></button>" +
      '<button class="link-btn" type="button" id="cart-clear">' + esc(SU.clear) + "</button></div></aside>" +
      '<div class="toast" id="toast" role="status" aria-live="polite"></div>';
    host.insertAdjacentHTML("beforeend", html);
    drawer = el("#cart-drawer"); listBox = el("#cart-items"); totalBox = el("#cart-total"); errBox = el("#cart-error");
  }

  function render() {
    var by = lookup(), n = count(), badge = el("#cart-count");
    if (badge) { badge.textContent = n > 99 ? "99+" : n; badge.hidden = n === 0; }
    var hasItems = items.length > 0;
    if (!hasItems) {
      listBox.innerHTML = '<div class="cart-empty">' + Sie.util.icon("cart") + "<strong>" + esc(SU.cartEmpty) + "</strong><p>" + esc(SU.cartEmptyHint) + '</p><a class="btn btn--sm" href="produtos.html">' + esc(SU.goCatalog) + "</a></div>";
    } else {
      listBox.innerHTML = '<ul class="cart-list">' + items.map(function (i) {
        var p = by[i.id];
        return '<li class="cart-row" data-id="' + esc(i.id) + '"><div class="cart-thumb">' + (p.image ? '<img src="' + esc(p.image) + '" alt="" width="64" height="64" loading="lazy" data-ph>' : "") + "</div>" +
          '<div class="cart-info"><strong>' + esc(p.name) + "</strong><span>" + money(p.price) + '</span><div class="qty">' +
          '<button type="button" data-act="minus" aria-label="' + esc(SU.qtyMinus + ": " + p.name) + '"' + (i.qty <= 1 ? " disabled" : "") + ">" + Sie.util.icon("minus") + "</button>" +
          '<output aria-live="polite">' + i.qty + "</output>" +
          '<button type="button" data-act="plus" aria-label="' + esc(SU.qtyPlus + ": " + p.name) + '"' + (i.qty >= 99 ? " disabled" : "") + ">" + Sie.util.icon("plus") + "</button></div></div>" +
          '<div class="cart-side"><strong>' + money(p.price * i.qty) + '</strong><button type="button" class="icon-btn icon-btn--sm" data-act="remove" aria-label="' + esc(SU.remove + ": " + p.name) + '">' + Sie.util.icon("trash") + "</button></div></li>";
      }).join("") + "</ul>";
    }
    el("#cart-form").hidden = !hasItems;
    renderPix();
    el(".cart-foot").hidden = !hasItems;
    totalBox.innerHTML = '<div class="cart-total"><span>' + esc(SU.total) + "</span><strong>" + money(totalCents() / 100) + "</strong></div>" +
      (S.cartNote ? '<p class="cart-note">' + esc(S.cartNote) + "</p>" : "");
  }

  function setQty(id, d) {
    var it = items.filter(function (i) { return i.id === id; })[0];
    if (!it) return;
    it.qty = Math.max(1, Math.min(99, it.qty + d));
    save(); render();
  }
  function removeItem(id) { items = items.filter(function (i) { return i.id !== id; }); save(); render(); }
  function add(id) {
    var p = lookup()[id];
    if (!p || !p.available) return;
    var it = items.filter(function (i) { return i.id === id; })[0];
    if (it) it.qty = Math.min(99, it.qty + 1); else items.push({ id: id, qty: 1 });
    save(); render(); toast(SU.added + ": " + p.name);
    var b = el("#cart-toggle"); if (b) { b.classList.remove("bump"); void b.offsetWidth; b.classList.add("bump"); }
  }
  function toast(t) {
    var n = el("#toast"); if (!n) return;
    n.textContent = t; n.classList.add("is-on");
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { n.classList.remove("is-on"); }, 2200);
  }

  /* ---------- abrir / fechar ---------- */
  function open() {
    if (root.classList.contains("nav-open")) root.classList.remove("nav-open");
    lastFocus = document.activeElement;
    root.classList.add("cart-open"); drawer.removeAttribute("inert");
    el("#cart-close").focus();
  }
  function close() {
    root.classList.remove("cart-open"); drawer.setAttribute("inert", "");
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  /* ---------- mensagem do pedido ---------- */
  function buildMessage() {
    var by = lookup(), L = [];
    L.push(String(M.title || "Olá! Quero fazer um pedido:").replace("{loja}", B.name || ""));
    L.push("");
    L.push("*" + (M.itemsLabel || "Itens") + "*");
    items.forEach(function (i) { var p = by[i.id]; L.push("• " + i.qty + "x " + p.name + " — " + money(p.price * i.qty)); });
    L.push("");
    L.push("*" + (M.totalLabel || "Total") + ":* " + money(totalCents() / 100));
    if (form.payment) L.push("*" + (M.paymentLabel || "Pagamento") + ":* " + (pixActive() ? (M.pixLine || form.payment) : form.payment));
    if (form.delivery) L.push("*" + (M.deliveryLabel || "Entrega") + ":* " + form.delivery);
    if (form.name.trim()) L.push("*" + (M.nameLabel || "Nome") + ":* " + form.name.trim());
    if (form.note.trim()) L.push("*" + (M.noteLabel || "Observações") + ":* " + form.note.trim());
    if (S.cartNote) { L.push(""); L.push(S.cartNote); }
    return L.join("\n");
  }
  /* Abre o WhatsApp numa NOVA aba/janela, sem mexer na página do site.
     (window.open com "noopener" devolve null e fazia a própria página navegar; por isso usamos um link com target=_blank.) */
  function openWhats(url) {
    var a = document.createElement("a");
    a.href = url; a.target = "_blank"; a.rel = "noopener noreferrer";
    a.style.display = "none";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }
  function send() {
    errBox.hidden = true;
    var needPay = (S.payments || []).filter(Boolean).length > 0;
    if (!items.length) return;
    if (needPay && !form.payment) {
      errBox.textContent = SU.paymentRequired; errBox.hidden = false;
      var r = el('#cart-form input[name="payment"]'); if (r) r.focus();
      return;
    }
    var url = Sie.util.waUrl(buildMessage());
    if (!url) return;
    openWhats(url);
  }
  Sie._buildMessage = function () { return buildMessage(); }; // usado nos testes

  /* ---------- inicialização ---------- */
  Sie.initStore = function () {
    initFilters();
    if (S.mode === "direct") return;
    load(); build(); render();

    document.addEventListener("click", function (e) {
      var a = e.target.closest("[data-add]");
      if (a) { add(a.getAttribute("data-add")); return; }
      if (e.target.closest("#cart-toggle")) { open(); return; }
      if (e.target.closest("#cart-close") || e.target.id === "overlay") { if (root.classList.contains("cart-open")) close(); return; }
      var act = e.target.closest("#cart-drawer [data-act]");
      if (act) {
        var id = act.closest(".cart-row").getAttribute("data-id"), k = act.getAttribute("data-act");
        if (k === "remove") removeItem(id); else setQty(id, k === "plus" ? 1 : -1);
        return;
      }
      if (e.target.closest("#pix-copy")) { copyPix(); return; }
      if (e.target.closest("#cart-send")) { send(); return; }
      if (e.target.closest("#cart-clear")) { items = []; save(); render(); return; }
      if (e.target.closest("#cart-drawer a")) close();
    });
    el("#cart-form").addEventListener("input", function (e) {
      var t = e.target; if (!t.name) return;
      form[t.name] = t.value; if (t.name === "payment") { errBox.hidden = true; renderPix(); }
    });
    el("#cart-form").addEventListener("submit", function (e) { e.preventDefault(); });
    var d0 = el('#cart-form input[name="delivery"]:checked'); if (d0) form.delivery = d0.value;

    document.addEventListener("keydown", function (e) {
      if (!root.classList.contains("cart-open")) return;
      if (e.key === "Escape") { close(); return; }
      if (e.key === "Tab") {
        var f = [].filter.call(drawer.querySelectorAll("a[href],button,input,textarea"), function (x) { return !x.disabled && x.offsetParent !== null; });
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.addEventListener("storage", function (e) { if (e.key === KEY) { load(); render(); } });
  };
})();
