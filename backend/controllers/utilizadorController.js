import asyncHandler from '../middleware/asyncHandler.js'
import Utilizador from '../models/utilizadorModel.js'
import jwt from 'jsonwebtoken'
import generateToken from '../utils/generateToken.js'
// @desc    autenticar utilizador e ter token
// @route   get /api/utilizadores/login
// @access  public
const authUtilizador = asyncHandler(async(req, res) => {
	const {email, password} = req.body;
	const utilizador = await Utilizador.findOne({email});
	if(utilizador && (await utilizador.matchPassword(password))){
		const token = jwt.sign({utilizadorId: utilizador._id}, process.env.JWT_SECRET, {
			expiresIn: '30d',
		})

		// Meter jwt como http-only cookie
		res.cookie('jwt', token, {
			httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
			sameSite: 'strict',
			maxAge: 30*24*60*60*1000 // 30 dias
		})

		res.json({
			_id: utilizador._id,
			nome: utilizador.nome,
			email: utilizador.email,
            isAdmin: utilizador.isAdmin,
		})
	} else {
		res.status(404)
		throw new Error('Email ou Password errada!')
	}
    res.send('auth utilizador')
})

// @desc    Registar utilizador
// @route   post /api/utilizadores
// @access  public
const registarUtilizador = asyncHandler(async(req, res) => {
	const {nome, email, password} = req.body;
	const utilizadorExiste = await Utilizador.findOne({email})
	if(utilizadorExiste){
		res.status(400);
		throw new Error('utilizador existe')
	}
	const utilizador = await Utilizador.create({
		nome,email,password
	})
	if(utilizador){
		generateToken(res, utilizador._id)
		res.status(201).json({
			_id: utilizador._id,
			nome: utilizador.nome,
			email: utilizador.email,
			isAdmin: utilizador.isAdmin
		})
	} else {
		res.status(400);
		throw new Error('invalid user data')
	} 
})

// @desc    Desautenticar utilizador / Limpar cookie
// @route   get /api/utilizadores/logout
// @access  private
const logoutUtilizador = asyncHandler(async(req, res) => {
	res.cookie('jwt', '', {
		httpOnly: true,
		expires: new Date(0)
	})
	res.status(200).json({message: 'Logout com sucesso!'})
})

// @desc    Perfil do utilizador
// @route   get /api/utilizadores/perfil
// @acess   public
const getUtilizadorPerfil = asyncHandler(async(req,res) => {
	const utilizador = await Utilizador.findById(req.utilizador._id)
	if(utilizador){
		res.status(201).json({
			_id: utilizador._id,
			nome: utilizador.nome,
			email: utilizador.email,
			isAdmin: utilizador.isAdmin
		})
	} else {
		res.status(404)
		throw new Error('utilizador n encontrado')
	}
})

// @desc    Atualizar perfil do utilizador
// @route   PUT /api/utilizadores/perfil
// @access  Private
const atualizarUtilizadorPerfil = asyncHandler(async(req, res) => {
	const utilizador = await Utilizador.findById(req.utilizador._id)
	if(utilizador){
		utilizador.nome = req.body.nome || utilizador.nome
		utilizador.email = req.body.email || utilizador.email	
		if(req.body.password){
			utilizador.password = req.body.password
		}

		const utilizadorAtualizado = await utilizador.save();
		res.status(200).json({
			_id: utilizadorAtualizado._id,
			nome: utilizadorAtualizado.nome,
			email: utilizadorAtualizado.email,
			password: utilizadorAtualizado.password,
			isAdmin: utilizadorAtualizado.admin
		})
	} else {
		res.status(404)
		throw new Error('utilizador n encontrado')
	}
})

// @desc    Ter utilizadores
// @route   GET /api/utilizadores
// @access  Private/Admin
const getUtilizadores = asyncHandler(async(req, res) => {
	res.send('get utilizadores')
})

// @desc    Ter utilizadores atraves do ID
// @route   GET /api/utilizadores/:id
// @access  Private/Admin
const getUtilizador = asyncHandler(async(req, res) => {
	res.send('get utilizador')
})

// @desc    Atualizar utilizadores
// @route   PUT /api/utilizadores/:id
// @access  Private/Admin
const atualizarUtilizador = asyncHandler(async(req, res) => {
	res.send('atualizar utilizador')
})

// @desc    Apagar utilizadores
// @route   DELETE /api/utilizadores/:id
// @access  Private/Admin
const deleteUtilizador = asyncHandler(async(req, res) => {
	res.send('delete utilizador')
})

export {
	authUtilizador, registarUtilizador, logoutUtilizador, getUtilizadorPerfil, atualizarUtilizadorPerfil, getUtilizadores, getUtilizador, atualizarUtilizador, deleteUtilizador
}
