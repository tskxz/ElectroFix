import express from 'express'
const router = express.Router();
import {protect, admin} from '../middleware/authMiddleware.js'
import {addAgendaItens} from '../controllers/agendaController.js'

router.route('/').post(protect, addAgendaItens)

export default router