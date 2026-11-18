# Checklist de Entrega (uso do operador)

**Identidade**
- [ ] Nome, slogan e `siteUrl` em `config/brand.js`
- [ ] Logo (claro e escuro) e favicon trocados; `alt` do logo correto
- [ ] Paletas clara e escura revisadas; contraste dos botões OK
- [ ] Imagem de compartilhamento (`shareImage`) trocada

**Conteúdo**
- [ ] Títulos e descrições SEO das 4 páginas
- [ ] Banners (1–3) desktop e mobile; arte sem texto cortado
- [ ] 3 diferenciais e textos da Home revisados
- [ ] Nenhum texto "exemplo", "Produto de exemplo", "Nome do cliente" ou lorem ficou
- [ ] Depoimentos: só reais e autorizados — ou seção desativada (`enabled:false`)
- [ ] Sobre: seções sem informação desativadas
- [ ] Todas as imagens de demonstração substituídas (ou conscientemente mantidas)

**Catálogo (`config/products.js`)**
- [ ] Até 30 produtos; nomes, descrições e **preços conferidos** (ponto decimal, sem "R$")
- [ ] Fotos 900×900 trocadas; `id` de cada produto único
- [ ] Notas/avaliações: só reais, ou campo vazio
- [ ] Produtos esgotados com `available: false`; destaques (`featured`) escolhidos
- [ ] Formas de pagamento e opções de entrega do lojista
- [ ] Pix: chave, nome e cidade preenchidos (ou `pix.key` vazio se não for usar)
- [ ] **Teste real de R$ 1,00 pelo QR Code**: nome do recebedor correto no app e dinheiro na conta do lojista
- [ ] **Teste de ponta a ponta:** adicionar 2 itens, escolher pagamento, enviar e conferir a mensagem recebida no WhatsApp do lojista
- [ ] Cliente ciente: o carrinho não cobra, não controla estoque nem calcula frete

**Contatos**
- [ ] WhatsApp (55+DDD+número) e mensagem; clicar abre a conversa certa
- [ ] Telefone, e-mail, endereço, horários, redes — campos sem uso vazios
- [ ] Mapa: `showMap` só se desejado
- [ ] Link do Beacons correto (ou desativado)

**Técnico**
- [ ] `sitemap.xml` e `robots.txt` com o domínio real
- [ ] Testado no celular e no desktop; tema claro e escuro
- [ ] Menu mobile, carrossel, voltar ao topo funcionando
- [ ] Sem imagens quebradas (nomes iguais aos do `config`, minúsculas)
- [ ] Imagens < 200 KB cada
- [ ] Console do navegador sem erros (F12)

**Pacote**
- [ ] `index.html` na raiz do ZIP (sem pasta duplicada)
- [ ] Pasta `03-DOCUMENTACAO` removida se não for entregar ao cliente (opcional)
- [ ] Manual de Publicação enviado ao cliente
- [ ] Nome do ZIP com o nome do cliente
