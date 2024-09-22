import express from 'express';
import dotenv from 'dotenv';
import eletrodomesticos from './data/eletrodomesticos.js';
import connectDB from './config/db.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
connectDB();

app.get('/', (req, res) => {
    res.send('Api está a rodar...');
})

app.get('/api/eletrodomesticos', (req, res) => {
    res.json(eletrodomesticos);
});

app.get('/api/eletrodomesticos/:id', (req, res) => {
    const eletrodomestico = eletrodomesticos.find(e => e._id === req.params.id);
    res.json(eletrodomestico);
})

app.listen(port, () => {
    console.log(`Servidor a rodar na porta ${port}`);
});