/* ==========================================================
   config/content.js — TEXTOS, SERVIÇOS, DEPOIMENTOS E SEÇÕES
   - "enabled: false" oculta o item ou a seção inteira.
   - Links aceitam: "produtos.html", "contato.html", "sobre.html",
     um endereço completo (https://...) ou as palavras especiais
     "whatsapp", "telefone" e "email".
   - Imagens vazias ("") mostram um espaço reservado elegante.
   ========================================================== */
window.SITE_CONTENT = {

  /* ---------- SEO: título e descrição de cada página ---------- */
  seo: {
    home:     { title: "Marca Exemplo — Catálogo online e pedido pelo WhatsApp", description: "Conheça a Marca Exemplo: produtos com qualidade, agilidade e atendimento personalizado. Fale com a gente pelo WhatsApp." },
    produtos: { title: "Produtos — Marca Exemplo", description: "Veja o catálogo da Marca Exemplo, monte seu pedido e finalize pelo WhatsApp." },
    contato:  { title: "Contato — Marca Exemplo", description: "Fale com a Marca Exemplo por WhatsApp, telefone ou e-mail. Veja endereço e horário de atendimento." },
    sobre:    { title: "Sobre — Marca Exemplo", description: "Conheça a história, a missão e os valores da Marca Exemplo." }
  },

  /* ---------- Textos dos menus ---------- */
  nav: [
    { label: "Home",     href: "index.html",    page: "home" },
    { label: "Produtos", href: "produtos.html", page: "produtos" },
    { label: "Contato",  href: "contato.html",  page: "contato" },
    { label: "Sobre",    href: "sobre.html",    page: "sobre" }
  ],

  /* ================== HOME ================== */
  home: {

    /* Carrossel: até 3 banners. Em branco ou enabled:false = banner oculto.
       Se sobrar só 1, as setas somem. Se nenhum, o carrossel some. */
    carousel: {
      autoplay: true,
      intervalMs: 6500,
      banners: [
        {
          enabled: true,
          desktop: "assets/images/banners/desktop/banner-01.webp",
          mobile:  "assets/images/banners/mobile/banner-01.webp",
          alt: "Imagem demonstrativa de banner",
          title: "Identidades Visuais que criam conexões.",
          subtitle: "Porque profissionalismo e atenção aos detalhes fazem toda a diferença.",
          ctaLabel: "Tenho interesse",
          link: "whatsapp"
        },
        {
          enabled: true,
          desktop: "assets/images/banners/desktop/banner-02.webp",
          mobile:  "assets/images/banners/mobile/banner-02.webp",
          alt: "Imagem demonstrativa de banner",
          title: "Conheça nossos serviços",
          subtitle: "Consulte tudo que precisar e feche somente o que quiser.",
          ctaLabel: "Analisar",
          link: "produtos.html"
        },
        {
          enabled: true,
          desktop: "assets/images/banners/desktop/banner-03.webp",
          mobile:  "assets/images/banners/mobile/banner-03.webp",
          alt: "Imagem demonstrativa de banner",
          title: "BLACK GARBEN: Condições especiais para Novembro",
          subtitle: "Receba MUITO, mas pague só um pouquinho.",
          ctaLabel: "Aproveitar",
          link: "whatsapp"
        }
      ]
    },

    /* Diferenciais: exatamente 3 cards.
       Ícones disponíveis: heart, shield, bolt, star, check, chat, clock, pin, users, award, leaf, sparkles */
    differentials: {
      enabled: true,
      items: [
        { icon: "heart",  title: "Atendimento personalizado", text: "Ouvimos o que você precisa antes de propor qualquer solução." },
        { icon: "shield", title: "Qualidade e confiança",     text: "Processos cuidadosos e transparência em cada etapa." },
        { icon: "bolt",   title: "Agilidade e compromisso",   text: "Prazos combinados são prazos cumpridos." }
      ]
    },

    /* Produtos em destaque na Home: mostra os produtos com featured:true de config/products.js */
    featuredProducts: {
      enabled: true,
      title: "Destaques da loja",
      subtitle: "Alguns dos serviços mais procurados.",
      max: 4,
      linkLabel: "Ver todos os serviços"
    },

    /* Depoimentos. Deixe enabled:false até ter avaliações reais. */
    testimonials: {
      enabled: true,
      title: "O que dizem os clientes",
      // Aviso exibido quando algum depoimento tem demo:true
      demoNotice: "Depoimentos de exemplo, apenas para demonstração do layout.",
      items: [
        { demo: true, name: "Patrick", rating: 5, photo: "", text: "Não tinha nem dimensão de como uma boa identidade visual pode fazer tanta diferença no dia a dia." },
        { demo: true, name: "Rosemeire Arruda", rating: 5, photo: "", text: "Amei o meu serviço, ficou exatamente como eu queria." },
        { demo: true, name: "Patricia Diniz", rating: 4, photo: "",                                              text: "Muito bom serviço, cumpriram os prazos estabelecidos e me deram desconto." }
      ]
    },

    // Chamada final da Home (opcional)
    finalCta: {
      enabled: true,
      title: "Vamos conversar sobre o seu projeto?",
      text: "Conte o que você precisa e responderemos o mais rápido possível.",
      buttonLabel: "Falar no WhatsApp",
      link: "whatsapp"
    }
  },

  /* ================== PRODUTOS (os itens ficam em config/products.js) ================== */
  products: {
    hero: {
      title: "Nossos produtos",
      subtitle: "Escolha, adicione ao carrinho e envie o pedido pelo WhatsApp."
    },
    finalCta: {
      enabled: true,
      title: "Não achou o que procurava?",
      text: "Chame a gente: podemos ter o produto ou encomendar para você.",
      buttonLabel: "Falar no WhatsApp",
      link: "whatsapp"
    }
  },

  /* ================== CONTATO ================== */
  contact: {
    title: "Fale com a gente",
    intro: "Escolha o canal que for melhor para você. O WhatsApp costuma ser o mais rápido.",
    whatsappCardTitle: "Atendimento pelo WhatsApp",
    whatsappCardText: "Resposta rápida em horário comercial."
  },

  /* ================== SOBRE ================== */
  about: {
    hero: {
      title: "Quem somos",
      subtitle: "Uma empresa feita de gente que gosta de bem atender."
    },
    // Cada bloco abaixo é opcional: enabled:false (ou deixar vazio) oculta.
    story: {
      enabled: true,
      title: "Nossa história",
      paragraphs: [
        "Conte aqui como o negócio começou, qual problema ele resolve e o que motiva a equipe. Este é um texto de exemplo.",
        "Um segundo parágrafo ajuda a dar ritmo à leitura. Se não precisar, apague este item."
      ],
      image: "assets/images/about/historia.webp",
      imageAlt: "Imagem demonstrativa da história da empresa"
    },
    owner: {
      enabled: true,
      title: "Quem está por trás",
      name: "Nome do proprietário",
      role: "Fundador(a)",
      text: "Uma breve apresentação da pessoa ou da equipe que atende o cliente no dia a dia.",
      photo: "assets/images/about/proprietario.webp",
      photoAlt: "Foto demonstrativa do proprietário"
    },
    mission: { enabled: true, title: "Missão", text: "Oferecer produtos de qualidade, com atendimento honesto e próximo." },
    vision:  { enabled: true, title: "Visão",  text: "Ser lembrado pela região como referência em confiança e qualidade." },
    values:  { enabled: true, title: "Valores", items: ["Transparência", "Respeito ao cliente", "Compromisso com prazos", "Melhoria contínua"] },
    achievements: {
      enabled: true,
      title: "Em números",
      items: [
        { value: "5+",   label: "anos de mercado" },
        { value: "300+", label: "clientes atendidos" },
        { value: "100%", label: "foco no cliente" }
      ]
    },
    finalCta: {
      enabled: true,
      title: "Quer conhecer nosso trabalho de perto?",
      text: "Será um prazer atender você.",
      buttonLabel: "Falar no WhatsApp",
      link: "whatsapp"
    }
  },

  /* ---------- Textos fixos da interface ---------- */
  ui: {
    skipLink: "Ir para o conteúdo",
    menuOpen: "Abrir menu",
    menuClose: "Fechar menu",
    themeToLight: "Mudar para o tema claro",
    themeToDark: "Mudar para o tema escuro",
    toTop: "Voltar ao topo",
    whatsappFloat: "Conversar no WhatsApp",
    prev: "Banner anterior",
    next: "Próximo banner",
    goTo: "Ir para o banner",
    footerNav: "Navegação",
    footerContact: "Contato",
    footerSocial: "Redes sociais",
    openMap: "Abrir no mapa",
    call: "Ligar",
    sendEmail: "Enviar e-mail",
    hours: "Horário de atendimento",
    demoBadge: "Exemplo"
  }
};
