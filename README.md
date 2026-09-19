# Loja SPA

SPA em JavaScript puro com roteamento no cliente, templates, validação de formulário, localStorage, gráfico (Chart.js via CDN), modo escuro e acessibilidade (WCAG 2.1).

## Tecnologias
HTML5, CSS3, JavaScript ES6 (módulos), Chart.js 4, Vite 5.

## Pré-requisitos
Git e Node.js 18 ou superior.

## Instalação e execução
git clone <url-do-repositorio>
cd projeto-web
npm install
npm run dev

## Build de produção
npm run build      (gera a pasta dist, com JS e CSS minificados)
npm run preview    (serve a pasta dist localmente)

## Medições do build
| Arquivo | Bruto | Gzip |
| --- | --- | --- |
| dist/html/index.html | 1.66 kB | 0.82 kB |
| dist/assets/index-DQRgWclf.css | 3.21 kB | 1.25 kB |
| dist/assets/index-DhYnMED2.js | 8.43 kB | 3.54 kB |

## Testes
Manuais, com roteiro: rotas e botões voltar/avançar, validação do formulário, localStorage (incluindo valor corrompido), gráfico, teclado (Tab, Enter, Esc) e temas claro/escuro.

## Estrutura
html/ (index.html), css/ (style.css), js/ (módulos), public/imagens/ (imagens estáticas).

## Versionamento
GitFlow (main, develop, feature/, release/, hotfix/), Conventional Commits, versionamento semântico (tag v1.0.0), issues, milestones e pull requests.

## Deploy
Vercel, ligada ao repositório do GitHub. Push na main publica em produção; PRs geram pré-visualização. O CI roda o build no GitHub Actions.
