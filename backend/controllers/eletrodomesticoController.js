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

// @desc  Criar um eletrodoméstico
// @route POST /api/eletrodomesticos
// @access Private/Admin
const criarEletrodomestico = asyncHandler(async(req, res) => {
    const eletrodomestico = new Eletrodomestico({
        nome: 'Nome',
        preco: 0,
        utilizador: req.utilizador._id,
        imagem: '/images/sample.jpg',
        emStock: 0,
        numReviews: 0,
        descricao: 'Descricao'
    })
    const eletrodomesticoCriado = await eletrodomestico.save()
    res.json(eletrodomesticoCriado)
})

// @desc  Atualizar um eletrodoméstico
// @route PUT /api/eletrodomesticos/:id
// @access Private/Admin
const atualizarEletrodomestico = asyncHandler(async(req, res) => {
    const {nome, preco, emStock, numReviews, descricao} = req.body
    const eletrodomestico = await Eletrodomestico.findById(req.params.id)
    if(eletrodomestico){
        eletrodomestico.nome = nome || eletrodomestico.nome
        eletrodomestico.preco = preco || eletrodomestico.preco
        eletrodomestico.emStock = emStock || eletrodomestico.emStock
        eletrodomestico.numReviews = numReviews || eletrodomestico.numReviews
        eletrodomestico.descricao = descricao || eletrodomestico.descricao
        const eletrodomesticoAtualizado = await eletrodomestico.save()
        res.json(eletrodomesticoAtualizado)
    } else {
        res.status(404)
        throw new Error('Eletrodomestico não encontrado')
    }
})

export {getEletrodomesticos, getEletrodomestico, criarEletrodomestico, atualizarEletrodomestico}