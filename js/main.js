import { iniciarTema } from './tema.js';
import { iniciarNavegacao } from './navegacao.js';
import { iniciarProdutos } from './produtos.js';
import { iniciarFormulario } from './formulario.js';
import { iniciarRoteador } from './roteador.js';
import { total } from './carrinho.js';

const contador = document.getElementById('contador');
const atualizarContador = () => { contador.textContent = String(total()); };

iniciarTema();
iniciarNavegacao();
iniciarProdutos();
iniciarFormulario();
atualizarContador();
document.addEventListener('carrinho:alterado', atualizarContador);
iniciarRoteador();
