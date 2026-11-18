# Manual de Personalização (para o operador)

Tudo é feito em 5 arquivos da pasta `config/` e na troca de imagens. **Não é preciso mexer em HTML, CSS ou nos arquivos de `assets/js/`.**
Abra os arquivos `.js` em qualquer editor de texto (Bloco de Notas, VS Code). Altere só o que está **entre aspas**; não apague vírgulas, chaves `{ }` nem colchetes `[ ]`.

> Regra de ouro: campo vazio (`""`) = item oculto no site. Nada de ícone sem destino ou caixa vazia.

---
## 1. Nome, slogan e identidade — `config/brand.js`
```js
name: "Padaria Bom Grão",
slogan: "Pão quente, todo dia.",
siteUrl: "https://www.padariabomgrao.com.br",   // sem barra no final; deixe "" se ainda não houver domínio
```
`siteUrl` melhora o compartilhamento em redes sociais e o link canônico (SEO). Preencha assim que o domínio existir.

## 2. Logo e favicon
1. Salve o logo em `assets/images/logo/` (SVG, ou PNG/WebP com fundo transparente). O logo é exibido com 40 px de altura e largura automática (até 200 px): serve símbolo quadrado ou logo horizontal. Medidas completas em `07-GUIA-DE-ARTES-E-IMAGENS.md`.
2. Em `config/brand.js`:
```js
logo: { light: "assets/images/logo/meu-logo.svg", dark: "assets/images/logo/meu-logo-claro.svg", alt: "Logo da Padaria Bom Grão", showName: false }
```
- `dark` é o logo usado no tema escuro (pode repetir o mesmo arquivo).
- `showName: false` esconde o nome ao lado, útil quando o logo já contém o nome.
3. Favicon: substitua `assets/icons/favicon.svg` (ou aponte para um `.png`/`.ico`) e `assets/icons/apple-touch-icon.png` (PNG 180×180).
4. Imagem de compartilhamento (WhatsApp/Facebook): `shareImage`, ideal 1200×630.

## 3. Cores e paletas — `config/theme.js`
Há duas paletas completas, `light` e `dark`. Troque os valores hexadecimais:
```js
light: { accent: "#C2410C", accentText: "#FFFFFF", bg: "#FAF7F2", ... },
dark:  { accent: "#FB923C", accentText: "#1A1008", bg: "#17120D", ... }
```
Principais chaves: `bg` (fundo), `surface` (cards), `text`, `textMuted`, `accent` (botões/links/ícones), `accentText` (texto sobre o destaque), `whatsapp`.
**Contraste:** `accent` com `accentText` precisam ser legíveis juntos (mínimo 4.5:1; use um verificador de contraste). Ajuste o escuro à mão: cores um pouco mais claras e menos saturadas.
Também em `theme.js`: `shape` (arredondamento) e `defaultTheme`/`followSystem` (tema inicial).

## 4. Tipografia
Por padrão usa fontes do sistema (sem depender da internet). Para usar uma fonte do Google Fonts:
```js
fonts: {
  display: '"Sora", sans-serif',
  body: '"Inter", sans-serif',
  googleFontsUrl: "https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Inter:wght@400;600&display=swap"
}
```
Isso cria uma dependência externa **opcional**: se a fonte não carregar, o site continua legível com fonte padrão. Para zero dependência, baixe os `.woff2` e hospede-os em `assets/`.

## 5. Textos — `config/content.js`
- **SEO** (`seo`): título e descrição de cada página (aparecem no Google).
- **Home** (`home`): carrossel, diferenciais, destaques da loja, depoimentos, chamada final.
- **Produtos** (`products`, só título e chamada final; os itens ficam em `products.js`), **Contato** (`contact`), **Sobre** (`about`).
```js
featured: { title: "Pães artesanais", text: "Fermentação natural, assados na hora.", ... }
```

## 6. Diferenciais (exatamente 3)
```js
{ icon: "heart", title: "Atendimento personalizado", text: "..." }
```
Ícones: `heart, shield, bolt, star, check, chat, clock, pin, users, award, leaf, sparkles`.

## 7. Produtos, carrinho e pedido — `config/products.js`
Este modelo tem um **catálogo de até 30 produtos** (o que passar de 30 é ignorado). Tudo fica em `config/products.js`.

