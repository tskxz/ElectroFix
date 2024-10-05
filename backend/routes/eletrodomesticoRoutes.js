import express from 'express';
const router  = express.Router();
import { getEletrodomesticos, getEletrodomestico, criarEletrodomestico, atualizarEletrodomestico, deleteEletrodomestico, criarEletrodomesticoReview, getTopEletrodomesticos} from '../controllers/eletrodomesticoController.js';
import {protect, admin} from '../middleware/authMiddleware.js'
router.get('/', getEletrodomesticos);
router.get('/top', getTopEletrodomesticos)
router.get('/:id', getEletrodomestico);
router.post('/', protect, admin, criarEletrodomestico);
router.put('/:id', protect, admin, atualizarEletrodomestico);
router.delete('/:id', protect, admin, deleteEletrodomestico);
router.post('/:id/reviews', protect, criarEletrodomesticoReview)
export default router