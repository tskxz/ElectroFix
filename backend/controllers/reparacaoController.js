import asyncHandler from '../middleware/asyncHandler.js';
import Reparacao from '../models/reparacaoModel.js'


// @desc    Criar nova reparacao
// @route   POST /api/reparacoes
// @access  Private/Admin
const addReparacaoItens = asyncHandler(async(req, res) => {
    const {agenda} = req.body
    console.log(agenda)
    const reparacao = new Reparacao({
        agenda,
    })
        const criarReparacao = await reparacao.save()
        console.log('reparacao criado: ')
        console.log(criarReparacao)
        res.status(201).json(criarReparacao)
    
})


export {addReparacaoItens}