import express from 'express'
const router = express.Router();
import {protect, admin} from '../middleware/authMiddleware.js'
import {addEncomendaItens, getMinhasEncomendas, getEncomenda, atualizarEncomendaPago, atualizarEncomendaEntregue, getEncomendas} from '../controllers/encomendaController.js'

router.route('/').post(protect, addEncomendaItens).get(protect, admin, getEncomendas);
router.route('/minhasencomendas').get(protect, getMinhasEncomendas)
router.route('/:id').get(protect,getEncomenda)
router.route('/:id/pago').put(protect, atualizarEncomendaPago)
router.route('/:id/entregue').put(protect, admin, atualizarEncomendaEntregue)


export default router