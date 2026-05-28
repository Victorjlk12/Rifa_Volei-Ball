const { MongoClient, ObjectId } = require('mongodb');

const uri = "mongodb+srv://vitorbarbosaalves06_db_user:rifa135790@cluster0.xtr5wnw.mongodb.net/?appName=Cluster0";
const client = new MongoClient(uri);

async function main() {
    try {
        await client.connect();
        const db = client.db('projeto_rifa');
        const rifas = db.collection('rifas');
        const participantes = db.collection('participantes');

        console.log("🚀 Conectado ao MongoDB para o sistema de Rifa!");

        // --- FUNÇÃO PARA CRIAR NOVA RIFA ---
        async function criarRifa(titulo, premio, valor) {
            const resultado = await rifas.insertOne({
                titulo,
                premio,
                valor,
                dataCriacao: new Date()
            });
            console.log(`Rifa criada com ID: ${resultado.insertedId}`);
        }

        // Teste: Criar uma rifa ao iniciar (opcional)
        // await criarRifa("Rifa do iPhone", "iPhone 15", 10.00);

    } catch (e) {
        console.error(e);
    }
}

main().catch(console.error);