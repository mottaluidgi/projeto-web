const ENTIDADES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };

export const escapar = (t) => String(t).replace(/[&<>"']/g, (c) => ENTIDADES[c]);

export const moeda = (v) =>
  v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export const cardProduto = ({ id, nome, preco, imagem }, noCarrinho = false) => {
  const base = `/imagens/${escapar(imagem)}`;
  const n = escapar(nome);
  return `
  <article class="card" data-id="${id}">
    <picture>
      <source type="image/webp"
        srcset="${base}-400.webp 400w, ${base}-800.webp 800w, ${base}-1200.webp 1200w"
        sizes="(max-width: 600px) 100vw, 300px">
      <img src="${base}-800.jpg" width="300" height="300" loading="lazy" alt="${n}">
    </picture>
    <h2>${n}</h2>
    <p class="preco">${moeda(preco)}</p>
    <button type="button" class="btn-comprar${noCarrinho ? ' adicionado' : ''}" aria-pressed="${noCarrinho}"><span class="rotulo">${noCarrinho ? 'No carrinho' : 'Adicionar ao carrinho'}</span><span class="sr-only"> ${n}</span></button>
  </article>`;
};

export const gradeProdutos = (lista, noCarrinho) =>
  lista.length
    ? lista.map((p) => cardProduto(p, noCarrinho(p.id))).join('')
    : '<p>Nenhum resultado.</p>';

export const paginaInicio = () => `
  <h1 tabindex="-1">Início</h1>
  <p>Bem-vindo à Loja SPA, um projeto em JavaScript puro com roteamento no cliente.</p>`;

export const paginaSobre = () => `
  <h1 tabindex="-1">Sobre</h1>
  <p>Aplicação de página única com templates, validação de formulário, persistência em localStorage e gráfico.</p>`;

export const paginaProdutos = (lista, noCarrinho) => `
  <h1 tabindex="-1">Produtos</h1>
  <label for="busca">Buscar produto</label>
  <input type="search" id="busca" name="busca" autocomplete="off">
  <div class="grade" id="grade" aria-live="polite">${gradeProdutos(lista, noCarrinho)}</div>
  <h2>Preços</h2>
  <div class="grafico-caixa">
    <canvas id="grafico" role="img" aria-label="Gráfico de barras com o preço de cada produto"></canvas>
  </div>`;

export const paginaContato = () => `
  <h1 tabindex="-1">Contato</h1>
  <form id="form-contato" novalidate>
    <div class="campo">
      <label for="nome">Nome</label>
      <input id="nome" name="nome" type="text" autocomplete="name" required>
    </div>
    <div class="campo">
      <label for="email">E-mail</label>
      <input id="email" name="email" type="email" autocomplete="email" required>
    </div>
    <div class="campo">
      <label for="mensagem">Mensagem</label>
      <textarea id="mensagem" name="mensagem" rows="5" required></textarea>
    </div>
    <button type="submit" class="btn">Enviar</button>
    <p class="mensagem" role="status"></p>
  </form>`;

export const pagina404 = () => `
  <h1 tabindex="-1">Página não encontrada</h1>
  <p><a href="#/" data-link>Voltar ao início</a></p>`;
