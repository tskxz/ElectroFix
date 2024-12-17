import express from 'express'
const router = express.Router();
import {protect, admin} from '../middleware/authMiddleware.js'
import {addReparacaoItens, getReparacao, atualizarReparacaoRecusado, getTodasReparacoes, atualizarReparacaoPago} from '../controllers/reparacaoController.js'

router.route('/').post(protect, admin, addReparacaoItens)
router.route('/todasreparacoes').get(protect, admin, getTodasReparacoes)
router.route('/:id').get(protect,getReparacao)
router.route('/:id/recusado').put(protect, atualizarReparacaoRecusado)
router.route('/:id/pago').put(protect, atualizarReparacaoPago)



export default router