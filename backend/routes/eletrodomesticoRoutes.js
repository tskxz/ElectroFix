import express from 'express';
const router  = express.Router();
import asyncHandler from '../middleware/asyncHandler.js';

import Eletrodomestico from '../models/eletrodomesticoModel.js';

router.get('/', asyncHandler(async(req, res) => {
    const eletrodomesticos = await Eletrodomestico.find({});
    res.json(eletrodomesticos);
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const eletrodomestico = await Eletrodomestico.findById(req.params.id);
    if(eletrodomestico){
        res.json(eletrodomestico);
    } else {
        res.status(404).json({msg: 'Eletrodomestico não encontrado'});
    }
}))

export default router