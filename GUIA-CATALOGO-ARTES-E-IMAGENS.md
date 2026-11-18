# Guia de artes e imagens — Catálogo Express

Medidas conferidas no próprio código e no navegador (desktop 1366 px e celular 390 px). "Tamanho exibido" é o espaço que a imagem ocupa na tela; "Arquivo ideal" é o tamanho que o designer deve entregar (cobre telas de alta densidade).

**Regras gerais (valem para tudo)**
- Formato: **WebP** para fotos e artes (qualidade 75–80). **SVG** para logo e favicon. **PNG** só para o ícone de celular e, se necessário, logo com transparência.
- Cores em **sRGB**. Nome do arquivo em minúsculas, sem acento nem espaço (`banner-01.webp`). O nome tem que ser igual ao escrito em `config/`.
- Peso: banner desktop ≤ 250 KB; banner mobile ≤ 180 KB; demais imagens ≤ 150 KB.
- O site **corta** a imagem para preencher o espaço (`object-fit: cover`). Entregue **exatamente na proporção indicada**; assim nada é cortado de forma inesperada.
- Toda imagem precisa de um texto alternativo (`alt`), curto e descritivo. Peça ao designer ou escreva você mesmo.

---
## 1. Banners do carrossel 
Até **3 banners**. Cada um tem **2 arquivos**: desktop e mobile (6 no total).

| Arquivo | Proporção | Arquivo ideal | Tamanho exibido | Pasta |
|---|---|---|---|---|
| Banner desktop | **12:5** (2,4:1) | **1920 × 800 px** | 1180 × 492 px | `assets/images/banners/desktop/` |
| Banner mobile | **9:11** (0,82:1) | **900 × 1100 px** | 358 × 438 px | `assets/images/banners/mobile/` |

- A versão mobile é usada em telas de **até 720 px**. Acima disso (tablets, computadores), vale a versão desktop.
- **Cantos arredondados:** o banner tem cantos de ~28 px (na tela). Não coloque nada importante a menos de **50 px** dos cantos.
- **Controles do carrossel** (setas e bolinhas) ficam por cima da parte de baixo. Mantenha livre a **faixa inferior**: **~100 px** no desktop (1920×800) e **~150 px** no mobile (900×1100).
- **Dois jeitos de usar o banner:**
  1. **Arte com o texto já dentro da imagem** (o seu serviço de design): deixe `title`, `subtitle` e `ctaLabel` vazios no `config`. O site não coloca nada por cima nem escurece a imagem. Se houver `link`, a imagem inteira vira clicável.
  2. **Imagem sem texto + texto do site por cima:** o site escurece a imagem com um degradê (esquerda no desktop, parte de baixo no mobile) e escreve título, subtítulo e botão. Deixe **o lado esquerdo (desktop)** e **a parte de baixo (mobile)** com pouca informação visual, porque o texto fica lá. O texto ocupa até ~560 px de largura.
- Se só houver 1 ou 2 banners, o carrossel se ajusta sozinho.

---
## 2. Imagens do site

| Local no site | Arquivo | Proporção | Arquivo ideal | Tamanho exibido (desktop / mobile) | Pasta | Quantidade |
|---|---|---|---|---|---|---|
| **Foto do produto** (card, destaques da Home e miniatura do carrinho) | `produto-01.webp`… | **1:1** (quadrada) | **900 × 900** (mínimo 600 × 600) | 278 × 278 / 171 × 171 (miniatura no carrinho: 64 × 64) | `assets/images/products/` | **até 30** (1 por produto) |
| Sobre — história | `historia.webp` | **4:3** | 1200 × 900 | 569 × 427 / 358 × 269 | `assets/images/about/` | 1 (opcional) |
| Sobre — proprietário/equipe | `proprietario.webp` | **4:5** | 880 × 1100 | 440 × 550 / 358 × 448 | `assets/images/about/` | 1 (opcional) |
| Depoimentos — foto do cliente | `cliente-01.webp`… | **1:1** (círculo) | 200 × 200 | 46 × 46 | `assets/images/testimonials/` | 1 por depoimento (opcional) |

- A mesma foto do produto aparece em **três lugares** (card, destaque na Home, carrinho). Centralize o produto e deixe margem: nas miniaturas e em telas pequenas ele aparece bem pequeno.
- Fotos que não sejam quadradas são **cortadas** no centro. Peça fotos quadradas ao fornecedor/cliente.
- Fundo uniforme e claro nas fotos dos produtos dá aparência mais profissional ao catálogo.

Mínimo para funcionar: **banners (6 arquivos) + 1 foto por produto + logo**.

---
## 3. Itens de marca 

| Item | Arquivo | Formato e tamanho | Onde fica | Observação |
|---|---|---|---|---|
| **Logo (tema claro)** | `logo.svg` | SVG (ideal), ou PNG/WebP transparente: quadrado **512 × 512** ou horizontal **≥ 600 × 160** | `assets/images/logo/` | Aparece no cabeçalho e no rodapé com **altura de 40 px** (largura automática, máx. 200 px) |
| **Logo (tema escuro)** | `logo-dark.svg` | idem | `assets/images/logo/` | Versão para fundo escuro. Se o logo funciona nos dois fundos, repita o mesmo arquivo |
| **Favicon** | `favicon.svg` | SVG, ou PNG **512 × 512** | `assets/icons/` | Ícone da aba do navegador |
| **Ícone de celular** | `apple-touch-icon.png` | PNG **180 × 180**, **sem transparência** | `assets/icons/` | Aparece quando o site é salvo na tela inicial do iPhone |
| **Imagem de compartilhamento** | qualquer nome | JPG ou WebP **1200 × 630** (1,91:1) | `assets/images/` (ou indique o caminho em `brand.js` → `shareImage`) | Prévia que aparece ao enviar o link no WhatsApp/Facebook. Mantenha o conteúdo no centro |

**Logo — como funciona:** o logo é exibido com **altura fixa de 40 px** (36 px no celular) e **largura automática, até 200 px** (150 px no celular). Aceita logo **quadrado** (símbolo) ou **horizontal** (símbolo + nome). Para logo horizontal, entregue em **SVG** ou PNG/WebP transparente com **pelo menos 600 px de largura e 160 px de altura** (proporção até 5:1). Se o logo **já contém o nome** do negócio, use `showName: false` em `config/brand.js`; caso contrário o nome em texto aparece ao lado e, no celular, pode ser cortado.

⚠️ **Imagem de compartilhamento:** por padrão o modelo usa o banner de desktop (1920 × 800), que as redes cortam. Para um resultado profissional, crie um arquivo próprio 1200 × 630.

---
## 4. Resumo: quantos arquivos pedir por cliente

| Item | Quantidade |
|---|---|
| Banners | 6 |
| Logo (claro + escuro) | 2 |
| Favicon + ícone de celular | 2 |
| Imagem de compartilhamento | 1 |
| Fotos de produtos | até 30 |
| Sobre (história + proprietário) | 2 (opcional) |
| Fotos de depoimentos | opcional |

