/* ==========================================================
   config/brand.js — IDENTIDADE DA MARCA
   Edite apenas os valores entre aspas. Não altere os nomes
   das propriedades (à esquerda dos dois pontos).
   ========================================================== */
window.SITE_BRAND = {
  // Nome do negócio (aparece no logo em texto, rodapé, títulos e copyright)
  name: "Garben ID",

  // Frase curta que descreve o negócio (rodapé e mensagem de compartilhamento)
  slogan: "Criando marcas que criam experiências.",

  // Endereço do site SEM barra final. Usado em links de compartilhamento (Open Graph).
  // Exemplo: "https://www.minhaempresa.com.br"  — deixe "" se ainda não houver domínio.
  siteUrl: "",

  // Idioma e cor da barra do navegador no celular
  lang: "pt-BR",

  logo: {
    // Logo para o tema claro e para o tema escuro (pode ser o mesmo arquivo).
    // Formatos recomendados: SVG ou WebP/PNG com fundo transparente.
    light: "assets/images/logo/logo.svg",
    dark:  "assets/images/logo/logo-dark.svg",
    alt:   "Logo da Garben ID",
    // true = mostra o nome ao lado do logo; false = só o logo (use se o logo já contém o nome)
    showName: true
  },

  favicon: {
    icon:  "assets/icons/favicon.svg",          // SVG (ou .png/.ico)
    apple: "assets/icons/apple-touch-icon.png"  // PNG 180x180
  },

  // Imagem usada ao compartilhar o site em redes sociais (recomendado 1200x630)
  shareImage: "assets/images/banners/desktop/banner-01.webp",

  // Texto do copyright. {ano} e {nome} são substituídos automaticamente.
  copyright: "© {ano} {nome}. Todos os direitos reservados."
};
