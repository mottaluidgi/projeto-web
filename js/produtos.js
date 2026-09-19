import { produtos } from './dados.js';
import { gradeProdutos } from './templates.js';
import { alternar, noCarrinho } from './carrinho.js';

export function iniciarProdutos() {
  document.addEventListener('click', (e) => {
    const botao = e.target.closest('.btn-comprar');
    if (!botao) return;

    const id = Number(botao.closest('.card').dataset.id);
    const ativo = alternar(id);

    botao.setAttribute('aria-pressed', String(ativo));
    botao.classList.toggle('adicionado', ativo);
    botao.querySelector('.rotulo').textContent = ativo ? 'No carrinho' : 'Adicionar ao carrinho';
  });

  document.addEventListener('input', (e) => {
    if (e.target.id !== 'busca') return;
    const termo = e.target.value.trim().toLowerCase();
    const lista = produtos.filter((p) => p.nome.toLowerCase().includes(termo));
    document.getElementById('grade').innerHTML = gradeProdutos(lista, noCarrinho);
  });
}
