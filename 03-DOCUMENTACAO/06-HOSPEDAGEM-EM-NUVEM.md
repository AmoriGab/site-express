# Hospedagem em nuvem (AWS, Google Cloud, Firebase, Azure)

**Para quem é:** operador (você) ou o profissional de TI do cliente. Só use este guia se o cliente exigir nuvem. Para hospedagem comum (cPanel etc.), use o `02-MANUAL-DE-PUBLICACAO.md`.

O site é 100% estático: **não precisa de servidor, banco de dados nem PHP**. Em qualquer serviço abaixo, a tarefa é a mesma: colocar **o conteúdo** da pasta do projeto (com `index.html` na raiz) num armazenamento público/CDN, apontar o domínio e ativar HTTPS.

> **Antes de começar (vale para todos)**
> 1. Extraia o ZIP e **remova a pasta `03-DOCUMENTACAO`** do que será publicado.
> 2. Confirme `siteUrl` em `config/brand.js` e o domínio em `sitemap.xml` e `robots.txt`.
> 3. Envie os arquivos **mantendo as pastas** (`assets/`, `config/`). Faça upload do conteúdo, não de uma pasta extra por cima (nada de `site/index.html`).
> 4. O cliente precisa ter conta no serviço, cartão cadastrado e acesso ao DNS do domínio.
> 5. Os preços e os menus dos consoles mudam com frequência: confirme valores e nomes de botões na hora. Este guia não informa preços.

## Qual escolher
| Opção | Dificuldade | HTTPS com domínio próprio | Observação |
|---|---|---|---|
| **Firebase Hosting** (Google) | Baixa | Automático | Usa linha de comando no **seu** computador, não no do cliente. O mais simples dos "grandes" |
| **AWS: S3 + CloudFront** | Média | Sim (certificado ACM) | Mais comum em empresas |
| **Google Cloud Storage + balanceador** | Média/Alta | Exige balanceador de carga | Funciona, mas é mais trabalhoso que o Firebase |
| **Azure Static Web Apps** | Baixa/Média | Sim | Confira no portal |

---
## A) AWS — S3 + CloudFront (recomendado na AWS)
Forma recomendada pela AWS: bucket **privado**, acessado só pelo CloudFront via *Origin Access Control (OAC)*, em vez de abrir o bucket ao público.

1. **Crie o bucket S3** (console → S3 → *Create bucket*). Nome único, região à escolha. **Mantenha "Block all public access" ativado.** *Não* ative "Static website hosting".
2. **Envie os arquivos** (*Upload*): selecione tudo da pasta do site, incluindo as pastas. Confira que `index.html` está na raiz do bucket.
3. **Solicite o certificado HTTPS** no *AWS Certificate Manager*, na região **us-east-1 (N. Virginia)** (o CloudFront só usa certificados dessa região). Informe `www.dominio.com.br` e `dominio.com.br`, escolha validação por DNS e crie no DNS do domínio o registro CNAME que o ACM indicar. Aguarde o status *Issued*.
4. **Crie a distribuição CloudFront:**
   - *Origin domain*: o bucket criado.
   - *Origin access*: **Origin access control settings** → crie um OAC (assinar requisições).
   - *Viewer protocol policy*: **Redirect HTTP to HTTPS**.
   - *Default root object*: `index.html`.
   - *Alternate domain names (CNAME)*: seus domínios; *Custom SSL certificate*: o certificado do passo 3.
5. **Aplique a política do bucket:** o CloudFront mostra uma política pronta (*Copy policy*). Cole em S3 → bucket → *Permissions* → *Bucket policy*.
6. **Página 404:** em CloudFront → distribuição → *Error pages* → *Create custom error response*, para os códigos **403** e **404**: caminho `/404.html`, *HTTP response code* **404**. (Com bucket privado, arquivo inexistente retorna 403, por isso os dois.)
7. **Aponte o domínio:** no DNS, crie um CNAME de `www` para `dXXXXXXXX.cloudfront.net` (o endereço da distribuição). Para o domínio sem `www`, use ALIAS/ANAME (Route 53 oferece *Alias*) ou redirecione para o `www`.
8. **Teste** `https://seudominio` e uma URL inexistente.

**Atualizações futuras:** reenvie os arquivos alterados ao S3 e crie uma *Invalidation* com o caminho `/*` no CloudFront (senão o visitante pode ver a versão antiga por um tempo).
Fonte oficial (diferença OAC × endpoint de website): [AWS re:Post/Knowledge Center](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-serve-static-website/).

> Alternativa mais simples (menos segura): ativar *Static website hosting* no S3 e bucket público. Funciona, mas o CloudFront acessa o site por HTTP e o bucket fica aberto; **não recomendado**.

---
## B) Firebase Hosting (Google) — a via mais simples
Não exige balanceador nem configuração de certificado. Conferir passos atuais em: https://firebase.google.com/docs/hosting (não consegui abrir a documentação para verificar nesta sessão; os comandos abaixo são os usuais).

