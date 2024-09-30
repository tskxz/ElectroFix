import asyncHandler from "../middleware/asyncHandler.js";
import Encomenda from "../models/encomendaModel.js"

// @desc   Criar nova encomenda
// @route  POST /api/encomendas
// @access Private

const addEncomendaItens = asyncHandler(async(req, res) => {
    res.send('add encomenda itens')
})

// @desc   Ter encomendas efetuadas pelo utilizador
// @route  GET /api/encomendas/minhas_encomendas
// @access Private
const getMinhasEncomendas = asyncHandler(async(req, res) => {
	res.send('ter as minhas encomendas')
})

// @desc   Ter ordem atraves do id
// @route  GET /api/encomendas/:id
// @access Private/Admin
const getEncomenda = asyncHandler(async(req, res) => {
	res.send('get encomenda')
})

// @desc	Atualizar encomenda para pago
// @route	GET /api/encomendas/:id/pago
// @access  Private
const atualizarEncomendaPago = asyncHandler(async(req, res) => {
	res.send('atualizar encomenda para pagao')
})

// @desc	Atualizar encomenda para entregue
// @route  	GET /api/encomendas/:id/entregue
// @access	Private/Admin
const atualizarEncomendaEntregue = asyncHandler(async(req,res) => {
	res.send('atualizar encomenda para entregue')
})

// @desc	Ter todas as encomendas
// @route	GET /api/encomendas
// @access	Private/Admin
const getEncomendas = asyncHandler(async(req, res) => {
	res.send('ter encomendas')
})

export {addEncomendaItens, getMinhasEncomendas, getEncomenda, atualizarEncomendaPago, atualizarEncomendaEntregue, getEncomendas}
