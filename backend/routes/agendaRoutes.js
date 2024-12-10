import express from 'express'
const router = express.Router();
import {protect, admin} from '../middleware/authMiddleware.js'
import {addAgendaItens, getAgenda, getMinhasAgendas, atualizarAgendaPago} from '../controllers/agendaController.js'

router.route('/').post(protect, addAgendaItens)
router.route('/minhasagendas').get(protect, getMinhasAgendas)
router.route('/:id').get(protect,getAgenda)
router.route('/:id/pago').put(protect, atualizarAgendaPago)

export default router