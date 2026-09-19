export function iniciarNavegacao() {
  const botao = document.getElementById('btn-menu');
  const menu = document.getElementById('menu');
  const app = document.getElementById('app');

  const definir = (aberto) => {
    menu.classList.toggle('aberto', aberto);
    botao.setAttribute('aria-expanded', String(aberto));
  };

  botao.addEventListener('click', () => {
    definir(!menu.classList.contains('aberto'));
  });

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a')) definir(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('aberto')) {
      definir(false);
      botao.focus();
    }
  });

  // O href "#app" conflitaria com o roteamento por hash, então o skip link é tratado por JS.
  document.querySelector('.skip-link').addEventListener('click', (e) => {
    e.preventDefault();
    app.focus();
  });
}
