import asyncHandler from "../middleware/asyncHandler.js";
import Eletrodomestico from "../models/eletrodomesticoModel.js";

// @desc   Ter todos os eletrodomesticos
// @route  GET /api/eletrodomesticos
// @access Public
const getEletrodomesticos = asyncHandler(async (req, res) => {
    const eletrodomesticos = await Eletrodomestico.find({});
    res.json(eletrodomesticos);
})

// @desc   Obter um eletrôdomestico específico pelo ID
// @route  GET /api/eletrodomesticos/:id
// @access Public
const getEletrodomestico = asyncHandler(async (req, res) => {
    const eletrodomestico = await Eletrodomestico.findById(req.params.id);
    if(eletrodomestico){
        res.json(eletrodomestico);
    } else {
        res.status(404)
        throw new Error('Eletrodomestico não encontrado');
    }
})

export {getEletrodomesticos, getEletrodomestico}