1. Crie um projeto em https://console.firebase.google.com e, no menu, abra **Hosting**.
2. **No seu computador** (precisa de Node.js instalado; o cliente não precisa de nada):
   ```
   npm install -g firebase-tools
   firebase login
   cd pasta-do-site            # a pasta que contém o index.html
   firebase init hosting
   ```
   Respostas: projeto existente → o criado; *public directory* → `.` (ponto, a própria pasta); *single-page app* → **No**; *GitHub deploys* → No; **não sobrescreva** o `index.html` se perguntar.
3. Edite o `firebase.json` criado para **não publicar documentação e arquivos internos**:
   ```json
   { "hosting": { "public": ".", "ignore": ["firebase.json", "**/.*", "**/node_modules/**", "03-DOCUMENTACAO/**", "README.md"] } }
   ```
4. Publique: `firebase deploy --only hosting`.
5. **Domínio:** Hosting → *Add custom domain* e siga as instruções de DNS (registros TXT/A informados pelo painel). O certificado HTTPS é emitido automaticamente.
6. A página `404.html` na raiz é usada automaticamente.

**Atualizações:** altere os arquivos e rode `firebase deploy --only hosting` de novo.

---
## C) Google Cloud — Cloud Storage + balanceador de carga
Segundo a documentação do Google, o Cloud Storage **não entrega HTTPS em domínio próprio sozinho**; para HTTPS é preciso um balanceador de carga com certificado gerenciado. Se o cliente aceita o Firebase, prefira o item B.

1. No projeto Google Cloud, ative a API do **Compute Engine** (necessária para o balanceador). Você precisa dos papéis *Storage Admin* e *Compute Network Admin*.
2. **Crie o bucket** (Cloud Storage → *Create*). O nome pode ser igual ao do domínio, mas isso exige verificar a propriedade do domínio.
3. **Envie os arquivos** (console ou `gcloud storage cp -r ./* gs://NOME-DO-BUCKET`), com `index.html` na raiz.
4. **Torne o conteúdo público:** desative a *public access prevention* e conceda `roles/storage.objectViewer` a `allUsers`.
5. **Defina as páginas:**
   ```
   gcloud storage buckets update gs://NOME-DO-BUCKET --web-main-page-suffix=index.html --web-error-page=404.html
   ```
6. **Balanceador:** crie um *Application Load Balancer externo*, adicione o bucket como *backend bucket* (ative o *Cloud CDN* se quiser) e anexe um **certificado SSL gerenciado pelo Google** para o domínio no frontend.
7. **DNS:** crie um registro **A** do domínio apontando para o IP do balanceador. O certificado gerenciado só é ativado depois que o DNS aponta corretamente (pode levar de minutos a horas).
8. Teste o site e uma URL inexistente.

Sem a configuração da página de índice, quem acessa a raiz pode ver uma listagem dos arquivos do bucket: **não esqueça o passo 5**. Fonte oficial: [Host a static website — Google Cloud](https://docs.cloud.google.com/storage/docs/hosting-static-website?hl=pt-br).

---
## D) Azure Static Web Apps
Não consegui verificar a documentação detalhada nesta sessão; use este roteiro como guia e confirme cada tela no portal.
1. Portal Azure → *Static Web Apps* → *Create*; escolha plano e região.
2. Método de implantação: **GitHub** (repositório com os arquivos na raiz) ou **Other**/CLI para enviar a pasta. Em *Build presets* escolha **Custom**; *App location* `/`; deixe **Api** e **Output** vazios (não há build).
3. Após a implantação, em *Custom domains* → *Add*, siga o assistente de DNS; o certificado HTTPS é gerenciado pelo Azure.
4. Para a 404: crie `staticwebapp.config.json` na raiz com
   ```json
   { "responseOverrides": { "404": { "rewrite": "/404.html" } } }
   ```
Visão geral oficial: https://learn.microsoft.com/azure/static-web-apps/overview

---
## Problemas comuns (todos os serviços)
| Sintoma | Causa provável |
|---|---|
| Página abre sem estilo/sem imagens | Arquivos enviados dentro de uma pasta extra, ou `assets/` e `config/` ausentes |
| Raiz do domínio dá erro ou lista arquivos | *Default root object* / `MainPageSuffix` não configurado |
| Alterei o site e nada mudou | Cache do CDN: faça a invalidação (AWS) ou aguarde; teste em janela anônima |
| "Não seguro" / certificado inválido | Certificado não emitido ou DNS ainda não propagado |
| 404 padrão do provedor em vez do seu | Página de erro não configurada (veja o passo da 404 em cada seção) |
| Só a Home funciona | Servindo como "aplicação de página única": desative *SPA/rewrites* |

## Responsabilidades (sugestão)
O operador prepara o pacote e roda os passos; o cliente é dono da conta de nuvem e do domínio, e deve cadastrar o cartão e conceder acesso. Combine por escrito **quem paga** a infraestrutura e **quem faz as atualizações** depois.
