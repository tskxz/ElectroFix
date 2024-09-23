import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import eletrodomesticos from './data/eletrodomesticos.js';
import utilizadores from './data/utilizadores.js';
import Utilizador from './models/utilizadorModel.js';
import Eletrodomestico from './models/eletrodomesticoModel.js';
import Encomenda from './models/encomendaModel.js';

dotenv.config();
connectDB();

const importData = async() => {
    try{
        await Encomenda.deleteMany();
        await Eletrodomestico.deleteMany();
        await Utilizador.deleteMany();

        const utilizadoresCriado = await Utilizador.insertMany(utilizadores);
        const adminUtilizador = utilizadoresCriado[0]._id;
        const sampleEletrodomesticos = eletrodomesticos.map((eletrodomestico) => {
            return {...eletrodomestico, utilizador: adminUtilizador}
        })

        await Eletrodomestico.insertMany(sampleEletrodomesticos);
        console.log('Dados importados!')
        process.exit();
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

const destroyData = async() => {
    try {
        await Encomenda.deleteMany();
        await Eletrodomestico.deleteMany();
        await Utilizador.deleteMany();
        console.log('Dados apagados!');
        process.exit();
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

if(process.argv[2] === '-d'){
    destroyData();
} else {
    importData();
}