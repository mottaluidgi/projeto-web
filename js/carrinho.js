import { guardar, ler } from './storage.js';

let ids = ler('carrinho', []);
if (!Array.isArray(ids)) ids = [];
ids = ids.filter(Number.isInteger);

export const noCarrinho = (id) => ids.includes(id);
export const total = () => ids.length;

export function alternar(id) {
  ids = ids.includes(id) ? ids.filter((i) => i !== id) : [...ids, id];
  guardar('carrinho', ids);
  document.dispatchEvent(
    new CustomEvent('carrinho:alterado', { detail: { total: ids.length } })
  );
  return ids.includes(id);
}
