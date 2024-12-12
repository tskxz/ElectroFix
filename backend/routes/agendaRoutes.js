import express from 'express'
const router = express.Router();
import {protect, admin} from '../middleware/authMiddleware.js'
import {addAgendaItens, getAgenda, getMinhasAgendas, atualizarAgendaPago, getTodasAgendas, atualizarAgendaConfirmado, atualizarAgendaData} from '../controllers/agendaController.js'

router.route('/').post(protect, addAgendaItens)
router.route('/minhasagendas').get(protect, getMinhasAgendas)
router.route('/todasagendas').get(protect, admin, getTodasAgendas)
router.route('/:id').get(protect,getAgenda)
router.route('/:id/pago').put(protect, atualizarAgendaPago)
router.route('/:id/confirmado').put(protect, admin, atualizarAgendaConfirmado)
router.route('/:id/mudar_data').put(protect, admin, atualizarAgendaData)

export default router