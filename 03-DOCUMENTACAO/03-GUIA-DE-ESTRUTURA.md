# Guia de Estrutura de Arquivos

```text
(raiz do ZIP / pasta pública)
├── index.html          Home
├── produtos.html       Catálogo de produtos
├── contato.html        Contato
├── sobre.html          Sobre
├── 404.html            Página de erro personalizada
├── robots.txt          Orientação a buscadores (ajuste o domínio)
├── sitemap.xml         Mapa do site (ajuste o domínio)
├── README.md           Resumo do projeto
├── config/             ✏️ SEUS ARQUIVOS DE PERSONALIZAÇÃO
│   ├── brand.js        Nome, slogan, logo, favicon, URL do site
│   ├── theme.js        Paletas clara/escura, fontes, arredondamentos
│   ├── content.js      Textos, depoimentos, seções
│   ├── products.js     Produtos (até 30), carrinho, pagamentos, mensagem do pedido
│   └── contact.js      WhatsApp, telefone, e-mail, endereço, redes, Beacons
├── assets/
│   ├── css/styles.css  Estilos (não editar por cliente)
│   ├── js/             Código do site (não editar por cliente)
│   │   ├── theme.js        aplica as paletas e alterna claro/escuro
│   │   ├── components.js   monta cabeçalho, rodapé e páginas a partir de /config
│   │   ├── navigation.js   menu mobile e botão de tema
│   │   ├── carousel.js     carrossel de banners
│   │   ├── animations.js   animações, voltar ao topo
│   │   ├── cart.js         filtro de categorias, carrinho e pedido no WhatsApp
│   │   ├── pix.js          gera o código Pix (copia e cola) e o QR Code
│   │   ├── vendor/qrcode.js  biblioteca de QR Code (MIT), local, sem internet
│   │   └── main.js         SEO dinâmico e inicialização
│   ├── icons/          favicon.svg, apple-touch-icon.png
│   └── images/
│       ├── logo/               logo.svg, logo-dark.svg
│       ├── banners/desktop/    banner-01.webp … 03 (1920×800)
│       ├── banners/mobile/     banner-01.webp … 03 (900×1100)
│       ├── products/           produto-01.webp … (900×900)
│       ├── about/              historia.webp, proprietario.webp, destaque-home.webp
│       └── testimonials/       cliente-01.webp … (300×300)
└── 03-DOCUMENTACAO/    Manuais 01 a 07 (pode ser removida do pacote do cliente)
        ├── 06-HOSPEDAGEM-EM-NUVEM.md   Guia opcional: AWS, Google Cloud/Firebase, Azure
        └── 07-GUIA-DE-ARTES-E-IMAGENS.md   Medidas de todas as imagens (para designers)
```

## Onde colocar cada coisa
| Quero trocar… | Coloco o arquivo em… | E informo em… |
|---|---|---|
| Logo | `assets/images/logo/` | `config/brand.js` → `logo` |
| Favicon | `assets/icons/favicon.svg` | `config/brand.js` → `favicon` |
| Banner desktop | `assets/images/banners/desktop/` | `content.js` → `home.carousel.banners[].desktop` |
| Banner mobile | `assets/images/banners/mobile/` | `content.js` → `home.carousel.banners[].mobile` |
| Foto de produto | `assets/images/products/` | `products.js` → `products[].image` |
| Fotos da página Sobre | `assets/images/about/` | `content.js` → `about.story.image` / `about.owner.photo` |
| Foto de depoimento | `assets/images/testimonials/` | `content.js` → `home.testimonials.items[].photo` |

Os caminhos nos arquivos são **relativos à raiz** do site, ex.: `assets/images/banners/desktop/banner-01.webp`. Mantenha exatamente o mesmo nome do arquivo.

## Como o site funciona (resumo técnico)
Cada página `.html` é uma casca; ao abrir, `main.js` lê `config/*.js` (carregados por `<script>`, sem `fetch`) e `components.js` monta o conteúdo. Por isso o site também abre direto do computador (duplo clique em `index.html`). Sem build, sem dependências.
