import express from 'express'
const router = express.Router();
import {protect, admin} from '../middleware/authMiddleware.js'
import {addReparacaoItens} from '../controllers/reparacaoController.js'

router.route('/').post(protect, admin, addReparacaoItens)

export default router