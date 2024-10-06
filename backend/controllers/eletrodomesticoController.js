import asyncHandler from "../middleware/asyncHandler.js";
import Eletrodomestico from "../models/eletrodomesticoModel.js";

// @desc   Ter todos os eletrodomesticos
// @route  GET /api/eletrodomesticos
// @access Public
const getEletrodomesticos = asyncHandler(async (req, res) => {
    const pageSize = 2;
    const page = Number(req.query.pageNumber) || 1;
    const keyword = req.query.keyword ? {nome: {$regex: req.query.keyword, $options: 'i'}} : {}
    const count = await Eletrodomestico.countDocuments({...keyword})

    const eletrodomesticos = await Eletrodomestico.find({...keyword}).limit(pageSize).skip(pageSize * (page-1));
    res.json({eletrodomesticos, page, pages: Math.ceil(count / pageSize)});
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
    const {nome, preco, imagem, emStock, numReviews, descricao} = req.body
    const eletrodomestico = await Eletrodomestico.findById(req.params.id)
    if(eletrodomestico){
        eletrodomestico.nome = nome || eletrodomestico.nome
        eletrodomestico.preco = preco || eletrodomestico.preco
        eletrodomestico.imagem = imagem || eletrodomestico.imagem
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


// @desc    Apagar eletrodomestico
// @route   DELETE /api/eletrodomesticos/:id
// @access  Private/Admin
const deleteEletrodomestico = asyncHandler(async(req, res) => {

    const eletrodomestico = await Eletrodomestico.findById(req.params.id)
    if(eletrodomestico){
       await Eletrodomestico.deleteOne({_id: eletrodomestico._id})
       res.status(200).json({message: 'eletrodomestico apagado'})

    } else {
        res.status(404)
        throw new Error('resource n encontrado')
    }
})

// @desc    Criar uma review
// @route   POST /api/eletrodomesticos/:id/review
// @access  Private
const criarEletrodomesticoReview = asyncHandler(async(req, res) => {
    const {rating, comentario} = req.body
     const eletrodomestico = await Eletrodomestico.findById(req.params.id)
     if(eletrodomestico){
        const alreadyReviewed = eletrodomestico.reviews.find(
             (review) => review.utilizador.toString() === req.utilizador._id.toString()
         )
 
        if(alreadyReviewed){
         res.status(400)
         throw new Error('Eletrodomestico already reviewed')
        }
 
        const review = {
         nome: req.utilizador.nome,
         rating: Number(rating),
         comentario,
         utilizador: req.utilizador._id
        }
 
        eletrodomestico.reviews.push(review)
        eletrodomestico.numReviews = eletrodomestico.reviews.length;
        eletrodomestico.rating = eletrodomestico.reviews.reduce((acc, review) => acc+review.rating, 0) / eletrodomestico.reviews.length
        await eletrodomestico.save()
        res.status(201).json({message: 'Review added'})
 
     } else {
         res.status(404)
         throw new Error('resource n encontrado')
     }
 })

 // @desc    Ter top rated Eletrodomésticos
 // @route   GET /api/eletrodomesticos/top
 // @access  Public

 const getTopEletrodomesticos = asyncHandler(async(req, res) => {
    const eletrodomesticos = await Eletrodomestico.find({}).sort(({rating: -1})).limit(3);
    res.status(200).json(produtos)
 })

export {getEletrodomesticos, getEletrodomestico, criarEletrodomestico, atualizarEletrodomestico, deleteEletrodomestico, criarEletrodomesticoReview, getTopEletrodomesticos}