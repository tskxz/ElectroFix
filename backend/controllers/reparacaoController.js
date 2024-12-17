import asyncHandler from '../middleware/asyncHandler.js';
import Reparacao from '../models/reparacaoModel.js'


// @desc    Criar nova reparacao
// @route   POST /api/reparacoes
// @access  Private/Admin
const addReparacaoItens = asyncHandler(async(req, res) => {
    const {agenda, valor_orcamento, descricao} = req.body
    console.log(agenda)
    const reparacao = new Reparacao({
        agenda,
        valor_orcamento,
        descricao,
    })
        const criarReparacao = await reparacao.save()
        console.log('reparacao criado: ')
        console.log(criarReparacao)
        res.status(201).json(criarReparacao)
    
})

// @desc    Ter reparacao atraves do id
// @route   GET /api/reparacoes/:id
// @access  Private/Admin
const getReparacao = asyncHandler(async(req, res) => {
    const reparacao = await Reparacao.findById(req.params.id).populate('agenda', 'id utilizador')
    console.log(reparacao)
    if(reparacao){
        res.status(200).json(reparacao)
    } else {
        res.status(404)
        throw new Error('reparacao n encontrado')
    }
})

// @desc    Atualizar reparacao para recusado
// @route   GET /api/reparacoes/:id/recusado
// @access  Private/Admin
const atualizarReparacaoRecusado = asyncHandler(async(req, res) => {
    const reparacao = await Reparacao.findById(req.params.id)
    if(reparacao){
        reparacao.status = "Recusado"
        reparacao.recusadoEm = Date.now();

        const atualizarReparacaoRecusado = await reparacao.save()
            res.status(200).json(reparacaoAtualizado)
    } else {
        res.status(404)
        throw new Error('reparacao n encontrado')
    }     
    
})

// @desc    Atualizar reparacao para 
// @route   GET /api/reparacoes/:id/concluido
// @access  Private/Admin
const atualizarReparacaoConcluido = asyncHandler(async(req, res) => {
    const reparacao = await Reparacao.findById(req.params.id)
    if(reparacao){
        reparacao.status = "Concluido"
        reparacao.concluidoEm = Date.now();

        const atualizarReparacaoConcluido = await reparacao.save()
            res.status(200).json(reparacaoAtualizado)
    } else {
        res.status(404)
        throw new Error('reparacao n encontrado')
    }     
    
})

// @desc    Ter reparacoes
// @route   GET /api/reparacoes/todas
// @access  Private
const getTodasReparacoes = asyncHandler(async(req, res) => {
    const reparacoes = await Reparacao.find({})
    .populate({
        path: 'agenda',
        select: 'id utilizador',
        populate: { path: 'utilizador', select: 'nome' },
    });
    res.status(200).json(reparacoes)
})

// @desc    Atualizar reparacao para pago
// @route   GET /api/reparacoes/:id/pago
// @access  Private
const atualizarReparacaoPago = asyncHandler(async(req, res) => {
    const reparacao = await Reparacao.findById(req.params.id)
    if(reparacao){
        reparacao.isPago = true;
        reparacao.pagoEm = Date.now();
        reparacao.resultadoPagamento = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email
        } 

        const reparacaoAtualizado = await reparacao.save()
        res.status(200).json(reparacaoAtualizado)
    } else {
            res.status(400)
            throw new Error('reparacao n encontrado')
    }
})


export {addReparacaoItens, getReparacao, atualizarReparacaoRecusado, getTodasReparacoes, atualizarReparacaoPago, atualizarReparacaoConcluido}