**Adicionar um produto:** copie um bloco `{ ... }` inteiro (com a vírgula) e cole abaixo. **Ocultar:** `enabled: false`. **Esgotado:** `available: false` (mostra "Indisponível" e bloqueia a compra). **Remover:** apague o bloco.
```js
{ id: "camiseta-preta", enabled: true, available: true, featured: true, category: "Camisetas", badge: "Novo",
  name: "Camiseta preta básica", image: "assets/images/products/camiseta-preta.webp", imageAlt: "Camiseta preta lisa",
  description: "Algodão penteado, tamanhos P ao GG.", price: 59.9, oldPrice: 79.9, rating: 4.8, reviews: 12 }
```
- `id`: único e sem espaços/acentos. É o que identifica o item no carrinho, **nunca repita**.
- `price`: número com **ponto** (`59.9`), sem "R$". `oldPrice` (opcional) aparece riscado.
- `rating`/`reviews`: use só avaliações **reais**. Sem avaliação, deixe `""` e a nota não aparece. Não invente notas.
- `category`: se houver 2 ou mais categorias diferentes, aparece o filtro na página. Sem categoria, sem filtro.
- `featured: true`: o produto aparece em "Destaques" na Home (até `max` itens; ajuste em `content.js` → `home.featuredProducts`).
- Imagem: quadrada, 900×900 px, WebP. Imagem ausente → espaço reservado elegante.

**Modo de compra** (`mode`):
- `"cart"` (padrão): botão **Adicionar ao carrinho**, carrinho lateral com quantidades e total, e envio do pedido completo ao WhatsApp.
- `"direct"`: botão **Comprar pelo WhatsApp** em cada card, que abre a conversa só com aquele produto (sem carrinho). Bom para poucos produtos ou vendas muito consultivas.

**Formas de pagamento e entrega:**
```js
payments: ["Pix", "Cartão de crédito", "Dinheiro"],   // o cliente escolhe uma (obrigatório)
delivery: ["Retirada no local", "Entrega"],            // [] = não pergunta
askName: true, askNote: true,                          // nome e observações opcionais
cartNote: "Frete e prazo combinados pelo WhatsApp."    // "" para ocultar
```
**Pix com QR Code e "copia e cola" (opcional):** quando o cliente escolhe Pix no carrinho, o site mostra um QR Code e um botão "Copiar código Pix" **já com o valor total do pedido**. Configure em `config/products.js` → `pix`:
```js
pix: { enabled: true, paymentName: "Pix", key: "+5511999999999", name: "LOJA DO JOAO", city: "CAMPINAS", showQr: true }
```
- `key`: a chave Pix do **lojista** (CPF/CNPJ só números, e-mail, telefone no formato `+5511999999999`, ou chave aleatória). O site não consulta o banco: o código contém a chave e o banco do cliente identifica a conta na hora do pagamento.
- `name` e `city`: como constam no cadastro do banco (sem acentos; até 25 e 15 letras). O app do cliente mostra o nome do recebedor antes de confirmar, então confira que bate.
- `paymentName` precisa ser **igual** ao texto do Pix na lista `payments`.
- **Chave vazia = Pix desligado** (de propósito, para ninguém pagar à conta errada). Nunca deixe uma chave de exemplo. Para desligar de vez, remova "Pix" da lista `payments`.
- **Chave vazia:** se o cliente escolher Pix e `pix.key` estiver vazia, o carrinho mostra a mensagem "Essa opção de pagamento não está habilitada. Fale com o seu vendedor para prosseguir com o pagamento." (texto editável em `ui.pixDisabled`). O pedido ainda pode ser enviado ao WhatsApp, e o lojista combina o pagamento. Se o QR Code não aparece, confira `pix.key` e se `paymentName` é igual ao texto do Pix em `payments`; o detalhe aparece no console do navegador (F12). Aperte Ctrl+F5 para limpar o cache.
- **O site não confirma o pagamento.** O cliente paga, envia o pedido no WhatsApp e anexa o comprovante; o lojista confere no app do banco **antes** de liberar o pedido. Na mensagem aparece "Pix (comprovante a seguir)".
- Privacidade: a chave fica visível no código do site. Prefira chave aleatória, CNPJ ou e-mail comercial; evite CPF.
- **Faça um teste real com R$ 1,00** antes de entregar: pague pelo QR, confira o nome do recebedor no app e o recebimento na conta do lojista.

**Texto da mensagem:** em `message` você troca títulos e rótulos. Exemplo do que o vendedor recebe:
```
Olá! Quero fazer um pedido pelo site da Marca Exemplo:

*Itens*
• 1x Produto 01 — R$ 89,90
• 2x Produto 02 — R$ 99,80

*Total:* R$ 189,70
*Pagamento:* Pix
*Entrega:* Entrega
*Nome:* Maria
*Observações:* Entregar à tarde
```
**Importante (combine com o cliente):** o carrinho **não** cobra, não controla estoque nem calcula frete. Ele só monta o pedido. O lojista confirma disponibilidade, valor final e pagamento pelo WhatsApp. O total é calculado no navegador a partir dos preços do `config`; se mudar um preço, o carrinho de quem já adicionou o item é atualizado ao reabrir o site.

