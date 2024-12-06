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


export {addAgendaItens}