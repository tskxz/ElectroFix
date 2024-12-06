import express from 'express'
const router = express.Router();
import {protect, admin} from '../middleware/authMiddleware.js'
import {addAgendaItens, getAgenda} from '../controllers/agendaController.js'

router.route('/').post(protect, addAgendaItens)
router.route('/:id').get(protect,getAgenda)

export default router