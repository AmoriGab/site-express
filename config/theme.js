/* ==========================================================
   config/theme.js — CORES, TIPOGRAFIA E TOKENS VISUAIS
   O visitante só escolhe entre os dois temas abaixo (claro/escuro).
   Todas as cores aceitam qualquer valor CSS (#hex, rgb(), hsl()).
   ========================================================== */
window.SITE_THEME = {

  // Tema usado quando o visitante nunca escolheu e o sistema não informa preferência.
  // "light" ou "dark"
  defaultTheme: "light",

  // Se true, a primeira visita segue a preferência do sistema operacional.
  followSystem: true,

  fonts: {
    // Pilhas de fontes do sistema (não dependem de internet).
    display: '"Segoe UI Variable Display","SF Pro Display","Avenir Next","Helvetica Neue",Arial,sans-serif',
    body:    '"Segoe UI Variable Text","SF Pro Text","Segoe UI",system-ui,-apple-system,Roboto,Arial,sans-serif',
    // OPCIONAL: URL de fonte do Google Fonts (CSS). Deixe "" para não carregar nada externo.
    // Exemplo: "https://fonts.googleapis.com/css2?family=Sora:wght@500;700&display=swap"
    // Depois, ajuste "display"/"body" acima com o nome da fonte, ex.: '"Sora",sans-serif'
    googleFontsUrl: ""
  },

  // Formato e proporções
  shape: {
    radiusLg: "28px",   // banners, imagens grandes
    radiusMd: "20px",   // cards
    radiusSm: "12px",   // botões pequenos, chips
    radiusPill: "999px" // botões e header
  },

  // PALETA DO TEMA CLARO
  light: {
    bg:          "#F8F3D9",   // fundo da página
    bgAlt:       "#ffffff",   // fundo de seções alternadas
    surface:     "#FFFFFF",   // cards e painéis
    surfaceAlt:  "#F7F8FB",   // superfícies secundárias
    text:        "#14171F",   // texto principal
    textMuted:   "#566070",   // texto secundário
    line:        "rgba(20,23,31,.10)", // bordas e divisores
    accent:      "#FF5E00",   // cor de destaque (botões, links, ícones)
    accentText:  "#FFFFFF",   // texto sobre a cor de destaque
    accentSoft:  "rgba(62,79,216,.10)", // fundo suave da cor de destaque
    headerBg:    "rgba(255,255,255,.72)", // vidro do cabeçalho
    shadow:      "0 1px 2px rgba(20,23,31,.04), 0 12px 32px -12px rgba(20,23,31,.14)",
    shadowLg:    "0 2px 4px rgba(20,23,31,.05), 0 28px 60px -24px rgba(20,23,31,.28)",
    heroScrim:   "linear-gradient(90deg, rgba(10,12,24,.74) 0%, rgba(10,12,24,.38) 55%, rgba(10,12,24,0) 100%)",
    heroScrimMobile: "linear-gradient(0deg, rgba(10,12,24,.82) 0%, rgba(10,12,24,.42) 55%, rgba(10,12,24,0) 100%)",
    heroText:    "#FFFFFF",
    star:        "#E0A100",
    whatsapp:    "#1FA855",
    whatsappText:"#FFFFFF"
  },

  // PALETA DO TEMA ESCURO (não é inversão automática: ajuste com cuidado)
  dark: {
    bg:          "#0F1117",
    bgAlt:       "#141722",
    surface:     "#1A1E2B",
    surfaceAlt:  "#202534",
    text:        "#ECEEF4",
    textMuted:   "#A3AABA",
    line:        "rgba(236,238,244,.12)",
    accent:      "#8E9BFF",
    accentText:  "#0F1117",
    accentSoft:  "rgba(142,155,255,.14)",
    headerBg:    "rgba(26,30,43,.70)",
    shadow:      "0 1px 2px rgba(0,0,0,.30), 0 14px 34px -14px rgba(0,0,0,.60)",
    shadowLg:    "0 2px 4px rgba(0,0,0,.30), 0 30px 64px -26px rgba(0,0,0,.75)",
    heroScrim:   "linear-gradient(90deg, rgba(6,8,16,.80) 0%, rgba(6,8,16,.46) 55%, rgba(6,8,16,.08) 100%)",
    heroScrimMobile: "linear-gradient(0deg, rgba(6,8,16,.86) 0%, rgba(6,8,16,.50) 55%, rgba(6,8,16,.05) 100%)",
    heroText:    "#FFFFFF",
    star:        "#F2B93B",
    whatsapp:    "#25C26A",
    whatsappText:"#06220F"
  }
};
