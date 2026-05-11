// ======================
// CONTADOR
// ======================

const dataFinal = new Date("July 20, 2026 23:59:59").getTime();
const timer = document.getElementById("timer");

setInterval(() => {

  const agora = new Date().getTime();
  const distancia = dataFinal - agora;

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  timer.innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;

  if (distancia < 0) {
    timer.innerHTML = "RIFA ENCERRADA";
  }

}, 1000);


// ======================
// ESTADO GLOBAL
// ======================
window.selecionados = [];

const grid = document.getElementById("gridNumeros");
const lista = document.getElementById("listaSelecionados");
const popup = document.getElementById("popup");
const listaNumeros = document.getElementById("listaNumeros");
const btnComprar = document.getElementById("comprar");
const btnLimpar = document.getElementById("limpar");
''

// ======================
// GERAR NÚMEROS
// ======================
for (let i = 1; i <= 1000; i++) {

  const botao = document.createElement("button");
  botao.classList.add("numero");
  botao.textContent = i.toString().padStart(3, "0");

  botao.addEventListener("click", () => {

    const numero = botao.textContent;
    botao.classList.toggle("ativo");

    if (window.selecionados.includes(numero)) {
      window.selecionados = window.selecionados.filter(n => n !== numero);
    } else {
      window.selecionados.push(numero);
    }

    atualizarLista();
  });

  grid.appendChild(botao);
}


// ======================
// ATUALIZAR LISTA
// ======================
function atualizarLista() {
  lista.innerHTML = "";

  window.selecionados.forEach(num => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.textContent = num;
    lista.appendChild(item);
  });
}


// ======================
// LIMPAR
// ======================
btnLimpar.addEventListener("click", () => {

  window.selecionados = [];

  document.querySelectorAll(".numero")
    .forEach(b => b.classList.remove("ativo"));

  atualizarLista();
});


// ======================
// ABRIR COMPRA (BLOQUEADO)
// ======================
btnComprar.addEventListener("click", () => {

  // 🔒 BLOQUEIO TOTAL
  if (window.selecionados.length === 0) {
    alert("⚠️ Selecione pelo menos 1 número antes de comprar!");
    return;
  }

  listaNumeros.innerHTML = window.selecionados.join(", ");
  popup.classList.add("ativo");
});


// ======================
// FECHAR POPUP AO CLICAR FORA
// ======================
popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.remove("ativo");
  }
});


// ======================
// CONFIRMAR COMPRA (FINAL)
// ======================
function confirmarCompra() {

  window.vendas.push({
    nome,
    email,
    telefone,
    numeros: [...window.selecionados]
  });

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  // 🔒 BLOQUEIO FINAL
  if (window.selecionados.length === 0) {
    alert("Erro: nenhum número selecionado!");
    return;
  }

  if (!nome || !email || !telefone) {
    alert("Preencha todos os campos!");
    return;
  }

  alert(`Compra confirmada! Obrigado ${nome}`);

  // reset
  window.selecionados = [];
  atualizarLista();

  document.querySelectorAll(".numero")
    .forEach(b => b.classList.remove("ativo"));

  popup.classList.remove("ativo");
}

function confirmarCompra(){

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  if(!nome || !email || !telefone){
    alert("Preencha todos os campos!");
    return;
  }

  if(!window.selecionados || window.selecionados.length === 0){
    alert("Selecione pelo menos 1 número!");
    return;
  }

  // fecha popup de dados
  document.getElementById("popup").style.display = "none";

  // abre popup PIX
  document.getElementById("popupPix").classList.add("ativo");
}
function copiarPix(){

  const pix = document.getElementById("pixChave").innerText;

  navigator.clipboard.writeText(pix)
    .then(() => {
      alert("PIX copiado com sucesso!");
    })
    .catch(() => {
      alert("Erro ao copiar PIX.");
    });

}