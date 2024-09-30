import jwt from 'jsonwebtoken'
import asyncHandler from './asyncHandler.js'
import Utilizador from '../models/utilizadorModel.js'

// Protect Routes
const protect = asyncHandler(async(req,res,next) => {
	let token;

	// Read jwt from the cookie
	token = req.cookies.jwt
	if(token){
		try{
			const decoded = jwt.verify(token, process.env.JWT_SECRET)
			req.utilizador = await Utilizador.findById(decoded.utilizadorId).select('-password')
			next()
		} catch(error) {
			console.log(error)
			res.status(401)
			throw new Error('not authorized, token failed')
		}
	} else {
		res.status(401)
		throw new Error('not authorized, no token')
	}
})

// Admin middleware
const admin = (req,res,next) => {
	if(req.utilizador && req.utilizador.isAdmin){
		next()
	} else {
		res.status(401)
		throw new Error('not authorized as admin')
	}
} 

export {protect, admin}