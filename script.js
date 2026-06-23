// ======================
// CONTADOR
// ======================

const dataFinal = new Date("July 20, 2026 23:59:59").getTime();
const timer = document.getElementById("timer");

setInterval(() => {

  const agora = new Date().getTime();
  const distancia = dataFinal - agora;

  if (distancia < 0) {
    timer.innerHTML = "RIFA ENCERRADA";
    return;
  }

  const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
  const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
  const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

  timer.innerHTML = `${dias}d ${horas}h ${minutos}m ${segundos}s`;

}, 1000);

// ======================
// ESTADO
// ======================

let selecionados = [];
let comprados = JSON.parse(localStorage.getItem("comprados")) || [];
const VALOR_NUMERO = 0.50; // <-- VALOR DO NÚMERO

const grid = document.getElementById("gridNumeros");
const lista = document.getElementById("listaSelecionados");
const popup = document.getElementById("popup");
const listaNumeros = document.getElementById("listaNumeros");

// ======================
// GERAR NÚMEROS
// ======================

for (let i = 1; i <= 30000; i++) {

  const numero = i.toString().padStart(3, "0");

  const btn = document.createElement("button");
  btn.classList.add("numero");
  btn.textContent = numero;

  // já comprado
  if (comprados.includes(numero)) {
    btn.classList.add("comprado");
    btn.disabled = true;
  }

  btn.addEventListener("click", () => {

    if (btn.disabled) return;

    btn.classList.toggle("ativo");

    if (selecionados.includes(numero)) {
      selecionados = selecionados.filter(n => n !== numero);
    } else {
      selecionados.push(numero);
    }

    atualizarLista();
  });

  grid.appendChild(btn);
}

// ======================
// MOSTRAR SELECIONADOS + SOMA
// ======================

function atualizarLista() {

  lista.innerHTML = "";
  const qtd = selecionados.length;
  const total = (qtd * VALOR_NUMERO).toFixed(2).replace('.', ',');

  selecionados.sort().forEach(num => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.textContent = num;
    lista.appendChild(item);
  });

  if (qtd > 0) {
    const resumo = document.createElement("div");
    resumo.classList.add("item");
    resumo.style.background = "#38bdf8";
    resumo.style.color = "#000";
    resumo.style.fontWeight = "bold";
    resumo.style.marginTop = "10px";
    resumo.innerHTML = `Qtd: ${qtd} | Total: R$ ${total}`;
    lista.appendChild(resumo);
  }

  // Atualiza texto do botão
  document.getElementById("comprar").innerText = qtd === 0 
    ? "COMPRAR" 
    : `COMPRAR - R$ ${total}`;
}

// ======================
// LIMPAR
// ======================

document.getElementById("limpar").addEventListener("click", () => {

  selecionados = [];

  document.querySelectorAll(".numero")
    .forEach(b => b.classList.remove("ativo"));

  atualizarLista();

});

// ======================
// COMPRAR + SOMA NO POPUP
// ======================

document.getElementById("comprar").addEventListener("click", () => {

  if (selecionados.length === 0) {
    alert("Selecione números!");
    return;
  }

  const qtd = selecionados.length;
  const total = (qtd * VALOR_NUMERO).toFixed(2).replace('.', ',');

  listaNumeros.innerHTML = `
    <p><b>Números escolhidos:</b> ${selecionados.sort().join(", ")}</p>
    <p><b>Quantidade:</b> ${qtd}</p>
    <p><b>Valor unitário:</b> R$ ${VALOR_NUMERO.toFixed(2).replace('.', ',')}</p>
    <hr style="border-color:#1e3a5f; margin:10px 0">
    <p style="color:#38bdf8; font-size:22px"><b>TOTAL A PAGAR: R$ ${total}</b></p>
  `;
  popup.classList.add("ativo");
});

// ======================
// FECHAR POPUP
// ======================

popup.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.classList.remove("ativo");
  }
});

// ======================
// CONFIRMAR COMPRA
// ======================

function confirmarCompra() {

  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const telefone = document.getElementById("telefone").value;

  if (!nome || !email || !telefone) {
    alert("Preencha todos os campos!");
    return;
  }

  popup.classList.remove("ativo");
  document.getElementById("popupPix").classList.add("ativo");
}

// ======================
// COPIAR PIX
// ======================

function copiarPix() {

  const pix = document.getElementById("pixChave").innerText;

  navigator.clipboard.writeText(pix);

  alert("PIX copiado!");

}

// ======================
// ENVIAR COMPROVANTE
// ======================
function enviarComprovante() { // <-- CORRIGI: era envviarcomprovante

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;

  if (selecionados.length === 0) {
    alert("Selecione números!");
    return;
  }

  const numerosComprados = [...selecionados];
  const total = (numerosComprados.length * VALOR_NUMERO).toFixed(2).replace('.', ',');

  const mensagem = `Nome: ${nome}\nTelefone: ${telefone}\nNúmeros: ${numerosComprados.join(", ")}\nTotal: R$ ${total}`;

  window.open(
    "https://wa.me/5511998459106?text=" + encodeURIComponent(mensagem),
    "_blank"
  );

  // SALVAR COMO COMPRADOS
  comprados.push(...numerosComprados);
  comprados = [...new Set(comprados)];

  localStorage.setItem("comprados", JSON.stringify(comprados));

  // ATUALIZAR VISUAL
  atualizarBloqueio();

  // LIMPAR SELEÇÃO
  selecionados = [];
  atualizarLista();
}

// ======================
// FECHAR PIX
// ======================

function fecharPix() {

  document.getElementById("popupPix").classList.remove("ativo");

  document.body.style.overflow = "auto";

  document.querySelector(".banner").scrollIntoView({
    behavior: "smooth"
  });

}

function atualizarBloqueio() {

  document.querySelectorAll(".numero").forEach(btn => {

    const numero = btn.textContent;

    if (comprados.includes(numero)) {
      btn.classList.add("comprado");
      btn.classList.remove("ativo");
      btn.disabled = true;
    }

  });

}
atualizarBloqueio();

// APENAS NUMEROS NO TELEFONE 

const telefoneInput = document.getElementById("telefone");

telefoneInput.addEventListener("input", function (e) {

  let valor = e.target.value.replace(/\D/g, "");

  if (valor.length > 11) {
    valor = valor.slice(0, 11);
  }

  if (valor.length > 10) {
    valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  } else if (valor.length > 6) {
    valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})$/, "($1) $2-$3");
  } else if (valor.length > 2) {
    valor = valor.replace(/^(\d{2})(\d{0,5})$/, "($1) $2");
  } else {
    valor = valor.replace(/^(\d*)$/, "($1");
  }

  e.target.value = valor;

});

// APENAS NUMEROS NO CPF

const cpfInput = document.getElementById("cpf");

cpfInput.addEventListener("input", function (e) {

  let valor = e.target.value.replace(/\D/g, "");

  if (valor.length > 11) {
    valor = valor.slice(0, 11);
  }

  valor = valor.replace(/^(\d{3})(\d)/, "$1.$2");
  valor = valor.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  valor = valor.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, "$1.$2.$3-$4");

  e.target.value = valor;
});