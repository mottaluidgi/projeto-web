const ID_FORM = 'form-contato';

const regras = {
  nome: (v) => (v.trim().length < 3 ? 'Informe ao menos 3 caracteres.' : ''),
  email: (v) => (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? 'Informe um e-mail válido.' : ''),
  mensagem: (v) => (v.trim().length < 10 ? 'Escreva ao menos 10 caracteres.' : '')
};

const temRegra = (campo) => Object.hasOwn(regras, campo.name);
const noFormulario = (alvo) => alvo instanceof Element && alvo.closest(`#${ID_FORM}`);

export function validarCampo(campo) {
  if (!temRegra(campo)) return true;

  const erro = regras[campo.name](campo.value);
  const idAviso = `erro-${campo.name}`;
  let aviso = document.getElementById(idAviso);

  if (!aviso) {
    aviso = document.createElement('span');
    aviso.id = idAviso;
    aviso.className = 'erro-msg';
    aviso.setAttribute('role', 'alert');
    campo.after(aviso);
  }

  aviso.textContent = erro;
  campo.classList.toggle('invalido', Boolean(erro));
  campo.setAttribute('aria-invalid', String(Boolean(erro)));
  campo.setAttribute('aria-describedby', idAviso);
  return !erro;
}

function limparEstado(campo) {
  campo.classList.remove('invalido');
  campo.removeAttribute('aria-invalid');
  const aviso = document.getElementById(`erro-${campo.name}`);
  if (aviso) aviso.textContent = '';
}

export function iniciarFormulario() {
  document.addEventListener('focusout', (e) => {
    if (noFormulario(e.target)) validarCampo(e.target);
  });

  document.addEventListener('input', (e) => {
    if (noFormulario(e.target) && e.target.classList.contains('invalido')) {
      validarCampo(e.target);
    }
  });

  document.addEventListener('submit', (e) => {
    if (e.target.id !== ID_FORM) return;
    e.preventDefault();

    const campos = [...e.target.elements].filter(temRegra);
    const invalidos = campos.filter((c) => !validarCampo(c));
    const msg = e.target.querySelector('.mensagem');

    if (invalidos.length) {
      msg.textContent = 'Corrija os campos destacados.';
      msg.className = 'mensagem erro';
      invalidos[0].focus();
      return;
    }

    msg.textContent = 'Mensagem enviada com sucesso!';
    msg.className = 'mensagem sucesso';
    e.target.reset();
    campos.forEach(limparEstado);
  });
}
