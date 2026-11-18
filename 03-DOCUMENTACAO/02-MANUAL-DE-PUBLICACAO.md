# Manual de Publicação (para o cliente)

Você não precisa instalar nada nem mexer em código. Basta colocar os arquivos do site na pasta pública da hospedagem.

## O que você recebeu
Um arquivo `.zip`. Dentro dele, **diretamente na primeira camada**, está o arquivo `index.html` junto das pastas `assets`, `config` e `03-DOCUMENTACAO`. Essa é a estrutura certa.

## Opção A — Enviar o ZIP ao provedor
Se o seu provedor permite, envie o ZIP para a pasta pública e use a opção "Extrair" do gerenciador de arquivos (veja a Opção B, passo 3). Alguns provedores também pedem que você apenas mande o ZIP ao suporte e peçam para publicarem. Mensagem sugerida:
> Olá! Segue o arquivo ZIP do meu site, que é estático (HTML/CSS/JS). Por favor, extraiam o conteúdo na pasta pública do domínio, de forma que o arquivo index.html fique diretamente nessa pasta (e não dentro de outra subpasta). Obrigado!

Nem todo provedor aceita esse caminho: se o seu não aceitar, use a Opção B.

## Opção B — Extrair e enviar você mesmo
1. **Extraia o ZIP** no seu computador (botão direito → "Extrair tudo").
2. Abra a pasta extraída: você deve ver `index.html`, `produtos.html`, `assets`, `config`…
3. Entre no painel da hospedagem (cPanel ou similar) → **Gerenciador de Arquivos**, ou use um programa de FTP (ex.: FileZilla) com os dados que o provedor enviou.
4. Abra a **pasta pública** do domínio. Nomes comuns: `public_html`, `www`, `htdocs`, `httpdocs` ou `public`. Em caso de dúvida, pergunte ao suporte: "Qual é a pasta pública do meu domínio?"
5. Envie **o conteúdo** da pasta extraída (não a pasta em si) para dentro da pasta pública.
6. Se o provedor já deixou um arquivo de exemplo (`index.html`/`index.php`/"em construção"), substitua-o.

## Como conferir se está no lugar certo
Na pasta pública deve existir diretamente: `index.html`, `produtos.html`, `contato.html`, `sobre.html`, `404.html`, `sitemap.xml`, `robots.txt` e as pastas `assets` e `config`.
**Errado:** `public_html/NOME-DO-SITE/index.html` (uma pasta a mais). Nesse caso, mova o conteúdo uma pasta acima.

## Domínio
O domínio (ex.: `www.suaempresa.com.br`) precisa estar apontado para a hospedagem: o provedor informa os "servidores de nomes (DNS)" ou o endereço IP, que você configura onde registrou o domínio. A propagação pode levar de minutos a 48 horas. Peça ao suporte do provedor para ativar também o certificado **HTTPS** (geralmente gratuito).

## Conferindo o resultado
Abra o endereço do site e confirme: as 4 páginas abrem; o logo e as imagens aparecem; o botão de WhatsApp abre a conversa; o botão de tema claro/escuro funciona; no celular o menu (☰) abre e fecha. Teste também um endereço inexistente (ex.: `/teste`): deve aparecer a página 404 do site, caso o provedor use a configuração padrão.

## Problemas comuns
- **Página em branco / sem estilo:** os arquivos foram enviados dentro de uma pasta extra, ou a pasta `assets`/`config` ficou de fora. Reenvie conservando as pastas.
- **Imagens não aparecem:** verifique se a pasta `assets` foi enviada inteira.
- **Site antigo continua aparecendo:** limpe o cache do navegador (Ctrl+F5).
- **Site em subpasta** (`seudominio.com/loja`): funciona normalmente, exceto a página 404 personalizada (que depende de estar na raiz).

## Hospedagem em nuvem (AWS, Google Cloud, Azure)
Se o seu caso for nuvem em vez de hospedagem comum, a publicação é feita pelo operador. Veja `06-HOSPEDAGEM-EM-NUVEM.md`.
