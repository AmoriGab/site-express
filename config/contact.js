/* ==========================================================
   config/contact.js — CONTATOS E REDES SOCIAIS
   Campos vazios ("") NÃO aparecem no site. Preencha só o que existir.
   ========================================================== */
window.SITE_CONTACT = {

  whatsapp: {
    // Somente números, com código do país e DDD. Ex.: 5511999999999
    number: "5511966108422",
    // Mensagem que já vem escrita quando a pessoa abre a conversa
    message: "Olá! Vim pelo site e gostaria de mais informações.",
    // Texto do botão de WhatsApp em todo o site
    buttonLabel: "Falar no WhatsApp"
  },

  // Telefone fixo ou celular exibido na tela (o link do discador é gerado sozinho)
  phone: "(11) 3000-0000",

  email: "contato.garben@gmail.com",

  address: {
    // Endereço completo em uma linha. Deixe "" para ocultar.
    text: "Guarulhos/SP",
    // true = mostra o mapa incorporado (precisa de endereço e de internet do visitante)
    showMap: false
  },

  // Horários: uma linha por faixa. Deixe a lista vazia [] para ocultar.
  hours: [
    { days: "Segunda a sexta", time: "09h às 18h" },
    { days: "",          time: "" }
  ],

  // Redes sociais: cole o endereço completo do perfil. "" oculta.
  social: {
    instagram: "https://instagram.com/marcaexemplo",
    facebook:  "https://facebook.com/marcaexemplo",
    tiktok:    "",
    youtube:   "",
    linkedin:  ""
  },

  // Outras redes ou links (opcional). Exemplo: { label: "Telegram", url: "https://t.me/usuario" }
  otherLinks: [],

  // Link discreto no rodapé para o operador. enabled:false remove o link.
  beacons: {
    enabled: true,
    url: "https://beacons.ai/seuusuario",
    label: "Site por Garben ID Studio"
  }
};