Textos da página Produtos (título, chamada final): `config/content.js` → `products`.

## 8. Depoimentos reais
Em `home.testimonials.items`, troque os exemplos:
```js
{ name: "Maria Souza", rating: 5, photo: "", text: "Atendimento excelente!" }
```
- **Remova** `demo: true` (a etiqueta "Exemplo" e o aviso somem).
- Use somente avaliações **reais e autorizadas**.
- Sem foto, o site mostra as iniciais do nome.
- **Sem avaliações ainda?** `testimonials.enabled: false` oculta a seção inteira.

## 9. Banners do carrossel
Arquivos em `assets/images/banners/desktop/` e `.../mobile/` (medidas no item 12).
```js
{ enabled: true, desktop: "assets/images/banners/desktop/promo.webp", mobile: "assets/images/banners/mobile/promo.webp",
  alt: "Promoção de inauguração", title: "20% de desconto", subtitle: "Só esta semana", ctaLabel: "Aproveitar", link: "whatsapp" }
```
- Máximo de 3. Use `enabled: false` ou apague o bloco; com 1 banner, setas e indicadores somem.
- Arte com texto próprio? Deixe `title`, `subtitle` e `ctaLabel` vazios (`""`); se houver `link`, a imagem inteira vira clicável.
- `link` aceita `"whatsapp"`, `"produtos.html"`, `"contato.html"`, `"sobre.html"` ou `https://...`.
- Autoplay: `autoplay: true/false` e `intervalMs` (milissegundos).

## 10. Ocultar seções
`enabled: false` em: `differentials`, `featuredProducts`, `testimonials`, `finalCta` (Home); `finalCta` (Produtos); `story`, `owner`, `mission`, `vision`, `values`, `achievements`, `finalCta` (Sobre).

## 11. Contatos e WhatsApp — `config/contact.js`
```js
whatsapp: { number: "5511987654321", message: "Olá! Vi o site e quero um orçamento.", buttonLabel: "Falar no WhatsApp" },
phone: "(11) 98765-4321",
email: "contato@empresa.com.br",
address: { text: "Av. Brasil, 500 — Centro, Campinas/SP", showMap: true },
hours: [{ days: "Seg a Sex", time: "8h às 18h" }],
social: { instagram: "https://instagram.com/empresa", facebook: "", tiktok: "" },
beacons: { enabled: true, url: "https://beacons.ai/seuusuario", label: "Site por Seu Nome" }
```
- `number`: só dígitos, com 55 + DDD + número. Link e mensagem são gerados sozinhos.
- Campo `""` = some do site (rodapé, Contato e botões).
- O mapa só aparece com `showMap: true` **e** endereço preenchido (incorpora o Google Maps; exige internet do visitante). O botão "abrir no mapa" funciona sempre que há endereço.
- `beacons.enabled: false` remove o seu link do rodapé.

## 12. Imagens — medidas, formatos e comportamento
| Uso | Pasta | Medida | Formato |
|---|---|---|---|
| Banner desktop | `assets/images/banners/desktop/` | 1920×800 px (12:5) | WebP |
| Banner mobile | `assets/images/banners/mobile/` | 900×1100 px (9:11) | WebP |
| Produtos | `assets/images/products/` | 900×900 px (1:1) | WebP |
| Página Sobre | `assets/images/about/` | 1200×900 px (4:3) | WebP |
| Foto do proprietário | `assets/images/about/` | 900×1100 px (4:5) | WebP |
| Depoimentos | `assets/images/testimonials/` | 300×300 px (1:1) | WebP |
| Logo | `assets/images/logo/` | quadrado 512×512 ou horizontal ≥600×160 | SVG / PNG |
| Compartilhamento | qualquer pasta | 1200×630 px | JPG/WebP |

- **object-fit: cover:** a imagem preenche o espaço e pode ser cortada nas bordas. Mantenha o assunto no centro; no banner desktop, deixe o lado esquerdo livre para o título.
- Compressão: WebP com qualidade 70–80, **menos de 200 KB** por imagem (squoosh.app).
- Nomes em minúsculas, sem acentos nem espaços (`corte-masculino.webp`), **idênticos** aos escritos no `config`.
- Imagem ausente ou campo vazio: aparece um espaço reservado elegante; o site não quebra.
- As imagens de demonstração são artes abstratas geradas para este modelo (uso livre). **Substitua antes de entregar.**

## 13. Criar um novo cliente (resumo)
1. Duplique a pasta do modelo. 2. Edite os 5 arquivos de `config/` (inclui `products.js`). 3. Troque as imagens. 4. Atualize `sitemap.xml` e `robots.txt` com o domínio. 5. Siga o `04-CHECKLIST-DE-ENTREGA.md`. 6. Gere o ZIP com `index.html` na raiz.
