// TODO: controller de pagar agenda

import asyncHandler from '../middleware/asyncHandler.js';
import Agenda from '../models/agendaModel.js'


// @desc    Criar nova agenda
// @route   POST /api/agendas
// @access  Private
const addAgendaItens = asyncHandler(async(req, res) => {
    const {enderecoPostal, metodoPagamento, precoDeslocamento, precoTaxa, precoTotal} = req.body
    
    const agenda = new Agenda({
        utilizador: req.utilizador._id,
        enderecoPostal,
        metodoPagamento,
        precoDeslocamento,
        precoTaxa,
        precoTotal,
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

export {addAgendaItens, getAgenda}