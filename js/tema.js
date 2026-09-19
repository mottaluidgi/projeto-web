import { guardar, ler } from './storage.js';

const sistemaEscuro = window.matchMedia('(prefers-color-scheme: dark)');
let tema = ler('tema', sistemaEscuro.matches ? 'escuro' : 'claro');
if (tema !== 'claro' && tema !== 'escuro') tema = 'claro';

function aplicar() {
  document.body.classList.toggle('escuro', tema === 'escuro');
  const botao = document.getElementById('btn-tema');
  if (botao) botao.setAttribute('aria-pressed', String(tema === 'escuro'));
}

export function iniciarTema() {
  aplicar();
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#btn-tema')) return;
    tema = tema === 'claro' ? 'escuro' : 'claro';
    guardar('tema', tema);
    aplicar();
    document.dispatchEvent(new CustomEvent('tema:alterado'));
  });
}
