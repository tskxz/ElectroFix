import express from 'express';
const router  = express.Router();
import { getEletrodomesticos, getEletrodomestico, criarEletrodomestico, atualizarEletrodomestico, deleteEletrodomestico, criarEletrodomesticoReview} from '../controllers/eletrodomesticoController.js';
import {protect, admin} from '../middleware/authMiddleware.js'
router.get('/', getEletrodomesticos);
router.get('/:id', getEletrodomestico);
router.post('/', protect, admin, criarEletrodomestico);
router.put('/:id', protect, admin, atualizarEletrodomestico);
router.delete('/:id', protect, admin, deleteEletrodomestico);
router.post('/:id/reviews', protect, criarEletrodomesticoReview)
export default router