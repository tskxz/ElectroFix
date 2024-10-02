import express from 'express';
const router  = express.Router();
import { getEletrodomesticos, getEletrodomestico, criarEletrodomestico, atualizarEletrodomestico} from '../controllers/eletrodomesticoController.js';
import {protect, admin} from '../middleware/authMiddleware.js'
router.get('/', getEletrodomesticos);
router.get('/:id', getEletrodomestico);
router.post('/', protect, admin, criarEletrodomestico);
router.put('/:id', protect, admin, atualizarEletrodomestico);
export default router