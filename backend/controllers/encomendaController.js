import asyncHandler from '../middleware/asyncHandler.js';
import Encomenda from '../models/encomendaModel.js'


// @desc    Criar nova encomenda
// @route   POST /api/encomendas
// @access  Private
const addEncomendaItens = asyncHandler(async(req, res) => {
    const {encomendaItens, enderecoPostal, metodoPagamento, precoItens, precoTaxa, precoEnvio, precoTotal} = req.body
    if(encomendaItens && encomendaItens.length===0){
        res.status(400)
        throw new Error('nenhum item na encomenda')
    } else {
        const encomenda = new Encomenda({
            encomendaItens: encomendaItens.map((x) => ({
                ...x,
                eletrodomestico: x._id,
                _id: undefined
            })),
            utilizador: req.utilizador._id,
            enderecoPostal,
            metodoPagamento,
            precoItens,
            precoTaxa,
            precoEnvio,
            precoTotal
        })
        const criarEncomenda = await encomenda.save()
        console.log('criado')
        console.log(criarEncomenda)
        res.status(201).json(criarEncomenda)
    }
})

// @desc    Ter encomendas efetuadas pelo utilizador
// @route   GET /api/encomendas/minhas_encomendas
// @access  Private
const getMinhasEncomendas = asyncHandler(async(req, res) => {
    const encomendas = await Encomenda.find({utilizador: req.utilizador._id})
    res.status(200).json(encomendas)
})

// @desc    Ter ordem atraves do id
// @route   GET /api/encomendas/:id
// @access  Private/Admin
const getEncomenda = asyncHandler(async(req, res) => {
    const encomenda = await Encomenda.findById(req.params.id).populate('utilizador', 'nome email')
    if(encomenda){
        res.status(200).json(encomenda)
    } else {
        res.status(404)
        throw new Error('encomenda n encontrado')
    }
})

// @desc    Atualizar encomenda para pago
// @route   GET /api/encomendas/:id/pago
// @access  Private
const atualizarEncomendaPago = asyncHandler(async(req, res) => {
    res.send('atualizar encomenda para pago')
})

// @desc    Atualizar encomenda para entregue
// @route   GET /api/encomendas/:id/entregue
// @access  Private/Admin
const atualizarEncomendaEntregue = asyncHandler(async(req, res) => {
    res.send('atualizar encomenda para pago')
})

// @desc    Ter encomendas
// @route   GET /api/encomendas/
// @access  Private/admin
const getEncomendas = asyncHandler(async(req, res) => {
    res.send('ter encomendas')
})

export {addEncomendaItens, getMinhasEncomendas, getEncomenda, atualizarEncomendaPago, atualizarEncomendaEntregue, getEncomendas}