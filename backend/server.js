import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import eletrodomesticoRoutes from './routes/eletrodomesticoRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

connectDB();

app.use('/api/eletrodomesticos', eletrodomesticoRoutes);


app.get('/', (req, res) => {
    res.send('Api está a rodar...');
})

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor a rodar na porta ${port}`);
});