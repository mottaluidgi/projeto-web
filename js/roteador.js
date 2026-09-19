import { produtos } from './dados.js';
import {
  paginaInicio, paginaSobre, paginaProdutos, paginaContato, pagina404
} from './templates.js';
import { noCarrinho } from './carrinho.js';
import { desenharGrafico } from './grafico.js';

const app = document.getElementById('app');

const rotas = {
  '/': { titulo: 'Início', html: paginaInicio },
  '/sobre': { titulo: 'Sobre', html: paginaSobre },
  '/produtos': { titulo: 'Produtos', html: () => paginaProdutos(produtos, noCarrinho) },
  '/contato': { titulo: 'Contato', html: paginaContato }
};

const caminhoAtual = () => location.hash.slice(1) || '/';

function atualizarMenu(caminho) {
  document.querySelectorAll('#menu [data-link]').forEach((a) => {
    if (a.getAttribute('href') === `#${caminho}`) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

function renderizar(moverFoco = true) {
  const caminho = caminhoAtual();
  const rota = Object.hasOwn(rotas, caminho)
    ? rotas[caminho]
    : { titulo: 'Página não encontrada', html: pagina404 };

  app.innerHTML = rota.html();
  document.title = `${rota.titulo} | Loja SPA`;
  atualizarMenu(caminho);

  if (caminho === '/produtos') desenharGrafico(produtos);

  if (moverFoco) {
    window.scrollTo(0, 0);
    app.querySelector('h1')?.focus();
  }
}

export function iniciarRoteador() {
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-link]');
    if (!link) return;
    e.preventDefault();
    const destino = link.getAttribute('href');
    if (destino !== location.hash) history.pushState(null, '', destino);
    renderizar();
  });

  window.addEventListener('popstate', () => renderizar());

  document.addEventListener('tema:alterado', () => {
    if (caminhoAtual() === '/produtos') desenharGrafico(produtos);
  });

  renderizar(false);
}
