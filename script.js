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
// ESTADO
// ======================

let selecionados = [];
let comprados = JSON.parse(localStorage.getItem("comprados")) || [];

const grid = document.getElementById("gridNumeros");
const lista = document.getElementById("listaSelecionados");
const popup = document.getElementById("popup");
const listaNumeros = document.getElementById("listaNumeros");


// ======================
// GERAR NÚMEROS
// ======================

for (let i = 1; i <= 1000; i++) {

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
// MOSTRAR SELECIONADOS
// ======================

function atualizarLista() {

  lista.innerHTML = "";

  selecionados.forEach(num => {

    const item = document.createElement("div");
    item.classList.add("item");
    item.textContent = num;

    lista.appendChild(item);

  });

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
// COMPRAR
// ======================

document.getElementById("comprar").addEventListener("click", () => {

  if (selecionados.length === 0) {
    alert("Selecione números!");
    return;
  }

  listaNumeros.innerHTML = selecionados.join(", ");
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
// ENVIAR COMPROVANTE (AQUI BLOQUEIA OS NÚMEROS)
// ======================
function envviarcomprovante() {

  const nome = document.getElementById("nome").value;
  const telefone = document.getElementById("telefone").value;

  if (selecionados.length === 0) {
    alert("Selecione números!");
    return;
  }

  const numerosComprados = [...selecionados];

  const mensagem = `Nome: ${nome}\nNúmeros: ${numerosComprados.join(", ")}`;

  window.open(
    "https://wa.me/5511998459106?text=" + encodeURIComponent(mensagem),
    "_blank"
  );

  // 🔥 SALVAR COMO COMPRADOS
  comprados.push(...numerosComprados);
  comprados = [...new Set(comprados)];

  localStorage.setItem("comprados", JSON.stringify(comprados));

  // 🔥 ATUALIZAR VISUAL
  atualizarBloqueio();

  // LIMPAR SELEÇÃO
  selecionados = [];
  atualizarLista();
}
  // 🔥 BLOQUEAR NÚMEROS
  comprados.push(...numeros);
  comprados = [...new Set(comprados)];

  localStorage.setItem("comprados", JSON.stringify(comprados));

  document.querySelectorAll(".numero").forEach(btn => {

    if (comprados.includes(btn.textContent)) {
      btn.classList.add("comprado");
      btn.classList.remove("ativo");
      btn.disabled = true;
    }

  });

  selecionados = [];
  atualizarLista();



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

// POPUP TERMOS

const popupTermos = document.getElementById("popup-termos");
const btnTermos = document.getElementById("btn-termos");

if(localStorage.getItem("termosAceitos")){
  popupTermos.style.display = "none";
}

btnTermos.addEventListener("click", () => {

  localStorage.setItem("termosAceitos", "sim");

  popupTermos.style.display = "none";

});