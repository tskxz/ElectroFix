import express from 'express';
const port = 5000;
import eletrodomesticos from './data/eletrodomesticos.js';

const app = express();

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