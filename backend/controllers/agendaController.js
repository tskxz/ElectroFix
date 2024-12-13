// TODO: controller de pagar agenda

import asyncHandler from '../middleware/asyncHandler.js';
import Agenda from '../models/agendaModel.js'


// @desc    Criar nova agenda
// @route   POST /api/agendas
// @access  Private
const addAgendaItens = asyncHandler(async(req, res) => {
    const {enderecoPostal, metodoPagamento, precoDeslocamento, precoTaxa, precoTotal, status} = req.body
    console.log(enderecoPostal)
    const agenda = new Agenda({
        utilizador: req.utilizador._id,
        enderecoPostal,
        metodoPagamento,
        precoDeslocamento,
        precoTaxa,
        precoTotal,
        status,
    })
        const criarAgenda = await agenda.save()
        console.log('agenda criado: ')
        console.log(criarAgenda)
        res.status(201).json(criarAgenda)
    
})

// @desc    Ter ordem atraves do id
// @route   GET /api/agendas/:id
// @access  Private/Admin
const getAgenda = asyncHandler(async(req, res) => {
    const agenda = await Agenda.findById(req.params.id).populate('utilizador', 'nome email')
    if(agenda){
        res.status(200).json(agenda)
    } else {
        res.status(404)
        throw new Error('agenda n encontrado')
    }
})

// @desc    Ter agendas efetuadas pelo utilizador
// @route   GET /api/agendas/minhas_agendas
// @access  Private
const getMinhasAgendas = asyncHandler(async(req, res) => {
    const agendas = await Agenda.find({utilizador: req.utilizador._id})
    res.status(200).json(agendas)
})

// @desc    Atualizar agenda para pago
// @route   GET /api/agendas/:id/pago
// @access  Private
const atualizarAgendaPago = asyncHandler(async(req, res) => {
    const agenda = await Agenda.findById(req.params.id)
    if(agenda){
        agenda.isPago = true;
        agenda.pagoEm = Date.now();
        agenda.resultadoPagamento = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email
        } 

        const agendaAtualizado = await agenda.save()
        res.status(200).json(agendaAtualizado)
    } else {
            res.status(400)
            throw new Error('agenda n encontrado')
    }
})

// @desc    Ter agendas efetuadas pelo utilizador
// @route   GET /api/agendas/minhas_agendas
// @access  Private
const getTodasAgendas = asyncHandler(async(req, res) => {
    const agendas = await Agenda.find().populate('utilizador','id nome');
    res.status(200).json(agendas)
})

// @desc    Atualizar agenda para confirmado
// @route   GET /api/agendas/:id/confirmado
// @access  Private/Admin
const atualizarAgendaConfirmado = asyncHandler(async(req, res) => {
    const agenda = await Agenda.findById(req.params.id)
    if(agenda){
        agenda.status = "Confirmado"
        agenda.confirmadoEm = Date.now();

        const agendaAtualizado = await agenda.save()
        res.status(200).json(agendaAtualizado)
    } else {
        res.status(404)
        throw new Error('agenda n encontrado')
    }
})

// @desc    Atualizar agenda para recusado
// @route   GET /api/agendas/:id/recusado
// @access  Private/Admin
const atualizarAgendaRecusado = asyncHandler(async(req, res) => {
    const agenda = await Agenda.findById(req.params.id)
    if(agenda){
        agenda.status = "Recusado"
        agenda.recusadoEm = Date.now();

        const atualizarAgendaRecusado = await agenda.save()
            res.status(200).json(agendaAtualizado)
    } else {
        res.status(404)
        throw new Error('agenda n encontrado')
    }     
    
    
})

// @desc    Atualizar agenda Data
// @route   GET /api/agendas/:id/mudar_data
// @access  Private/Admin
const atualizarAgendaData = asyncHandler(async(req, res) => {
    const { dataMarcacao } = req.body
    const agenda = await Agenda.findById(req.params.id)
    if(agenda){
        agenda.enderecoPostal.dataMarcacao = dataMarcacao || agenda.enderecoPostal.dataMarcacao

        const agendaAtualizado = await agenda.save()
        res.status(200).json(agendaAtualizado)
    } else {
        res.status(404)
        throw new Error('agenda n encontrado')
    }
})

export {addAgendaItens, getAgenda, getMinhasAgendas, atualizarAgendaPago, getTodasAgendas, atualizarAgendaConfirmado, atualizarAgendaRecusado, atualizarAgendaData}