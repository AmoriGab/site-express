/* pix.js — gera o código Pix "copia e cola" (BR Code estático com valor) e o QR Code.
   Funciona 100% no navegador, sem servidor. O dinheiro vai direto para a chave Pix
   do lojista; o site NÃO recebe nem confirma pagamentos. */
(function () {
  "use strict";
  var Sie = (window.Sie = window.Sie || {});

  function field(id, value) {
    var v = String(value);
    return id + ("0" + v.length).slice(-2) + v;
  }
  function clean(s, max) {
    return String(s || "").normalize("NFD").replace(/[̀-ͯ]/g, "")
      .replace(/[^A-Za-z0-9 ]/g, " ").replace(/\s+/g, " ").trim().toUpperCase().slice(0, max);
  }
  // CRC-16/CCITT-FALSE (poly 0x1021, init 0xFFFF)
  function crc16(str) {
    var crc = 0xFFFF;
    for (var i = 0; i < str.length; i++) {
      crc ^= str.charCodeAt(i) << 8;
      for (var b = 0; b < 8; b++) crc = (crc & 0x8000) ? ((crc << 1) ^ 0x1021) & 0xFFFF : (crc << 1) & 0xFFFF;
    }
    return ("0000" + crc.toString(16).toUpperCase()).slice(-4);
  }

  /* cfg: { key, name, city, txid? }  amount: número (ex.: 189.7) */
  function payload(cfg, amount) {
    var key = String(cfg.key || "").trim();
    if (!key) return "";
    var value = Number(amount);
    var acct = field("00", "br.gov.bcb.pix") + field("01", key);
    var p = field("00", "01") + field("01", "11") + field("26", acct) + field("52", "0000") + field("53", "986") +
      (value > 0 ? field("54", value.toFixed(2)) : "") + field("58", "BR") +
      field("59", clean(cfg.name, 25) || "RECEBEDOR") + field("60", clean(cfg.city, 15) || "BRASIL") +
      field("62", field("05", (clean(cfg.txid, 25).replace(/ /g, "") || "***"))) + "6304";
    return p + crc16(p);
  }

  function qrSvg(text, cell) {
    if (typeof window.qrcode !== "function" || !text) return "";
    var q = window.qrcode(0, "M");
    q.addData(text); q.make();
    return q.createSvgTag({ cellSize: cell || 4, margin: 2, scalable: true });
  }

  Sie.pix = { payload: payload, crc16: crc16, qrSvg: qrSvg };
})();
