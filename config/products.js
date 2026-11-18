/* ==========================================================
   config/products.js — CATÁLOGO, CARRINHO E PEDIDO NO WHATSAPP
   - Até 30 produtos (os que passarem de 30 são ignorados).
   - "enabled: false" oculta o produto. "available: false" mostra "Indisponível".
   - Preço é número com ponto: 49.9 (não use "R$" nem vírgula).
   - Campo vazio ("") ou ausente = não aparece no card.
   ========================================================== */
window.SITE_STORE = {

  // "cart"   = botão "Adicionar" + carrinho + pedido completo no WhatsApp
  // "direct" = botão "Comprar" que abre o WhatsApp só com aquele produto (sem carrinho)
  mode: "cart",

  currency: "BRL",          // moeda dos preços
  maxProducts: 30,

  // Aparece abaixo do total no carrinho e dentro da mensagem enviada. "" oculta.
  cartNote: "Frete e prazo combinados pelo WhatsApp.",

  // Formas de pagamento oferecidas no carrinho (o cliente escolhe uma).
  payments: ["Pix", "Cartão de crédito", "Cartão de débito", "Dinheiro"],

  // Entrega (opcional). Lista vazia [] = não pergunta.
  delivery: ["Retirada no local", "Entrega"],

  // Campos extras do carrinho
  askName: true,            // pede o nome do cliente (opcional para ele preencher)
  askNote: true,            // campo de observações

  // PIX COPIA E COLA / QR CODE COM O VALOR DO CARRINHO (opcional)
  // O site só monta o código com a chave do lojista; o dinheiro vai direto para a conta dele.
  // O site NÃO confirma pagamentos: o lojista confere no app do banco.
  // Sem chave preenchida, o recurso fica desligado (de propósito, para ninguém pagar à conta errada).
  pix: {
    enabled: true,
    paymentName: "Pix",      // tem de ser IGUAL ao nome do Pix em "payments" acima
    key: "",                 // chave Pix do lojista. Telefone no formato +5511999999999
    name: "NOME DO RECEBEDOR",   // como está cadastrado no banco (sem acentos, até 25 letras)
    city: "SAO PAULO",           // cidade do recebedor (até 15 letras)
    showQr: true
  },

  // Modelo da mensagem. {loja} = nome da marca. Não altere as palavras entre chaves.
  message: {
    title: "Olá! Quero fazer um pedido pelo site da {loja}:",
    itemsLabel: "Itens",
    totalLabel: "Total",
    paymentLabel: "Pagamento",
    deliveryLabel: "Entrega",
    nameLabel: "Nome",
    noteLabel: "Observações",
    // usada quando mode = "direct" (compra de um item só)
    pixLine: "Pix (comprovante a seguir)",   // trocada no lugar de "Pix" quando o QR é usado
    directText: "Olá! Tenho interesse neste produto do site da {loja}: {produto} ({preco})."
  },

  // Textos da interface
  ui: {
    addToCart: "Adicionar ao carrinho",
    buyNow: "Comprar pelo WhatsApp",
    unavailable: "Indisponível",
    added: "Adicionado ao carrinho",
    cartTitle: "Seu carrinho",
    cartEmpty: "Seu carrinho está vazio.",
    cartEmptyHint: "Escolha produtos no catálogo para montar seu pedido.",
    goCatalog: "Ver produtos",
    openCart: "Abrir carrinho",
    closeCart: "Fechar carrinho",
    remove: "Remover",
    qtyMinus: "Diminuir quantidade",
    qtyPlus: "Aumentar quantidade",
    paymentLegend: "Forma de pagamento",
    pixDisabled: "Essa opção de pagamento não está habilitada. Fale com o seu vendedor para prosseguir com o pagamento.",
    pixTitle: "Pague com Pix",
    pixReceiver: "Recebedor:",
    pixCopy: "Copiar código Pix",
    pixCopied: "Código copiado!",
    pixHelp: "Pague no app do seu banco e, depois, toque em Enviar pedido e mande o comprovante no WhatsApp.",
    paymentRequired: "Escolha a forma de pagamento para continuar.",
    deliveryLegend: "Recebimento",
    nameLabel: "Seu nome (opcional)",
    noteLabel: "Observações (opcional)",
    total: "Total",
    checkout: "Enviar pedido no WhatsApp",
    clear: "Esvaziar carrinho",
    filterAll: "Todos",
    filterLabel: "Filtrar por categoria",
    ratingOf: "Nota {n} de 5",
    reviews: "avaliações"
  },

  /* ---------- PRODUTOS (copie e cole um bloco para adicionar) ----------
     id:          nome único, sem espaços (ex.: "camiseta-preta"). Não repita.
     name:        título do produto
     image:       "assets/images/products/arquivo.webp" (1:1, 900×900)
     imageAlt:    descrição da imagem (acessibilidade)
     description: texto curto (1–2 linhas)
     price:       49.9   |  oldPrice: 69.9 (opcional, mostra riscado)
     rating:      4.8 (0 a 5) — use só avaliações REAIS, ou deixe "" 
     reviews:     12 (quantidade de avaliações, opcional)
     category:    "Roupas" (opcional; se houver, aparece o filtro)
     badge:       "Novo" (opcional)
     featured:    true = aparece em destaque na Home
     available:   false = "Indisponível"
     enabled:     false = oculta
  */
  products: [
    { id: "produto-01", enabled: true, available: true, featured: true,  category: "Categoria A", badge: "Novo",
      name: "Produto de exemplo 01", image: "assets/images/products/produto-01.webp", imageAlt: "Imagem demonstrativa do produto 01",
      description: "Descrição curta do produto, em uma ou duas linhas.", price: 89.9, oldPrice: 109.9, rating: "", reviews: "" },
    { id: "produto-02", enabled: true, available: true, featured: true,  category: "Categoria A", badge: "",
      name: "Produto de exemplo 02", image: "assets/images/products/produto-02.webp", imageAlt: "Imagem demonstrativa do produto 02",
      description: "Material, tamanho ou outra informação importante.", price: 49.9, oldPrice: "", rating: 4.8, reviews: 12 },
    { id: "produto-03", enabled: true, available: true, featured: true,  category: "Categoria B", badge: "",
      name: "Produto de exemplo 03", image: "assets/images/products/produto-03.webp", imageAlt: "Imagem demonstrativa do produto 03",
      description: "Conte o principal benefício em poucas palavras.", price: 129, oldPrice: "", rating: 4.5, reviews: 8 },
    { id: "produto-04", enabled: true, available: true, featured: true,  category: "Categoria B", badge: "",
      name: "Produto de exemplo 04", image: "assets/images/products/produto-04.webp", imageAlt: "Imagem demonstrativa do produto 04",
      description: "Descrição curta do produto.", price: 34.5, oldPrice: "", rating: "", reviews: "" },
    { id: "produto-05", enabled: true, available: true, featured: false, category: "Categoria A", badge: "",
      name: "Produto de exemplo 05", image: "assets/images/products/produto-05.webp", imageAlt: "Imagem demonstrativa do produto 05",
      description: "Descrição curta do produto.", price: 59, oldPrice: "", rating: 5, reviews: 3 },
    { id: "produto-06", enabled: true, available: false, featured: false, category: "Categoria B", badge: "",
      name: "Produto de exemplo 06 (esgotado)", image: "assets/images/products/produto-06.webp", imageAlt: "Imagem demonstrativa do produto 06",
      description: "Exemplo de produto indisponível no momento.", price: 79.9, oldPrice: "", rating: "", reviews: "" },
    { id: "produto-07", enabled: true, available: true, featured: false, category: "Categoria A", badge: "",
      name: "Produto de exemplo 07", image: "assets/images/products/produto-07.webp", imageAlt: "Imagem demonstrativa do produto 07",
      description: "Descrição curta do produto.", price: 24.9, oldPrice: "", rating: "", reviews: "" },
    { id: "produto-08", enabled: true, available: true, featured: false, category: "Categoria B", badge: "",
      name: "Produto de exemplo 08", image: "assets/images/products/produto-08.webp", imageAlt: "Imagem demonstrativa do produto 08",
      description: "Descrição curta do produto.", price: 99, oldPrice: "", rating: 4.2, reviews: 5 },
    { id: "produto-09", enabled: true, available: true, featured: false, category: "Categoria A", badge: "",
      name: "Produto de exemplo 09", image: "assets/images/products/produto-09.webp", imageAlt: "Imagem demonstrativa do produto 09",
      description: "Descrição curta do produto.", price: 45, oldPrice: "", rating: "", reviews: "" },
    { id: "produto-10", enabled: true, available: true, featured: false, category: "Categoria B", badge: "",
      name: "Produto de exemplo 10", image: "assets/images/products/produto-10.webp", imageAlt: "Imagem demonstrativa do produto 10",
      description: "Descrição curta do produto.", price: 150, oldPrice: 180, rating: "", reviews: "" },
    { id: "produto-11", enabled: true, available: true, featured: false, category: "Categoria A", badge: "",
      name: "Produto de exemplo 11", image: "assets/images/products/produto-11.webp", imageAlt: "Imagem demonstrativa do produto 11",
      description: "Descrição curta do produto.", price: 19.9, oldPrice: "", rating: "", reviews: "" },
    { id: "produto-12", enabled: true, available: true, featured: false, category: "Categoria B", badge: "",
      name: "Produto de exemplo 12", image: "assets/images/products/produto-12.webp", imageAlt: "Imagem demonstrativa do produto 12",
      description: "Descrição curta do produto.", price: 69.9, oldPrice: "", rating: "", reviews: "" }
  ]
};
