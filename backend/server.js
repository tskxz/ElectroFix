import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import eletrodomesticoRoutes from './routes/eletrodomesticoRoutes.js';
import utilizadorRoutes from './routes/utilizadorRoutes.js';
import encomendaRoutes  from './routes/encomendaRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

connectDB();
// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());

app.use('/api/eletrodomesticos', eletrodomesticoRoutes);
app.use('/api/utilizadores', utilizadorRoutes);
app.use('/api/encomendas', encomendaRoutes);

app.get('/', (req, res) => {
    res.send('Api está a rodar...');
})

app.get('/api/config/paypal', (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}))


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Servidor a rodar na porta ${port}`);
});