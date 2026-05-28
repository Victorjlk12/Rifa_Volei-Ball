// 1. Seleciona o banco de dados do seu projeto
use('projeto_rifa');

// 2. Cria uma rifa (o prêmio, valor e total de números)
db.rifas.insertOne({
  titulo: "Rifa de um iPhone 15",
  premio: "iPhone 15 Pro Max",
  valor_ponto: 10.00,
  total_numeros: 100,
  data_sorteio: "2026-06-01",
  status: "aberta"
});

// 3. Registra um participante que comprou números
db.participantes.insertOne({
  nome: "João Silva",
  telefone: "11999998888",
  rifa_id: "iPhone 15", // Relaciona com a rifa acima
  numeros_escolhidos: [5, 22, 87],
  pago: true
});

// 4. Consulta para ver quem já pagou
db.participantes.find({ pago: true });