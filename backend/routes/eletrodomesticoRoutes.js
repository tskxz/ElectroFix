import express from 'express';
const router  = express.Router();
import { getEletrodomesticos, getEletrodomestico } from '../controllers/eletrodomesticoController.js';

router.get('/', getEletrodomesticos);
router.get('/:id', getEletrodomestico);

export default router